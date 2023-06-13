import { Router } from 'express';
import {
  getUsers,
  createUser,
  getUser,
  updateAvatar,
  updateAbout,
} from '../controllers/user';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.post('/', createUser);

userRouter.get('/:userId', getUser);

userRouter.patch('/me/avatar', updateAvatar);

userRouter.patch('/me', updateAbout);

export default userRouter;
