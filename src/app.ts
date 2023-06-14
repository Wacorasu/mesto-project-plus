import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { errors, celebrate, Joi } from 'celebrate';
import { requestLogger, errorLogger } from './middlewares/logger';
import routerUser from './routes/user';
import routerCard from './routes/card';
import CustomError, { handlerError } from './services/utils';
import { login, createUser } from './controllers/user';
import auth from './middlewares/auth';

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(requestLogger);

app.post(
  '/login',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }),
  }),
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().alphanum().min(2).max(30),
      about: Joi.string().alphanum().min(2).max(200),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }),
  }),
  createUser,
);
app.use(auth);
app.use('/users', routerUser);
app.use('/cards', routerCard);

app.use(errorLogger);

app.use(errors());

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new CustomError('Маршрут не найден', 'dataError');
  next(error);
});

app.use(handlerError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
