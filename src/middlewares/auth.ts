import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { LoginError } from '../services/utils';

interface SessionRequest extends Request {
    user?: string | JwtPayload;
}



const extractBearerToken = (header: string) => {
  return header.replace('Bearer ', '');
};

export default (req: SessionRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new LoginError("Необходима авторизация");
  }

  const token = extractBearerToken(authorization);

  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    throw new LoginError("Необходима авторизация");
  }

  req.user = payload;

  next();
};