const USER_URL = 'http://localhost:3000/user';


function logIn(user) {
    console.log('user5 front',user)
    return axios.get(`${USER_URL}/login`, user)
        .then(res => {
            console.log('authservice, res:', res)
            res.data
        })
}



export default {
    logIn
}