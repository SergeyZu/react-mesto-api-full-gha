/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');

const { errorHandler } = require('./src/middlewares/errorHandler');
const router = require('./src/routes');
const { requestLogger, errorLogger } = require('./src/middlewares/logger');
const limiter = require('./src/utils/limiter');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());

app.use(helmet());

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('Успешное подключение к базе данных');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Ошибка подключения к базе данных ${err.name}`);
  });

app.use(express.json());

app.use(requestLogger);

app.use(limiter);

// app.get('/crash-test', (req, res, next) => {
//   setTimeout(() => {
//     next(new Error('Сервер сейчас упадёт'));
//   }, 0);
// });

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);
