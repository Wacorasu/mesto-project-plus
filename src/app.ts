import express, {
  NextFunction, Request, Response,
} from 'express';
import mongoose from 'mongoose';
import routerUser from './routes/user';
import routerCard from './routes/card';
import { CustomError, CustomRequest } from './services/types';
import { ERROR_CODE_DATA, ERROR_CODE_NOT_FOUND, ERROR_CODE_SERVER_DEFAULT } from './services/constants';

const { PORT = 3000 } = process.env;
const app = express();

app.use((req: CustomRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: '64885d3b098bb59bfdb7a106',
  };
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', routerUser);
app.use('/cards', routerCard);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('Маршрут не найден');
  error.name = 'NotFound';
  next(error);
});

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof mongoose.Error.CastError) {
    return res.status(ERROR_CODE_DATA).send({ message: err.message });
  }
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(ERROR_CODE_DATA).send({ message: err.message });
  }
  if (err instanceof Error && err.name === 'NotFound') {
    return res.status(ERROR_CODE_NOT_FOUND).send({ message: err.message });
  }
  if (err instanceof Error && err.type === 'DataNotFound') {
    return res.status(ERROR_CODE_NOT_FOUND).send({ message: err.message });
  }
  return res.status(ERROR_CODE_SERVER_DEFAULT).send({ message: err.name });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
