import { Router } from "express";
import { verifyOctoToken } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/role.middleware.js";
import AdminQuestionController from "../controller/admin/admin.question.controller.js";
import AdminQuotesController from "../controller/admin/admin.quotes.controller.js";

const adminRouter = Router()

adminRouter.post('/admin/bulk/question',verifyOctoToken,isAdmin,AdminQuestionController.bulkInsertQuestion)
adminRouter.post('/admin/bulk/quotes',verifyOctoToken,isAdmin,AdminQuotesController.bulkInsertQuotes)


export default adminRouter