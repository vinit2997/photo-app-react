import React from 'react';
import {getHeaders} from './utils.js';
import Story from './Story.js';

export class Stories extends React.Component {  

    //constructor
    constructor(props){
        super(props);
        this.state = {
            //stories var
            stories: []
        }
        this.getStories();
    }
    
//get stories
    getStories(){
        //fetch api
        fetch('https://photo-app-secured.herokuapp.com/api/stories',{
            headers: getHeaders()
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                stories: data
            })
        })
    }

    render() {
        return (
            <div id="stories">
                {
                    this.state.stories.slice(0,6).map(story =>{
                        return <Story model={story}/>
                    })
                }
            </div>
        );    
    }
}

export default Stories;