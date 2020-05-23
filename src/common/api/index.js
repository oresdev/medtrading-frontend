import storage from '../storage'

import axios from 'axios'
/**
 * Manage your api.
 *
 * Current implementation Api should always be accessed through this instace.
 *
 * Perform a custom Axios request.
 *
 * data is an object containing the following properties:
 *  - method
 *  - url
 *  - data ... request payload
 *  - auth (optional)
 *    - username
 *    - password
 **/

axios.defaults.baseURL = 'https://api.medtrading.org/v1/'
// axios.defaults.baseURL = 'http://127.0.0.1:5000/api/'

export default {
    init() {
        const headers = axios.defaults.headers.common

        headers['Content-Type'] = 'application/json; charset=utf-8'

        headers['Authorization'] = `${storage.get('session_data').user.token}`
    },

    close: () => (
        (axios.defaults.headers.common = {}), storage.remove('session_data')
    ),

    get: endpoint => axios.get(endpoint),

    post: (endpoint, data) => axios.post(endpoint, data),

    delete: endpoint => axios.delete(endpoint),
}
