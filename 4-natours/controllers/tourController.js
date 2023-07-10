const fs = require('fs');

// * Read file (JSON)
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);

// * Check the ID is valid of not
exports.checkID = async (req, res, next, val) => {
  const tourID = Number(val);
  console.log(`Tour id is: ${tourID}`);

  if (tourID > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID! Tour not found',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.price || !req.body.name) {
    return res.status(400).json({
      status: 'failed',
      message: 'Bad Request! Tour not created, missing tour price or name',
    });
  }
  next();
};

exports.getAllTour = async (req, res) => {
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

exports.getTour = async (req, res) => {
  const tourID = req.params.id * 1;
  const tour = tours.find((tour) => tour.id === tourID);

  // if (tourID > tours.length) {
  // if (!tour) {
  //   return res.status(404).json({
  //     status: 'failed',
  //     message: 'Invalid ID! Tour not found',
  //   });
  // }

  res.status(200).json({
    status: 'success',
    error: false,
    data: {
      tour,
    },
  });
};

exports.createTour = async (req, res) => {
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

exports.updateTour = async (req, res) => {
  // const tourID = Number(req.params.id);
  // if (tourID > tours.length) {
  //   return res.status(404).json({
  //     status: 'failed',
  //     message: 'Invalid ID! Tour not found',
  //   });
  // }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

exports.deleteTour = async (req, res) => {
  // const tourID = Number(req.params.id);
  // if (tourID > tours.length) {
  //   return res.status(404).json({
  //     status: 'failed',
  //     message: 'Invalid ID! Tour not found',
  //   });
  // }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
