require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { celebrate, errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const { PORT, DB } = process.env;

mongoose.connect(DB);

app.use(
  cors({
    origin: 'http://localhost:3001',
    methods: 'GET, POST, PUT, DELETE, PATCH',
    allowedHeaders: 'Content-Type, Authorization',
    optionsSuccessStatus: 200,
  }),
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const router = require('./routes');
const auth = require('./middlewares/auth');
const errorsSender = require('./errors/errorsSender');
const NotFound = require('./errors/notFound');
const { login, createUser } = require('./controllers/users');
const { signUpScheme, signInScheme } = require('./joiSchemes');

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate(signInScheme), login);
app.post('/signup', celebrate(signUpScheme), createUser);
app.use('/users', auth, router.users);
app.use('/cards', auth, router.cards);

app.use('*', auth, (req, res, next) => {
  next(new NotFound('Such path does not exist!'));
});

app.use(errors());
app.use(errorsSender);
