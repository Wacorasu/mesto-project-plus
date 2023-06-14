import { NextFunction, Response } from 'express';
import { CustomRequest } from '../services/types';
import Card from '../models/card';
import CustomError from '../services/utils';
import { SERVER_CODE_CREATE_OK } from '../services/constants';

export const getCards = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => Card.find({})
  .populate(['owner', 'likes'])
  .then((card) => res.send(card))
  .catch(next);

export const createCard = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const { name, link } = req.body;
  const owner = req.user?._id;
  let _id;
  Card.create({
    name,
    link,
    owner,
  })
    .then((createdCard) => {
      _id = createdCard._id;
      return Card.findById(_id)
        .populate(['owner', 'likes'])
        .then((card) => res.status(SERVER_CODE_CREATE_OK).send(card));
    })
    .catch(next);
};

export const deleteCard = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const _id = req.params.cardId;
  Card.findById(_id)
    .then((card) => {
      if (!card) {
        throw new CustomError('Карточка не найдена', 'dataError');
      }
      if (`${card.owner}` !== req.user?._id) {
        throw new CustomError('Нет прав', 'ErrorAccess');
      }
      return Card.findByIdAndRemove(_id)
        .populate(['owner', 'likes'])
        .then((removedCard) => {
          res.send(removedCard);
        });
    })
    .catch(next);
};

export const likeCard = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const _id = req.params.cardId;
  Card.findByIdAndUpdate(
    _id,
    { $addToSet: { likes: req.user?._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        throw new CustomError('Карточка не найдена', 'dataError');
      }
      res.send(card);
    })
    .catch(next);
};

export const dislikeCard = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const _id = req.params.cardId;
  Card.findByIdAndUpdate(
    _id,
    { $pull: { likes: req.user?._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        throw new CustomError('Карточка не найдена', 'dataError');
      }
      res.send(card);
    })
    .catch(next);
};
