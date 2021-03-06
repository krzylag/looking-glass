import React, {Component} from 'react';
import ApiInterface from '../../apiinterface/ApiInterface';
import PostComments from './PostComments';
import './UserPosts.scss'
import PleaseWait from '../../components/PleaseWait';

export default class UserPosts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cachedPosts: [],
            selectedPostIndex: null,
            isApiFetchingNow: false,
            errorMessage: null
        }
    }

    componentDidMount() {
        if (this.props.userId!==null) this._getUserPosts(this.props.userId);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.userId !== this.props.userId && this.props.userId!==null) {
            this.setState({selectedPostIndex: null}, ()=>{
                this._getUserPosts(this.props.userId)
            })
        }
    }

    _getUserPosts(userId) {
        this.setState({isApiFetchingNow: true}, () => {
            ApiInterface.getUserPosts(userId).then((response)=>{
                this.setState({
                    cachedPosts: response.posts,
                    selectedPostIndex: (response.posts.length>0 && this.state.selectedPostIndex===null) ? 0 : this.state.selectedPostIndex,
                    errorMessage: null,
                    isApiFetchingNow: false
                })
            }).catch((error)=>{
                this.setState({
                    errorMessage: error.message,
                    isApiFetchingNow: false
                });
            })
        })
    }

    render() {
        return (
            <div className="UserPosts">
                {this.state.selectedPostIndex!==null &&
                    <>
                        <div className="controls">
                            {this.state.selectedPostIndex > 0 && 
                                <button onClick={()=>this.setState({selectedPostIndex: this.state.selectedPostIndex-1})}>prev</button>
                            }
                            displaying post {this.state.selectedPostIndex+1} / {this.state.cachedPosts.length}
                            {this.state.selectedPostIndex < (this.state.cachedPosts.length-1) && 
                                <button onClick={()=>this.setState({selectedPostIndex: this.state.selectedPostIndex+1})}>next</button>
                            }
                        </div>
                        <div className="current-post">
                            <h3>{this.state.cachedPosts[this.state.selectedPostIndex].title}</h3>
                            <div>{this.state.cachedPosts[this.state.selectedPostIndex].body}</div>
                        </div>
                        <PostComments 
                            postId={this.state.cachedPosts[this.state.selectedPostIndex].id}
                        />
                    </>
                }
                {this.state.isApiFetchingNow &&
                    <PleaseWait />
                }
                {this.state.errorMessage!==null &&
                    <div className="error-message">{this.state.errorMessage} Try again later.</div>
                }
            </div>
        );
    }

}   