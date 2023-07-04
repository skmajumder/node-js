const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const app = express();

// * PORT Number
const PORT = process.env.PORT || 3000;

// * Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// * Read file (JSON)
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

// * Route Handeler
const rootRoute = async (req, res) => {
  res.status(200).json({
    status: 'success',
    error: false,
  });
};

const getAllTour = async (req, res) => {
  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
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

const getAllUsers = async (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const createUser = async (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const getUser = async (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const updateUser = async (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const deleteUser = async (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

// * Routes
app.get('/', rootRoute);

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAllTour).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
