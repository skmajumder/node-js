'use strict';

const fs = require('fs');
const server = require('http').createServer();

const PORT = process.env.PORT || 8000;
const localhost = '127.0.0.1';

server.on('request', (req, res) => {
  // ? Solution 1. But not GOOD, because file is big for reading
  //   fs.readFile('./test-file.txt', 'utf-8', (err, data) => {
  //     if (err) return console.log(err);
  //     res.end(data);
  //   });

  // ? Solution 2: Streams. Better the solution 1, but there is a problem "browser out of memory", "backpressure"

  // const readable = fs.createReadStream('./test-file.txt');
  // readable.on('data', (chunk) => {
  //   res.write(chunk);
  // });
  // readable.on('end', () => {
  //   res.end();
  // });
  // readable.on('error', (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end('Error: File not found');
  // });

  //   * Solution 3
  const readable = fs.createReadStream('./test-file.txt');
  readable.pipe(res);
});

// * Server listening
server.listen(PORT, localhost, () => {
  console.log(`Server listening on port: ${PORT}`);
});
