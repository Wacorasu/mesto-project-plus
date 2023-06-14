import { ERROR_CODE_LOGIN } from '../constants';

export default class AuthorizationError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = ERROR_CODE_LOGIN;
  }
}
