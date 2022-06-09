import React from 'react';
import {getHeaders} from './utils.js';

export class AddComment extends React.Component {  

    constructor(props){
        super(props);
        console.log('Comment Box Component Created');

        //initialize vars
        this.post_comment_handler = this.post_comment_handler.bind(this);
        this.post_comment_text_box_handler = this.post_comment_text_box_handler.bind(this);
        this.textInput = React.createRef();
    }
    
    componentDidMount(){
        console.log('Add Comment Component Mounted');
    }

    //post comment handler
    post_comment_handler(ev){
        console.log('comment added');
        const text = ev.currentTarget.parentNode.children[1].value;    
        const postId = this.props.postId;
        ev.currentTarget.parentNode.children[1].value = '';
        const data = {
             "post_id": postId,
             "text": text
        };

        //fetch api
        fetch('/api/comments', {
            method: 'POST', 
            headers: getHeaders(),
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Successfully commented:', data);
            this.props.requeryPost();
            this.textInput.current.focus();
        })
        //error
        .catch(err => {
            console.error(err);
            alert('Error!');
        });
    }


    //post coimment box handler
    post_comment_text_box_handler(ev){
        if (ev.key === 'Enter') {
            console.log('commented ');
            const text = ev.currentTarget.value;
            const postId = this.props.postId;
            ev.currentTarget.value = '';
            const data = {
                "post_id": postId,
                "text": text
            };

            //fetch api
            fetch('/api/comments', {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Successfully commented:', data);
                    this.props.requeryPost();
                    this.textInput.current.focus();
                })
                .catch(err => {
                    console.error(err);
                    alert('Error!');
                });
        }
    }
    
    //render
    render() {
        console.log('Rendering Add Comment Box..');
        return (
            <div id='post_your_comment_box'>
                <i className="far fa-smile"></i>
                <input type='text' placeholder='Add a comment...' id='comment_form' aria-label="comment box" onKeyDown={this.post_comment_text_box_handler} ref={this.textInput} />
                <button onClick={this.post_comment_handler}>
                    <b>Post</b>
                </button>
            </div>
        );
    }
}

export default AddComment;