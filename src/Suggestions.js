import React from 'react';
import {getHeaders} from './utils.js';
import Suggestion from './Suggestion'

export class Suggestions extends React.Component {  

    //constructor
    constructor(props){
        super(props);
        this.state = {
            suggestions : []
        }
        this.getSuggestions = this.getSuggestions.bind(this);
    }
    
    componentDidMount(){
        this.getSuggestions();
    }

    //get suggestions
    getSuggestions(){
        fetch('/api/suggestions', {
            headers: getHeaders()
        }).then(response => response.json())
        .then(data => { 
            this.setState({
                suggestions: data
            })
        })
            
    }

    //render
    render() {
        return (
                <div id='recommendations_wrapper'>
                    <h3 id='suggestions_wrapper'><b>Suggestions for you</b></h3>
                    {
                        this.state.suggestions.map(suggestion =>{
                            return <Suggestion model={suggestion}/>
                        })
                    }
                </div>
            );
    }
}

export default Suggestions;