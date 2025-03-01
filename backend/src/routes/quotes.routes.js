import { Router } from "express";
import { verifyOctoToken } from "../middleware/auth.middleware.js";
import QuoteController from "../controller/quotes/quote.controller.js";

const quoteRouter = Router()

quoteRouter.get('/quotes',verifyOctoToken,QuoteController.getMoodFroomUser)

export default quoteRouter