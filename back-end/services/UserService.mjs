const FILE_NAME = 'users.json';
import fs from 'fs';


function checkLogIn(userInfo) { 
    return new Promise((resolve, reject) => {
        if (getUser(userInfo)) {
            resolve({user});
        } else {
            reject({
                error: 'Email/Password not valid'
            });
        }
    });
}

function getUsers() {
    return new Promise((resolve, reject) => {
        fs.readFile(FILE_NAME, 'utf8', (err, strUsers) => {
            if (err) {
                reject(err);
            } else {
                var users = JSON.parse(strUsers)
                resolve(users)
            }
        })
    });
}



function getUser(userInfo) {
    return getUsers().then(users => {
        const user = users.find((user) => {
            if (user.name === userInfo.name && user.email === userInfo.email)
                return user;
            else throw new Error('Car not Found');
        });
    })
}



function signup(user) {
    return new Promise(resolve => {
        return getUsers().then(users => {
            users.push(user)
        })
        resolve();
    });
}


export default {
    checkLogIn,
    getUsers,
    getUser,
    signup

}


