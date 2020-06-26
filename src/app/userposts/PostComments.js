import React, { Component } from 'react';
import ApiConnector from '../../apiconnector/ApiConnector';
import AddPostComment from './AddPostComment';

export default class PostComments extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            visible: false
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
        ApiConnector.getPostComments(postId).then((response)=>{
            this.setState({
                comments: response.comments,
                visible: true
            })
        })
    }


    render() {
        return (
            <div className="PostComments">
                {this.state.visible &&
                    <>
                        {this.state.comments.map((item)=>(
                            <div key={item.id} className="Comment">
                                <div>{item.body}</div>
                                <small>{item.name}</small>
                            </div>
                        ))}
                        <AddPostComment 
                            postId={this.props.postId}
                            notifyReloadComments={()=>this._getPostComments(this.props.postId)}
                        />
                    </>
                }
            </div>
        )
    }

}