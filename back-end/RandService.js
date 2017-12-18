var lastRand = null;

function func() {

}

module.exports.getHello = ()=> {
    return 'Hello!';
}

module.exports.sayHi = ()=> {
    console.log('Hi!');
}

exports.getRand = () => {
    lastRand = Math.random()
    return lastRand;
}


// exports = ()=>{}

