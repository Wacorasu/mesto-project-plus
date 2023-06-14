import { Response, NextFunction, Request } from 'express';
import { CustomErrorType } from './types';

export default function handlerError(
  err: CustomErrorType,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
}
