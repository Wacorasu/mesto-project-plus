import { ERROR_CODE_ACCESS } from '../constants';

export default class AccessError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = ERROR_CODE_ACCESS;
  }
}
