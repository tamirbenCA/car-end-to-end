import StorageService from '../services/StorageService.js'
const SERVER_USER_URL = 'http://localhost:3000/user';


function logIn(user) {
    // console.log('row 5:', user)
    return axios.post(`${SERVER_USER_URL}/login`, user)
        .then(res => {
            console.log(res.data)
            StorageService.saveToStorage('user', res)
            return res.data
        })
}

function signUp(user) {
    return axios.post(`${SERVER_USER_URL}/signup`, user)
        .then(res => {
            res.data
        })
}



export default {
    logIn,
    signUp
}



