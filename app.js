const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes');

const { validateSignUp, validateSignIn } = require('./middlewares/validate');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { handleError } = require('./middlewares/handleError');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);
app.use(helmet());

app.post('/signin', validateSignIn, login);
app.post('/signup', validateSignUp, createUser);

app.use(auth);

app.use(router);

app.use(errors());

app.use(handleError);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('Подключились к базе...');
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порте ${PORT}...`);
    });
  })
  .catch((err) => {
    console.log('Ошибка подключения к базе: ', err);
  });
