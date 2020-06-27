import React, { Component } from 'react';
import ApiConnector from '../../apiconnector/ApiConnector';
import AddPostComment from './AddPostComment';
import './PostComments.scss';
import PleaseWait from '../../components/PleaseWait';

export default class PostComments extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            visible: false,
            isApiFetchingNow: false,
            errorMessage: null
        }
    }

    componentDidMount() {
        if (this.props.postId!==null) this._getPostComments(this.props.postId);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.postId !== this.props.postId && this.props.postId!==null) {
            this.setState({visible: false}, ()=>{
                this._getPostComments(this.props.postId)
            })
        }
    }

    _getPostComments(postId) {
        this.setState({ isApiFetchingNow: true }, ()=> {
            ApiConnector.getPostComments(postId).then((response)=>{
                this.setState({
                    comments: response.comments,
                    visible: true,
                    errorMessage: null,
                    isApiFetchingNow: false
                })
            }).catch((error)=>{
                console.log(error)
                this.setState({
                    errorMessage: error.message,
                    visible: false,
                    isApiFetchingNow: false
                })
            })
        });
    }


    render() {
        return (
            <div className="PostComments">
                {this.state.visible &&
                    <>
                        {this.state.comments.map((item)=>(
                            <div key={item.id} className="Comment">
                                <div>{item.body}</div>
                                <small className="author">{item.name}</small>
                            </div>
                        ))}
                        <AddPostComment 
                            postId={this.props.postId}
                            notifyReloadComments={()=>this._getPostComments(this.props.postId)}
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
        )
    }

}