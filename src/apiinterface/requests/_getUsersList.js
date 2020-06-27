import Axios from "axios";
import convertPaging from "../functions/convertPaging.function";

/**
 * Make API call to browse users list.
 * 
 * @param {string} serverUrl        Remote server address - domain only
 * @param {string} accessToken      Token for API authentication
 * @param {string|null} lastName    Return only users whose last name contains value. Case insensitive.
 * @param {number|null} page        If response is too long, request this page
 * 
 * @return {Promise}                Returns XHR status and fetched users list
 *                                  { success: boolean, 
 *                                    code: HTTP status code,
 *                                    page: data paging information,
 *                                    users: Array of users {id, firstName, lastName} 
 *                                  }
 */
export default function _getUsersList(serverUrl, accessToken, lastName = null, page = null) {

    return new Promise(function(resolve,reject) {

        let requestConfig = { 
            headers: { Authorization: `Bearer ${accessToken}` },
            params: {}
        };
        if (typeof lastName !== 'undefined' && lastName !== null) requestConfig.params.last_name = lastName;
        if (typeof page !== 'undefined' && page !== null) requestConfig.params.page = page;

        Axios.get(`${serverUrl}/public-api/users`, requestConfig).then((response)=>{

            // Success - format and return data 
            if (response.data._meta.success) {
                resolve({
                    success: response.data._meta.success,
                    code: response.data._meta.code,
                    message: response.data._meta.message,
                    paging: convertPaging(response.data._meta),
                    users: response.data.result.map((user)=>{
                        return {
                            id: parseInt(user.id),
                            firstName: user.first_name,
                            lastName: user.last_name
                        }
                    })
                });
            } 
            
            // Data error, connection OK
            else {
                reject({
                    success: response.data._meta.success,
                    code: response.data._meta.code,
                    message: response.data._meta.message,
                    paging: null,
                    users: null
                })
            }

        }).catch((error)=>{

            // error - for example network failure
            reject({
                success: false,
                code: error.status,
                message: error.statusText,
                paging: null,
                users: null
            })
            
        })
    });
}