import React from 'react';

export class Story extends React.Component {  

    //constructor
    constructor(props){
        super(props);
        this.state = {
            story: this.props.model
        }
    }
    

    //render
    render() {
        return (
            <div id='story_wrapper'>
                <img id = 'story_image' src = {this.state.story.user.image_url} alt ={this.state.story.user.username +'story'}/>
                <p id='story_username'>{this.state.story.user.username}</p>
            </div>
        );    
    }
}

export default Story;