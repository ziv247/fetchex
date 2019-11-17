import React, {Component} from 'react';
import './style.css';
import SinglePost from "./singlePost";
import {addPostToServer, onDeleteInServer, serverGetPosts} from "./severCall";
import {Button, Form} from "react-bootstrap";


export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadingPost: true,
            isLoadingComment: true,
            comments: [],
            posts: [],
            addPost:false,
            addTitle:"",
            addBody:""
        }
    }

    onSuccess = (success, type) => {

            type === "posts" &&
            this.setState({
                posts: success,
                isLoadingPost: false
            });


            type === "comments" && this.setState({
                comments: success,
                isLoadingComment: false
            });


    };

    getDataPosts = () => {
        serverGetPosts("posts", this.onSuccess);

    };
    getDataComments = () => {
        serverGetPosts("comments", this.onSuccess);
    };

    componentDidMount() {
        setTimeout(() => this.getDataPosts(), 3000);
        this.getDataComments();
    }

    render() {
        const {addPost} = this.state;
        return (
            <div>
                <h4>Posts</h4>
                <button className={"btn"} style={{width:"auto", backgroundColor:"aliceblue"}} onClick={()=>this.setState({addPost: !addPost})}>{!addPost ?"Add New Post":"cancel"}</button>
                {this.state.addPost &&
                <Form className={"post"}>
                    <Form.Control id={"addTitle"} as="textarea" rows="2" placeholder={"title"} className={"editTitle"} onChange={ event => this.setState({addTitle:event.target.value})}/>
                    <Form.Control id={"addBody"} as="textarea" className={"editTitle"} placeholder={"body"} rows={"4"} onChange={event => this.setState({addBody:event.target.value})}/>
                    <Button className={"btn"} onClick={(e)=>{
                                                             addPostToServer(this.state.addTitle,this.state.addBody,1,this.onAddPost);

                    }} >Save</Button>
                </Form>
                }
                {this.state.isLoadingPost || this.state.isLoadingComment ?
                    <div className="loader">Loading...</div>
                    :
                    this.state.posts.map((post, i) => <SinglePost post={post}
                                                                  key={i}
                                                                  comments={this.state.comments.filter((comment) => comment.postId === post.id)}
                                                                  onDeletePost={this.onDeletePost}/>)}
            </div>
        )
    }

    onDeletePost = (postId)=>{
        onDeleteInServer(postId);
        this.setState({
            posts:this.state.posts.filter((post)=>post.id !== postId)
        })
    };

    onAddPost = (post)=>{
        const posts = this.state.posts;
        posts.unshift(post);
        this.setState({
            posts:posts,
            addPost: !this.state.addPost
        });
    }
}
