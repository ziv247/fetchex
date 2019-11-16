import React,{Component} from 'react';

export default class SingleComment extends Component{
    render() {
        const {comment} =this.props;
        return(
            <div>
                <hr/>
                <h5>{comment.email}</h5>
                <p>{comment.body}</p>
            </div>
        )
    }
}