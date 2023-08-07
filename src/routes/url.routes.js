import { Router } from "express";
import { deleteUrl, getUrlById, openUrl, shortingUrl } from "../controllers/url.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateAuth } from "../middlewares/validateAuth.js";
import { urlSchema } from '../schemas/url.schema.js'

const urlRouter = Router();

urlRouter.post('/urls/shorten', validateAuth ,validateSchema(urlSchema), shortingUrl);
urlRouter.get('/urls/:id', getUrlById);
urlRouter.get('/urls/open/:shortUrl', openUrl);
urlRouter.delete('/urls/:id', validateAuth, deleteUrl);

export default urlRouter;