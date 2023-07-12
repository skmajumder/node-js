const dotenv = require('dotenv');
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

const { Schema } = mongoose;

dotenv.config({ path: './config.env' });
const app = require('./app');

// * DB connection
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    // useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successfull'));

const tourSchema = new Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The Part Camper',
  price: 997,
});

testTour
  .save()
  .then((doc) => console.log(doc))
  .catch((err) => console.log('Error 💥:', err));

// * PORT Number
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
