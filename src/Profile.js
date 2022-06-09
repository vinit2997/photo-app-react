import React from 'react';
import {getHeaders} from './utils.js';

export class Profile extends React.Component {  

    //constructor
    constructor(props){
        super(props);
        this.state = {
            profile: {username : 'webdev', thumb_url: 'thumb_url'}
        }
    }
    
    //get profile api
    getProfile(){
        fetch('https://photo-app-secured.herokuapp.com/api/profile', {
            headers: getHeaders()
        }).then(response => response.json())
        .then(data => { 
            this.setState({
                profile: data
            })
        })
    }

    //render
    render() {
        return (
            
            <div id='profile_pic_name'>
                <div id='img_div'>
                    <img id='profile_image' src={this.state.profile.image_url} alt={'profile pic for '+this.state.profile.username} />
                </div>

                <div id='profile_name'>
                    <h2>{this.state.profile.username}</h2>
                </div>
            </div>
        );
    }
}

export default Profile;