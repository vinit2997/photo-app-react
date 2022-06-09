
import React from 'react';
import {getHeaders} from './utils.js';

export class LikeButton extends React.Component {  

    //constructor
    constructor(props){
        super(props);
        //initialize
        this.like_unlike_handler = this.like_unlike_handler.bind(this);
        this.like = this.like.bind(this);
        this.unlike = this.unlike.bind(this);
    }

    like_unlike_handler(ev){
        if (this.props.likeId) {
            this.unlike();
        }
        else{
            this.like()
        }
    }
    
    //like button
    like(){
        const postId = this.props.postId;
        //fetvch api
        fetch('/api/posts/' + postId + '/likes', { 
            headers: getHeaders(),
            body: JSON.stringify({}),
            method: "POST"
        }).then(response => response.json())
        .then(data => { 
            this.props.requeryPost();
        })
    }

    //unlike button
    unlike(){
        const postId = this.props.postId;
        const likeId = this.props.likeId
        const likeCount = this.props.likeCount;
        //fetch api
        fetch('/api/posts/' + postId + '/likes/'+likeId, { 
            headers: getHeaders(),
            method: "DELETE"
        }).then(response => response.json())
        .then(data => { 
            this.props.requeryPost();
        })
    }

    //render
    render() {
        const likeCount = this.props.likeCount.length;
        return (
           <button class = 'btn'
                onClick={this.like_unlike_handler}
                role='switch'
                // aria
                aria-label= 'LikeButton'
                aria-checked= { likeCount>0 ? 'true' : 'false'}>
                {/* icon */}
                <i className={ likeCount>0 ? 'fas fa-heart' : 'far fa-heart'}></i>
           </button>
       );
    }
}

