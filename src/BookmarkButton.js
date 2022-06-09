import React from 'react';
import {getHeaders} from './utils.js';

export class BookmarkButton extends React.Component {  

    //constructor
    constructor(props){
        super(props);

        //bind
        this.bookmarkUnbookmark = this.bookmarkUnbookmark.bind(this);
        this.bookmark = this.bookmark.bind(this);
        this.unbookmark = this.unbookmark.bind(this);
    }
    
//bookmarkUnbookmark methiod
    bookmarkUnbookmark(ev){
        //if already bookmarked
        if (this.props.bmkId) 
        {
            this.unbookmark();
        }
         //if not bookmarked
        else
        {
            this.bookmark()
        }
    }

//add bookmark
    bookmark(){
        //get post id
        const postId = this.props.postId;

        //fetch from api
        fetch('/api/bookmarks/', { 
            headers: getHeaders(),
            body: JSON.stringify({'post_id' : postId}),
            method: "POST"
        }).then(response => response.json())
        .then(data => { 
            this.props.requeryPost();
        })
    }

    //remove bookmark
    unbookmark(){
        //get posy id
        const postId = this.props.postId;
        //get bookmark id
        const bmkId = this.props.bmkId;

        //fetch from api
        fetch('/api/bookmarks/' + bmkId, { 
            headers: getHeaders(),
            method: "DELETE"
        }).then(response => response.json())
        .then(data => { 
            this.props.requeryPost();
        })
    }
    
    //render in ui
    render() {

        //get bookmark id
        const bmkId = this.props.bmkId;

        return (
            // return html button
           <button
                onClick={this.bookmarkUnbookmark}
                role='switch'
                aria-label= 'BookmarkButton'
                //set aria
                aria-checked= { bmkId ? 'true' : 'false'}>
                {/* icon */}
                <i className={ bmkId ? 'fas fa-bookmark' : 'far fa-bookmark'}></i>
           </button>
       );
    }
}

