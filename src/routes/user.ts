import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getCurrentUsers,
  getUser,
  updateAvatar,
  updateAbout,
} from '../controllers/user';
import { REGEX } from '../services/constants';

const userRouter = Router();

userRouter.get('/me', getCurrentUsers);

userRouter.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex().required(),
    }),
  }),
  getUser,
);

userRouter.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().pattern(REGEX).required(),
    }),
  }),
  updateAvatar,
);

userRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().alphanum().required().min(2)
        .max(30),
      about: Joi.string().required().min(2).max(200),
    }),
  }),
  updateAbout,
);

export default userRouter;
