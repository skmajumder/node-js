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

    const res1Pro = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res2Pro = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res3Pro = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    await writeFilePro('./dog-img.txt', imgs.join('\n'));
    console.log(`Random dog image save to file`);
  } catch (err) {
    console.log(err.message);
    throw err;
  }
  return '2: Ready';
};

// * IIFE
(async () => {
  try {
    console.log('1: Will get dog picture');
    const x = await getDogPic();
    console.log(x);
    console.log('3: Done getting dog picture');
  } catch (error) {
    console.log(error.message);
  }
})();

/*
console.log('1: Will get dog picture');
getDogPic()
  .then((result) => {
    console.log(result);
    console.log('3: Done getting dog picture');
  })
  .catch((err) => {
    console.log(err);
  });

  */

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
