const express = require('express');
const app = express();

// * PORT Number
const PORT = process.env.PORT || 3000;

// * Routes

app.get('/', async (req, res) => {
  res
    .status(200)
    .json({ message: 'Hello from the server side', app: 'Natours' });
});

app.post('/', async (req, res) => {
  res.send('You can post to this endpoint...');
});

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
