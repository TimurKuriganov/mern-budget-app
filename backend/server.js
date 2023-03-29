require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const budgetRoutes = require('./routes/budget');
const ApiErrorClass = require('./error/ApiError');
const errorHandler = require('./middleware/errorMiddleware')

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use('/api/budgets', budgetRoutes);
app.use('/api/user', userRoutes);

app.all('*', (req, res, next) => {
  next(new ApiErrorClass(404, 'Page not found'));
});

app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log('Connected to DB and listening on port ' + process.env.PORT || 5000);
    })
  })
  .catch((err) => {
    console.log('DB connection ERROR: ', err);
  })
