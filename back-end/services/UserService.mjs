const FILE_NAME = 'users.json';
import fs from 'fs';
var loggedinUser = null; 

function checkLogIn(userInfo) { 
    return new Promise((resolve, reject) => {
         getUser(userInfo)
        .then(user => {
            // console.log('row 9', user)
            resolve(user);
        } )
        // if (getUser(userInfo)) {
        //     loggedinUser = true;
        //     resolve({loggedinUser});
        // } 
        // else {
            // reject(error: 'Email/Password not valid')
            // });
        
    });
}

function getUsers() {
    return new Promise((resolve, reject) => {
        fs.readFile(FILE_NAME, 'utf8', (err, strUsers) => {
            if (err) {
                reject(err);
            } else {
                var users = JSON.parse(strUsers)
                // console.log('getusers:', users)
                resolve(users)
            }
        })
    });
}



function getUser(userInfo) {
    return getUsers().then(users => {
        let validUser = users.find(user => {
            if (user.email === userInfo.email && user.password === userInfo.password) {
                return user;
            }
        });
        return Promise.resolve(validUser)
    })
}



function signup(user) {
    return new Promise(resolve => {
        return getUsers().then(users => {
            user.id = _getNextId(users);
            user.isAdmin = false;
            user.favCarIds = [];
            users.push(user)
            _saveUsers(users).then(_ => {
                resolve('User added successfuly');
            })
        })
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

function _saveUsers(users) {
    return new Promise((resolve, reject) => {
        var strUsers = JSON.stringify(users)
        fs.writeFile(FILE_NAME, strUsers, 'utf8', (err, data) => {
            if (err) reject(err)
            else resolve()
        })
    });
}

function _getNextId(users) {
    var maxId = users.reduce((acc, user) => {
        return (user.id > acc) ? user.id : acc
    }, 0)
    return maxId + 1;
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


