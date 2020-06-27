import Axios from "axios";

/**
 * Make API call to create new comment for selected post
 * 
 * @param {string} serverUrl        Remote server address - domain only
 * @param {string} accessToken      Token for API authentication
 * @param {number} postId           Create comment for this post
 * @param {string} body             Comment text
 * @param {string} name             Name of comment author
 * @param {string} email            E-Mail address of comment author
 * 
 * @return {Object}                 Operation success or failure
 */
export default function _postPostComment(serverUrl, accessToken, postId, body, name, email) {

    return new Promise(function(resolve,reject) {

        let requestConfig = { 
            headers: { Authorization: `Bearer ${accessToken}` }
        };
        let requestData = {
            post_id: postId,
            body,
            name,
            email 
        }

        Axios.post(`${serverUrl}/public-api/comments`, requestData, requestConfig).then((response)=>{

            // Success 
            if (response.data._meta.success) {
                resolve({
                    success: response.data._meta.success,
                    code: response.data._meta.code,
                    message: response.data._meta.message
                });
            } 

            // Data error, connection OK
            else {
                reject({
                    success: response.data._meta.success,
                    code: response.data._meta.code,
                    message: response.data._meta.message
                })
            }

        }).catch((error)=>{

            // Network error
            reject({
                success: false,
                code: error.status,
                message: error.statusText,
            })

        })
    });
}