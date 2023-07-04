const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routers/tourRouters');
const userRouter = require('./routers/userRouters');

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

// * Route Handeler
const rootRoute = async (req, res) => {
  res.status(200).json({
    status: 'success',
    error: false,
  });
};

// * Routes
app.get('/', rootRoute);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
