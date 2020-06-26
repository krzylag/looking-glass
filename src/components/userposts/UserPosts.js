import React, {Component} from 'react';
import ApiConnector from '../../apiconnector/ApiConnector';
import PostComments from './PostComments';

export default class UserPosts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cachedPosts: [],
            selectedPostIndex: null
        }
    }

    componentDidMount() {
        if (this.props.userId!==null) this._getUserPosts(this.props.userId);
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
        return (
            <div className="UserPosts">
                {this.state.selectedPostIndex!==null &&
                    <>
                        displaying post {this.state.selectedPostIndex+1} / {this.state.cachedPosts.length}
                        <div>
                            <h3>{this.state.cachedPosts[this.state.selectedPostIndex].title}</h3>
                            <div>{this.state.cachedPosts[this.state.selectedPostIndex].body}</div>
                        </div>
                        <PostComments 
                            postId={this.state.cachedPosts[this.state.selectedPostIndex].id}
                        />
                    </>
                }
            </div>
        );
    }

}   