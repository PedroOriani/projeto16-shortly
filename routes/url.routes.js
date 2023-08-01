import { Router } from "express";
import { deleteUrl, getUrlById, openUrl, shortingUrl } from "../controllers/url.controllers.js";

const urlRouter = Router();

urlRouter.post('/urls/shorten', shortingUrl);
urlRouter.get('/urls/:id', getUrlById);
urlRouter.get('/urls/open/:shortUrl', openUrl);
urlRouter.delete('/urls/:id', deleteUrl);

export default urlRouter;