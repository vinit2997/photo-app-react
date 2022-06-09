import React from 'react';
import {getHeaders} from './utils.js';
import {Post} from './Post.js';

class Posts extends React.Component {  

    //constructor
    constructor(props){
        super(props);
        //initialize posts
        this.state = {
            //posts variable
            all_posts: []
        }
        //get all posts
        this.getPosts();

    }


    //getposts method
    getPosts(){
        //fetch posts from api
        fetch('/api/posts', {
            headers: getHeaders()
        }).then(response => response.json())
        .then(data => { 
            this.setState({
                //set class variable of posts
                all_posts: data
            })
        })
            
    }
    
//render
    render() {
        return (
            <div id="posts">
                {
                    // render in UI
                    this.state.all_posts.map(post =>{
                        return <Post model={post} key={'post-' + post.id}/>
                    })
                }
            </div>
        )
    }
}

export default Posts;