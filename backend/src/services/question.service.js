import { DatabaseExceptions } from "../exceptions/index.js"
import GithubRepo from "../repository/github.repo.js"
import NotifyRepo from "../repository/notify.repo.js"
import statusCode from 'http-status-codes'
import QuestionRepo from "../repository/question.repo.js"
import GemimiHelper from "../helpers/gemini.helper.js"
import { getGenericEnvValue } from "../utils/env.utils.js"
import { getEnvValue } from "../config/env.config.js"


class QuestionService {

    constructor(){
        this.geminiHelper = new GemimiHelper(getEnvValue('GOOGLE_API_KEY'))
    }


    async getQuestionService(userOctoId){

        const githubDoc = await GithubRepo.searchOctoId(userOctoId)

        if(!githubDoc) throw new DatabaseExceptions(`The Github Credential Does not Exists on the System`,statusCode.BAD_GATEWAY);

        const extractedOctId = githubDoc._id

        const userNotifyDocs = await NotifyRepo.getNotifyByUser(extractedOctId)

        if(!userNotifyDocs)  throw new DatabaseExceptions(`The User Notification Credential Does not Exists on the System`,statusCode.BAD_GATEWAY);

        const payload = {
            language : userNotifyDocs.language,
            topics : userNotifyDocs.topics,
            questionCount  : userNotifyDocs.questionCountPerData
        }


        const aggregationResult = await QuestionRepo.fetchQuestionDay(payload)

        const dayCountDoc = userNotifyDocs.dayCount
        const dayLeft  = userNotifyDocs.stopDate
        const currentDate = new Date();
        const differenceInMilliseconds = dayLeft - currentDate;
        const millisecondsInADay = 1000 * 60 * 60 * 24;
        const finalDate = Math.ceil(differenceInMilliseconds / millisecondsInADay);

        const updatedResult = finalDate.toString() === dayCountDoc.toString()  ? null : await NotifyRepo.updateNotifyDayCount(userNotifyDocs._id,dayCountDoc + 1)

        if(!updatedResult) throw new DatabaseExceptions(`The Date is already surpass`,statusCode.BAD_REQUEST);
        
        return {
            questions : Array.from(new Set(aggregationResult))
        }
    }


    async getQuestionGenAiService(octoId){

        const githubDoc = await GithubRepo.searchOctoId(octoId)

        if(!githubDoc) throw new DatabaseExceptions(`The Github Credential Does not Exists on the System`,statusCode.BAD_GATEWAY);

        const extractedOctId = githubDoc._id

        const userNotifyDocs = await NotifyRepo.getNotifyByUser(extractedOctId)

        if(!userNotifyDocs)  throw new DatabaseExceptions(`The User Notification Credential Does not Exists on the System`,statusCode.BAD_GATEWAY);

        const payload = {
            language : userNotifyDocs.language,
            topics : userNotifyDocs.topics,
            questionCount  : userNotifyDocs.questionCountPerData
        }

        const {language , topics , questionCount } = payload

        const responseGenAi = await this.geminiHelper.generateQuestionBasedOnLanguage(language,topics)
        
        return responseGenAi
    }   



}

export default new QuestionService()