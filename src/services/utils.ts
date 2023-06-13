import { Error } from 'mongoose';
import { ERROR_CODE_NOT_FOUND, ERROR_CODE_DATA } from './constants';

export class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = ERROR_CODE_NOT_FOUND;
  }
}

export class DataError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = ERROR_CODE_DATA;
  }
}
