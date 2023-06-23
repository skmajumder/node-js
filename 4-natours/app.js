const fs = require('fs');
const express = require('express');
const app = express();

// * Middleware
app.use(express.json());

// * PORT Number
const PORT = process.env.PORT || 3000;

// * Read file (JSON)
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

// * Routes
app.get('/api/v1/tours', async (req, res) => {
  res.status(200).json({
    status: 'success',
    error: false,
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.post('/api/v1/tours', async (req, res) => {
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    'utf-8',
    (err) => {
      if (err) {
        return res.status(400).json({
          status: 'failed',
          error: true,
        });
      }
      res.status(201).json({
        status: 'success',
        error: false,
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
