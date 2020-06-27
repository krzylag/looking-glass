import React, {Component} from 'react';
import ApiInterface from '../../apiinterface/ApiInterface';
import { convertResponseToSelectOptions } from './Search.functions';
import AsyncSelect from 'react-select/async';

const TYPING_DELAY_MS = 1000;

export default class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: null,
            hackForceAsyncSelectToRefetchData: JSON.stringify(new Date())
        }
        this.typingTimeout=null;
    }

    render() {
        return (
            <>
                <AsyncSelect 
                    key={this.state.hackForceAsyncSelectToRefetchData}
                    defaultOptions 
                    loadOptions={this.loadOptions}
                    onChange={this.onUserSelected}
                />
                {this.state.errorMessage!==null && 
                    <div className="error-message">{this.state.errorMessage} Try again later.</div>
                }
            </>
        );
    }

    loadOptions = (filterLastName, callbackOnLoaded) => {

        let filters = { lastName: filterLastName!=='' ? filterLastName : null };
        if (this.typingTimeout!==null) {
            clearTimeout(this.typingTimeout);
            this.typingTimeout=null;
        }
        this.typingTimeout = setTimeout(()=>{
            ApiInterface.getUsersList(filters).then((response)=>{
                this.setState({errorMessage: null}, ()=>{
                    callbackOnLoaded(convertResponseToSelectOptions(response.users))
                })
            }).catch((error)=>{
                console.log(error)
                this.setState({errorMessage: error.message})
            })
        }, TYPING_DELAY_MS);
        
    }


    onUserSelected = (option) => {
        this.props.onUserSelectedCallback(option.value);
    }

    updateUserCache = (userId, newFirstName, newLastName) => {
        // TODO: notyfy react-select about dataset update, preferably without re-fetching
        //       Apparently, passing notification to AsyncSelect component requires
        //       some serious hacking.
        //       I didn't knew this when I decided to use this library...
        //       For now, use simple hack to re-render component if dataset changes,
        //       this should suffice to pull new dataset from API
        this.setState({hackForceAsyncSelectToRefetchData: JSON.stringify(new Date())})
    }

}   