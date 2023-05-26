const express = require('express');
const mongoose = require('mongoose');

const router = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '646e2b3907b8944b5c980a2a', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порте ${PORT}`);
});
