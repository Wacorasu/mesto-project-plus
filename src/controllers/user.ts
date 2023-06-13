import { NextFunction, Response } from 'express';
import { CustomRequest } from '../services/types';
import User from '../models/user';
import NotFoundError from '../services/utils';
import { SERVER_CODE_CREATE_OK } from '../services/constants';

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
  User.create({ name, about, avatar })
    .then((user) => res.status(SERVER_CODE_CREATE_OK).send(user))
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
  const _id = req.user?._id;
  User.findByIdAndUpdate(_id, { about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send(user);
    })
    .catch(next);
};
