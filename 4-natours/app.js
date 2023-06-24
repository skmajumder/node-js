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

const rootRoute = async (req, res) => {
  res.status(200).json({
    status: 'success',
    error: false,
  });
};

const getAllTour = async (req, res) => {
  res.status(200).json({
    status: 'success',
    error: false,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = async (req, res) => {
  const tourID = req.params.id * 1;
  const tour = tours.find((tour) => tour.id === tourID);

  // if (tourID > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID! Tour not found',
    });
  }

  res.status(200).json({
    status: 'success',
    error: false,
    data: {
      tour,
    },
  });
};

const createTour = async (req, res) => {
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
};

const updateTour = async (req, res) => {
  const tourID = Number(req.params.id);
  if (tourID > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID! Tour not found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

const deleteTour = async (req, res) => {
  const tourID = Number(req.params.id);
  if (tourID > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID! Tour not found',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

// * Routes
app.get('/', rootRoute);

// app.get('/api/v1/tours', getAllTour);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTour).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
