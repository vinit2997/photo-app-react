
import React from 'react';
import {getHeaders} from './utils.js';

export class MainNav extends React.Component {  

    //constructor
    constructor(props){
        super(props);
        this.state = {
            profile: ''
        }
    }

//get profile
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
        console.log('Rendering MainNav..')
        return (
            <div id="navigation">
                <div id='title'>
                    <h4><b>Photo App</b></h4>
                </div>
                <div id='username_signout'>
                    <div id='username'>
                        <b>{this.state.profile.username}</b>
                    </div>
                    <div id='signout'>
                        <b><a href="#">API Docs</a></b>
                        <b><a href="#"> Sign Out</a></b>
                    </div>
                </div>
            </div>   

        );    
    }
}

export default MainNav;