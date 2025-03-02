import { Router } from "express";
import { verifyOctoToken } from "../middleware/auth.middleware.js";
import QuestionController from "../controller/questions/question.controller.js";

const questionRouter = Router()

questionRouter.get('/questions',verifyOctoToken,QuestionController.getUserQuestion)


export default questionRouter