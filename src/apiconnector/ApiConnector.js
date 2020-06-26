import _getUsersList from './requests/_getUsersList';
import _getUserDetails from './requests/_getUserDetails';
import _getUserPosts from './requests/_getUserPosts';
import _getPostComments from './requests/_getPostComments';
import _postPostComment from './requests/_postPostComment';

const SERVER_URL = process.env.REACT_APP_SERVER_URL ? process.env.REACT_APP_SERVER_URL : null;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN ? process.env.REACT_APP_ACCESS_TOKEN : null;

export default class ApiConnector {

    static getUsersList(filters={}) {
        return _getUsersList(SERVER_URL, ACCESS_TOKEN, filters.lastName, filters.page)
    }

    static getUserDetails(userId) {
        return _getUserDetails(SERVER_URL, ACCESS_TOKEN, userId)
    }

    static getUserPosts(userId, filters={}) {
        return _getUserPosts(SERVER_URL, ACCESS_TOKEN, userId, filters.page)
    }

    static getPostComments(postId, filters={}) {
        return _getPostComments(SERVER_URL, ACCESS_TOKEN, postId, filters.page)
    }

    static postPostComment(postId, comment={}) {
        return _postPostComment(SERVER_URL, ACCESS_TOKEN, postId, comment.body, comment.name, comment.email)
    }

}