import { NextFunction, Response } from 'express';
import { CustomRequest } from '../services/types';
import User from '../models/user';
import { NotFoundError, DataError } from '../services/utils';

export const getUsers = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => User.find({})
  .then((user) => res.send(user))
  .catch(next);

export const createUser = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const { name, about, avatar } = req.body;
  if (!name || !about || !avatar) {
    throw new DataError('Переданы некорректные данные');
  }
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
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
        throw new NotFoundError('Пользователь не найден');
      }
      res.send(user);
    })
    .catch((err) => next(err));
};

export const updateAvatar = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const { avatar } = req.body;
  if (!avatar) {
    throw new DataError('Переданы некорректные данные');
  }
  let _id;
  if (req.user) {
    _id = req.user._id;
  }
  User.findByIdAndUpdate(
    _id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
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
  if (!about) {
    throw new DataError('Переданы некорректные данные');
  }
  let _id;
  if (req.user) {
    _id = req.user._id;
  }
  User.findByIdAndUpdate(
    _id,
    { about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send(user);
    })
    .catch(next);
};
