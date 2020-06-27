import Axios from "axios";

/**
 * Make API call modify existing user
 * 
 * @param {string} serverUrl        Remote server address - domain only
 * @param {string} accessToken      Token for API authentication
 * @param {number} userId           Create comment for this post
 * @param {string} firstName        Comment text
 * @param {string} lastName         Name of comment author
 * 
 * @return {Object}                 Operation success or failure
 */
export default function _putUser(serverUrl, accessToken, userId, firstName, lastName) {

    return new Promise(function(resolve,reject) {

        let requestConfig = { 
            headers: { Authorization: `Bearer ${accessToken}` }
        };
        let requestData = {
            first_name: firstName,
            last_name: lastName
        }

        Axios.put(`${serverUrl}/public-api/users/${userId}`, requestData, requestConfig).then((response)=>{

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