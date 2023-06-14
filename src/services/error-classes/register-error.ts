import { ERROR_CODE_REGISTER } from '../constants';

export default class RegisterError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = ERROR_CODE_REGISTER;
  }
}
