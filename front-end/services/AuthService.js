const SERVER_USER_URL = 'http://localhost:3000/user';


function logIn(user) {
    // console.log('row 5:', user)
    return axios.post(`${SERVER_USER_URL}/login`, user)
        .then(res => {
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