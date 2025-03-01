import AdminService from "../../services/admin.service.js"
import statusCode from 'http-status-codes'
import { sendApiResponse } from "../../utils/response.utils.js"


class AdminQuoteController {


        async bulkInsertQuotes (req,res,next) {
            try{

                const {content} = req.body
                const apiResponse = await AdminService.bulkInsertQuotesService(content)
                const contentMessage = `${apiResponse.length} Motivational Quotes have been Inserted`
                sendApiResponse(res,apiResponse,contentMessage,statusCode.ACCEPTED);
            }catch(err){
                next(err)
            }
        }

}


export default new AdminQuoteController()