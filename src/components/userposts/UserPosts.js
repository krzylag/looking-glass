import React, {Component} from 'react';
import ApiConnector from '../../apiconnector/ApiConnector';
import Post from './post/Post';

export default class UserPosts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cachedPosts: [],
            selectedPostIndex: null
        }
    }

    componentDidMount() {
        this._getUserPosts(this.props.userId);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.userId !== this.props.userId && this.props.userId!==null) {
            this._getUserPosts(this.props.userId)
        }
    }

    _getUserPosts(userId) {
        ApiConnector.getUserPosts(userId).then((response)=>{
            this.setState({
                cachedPosts: response.posts,
                selectedPostIndex: (response.posts.length>0 && this.state.selectedPostIndex===null) ? 0 : this.state.selectedPostIndex
            })
        })
    }

    render() {
        console.log(this.state)
        return (
            <div className="UserPosts">
                displaying post {this.state.selectedPostIndex+1} / {this.state.cachedPosts.length}
                <Post 
                    data={this.state.cachedPosts[this.state.selectedPostIndex]}
                />
            </div>
        );
    }

}   