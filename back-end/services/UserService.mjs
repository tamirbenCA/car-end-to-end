const FILE_NAME = 'users.json';
import fs from 'fs';
var loggedinUser = null; 

function checkLogIn(userInfo) { 
    return new Promise((resolve, reject) => {
        if (getUser(userInfo)) {
            loggedinUser = true;
            resolve({loggedinUser});
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
        resolve('User added successfuly');
    });
}

function signout(user) {
    return new Promise(resolve => {
        loggedinUser = false;
        resolve(loggedinUser);
    });
}

function updateUser(user) {
    return getUsers().then(users => {
        users.splice(_getUserIdx(users, user.id), 1, user)
        return _saveUsers(users).then(_ => user)
    })
}

function _saveCars(users) {
    return new Promise((resolve, reject) => {
        var strUsers = JSON.stringify(users)
        fs.writeFile(FILE_NAME, strUsers, 'utf8', (err, data) => {
            if (err) reject(err)
            else resolve()
        })
    });
}

function _getUserIdx(users, userId) {
    return users.findIndex(user => user.id === userId)
}

export default {
    checkLogIn,
    getUsers,
    getUser,
    signup

}


