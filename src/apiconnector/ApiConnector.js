import _listUsers from './requests/_listUsers';

const SERVER_URL = process.env.REACT_APP_SERVER_URL ? process.env.REACT_APP_SERVER_URL : null;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN ? process.env.REACT_APP_ACCESS_TOKEN : null;

export default class ApiConnector {

    static listUsers(filters={}) {
        return _listUsers(SERVER_URL, ACCESS_TOKEN, filters.lastName, filters.page)
    }
}