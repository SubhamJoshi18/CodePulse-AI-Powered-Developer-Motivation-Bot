import AdminService from "../../services/admin.service.js"
import statusCode from 'http-status-codes'
import { sendApiResponse } from "../../utils/response.utils.js"

class AdminQuestionController {


    async bulkInsertQuestion(req,res,next) {
        try{
            const { content } = req.body
            const apiResponse = await AdminService.bulkInsertQuestionService(content)
            const contentMessage = `${apiResponse.length} Question have been Inserted`
            sendApiResponse(res,apiResponse,contentMessage,statusCode.ACCEPTED);
        }catch(err){
            next(err)
        }



    }

}

export default new AdminQuestionController()