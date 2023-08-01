import { Router } from "express";
import { signIn, signUp } from "../controllers/session.controllers.js";


const sessionRouter = Router();

sessionRouter.post('/signup', signUp);
sessionRouter.post('/signin', signIn);

export default sessionRouter;