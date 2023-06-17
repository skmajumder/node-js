'use strict';

const EventEmitter = require('events');
const http = require('http');

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on('newSale', () => {
  console.log('There was a new sale');
});
myEmitter.on('newSale', () => {
  console.log('Customer name: Jonas');
});
myEmitter.on('newSale', (stock) => {
  console.log(`There are ${stock} items available in stock.`);
});

myEmitter.emit('newSale', 9);

// ***********************

// ** Server */
const PORT = process.env.PORT || 8000;
const localhost = '127.0.0.1';
const server = http.createServer();

server.on('request', (req, res) => {
  console.log('Request received');
  console.log(req.url)
  res.end('Request received');
});

server.on('request', (req, res) => {
  console.log('Another Request 🤪🤪');
});

server.on('close', () => {
  console.log('Server closed');
});

server.listen(PORT, localhost, () => {
  console.log('Waiting for requests.....');
});
