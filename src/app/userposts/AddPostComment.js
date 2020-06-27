import React, { Component } from 'react';
import ApiInterface from '../../apiinterface/ApiInterface';
import { isCommentValid } from './AddPostComment.functions';
import PleaseWait from '../../components/PleaseWait';
import './AddPostComment.scss';

export default class AddPostComment extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isExpanded: false,
            isProcessing: false,
            isValid: false,
            errorMessage: null,
            body: '',
            name: '',
            email: ''
        }
    }

    
    render() {
        return (
            <div className="AddPostComment">
                {!this.state.isExpanded && 
                    <button onClick={this._toggleFormExpanded}>Add new comment</button>
                }
                {this.state.isExpanded && this.state.isProcessing &&
                    <PleaseWait />
                }
                {this.state.isExpanded && !this.state.isProcessing &&
                    <>
                        <div className="table">
                            <div className="row">
                                <span>Comment:</span>
                                <textarea 
                                    value={this.state.body} 
                                    onChange={(e)=>this._changeFormValue({body: e.target.value})} 
                                />
                            </div>
                            <div className="row">
                                <span>Your name:</span>
                                <input 
                                    type="text" 
                                    value={this.state.name} 
                                    onChange={(e)=>this._changeFormValue({name: e.target.value})} 
                                    placeholder="name"
                                />
                            </div>
                            <div className="row">
                                <span>Valid email:</span>
                                <input 
                                    type="email" 
                                    value={this.state.email} 
                                    onChange={(e)=>this._changeFormValue({email: e.target.value})} 
                                    placeholder="e-mail"
                                />
                            </div>
                        </div>
                        <button onClick={this._postComment} disabled={!this.state.isValid}>Save</button>
                        <button onClick={this._toggleFormExpanded}>Cancel</button>
                        {this.state.errorMessage!==null && 
                            <div className="error-message">{this.state.errorMessage} Try again later.</div>
                        }
                    </>
                }
            </div>
        )
    }

    _toggleFormExpanded = () => {
        this.setState({isExpanded: !this.state.isExpanded})
    }

    _changeFormValue(what) {
        let newState = Object.assign(
            {body: this.state.body, name: this.state.name, email: this.state.email},
            what
        );
        newState.isValid = isCommentValid(newState);
        this.setState(newState)
    }

    _postComment = () => {
        if (this.state.isValid) {
            this.setState({isProcessing: true}, ()=>{
                ApiInterface.postPostComment(
                    this.props.postId, 
                    {
                        body: this.state.body.trim(),
                        name: this.state.name.trim(),
                        email: this.state.email.trim()
                    }
                ).then(()=>{
                    this.setState({
                        isExpanded: false,
                        isProcessing: false,
                        isValid: false,
                        errorMessage: null,
                        body: '',
                        name: '',
                        email: ''
                    }, ()=>{
                        this.props.notifyReloadComments();
                    })
                }).catch((error)=>{
                    this.setState({
                        isProcessing: false,
                        errorMessage: error.message
                    })
                })
            })
        }
    }
}