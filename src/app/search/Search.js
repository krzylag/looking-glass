import React, {Component} from 'react';
import ApiConnector from '../../apiconnector/ApiConnector';
import { convertResponseToSelectOptions } from './options_functions';
import { TYPING_DELAY_MS } from '../../index';
import AsyncSelect from 'react-select/async';

export default class Search extends Component {

    constructor(props) {
        super(props);
        this.typingTimeout=null;
    }

    render() {
        return (
            <AsyncSelect 
                defaultOptions 
                loadOptions={this.loadOptions}
                onChange={this.onUserSelected}
            />
        );
    }

    loadOptions = (filterLastName, callbackOnLoaded) => {

        let filters = { lastName: filterLastName!=='' ? filterLastName : null };
        if (this.typingTimeout!==null) {
            clearTimeout(this.typingTimeout);
            this.typingTimeout=null;
        }
        this.typingTimeout = setTimeout(()=>{
            ApiConnector.getUsersList(filters).then((response)=>{
                callbackOnLoaded(convertResponseToSelectOptions(response.users))
            })
        }, TYPING_DELAY_MS);
        
    }


    onUserSelected = (option) => {
        this.props.onUserSelectedCallback(option.value);
    }

    updateUserCache = (userId, newFirstName, newLastName) => {
        // TODO: notyfy react-select about dataset update, preferably without re-fetching
    }

}   