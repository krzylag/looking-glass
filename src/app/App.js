import React, { Component } from 'react';
import Search from './search/Search';
import UserDetails from './userdetails/UserDetails';
import UserPosts from './userposts/UserPosts';

export default class App extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            selectedUserId: null
        }
    }

    render() {
        return (
            <div className="App">
                <h1>Project Looking Glass</h1>
                <h2>Check what Your employees are doing in their free time!</h2>
                <Search 
                    onUserSelectedCallback={(selectedUserId)=>{this.setState({selectedUserId})}}
                />
                {this.state.selectedUserId!==null && 
                    <>
                        <UserDetails 
                            userId={this.state.selectedUserId} 
                        />
                        <UserPosts 
                            userId={this.state.selectedUserId} 
                        />
                    </>
                }
                {this.state.selectedUserId===null && 
                    <small>start typing to search for specific last name</small>
                }
            </div>
        );
    }

}

