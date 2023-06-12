import { Router } from "express";
import {
  getUsers,
  createUser,
  getUser,
  updateAvatar,
  updateAbout,
} from "../controllers/user";

const router = Router();

router.get("/users", getUsers);

router.post("/users", createUser);

router.get("/users/:userId", getUser);

router.patch("/users/me/avatar", updateAvatar);

router.patch("/users/me", updateAbout);

export default router;
