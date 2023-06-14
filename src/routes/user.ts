import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getCurrentUsers,
  getUser,
  updateAvatar,
  updateAbout,
} from '../controllers/user';

const userRouter = Router();

userRouter.get(
  '/me',
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(true),
  }),
  getCurrentUsers,
);

userRouter.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().alphanum(),
    }),
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(true),
  }),
  getUser,
);

userRouter.patch(
  '/me/avatar',
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(true),
  }),
  updateAvatar,
);

userRouter.patch(
  '/me',
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(true),
  }),
  updateAbout,
);

export default userRouter;
