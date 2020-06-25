import React, {Component} from 'react';
import ApiConnector from '../../apiconnector/ApiConnector';

export default class UserDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: ''
        }
    }

    componentDidMount() {
        this._getUserDetails(this.props.userId);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.userId !== this.props.userId && this.props.userId!==null) {
            this._getUserDetails(this.props.userId)
        }
    }

    _getUserDetails(userId) {
        ApiConnector.getUserDetails(userId).then((response)=>{
            this.setState({
                firstName: response.user.first_name,
                lastName: response.user.last_name
            })
        })
    }

    render() {
        return (
            <div className="UserDetails">
                <div>{this.state.firstName}</div>
                <div>{this.state.lastName}</div>
            </div>
        );
    }

}   