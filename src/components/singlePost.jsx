import React, {Component} from 'react';
import './style.css';
import SingleComment from "./singleComment";
import {Button, Form} from "react-bootstrap";
import {addComment, serverGetCommentsById, updatePost} from "./severCall";

export default class SinglePost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id:props.id,
            toggleComments: false,
            togglePosts: false,
            editable: false,
            comments: [],
            name:"",
            email:"",
            commentBody:""
        }
    }
    componentDidMount() {
        serverGetCommentsById(this.state.id,this.getComments);

    }

    getComments= comments =>{
        this.setState({comments: comments});
    };

    onEditPost = (e, post) =>{
        e.preventDefault();
        updatePost(post);
        this.setState({editable:false});
    };

    handleTitle =(event)=> {
        this.props.post.title = event.target.value;
    };

    handleBody =(event)=> {
        this.props.post.body = event.target.value;
    };

    handleName = event =>{
        this.setState({name:event.target.value})
    };

    handleMail = event =>{
        this.setState({email:event.target.value})
    };

    handleCommentBody = event =>{
        this.setState({commentBody:event.target.value})
    };

    showComments = () => {
        this.setState({
            toggleComments: !this.state.toggleComments
        })
    };

    onSuccess = (success) => {
        this.setState({
            comments: success,
            isLoadingComment: false
        });


    };

    onComment = comment =>{
        const comments = this.state.comments;
        comments.unshift(comment);
        this.setState({
            comments: comments
        });
    };

    onAddComment=(post)=> {
        addComment(post.id,this.state.name,this.state.email,this.state.commentBody,this.onComment);
    };


    render() {
        let {post, onDeletePost} = this.props;
        const {comments,toggleComments, togglePosts, editable} = this.state;
        return (
            <div className={"post"}>
                {!editable ?
                    <div>
                        <h5 onClick={() => {this.setState({togglePosts: !togglePosts})}} style={{cursor:"pointer"}}>
                            {post.title}
                        </h5>
                        {togglePosts
                        &&
                        <div>
                            <p>{post.body}</p>

                        </div>
                        }
                    </div>
                    :
                    <Form>
                        <Form.Control as="textarea" rows="2" placeholder={post.title} className={"editTitle"} onChange={ event => this.handleTitle(event)}/>
                        <Form.Control as="textarea" className={"editTitle"} placeholder={post.body} rows={"4"} onChange={event => this.handleBody(event)}/>
                        <Button className={"btn"} onClick={(e)=>this.onEditPost(e,post)} >Save</Button>
                    </Form>
                }
                {editable && <Button className={"btn"} onClick={()=>{
                    this.setState({editable:false});
                    onDeletePost(post.id);
                }}>Remove</Button>}
                {togglePosts && <Button className={"btn"} onClick={() => this.setState({editable: !editable})}>{editable?"Cancel":"Edit"}</Button>}
                <h6 style={{textAlign: "right", cursor: "pointer"}}
                    onClick={this.showComments}>{comments.length} Comments</h6>
                {toggleComments &&
                    <div>
                        <Form style={{width:"80%",margin:"auto"}}>
                            <h4>Add Your Comment</h4>
                            <Form.Control as="input"  placeholder={"Your Name"} className={"editTitle"} style={{border:"2px solid"}} onChange={event=>this.handleName(event)}/>
                            <Form.Control as="input" className={"editTitle"} placeholder={"Your@email.com"} style={{border:"2px solid"}} onChange={event=>this.handleMail(event)}/>
                            <Form.Control as="textarea" className={"editTitle"} placeholder={"Your Comment"} rows={"4"} style={{resize:"vertical",border:"2px solid"}} onChange={event=>this.handleCommentBody(event)}/>
                            <Button className={"btn"} onClick={()=>this.onAddComment(post)} >Add</Button>
                        </Form>
                        {comments.map((comment, i) => <SingleComment comment={comment} key={i}/>)}
                    </div>
                    }
            </div>
        )

    }


}