import { ObjectId } from 'mongodb';
import { NextFunction, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../services/types';
import User from '../models/user';
import {
  SERVER_CODE_CREATE_OK,
  TOKEN_CODE,
  TOKEN_LIFETIME,
} from '../services/constants';
import NotFoundError from '../services/error-classes/not-found-error';
import AuthorizationError from '../services/error-classes/authorization-error';
import RegisterError from '../services/error-classes/register-error';

export const getCurrentUsers = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const _id = req.user?._id;
  return User.findOne({ _id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Пользователь не найден'));
      }
      next(err);
    });
};

export const createUser = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const {
    name, about, avatar, password, email,
  } = req.body;
  return bcrypt
    .hash(password, 10)
    .then((hash: string) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))

    .then((user) => res.status(SERVER_CODE_CREATE_OK).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      if (err && err.message.startsWith('E11000')) {
        next(new RegisterError('Пользователь уже существует'));
      }
      if (err.name === 'CastError') {
        next(new NotFoundError('Пользователь не найден'));
      }
      if (err.name === 'CastError') {
        next(new NotFoundError('Пользователь не найден'));
      }
      if (err.name === 'ValidationError') {
        next(new NotFoundError('Данные не верны'));
      }
      next(err);
    });
};

export const login = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const { password, email } = req.body;
  let _id: ObjectId;
  return User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthorizationError('Неправильные почта или пароль');
      }
      _id = user._id;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        throw new AuthorizationError('Неправильные почта или пароль');
      }
      res.send({
        token: jwt.sign({ _id }, TOKEN_CODE, {
          expiresIn: TOKEN_LIFETIME,
        }),
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Пользователь не найден'));
      }
      if (err.name === 'ValidationError') {
        next(new NotFoundError('Данные не верны'));
      }
      next(err);
    });
};

export const getUser = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const _id = req.params.userId;
  return User.findOne({ _id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Пользователь не найден'));
      }
      next(err);
    });
};

export const updateAvatar = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const { avatar } = req.body;
  const _id = req.user?._id;
  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Пользователь не найден'));
      }
      next(err);
    });
};

export const updateAbout = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const { about } = req.body;
  const _id = req.user?._id;
  User.findByIdAndUpdate(_id, { about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Пользователь не найден'));
      }
      next(err);
    });
};
