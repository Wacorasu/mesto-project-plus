import { CustomRequest } from "../services/types";
import { NextFunction, Response } from "express";
import Card from "../models/card";
import { NotFoundError, DataError } from "../services/utils";
import { ObjectId } from 'mongodb';


export const getCards = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  return Card.find({})
    .populate(['owner', 'likes'])
    .then((card) => res.send(card))
    .catch(next);
};

export const createCard = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { name, link } = req.body;
  const date = new Date();
  const likes: string[] = [];
  let owner;
  if (req.user) {
    owner = new ObjectId(req.user._id);
  }
  if (!name || !link) {
    throw new DataError("Переданы некорректные данные");
  }
  Card.create({ name, link, date, likes, owner })
    .then((card) => res.send(card))
    .catch(next);
};

export const deleteCard = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const _id = req.params.cardId;
  return Card.findByIdAndRemove(_id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Карточка не найдена");
      }
      res.send(card);
    })
    .catch((err) => next(err));
};

export const likeCard = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const _id = req.params.cardId;
  Card.findByIdAndUpdate(
    _id,
    { $addToSet: { likes: new ObjectId(_id) } },
    { new: true, runValidators: true }
  )
    .populate(['owner', "likes"])
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Карточка не найдена");
      }
      res.send(card);
    })
    .catch(next);
};

export const dislikeCard = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const _id = req.params.cardId;
  Card.findByIdAndUpdate(
    _id,
    { $pull: { likes: new ObjectId(_id) } },
    { new: true, runValidators: true }
  )
    .populate(['owner', "likes"])
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Карточка не найдена");
      }
      res.send(card);
    })
    .catch(next);
};
