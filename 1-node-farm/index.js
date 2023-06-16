"use strict";

// * Root modules
const fileSystem = require("fs");
const http = require("http");
const url = require("url");

// * Custom modules
const replaceTemplate = require("./modules/replaceTemplate");

// ** File System */
/**
 * * synchronous
 */

// try {
//   const textIn = fileSystem.readFileSync("./txt/input.txt", "utf-8");
// } catch (error) {
//   console.log(`File read error: ${error}`);
// }

// const textOutput = `This is what we know about the avocado: ${textIn}.\n Create Date: ${Date.now()}`;
// fileSystem.writeFileSync("./txt/output.txt", textOutput, "utf-8");
// console.log("file written");

/**
 * * asynchronous way
 */

// fileSystem.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) {
//     console.error(`Error reading file: ${err.message}`);
//     return;
//   }
//   fileSystem.readFile(`./txt/${data1}.txt`, "utf-8", (err2, data2) => {
//     if (err2) {
//       console.error(`Error reading file: ${err2.message}`);
//       return;
//     }
//     fileSystem.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       if (err) {
//         console.error(`Error reading file: ${err.message}`);
//         return;
//       }
//       fileSystem.writeFile(
//         "./txt/final.txt",
//         `${data2}\n${data3}`,
//         "utf-8",
//         (err) => {
//           console.log("Your file was successfully written");
//         }
//       );
//     });
//   });
// });
// console.log("Reading file...");

// * File read (File would only read onetime)
const tempOverview = fileSystem.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);

const tempCard = fileSystem.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

const tempProduct = fileSystem.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fileSystem.readFileSync(
  `${__dirname}/dev-data/data.json`,
  "utf-8"
);

const dataObj = JSON.parse(data);

// ** Server */
const PORT = process.env.PORT || 8000;
const localhost = "127.0.0.1";

// * Creating server
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // * overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const cardHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardHtml);
    res.end(output);

    // * product page
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // * API
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);
  }
  // * Not Found
  else {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });
    res.end(
      JSON.stringify({
        error: true,
        status: 404,
        message: `${pathname} Page Not Found`,
      })
    );
  }
});

// * Listening
server.listen(PORT, localhost, () => {
  console.log(`Listening request on Server PORT: ${PORT}`);
});
