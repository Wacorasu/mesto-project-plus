import { ObjectId } from 'mongodb';
import { NextFunction, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../services/types';
import User from '../models/user';
import CustomError from '../services/utils';
import {
  SERVER_CODE_CREATE_OK,
  TOKEN_CODE,
  TOKEN_LIFETIME,
} from '../services/constants';

export const getCurrentUsers = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const _id = req.user?._id;
  return User.findOne({ _id })
    .then((user) => {
      if (!user) {
        throw new CustomError('Пользователь не найден', 'dataError');
      }
      res.send(user);
    })
    .catch(next);
};

export const createUser = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const {
    name, about, avatar, password, email,
  } = req.body;
  return User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new CustomError(
          'Пользователь c таким email существует',
          'RegisterError',
        );
      }
    })
    .then(() => bcrypt
      .hash(password, 10)
      .then((hash: string) => User.create({
        email,
        password: hash,
        name,
        about,
        avatar,
      }))
      .then((user) => res.status(SERVER_CODE_CREATE_OK).send(user)))
    .catch(next);
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
        throw new CustomError('Неправильные почта или пароль', 'AuthorizationError');
      }
      _id = user._id;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        throw new CustomError('Неправильные почта или пароль', 'AuthorizationError');
      }
      res.send({
        token: jwt.sign({ _id }, TOKEN_CODE, {
          expiresIn: TOKEN_LIFETIME,
        }),
      });
    })
    .catch(next);
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
        throw new CustomError('Пользователь не найден', 'dataError');
      }
      res.send(user);
    })
    .catch(next);
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
        throw new CustomError('Пользователь не найден', 'dataError');
      }
      res.send(user);
    })
    .catch(next);
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
        throw new CustomError('Пользователь не найден', 'dataError');
      }
      res.send(user);
    })
    .catch(next);
};
