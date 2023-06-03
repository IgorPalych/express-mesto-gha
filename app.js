const express = require('express');
const mongoose = require('mongoose');

const router = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('Подключились к базе...');
  })
  .catch((err) => {
    console.log('Ошибка подключения к базе: ', err);
  });

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '646e2b3907b8944b5c980a2a',
  };
  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порте ${PORT}...`);
});
