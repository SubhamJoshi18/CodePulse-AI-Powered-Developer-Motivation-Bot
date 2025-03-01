import { ValidationExceptions } from "../exceptions/index.js";
import { ValidationExceptions } from "../exceptions/index.js";
import GemimiHelper from "../helpers/gemini.helper.js"
import { codeLogger } from "../libs/common.logger.js";
import { codeLogger } from "../libs/common.logger.js";
import { getGenericEnvValue } from "../utils/env.utils.js"
import NotifyRepo from '../repository/notify.repo.js'
import statusCode from 'http-status-codes'
import StreakRepo from "../repository/streak.repo.js";
import NotifyRepo from '../repository/notify.repo.js'
import statusCode from 'http-status-codes'
import StreakRepo from "../repository/streak.repo.js";


class NotifyServices  {

    constructor(){
        this.model = new GemimiHelper(getGenericEnvValue('GOOGLE_API_KEY'))
    }

    async notifyUserService(payload){
        const { language, stopDate , topics } = payload

        const isValidTopics = Array.isArray(topics) && topics.length > 0;

        if(!isValidTopics) 
            {
                codeLogger.error(`The Topics is Empty , Topic Length : ${topics.length}`)
                throw new ValidationExceptions(`There is no Topics At Least Enter one Topics`,statusCode.BAD_REQUEST);
            }


            const validDate = new Date(statusCode) < new Date()

            if (validDate) throw new ValidationExceptions(`The Stop Date should be Higher Than Current Date`,statusCode.BAD_GATEWAY);
            
            const notifyPayload = {
                language,
                stopDate : new Date(stopDate),
                topics
            }

            const savedNotify = await NotifyRepo.createNewNotify(notifyPayload)
            
            const savedNotifyId = savedNotify._id
            
            const streakPayload = {
                notifyId : savedNotifyId,
                preferedLanguage : language
            }
            const savedStreak = await StreakRepo.createAssociatedNotifyWithStreak(streakPayload)
            
            const streakId = savedStreak._id
            
            const updatedNotify = await NotifyRepo.updateStreakId(savedNotifyId,streakId)
            
            const validUpdatedNotify = updatedNotify.acknowledged && updatedNotify.matchedCount > 0;

            return validUpdatedNotify ? 
            {
                message : `The User Will get Notify Every ${new Date(stopDate).toISOString()}`
            } :
            {
                message : `Error Notifying User Every ${new Date(stopDate).toISOString()}`
            }
    }
}



export default new NotifyServices()