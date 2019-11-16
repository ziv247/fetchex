import React, {Component} from 'react';
import './style.css';
import SinglePost from "./singlePost";
import {onDeleteInServer, serverGetPosts} from "./severCall";


export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadingPost: true,
            isLoadingComment: true,
            comments: [],
            posts: []
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
        return (
            <div>
                <h4>Posts</h4>
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
    }
}
