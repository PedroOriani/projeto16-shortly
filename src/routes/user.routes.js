import { Router } from "express";
import { getInfos, getRanking } from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.get('/users/me', getInfos);
userRouter.get('/ranking', getRanking);

export default userRouter;