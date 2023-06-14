import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import CustomError from '../services/utils';
import { TOKEN_CODE } from '../services/constants';

interface SessionRequest extends Request {
    user?: string | JwtPayload;
}

const extractBearerToken = (header: string) => header.replace('Bearer ', '');

export default (req: SessionRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new CustomError('Необходима авторизация', 'AuthorizationError');
  }

  const token = extractBearerToken(authorization);

  let payload;

  try {
    payload = jwt.verify(token, TOKEN_CODE);
  } catch (err) {
    throw new CustomError('Необходима авторизация', 'AuthorizationError');
  }

  req.user = payload;

  next();
};
