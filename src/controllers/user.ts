import { CustomRequest } from "../services/types";
import { NextFunction, Response } from "express";
import User from "../models/user";
import { NotFoundError, DataError, LoginError } from "../services/utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

export const getCurrentUsers = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const _id = req.user;
  return User.findOne({ _id: _id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Пользователь не найден");
      }
      res.send(user);
    })
    .catch((err) => next(err));
};

export const createUser = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { name, about, avatar, password, email } = req.body;
  if (!password || !email) {
    throw new DataError("Переданы некорректные данные");
  }
  return User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new DataError("Пользователь существует");
      }
    })
    .then(() => {
      bcrypt
        .hash(password, 10)
        .then((hash: string) =>
          User.create({
            email,
            password: hash,
            name,
            about,
            avatar,
          })
        )
        .then((user) => {
          const { _id, email, name, about, avatar } = user;
          res.status(201).send({
            _id,
            email,
            name,
            about,
            avatar,
          });
        });
    })
    .catch(next);
};

export const login = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { password, email } = req.body;
  if (!password || !email) {
    throw new LoginError("Переданы некорректные данные");
  }
  let _id: ObjectId;
  return User.findOne({ email })
    .then((user) => {
      return User.findOne({ email }).then((user) => {
        if (!user) {
          throw new LoginError("Неправильные почта или пароль");
        }
        _id = new ObjectId(user._id);
        return bcrypt.compare(password, user.password);
      });
    })
    .then((matched) => {
      if (!matched) {
        throw new LoginError("Неправильные почта или пароль");
      }
      res.send({
        token: jwt.sign({ _id: _id }, "super-strong-secret", {
          expiresIn: "7d",
        }),
      });
    })
    .catch(next);
};

export const getUser = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const _id = req.params.userId;
  return User.findOne({ _id: _id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Пользователь не найден");
      }
      res.send(user);
    })
    .catch((err) => next(err));
};

export const updateAvatar = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { avatar } = req.body;
  if (!avatar) {
    throw new DataError("Переданы некорректные данные");
  }
  let _id;
  if (req.user) {
    _id = req.user._id;
  }
  User.findByIdAndUpdate(
    _id,
    { avatar: avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Пользователь не найден");
      }
      res.send(user);
    })
    .catch(next);
};

export const updateAbout = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { about } = req.body;
  if (!about) {
    throw new DataError("Переданы некорректные данные");
  }
  let _id;
  if (req.user) {
    _id = req.user._id;
  }
  User.findByIdAndUpdate(
    _id,
    { about: about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Пользователь не найден");
      }
      res.send(user);
    })
    .catch(next);
};
