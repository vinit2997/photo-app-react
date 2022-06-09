import React from 'react';
import {BookmarkButton} from './BookmarkButton';
import {LikeButton} from './LikeButton';
import {getHeaders} from './utils.js';
export class Suggestion extends React.Component {  

    constructor(props){
        super(props);
        //initialize state
        this.state = {
            suggestion: this.props.model,
            suggestion_id: null,
            following : 'follow'
        }

        this.follow_unfollow_handler = this.follow_unfollow_handler.bind(this);
    }
    


    //follow unfollow handler
    follow_unfollow_handler(ev){

        //if unfollow
        if (this.state.following=='unfollow'){
            ev.currentTarget.ariaChecked = 'False';
            //fetch api
            fetch('https://photo-app-secured.herokuapp.com/api/following/'+this.state.suggestion_id, {
                method: 'DELETE',
                headers: getHeaders(),
            })
            .then(response => response.json())
            .then(data => {
                this.setState({following: 'follow'})
            })
            .catch(err => {
                alert('Error!');
            });
        }
        else{
            ev.currentTarget.ariaChecked = 'True';
            const data = {
                'user_id' : this.state.suggestion.id
            };
            //fetch api
            fetch('https://photo-app-secured.herokuapp.com/api/following', {
                method: 'POST', 
                headers: getHeaders(),
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    suggestion_id : data.id,
                    following: 'unfollow'
                });
            })
            .catch(err => {
                alert('Error!');
            });
        }
    }
    
    render() {
        const suggestion = this.state.suggestion;
        return (
        <div id = 'sggestion_wrapper'>
            <img id = 'sggestion_image' src = {suggestion.image_url} alt = {suggestion.username+'s profile pic'} />
            <div id ='sggestion_name'>
                <p id = 'sggestion_name_inner'>{ suggestion.username }</p>
                <p id = 'sggestion_msg'>suggested for you</p>
            </div>
            <div id = 'follow_btn1'>
                <button aria-label = 'Following' aria-checked = 'False' onClick={this.follow_unfollow_handler} role="switch">{this.state.following}</button>
            </div>
        </div>
        )
    }
}

export default Suggestion;