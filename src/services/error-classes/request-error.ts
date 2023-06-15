import { ERROR_CODE_DATA } from '../constants';

export default class RequestError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = ERROR_CODE_DATA;
  }
}
