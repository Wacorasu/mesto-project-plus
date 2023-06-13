import { Error } from 'mongoose';
import { ERROR_CODE_NOT_FOUND } from './constants';

export default class NotFoundError extends Error {
  statusCode: number;

  type: string;

  constructor(message: string) {
    super(message);
    this.statusCode = ERROR_CODE_NOT_FOUND;
    this.type = 'DataNotFound';
  }
}
