import GithubService from "../../services/github.service.js"
import { sendApiResponse } from "../../utils/response.utils.js"
import statusCode from 'http-status-codes'

class GithubController {

    async loginAsGithub(req,res,next) {
        try{
            const content = req.body
            const apiResponse = await GithubService.loginAsGithubService(content)
            const contentMessage = `You are Logged in the Daily Tracker App`
            sendApiResponse(res,apiResponse,contentMessage,statusCode.ACCEPTED);
        }catch(err){
            next(err)
        }
    }


    

}


export default new GithubController()
