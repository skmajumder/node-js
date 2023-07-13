const Tour = require('../models/tourModel');

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
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

exports.getTour = async (req, res) => {
  // const tourID = req.params.id * 1;
  // const tour = tours.find((t) => t.id === tourID);
  // res.status(200).json({
  //   status: 'success',
  //   error: false,
  //   data: {
  //     tour,
  //   },
  // });
};

exports.createTour = async (req, res) => {
  res.status(201).json({
    status: 'success',
    error: false,
    // data: {
    //   tour: newTour,
    // },
  });
};

exports.updateTour = async (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

exports.deleteTour = async (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
