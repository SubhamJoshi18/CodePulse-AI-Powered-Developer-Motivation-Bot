import QuestionService from "../../services/question.service.js"
import { sendApiResponse } from "../../utils/response.utils.js"
import statusCode from 'http-status-codes'


class QuestionController {

    async getUserQuestion(req,res,next) {
        try{
            const userOctoId = req.user.userOctoId
            const apiResponse = await QuestionService.getQuestionService(userOctoId)
            const contentMessage = `The Question Have been Fetches For ${new Date().toDateString()}`
            sendApiResponse(res,apiResponse,contentMessage,statusCode.ACCEPTED);
        }catch(err){
            next(err)
        }
    }

}

export default new QuestionController