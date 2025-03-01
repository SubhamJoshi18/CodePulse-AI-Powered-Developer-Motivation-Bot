import QuoteService from "../../services/quote.service.js"
import { sendApiResponse } from "../../utils/response.utils.js"
import statusCode from 'http-status-codes'


class QuoteController {
    async getMoodFroomUser(req,res,next){
        try{
            const mood = req.query.mood
            const userDetails = req.user
            const apiResponse = await QuoteService.storeMoodService(mood,userDetails)
            const messageContent = `Extracting the Motivational Quotes Based on Mood`
            sendApiResponse(res,apiResponse,messageContent,statusCode.ACCEPTED);
        }catch(err){
            next(err)
        }
    }
}

export default new QuoteController()