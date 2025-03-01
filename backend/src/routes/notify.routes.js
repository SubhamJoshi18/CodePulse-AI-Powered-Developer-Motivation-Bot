import { Router } from "express";
import NotifyController from '../controller/notify/notify.controller.js'
import { parseValidBody } from "../middleware/validation.middleware.js";
import { verifyOctoToken } from "../middleware/auth.middleware.js";

const notifyRouter = Router()

notifyRouter.post('/notify',verifyOctoToken,parseValidBody,NotifyController.notifyUser)

export default notifyRouter