import { Router } from "express";
import { getInfos, getRanking } from "../controllers/user.controllers.js";
import { validateAuth } from "../middlewares/validateAuth.js";

const userRouter = Router();

userRouter.get('/users/me', validateAuth, getInfos);
userRouter.get('/ranking', getRanking);

export default userRouter;