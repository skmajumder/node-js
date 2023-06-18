'use strict';

const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, 'utf8', (err, data) => {
  console.log(`Breed: ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      if (err) return console.log(err.message);

      console.log(res.body.message);
      fs.writeFile('./dog-img.txt', res.body.message, 'utf-8', (err) => {
        if (err) return console.log(err.message);
        console.log(`${data} dog breed image save to file`);
      });
    });
});
