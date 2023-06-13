import { Router } from "express";
import {
  getCurrentUsers,
  getUser,
  updateAvatar,
  updateAbout,
} from "../controllers/user";

const router = Router();

router.get("/users/me", getCurrentUsers);

router.get("/users/:userId", getUser);

router.patch("/users/me/avatar", updateAvatar);

router.patch("/users/me", updateAbout);

export default router;
