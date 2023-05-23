const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  /* useCreateIndex: true,
  useFindAndModify: false, */
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порте ${PORT}`);
});
