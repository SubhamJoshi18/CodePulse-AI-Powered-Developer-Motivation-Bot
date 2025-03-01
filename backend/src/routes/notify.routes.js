import { Router } from "express";
import NotifyController from '../controller/notify/notify.controller.js'
import { parseValidBody } from "../middleware/validation.middleware.js";

const notifyRouter = Router()

notifyRouter.post('/notify',parseValidBody,NotifyController.notifyUser)

export default notifyRouter