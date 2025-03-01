import { codeLogger } from "../../libs/common.logger.js"
import statusCode from 'http-status-codes'
import NotifyService from "../../services/notify.service.js";
import { sendApiResponse } from "../../utils/response.utils.js";


class NotifyController {

    async notifyUser(req,res,next){
        try{
            const content = req.body
            const userOctoId = req.user.userOctoId
            const apiResponse = await NotifyService.notifyUserService(content,userOctoId)
            const contentMessage = `The User Have been Notify Daily`
            sendApiResponse(res,apiResponse,contentMessage,statusCode.ACCEPTED);
        }catch(err){
            codeLogger.error(`Error: An Error is Occured on the Notify User Controller`,statusCode.BAD_REQUEST);
            next(err)
        }
    }

}


export default new NotifyController()