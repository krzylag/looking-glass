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
        this.searchRef = React.createRef();
    }

    render() {
        return (
            <div className="App">
                <h1>Project Looking Glass</h1>
                <h2>Check what Your employees are doing in their free time!</h2>
                <Search 
                    onUserSelectedCallback={(selectedUserId)=>{this.setState({selectedUserId})}}
                    ref={this.searchRef}
                />
                {this.state.selectedUserId!==null && 
                    <>
                        <UserDetails 
                            userId={this.state.selectedUserId} 
                            notifyUpdateUser={this._notifyUpdateUser}
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

    _notifyUpdateUser(userId, newFirstName, newLastName) {
        this.searchRef.current.updateUserCache(userId, newFirstName, newLastName);
    }
}

