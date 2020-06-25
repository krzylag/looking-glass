import Axios from "axios";

/**
 * Make API call to browse specific user posts.
 * 
 * @param {string} serverUrl        Remote server address - domain only
 * @param {string} accessToken      Token for API authentication
 * @param {string|null} userId      Search for this user's posts
 * @param {number|null} page        If response is too long, request this page
 * 
 * @return {Promise}                Returns XHR status and fetched users list
 *                                  { success: boolean, 
 *                                    code: HTTP status code,
 *                                    page: data paging information,
 *                                    posts: Array of objects (posts)
 *                                  }
 */
export default function _getUserPosts(serverUrl, accessToken, userId, page = null) {

    return new Promise(function(resolve,reject) {

        let requestConfig = { 
            headers: { Authorization: `Bearer ${accessToken}` },
            params: {
                user_id: userId  
            }
        };
        if (typeof page !== 'undefined' && page !== null) requestConfig.params.page = page;

        Axios.get(`${serverUrl}/public-api/posts`, requestConfig).then((response)=>{
            console.log(response.data)
            // Success - format and return data 
            resolve({
                success: response.data._meta.success,
                code: response.data._meta.code,
                paging: {
                    max: response.data._meta.pageCount,
                    current: response.data._meta.currentPage,
                    pageSize: response.data._meta.perPage
                },
                posts: response.data.result
            });
        }).catch((error)=>{
            // error - for example network failure
            reject({
                success: false,
                code: error.status,
                paging: null,
                message: error.statusText,
            })
        })
    });
}