import React, {Component} from 'react';
import ApiInterface from '../../apiinterface/ApiInterface';
import { isUserValid } from './UserDetails.functions';
import PleaseWait from '../../components/PleaseWait';
import './UserDetails.scss';

export default class UserDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isExpanded: false,
            isProcessing: false,
            isValid: false,
            errorMessage: null,
            firstName: '',
            lastName: ''
        }
    }

    componentDidMount() {
        this._getUserDetails(this.props.userId);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.userId !== this.props.userId && this.props.userId!==null) {
            this.setState({firstName: '', lastName: ''}, ()=>{
                this._getUserDetails(this.props.userId)
            })
        }
    }

    _getUserDetails(userId, onDoneCallback=null) {
        ApiInterface.getUserDetails(userId).then((response)=>{
            this.setState({
                firstName: response.user.first_name,
                lastName: response.user.last_name,
                errorMessage: null
            }, ()=>{
                if (typeof onDoneCallback === 'function') {
                    onDoneCallback(response.user.first_name, response.user.last_name)
                }
            })
        }).catch((error)=>{
            this.setState({errorMessage: error.message});
        })
    }

    render() {
        return (
            <div className="UserDetails">
                {!this.state.isExpanded &&
                    <button onClick={()=>this.setState({isExpanded: true})}>Edit user</button>
                }
                {this.state.isExpanded && this.state.isProcessing &&
                    <PleaseWait />
                }
                {this.state.isExpanded && !this.state.isProcessing &&
                    <>
                        first name: 
                        <input 
                            type="text" 
                            value={this.state.firstName} 
                            onChange={(e)=>this._changeFormValue({firstName: e.target.value})}
                        />
                        last name: 
                        <input 
                            type="text" 
                            value={this.state.lastName} 
                            onChange={(e)=>this._changeFormValue({lastName: e.target.value})}
                        />
                        <button disabled={!this.state.isValid} onClick={this._putUser}>Save</button>
                        <button onClick={()=>this.setState({isExpanded: false})}>Cancel</button>
                        
                        {this.state.errorMessage!==null && 
                            <div className="error-message">{this.state.errorMessage} Try again later.</div>
                        }
                    </>
                }
            </div>
        );
    }

    _changeFormValue(what) {
        let newState = Object.assign(
            {firstName: this.state.firstName, lastName: this.state.lastName},
            what
        );
        newState.isValid = isUserValid(newState);
        this.setState(newState)
    }

    _putUser = () => {
        if (this.state.isValid) {
            this.setState({isProcessing: true},()=>{
                ApiInterface.putUser(
                    this.props.userId, 
                    {firstName: this.state.firstName.trim(), lastName: this.state.lastName.trim()}
                ).then(()=>{
                    this._getUserDetails(this.props.userId, (newFirstName, newLastName)=>{
                        this.setState({
                            isProcessing: false, 
                            errorMessage: null,
                            isExpanded: false,
                        });
                        this.props.notifyUpdateUser(this.props.userId, newFirstName, newLastName)
                    });
                    
                }).catch((error)=>{
                    this.setState({
                        isProcessing: false,
                        errorMessage: error.message
                    });
                })
            })
        }
    }

}   