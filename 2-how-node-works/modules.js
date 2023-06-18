'use strict';

// console.log(arguments);
// console.log(require('module').wrapper);

// const C = require('./test-module-1');
// const calc1 = new C();
// console.log(calc1.add(10, 20));

const calc2 = require('./test-module-2');

console.log(calc2.add(10, 20));
