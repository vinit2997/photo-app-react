
import React from 'react';
import {BookmarkButton} from './BookmarkButton';
import {LikeButton} from './LikeButton';
import {getHeaders} from './utils.js';
import AddComment from './AddComment';
export class Post extends React.Component {  

    //constructor
    constructor(props){
        super(props);
        this.state = {
            post: this.props.model
        }
        this.requeryPost = this.requeryPost.bind(this)
    }
    
    //requery post
    requeryPost(){
        fetch('https://photo-app-secured.herokuapp.com/api/posts/${this.state.post.id}', {
            headers: getHeaders()
        }).then(response => response.json())
        .then(data => { 
            this.setState({
                post: data
            });
        })
    }


    //render
    render() {

        const post = this.state.post;
        let comments = '';
        let viewall = ''
        if (!post) {
            return (
                <div></div>  
            );
        }

        if (this.state.post.comments.length === 0)
            comments = ''
        else
            comments = <p><b>{this.state.post.comments[0].user.username}</b> {this.state.post.comments[0].text}</p>
        
            //if more than 1 comments
        if (this.state.post.comments.length > 1)
            viewall = <a href='#'>View all {this.state.post.comments.length} comments</a>
        return (
            <div id="curr_post_wrapper">
                <div id='curr_post_header'>
                    <div id='curr_post_username'>
                        <b>{this.state.post.user.username}</b>
                    </div>
                    <div id='curr_post_3dots'>
                        <i className="fas fa-ellipsis-h"></i>
                    </div>
                </div>
                <div id='curr_post_image_wrapper'>
                    <img id='curr_post_image' src={this.state.post.image_url} alt ={this.state.post.user.username +'s post'}/>
                </div>
                <div id='curr_post_reactions_wrapper'>
                    <div id='curr_post_reactions_lhs'>
                        {/* like button */}
                        
                        <LikeButton likeCount = {post.likes} likeId = {post.current_user_like_id} postId = {post.id} requeryPost={this.requeryPost}/>
                        {/* comment button */}
                        <i className="far fa-comment"></i>
                        {/* send button */}
                        <i className="far fa-paper-plane"></i>
                    </div>
                    {/* bookmark button */}
                    <BookmarkButton bookmarkId = {post.current_user_bookmark_id} postId = {post.id} requeryPost={this.requeryPost}/>
                </div>

                {/* like count */}
                <div id='curr_post_like'>
                    <p>{this.state.post.likes.length} likes</p>
                </div>

                {/* title */}
                <div id='curr_post_title'>
                    <p><b>{this.state.post.user.username}</b> {this.state.post.caption}</p>
                </div>

                {/* Comments */}
                <div id='curr_post_comments'>
                    {comments}
                    {viewall}
                </div>
                {/* Post time */}
                <div id='curr_post_time'>
                    <p>{this.state.post.display_time}</p>
                </div>
                {/* Comment box */}
                <AddComment postId = {post.id} requeryPost={this.requeryPost}/>
            </div>
        );    
    }
}

export default Post;