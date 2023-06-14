import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TOKEN_CODE } from '../services/constants';
import AuthorizationError from '../services/error-classes/authorization-error';

interface SessionRequest extends Request {
    user?: string | JwtPayload;
}

const extractBearerToken = (header: string) => header.replace('Bearer ', '');

export default (req: SessionRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError('Необходима авторизация');
  }

  const token = extractBearerToken(authorization);

  let payload;

  try {
    payload = jwt.verify(token, TOKEN_CODE);
  } catch (err) {
    throw new AuthorizationError('Необходима авторизация');
  }

  req.user = payload;

  next();
};
