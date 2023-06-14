import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getCurrentUsers,
  getUser,
  updateAvatar,
  updateAbout,
} from '../controllers/user';

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

userRouter.patch('/me/avatar', updateAvatar);

userRouter.patch('/me', updateAbout);

export default userRouter;
