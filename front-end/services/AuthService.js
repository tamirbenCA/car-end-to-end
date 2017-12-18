const USER_URL = 'http://localhost:3000/user';


function logIn(user) {
    return axios.get(`${USER_URL}/login`)
        .then(res => res.data)
}



export default {
    logIn
}