import { Router } from "express";
import { signIn, signUp } from "../controllers/session.controllers.js";
import { validateSchema } from '../middlewares/validateSchema.js';
import { signUpSchema } from '../schemas/signUp.schema.js'
import { signInSchema } from '../schemas/singIn.schema.js'

const sessionRouter = Router();

sessionRouter.post('/signup', validateSchema(signUpSchema), signUp);
sessionRouter.post('/signin', validateSchema(signInSchema), signIn);

export default sessionRouter;