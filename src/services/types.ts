import { Request } from 'express';
import { Error } from 'mongoose';

export interface CustomRequest extends Request {
  user?: {
    _id: string;
  };
}

export interface CustomErrorType extends Error {
  statusCode?: number;
}
