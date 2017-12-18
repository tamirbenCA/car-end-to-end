console.log('Starting up!');

var colors = require('colors');
var RandService = require('./RandService');

RandService.sayHi();

var h = RandService.getHello();
var rand = RandService.getRand();

console.log(h.green); // outputs green text 
console.log('popo'.green); // outputs green text 

console.log('i like cake and pies'.underline.red) // outputs red underlined text 
console.log('inverse the color'.inverse); // inverses the color 
console.log('OMG Rainbows!'.rainbow); // rainbow 


