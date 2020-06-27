import Axios from "axios";

/**
 * Make API call to fetch details of specific user
 * 
 * @param {string} serverUrl        Remote server address - domain only
 * @param {string} accessToken      Token for API authentication
 * @param {number} userId           User's numeric ID
 * 
 * @return {Promise}                Returns XHR status and fetched users details
 *                                  { success: boolean, 
 *                                    code: HTTP status code,
 *                                    user: Object with user details 
 *                                  }
 */
export default function _getUserDetails(serverUrl, accessToken, userId) {

    return new Promise(function(resolve,reject) {

        let requestConfig = { 
            headers: { Authorization: `Bearer ${accessToken}` }
        };

        Axios.get(`${serverUrl}/public-api/users/${userId}`, requestConfig).then((response)=>{
            
            // Success - format and return data 
            if (response.data._meta.success) {
                resolve({
                    success: response.data._meta.success,
                    code: response.data._meta.code,
                    message: response.data._meta.message,
                    user: response.data.result
                });
            } 

            // Data error, connection OK
            else {
                reject({
                    success: response.data._meta.success,
                    code: response.data._meta.code,
                    message: response.data._meta.message,
                    user: null
                });
            }

        }).catch((error)=>{

            // error - for example network failure
            reject({
                success: false,
                code: error.status,
                message: error.statusText,
                user: null,
            })
            
        })
    });
}