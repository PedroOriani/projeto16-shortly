import { Router } from "express";
import userRouter from "./user.routes.js";
import sessionRouter from "./session.routes.js";
import urlRouter from "./url.routes.js";

const router = Router();

router.use(sessionRouter);
router.use(userRouter);
router.use(urlRouter);

export default router;