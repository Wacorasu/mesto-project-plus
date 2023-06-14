import { NextFunction, Response } from 'express';
import { CustomRequest } from '../services/types';
import Card from '../models/card';
import { SERVER_CODE_CREATE_OK } from '../services/constants';
import NotFoundError from '../services/error-classes/not-found-error';
import AccessError from '../services/error-classes/access-error';

export const getCards = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => Card.find({})
  .populate(['owner', 'likes'])
  .then((card) => res.send(card))
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new NotFoundError('Карточка не найдена'));
    }
    next(err);
  });

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
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Карточка не найдена'));
      }
      if (err.name === 'ValidationError') {
        next(new NotFoundError('Данные не верны'));
      }
      next(err);
    });
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
        throw new NotFoundError('Карточка не найдена');
      }
      if (`${card.owner}` !== req.user?._id) {
        throw new AccessError('Нет прав');
      }
      return Card.findByIdAndRemove(_id)
        .populate(['owner', 'likes'])
        .then((removedCard) => {
          res.send(removedCard);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Карточка не найдена'));
      }
      next(err);
    });
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
        throw new NotFoundError('Карточка не найдена');
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Карточка не найдена'));
      }
      next(err);
    });
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
        throw new NotFoundError('Карточка не найдена');
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Карточка не найдена'));
      }
      next(err);
    });
};
