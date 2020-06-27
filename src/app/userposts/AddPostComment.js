import React, { Component } from 'react';
import ApiConnector from '../../apiconnector/ApiConnector';
import isCommentValid from './isCommentValid.function';
import PleaseWait from '../../components/PleaseWait';

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
                        <textarea 
                            value={this.state.body} 
                            onChange={(e)=>this._changeFormValue({body: e.target.value})} 
                        /><br />
                        <input 
                            type="text" 
                            value={this.state.name} 
                            onChange={(e)=>this._changeFormValue({name: e.target.value})} 
                            placeholder="Your name"
                        /><br />
                        <input 
                            type="email" 
                            value={this.state.email} 
                            onChange={(e)=>this._changeFormValue({email: e.target.value})} 
                            placeholder="e-mail"
                        /><br />
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
                ApiConnector.postPostComment(
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