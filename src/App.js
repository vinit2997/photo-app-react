import React from 'react';
import Posts from './Posts.js'
import Stories from './Stories.js';
import Profile from './Profile.js';
import Suggestions from './Suggestions.js';
import NavBar from './NavBar.js';


class App extends React.Component {  

    render () {
        return (
            <div>

            {/* NavBar element */}

            <NavBar/>

            <aside>

                {/* Profile element */}
                <Profile/>

                {/* Suggestions element */}
                <Suggestions/>
            </aside>

            <main className="content">

                {/* Stories Element */}
                <Stories/>

                {/* Posts element */}
                <Posts/>
            </main>

            </div>
        );
    }
}

export default App;