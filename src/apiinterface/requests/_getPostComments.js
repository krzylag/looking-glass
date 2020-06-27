import Axios from "axios";
import convertPaging from "../functions/convertPaging.function";

/**
 * Make API call to browse specific user posts.
 * 
 * @param {string} serverUrl        Remote server address - domain only
 * @param {string} accessToken      Token for API authentication
 * @param {number|null} postId      Search for this user's posts
 * @param {number|null} page        If response is too long, request this page
 * 
 * @return {Promise}                Returns XHR status and fetched users list
 *                                  { success: boolean, 
 *                                    code: HTTP status code,
 *                                    page: data paging information,
 *                                    posts: Array of objects (posts)
 *                                  }
 */
export default function _getPostComments(serverUrl, accessToken, postId, page = null) {

    return new Promise(function(resolve,reject) {

        let requestConfig = { 
            headers: { Authorization: `Bearer ${accessToken}` },
            params: {
                post_id: postId  
            }
        };
        if (typeof page !== 'undefined' && page !== null) requestConfig.params.page = page;

        Axios.get(`${serverUrl}/public-api/comments`, requestConfig).then((response)=>{

            // Success - format and return data 
            if (response.data._meta.success) {
                resolve({
                    success: response.data._meta.success,
                    code: response.data._meta.code,
                    message: response.data._meta.message,
                    paging: convertPaging(response.data._meta),
                    comments: response.data.result
                });
            } 
            
            // Data error, connection OK
            else {
                reject({
                    success: response.data._meta.success,
                    code: response.data._meta.code,
                    message: response.data._meta.message,
                    paging: null,
                    comments: null
                });
            }

        }).catch((error)=>{

            // error - for example network failure
            reject({
                success: false,
                code: error.status,
                message: error.statusText,
                paging: null,
                comments: null
            })
            
        })
    });
}