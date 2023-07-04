const app = require('./app');

// * PORT Number
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
