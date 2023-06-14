import mongoose, { Error } from 'mongoose';
import { Response, NextFunction, Request } from 'express';
import { CustomErrorType } from './types';
import {
  ERROR_CODE_ACCESS,
  ERROR_CODE_DATA,
  ERROR_CODE_LOGIN,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_REGISTER,
  ERROR_CODE_SERVER_DEFAULT,
} from './constants';

export default class CustomError extends Error {
  type: string;

  constructor(message: string, type: string) {
    super(message);
    this.type = type;
  }
}

export const handlerError = (
  err: CustomErrorType,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof mongoose.Error.CastError) {
    return res.status(ERROR_CODE_DATA).send({ message: err.message });
  }
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(ERROR_CODE_DATA).send({ message: err.message });
  }
  if (err instanceof Error && err.type === 'dataError') {
    return res.status(ERROR_CODE_NOT_FOUND).send({ message: err.message });
  }
  if (err instanceof Error && err.type === 'AuthorizationError') {
    return res.status(ERROR_CODE_LOGIN).send({ message: err.message });
  }
  if (err instanceof Error && err.type === 'ErrorAccess') {
    return res.status(ERROR_CODE_ACCESS).send({ message: err.message });
  }
  if (err instanceof Error && err.type === 'RegisterError') {
    return res.status(ERROR_CODE_REGISTER).send({ message: err.message });
  }
  return res.status(ERROR_CODE_SERVER_DEFAULT).send({ message: err.name });
};
