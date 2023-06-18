'use strict';

// console.log(arguments);
// console.log(require('module').wrapper);

// const C = require('./test-module-1');
// const calc1 = new C();
// console.log(calc1.add(10, 20));

// const calc2 = require('./test-module-2');
const { add, division, multiply, subtract } = require('./test-module-2');

console.log(add(10, 20));
console.log(division(10, 20));
console.log(multiply(10, 20));
console.log(subtract(10, 20));
