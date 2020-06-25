import _getUsersList from './requests/_getUsersList';

const SERVER_URL = process.env.REACT_APP_SERVER_URL ? process.env.REACT_APP_SERVER_URL : null;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN ? process.env.REACT_APP_ACCESS_TOKEN : null;

export default class ApiConnector {

    static getUsersList(filters={}) {
        return _getUsersList(SERVER_URL, ACCESS_TOKEN, filters.lastName, filters.page)
    }
}