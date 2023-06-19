'use strict';

const fs = require('fs');
const superagent = require('superagent');

// fs.readFile(`${__dirname}/dog.txt`, 'utf8', (err, data) => {
//   console.log(`Breed: ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) return console.log(err.message);

//       console.log(res.body.message);
//       fs.writeFile('./dog-img.txt', res.body.message, 'utf-8', (err) => {
//         if (err) return console.log(err.message);
//         console.log(`${data} dog breed image save to file`);
//       });
//     });
// });

// fs.readFile(`${__dirname}/dog.txt`, 'utf8', (err, data) => {
//   console.log(`Breed: ${data}`);
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body.message);
//       fs.writeFile('./dog-img.txt', res.body.message, 'utf-8', (err) => {
//         if (err) return console.log(err.message);
//         console.log(`${data} dog breed image save to file`);
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) reject('Could not find the file');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, 'utf-8', (err, data) => {
      if (err) reject(err.message);
      resolve('File written successfully');
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);
    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    await writeFilePro('./dog-img.txt', res.body.message);
    console.log(`Random dog image save to file`);
  } catch (err) {
    console.log(err);
  }
};

getDogPic();
/*
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro('./dog-img.txt', res.body.message);
  })
  .then(() => {
    console.log(`Random dog image save to file`);
  })
  .catch((err) => {
    console.log(err);
  });
*/
