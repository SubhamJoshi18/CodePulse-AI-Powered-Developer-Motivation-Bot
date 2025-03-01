
import GithubRepo from "../repository/github.repo.js"
import NotifyRepo from "../repository/notify.repo.js"
import EmailHelper from '../helpers/smtp.helper.js'
import QuestionRepo from "../repository/question.repo.js"
import { generateQuestionHtmlContent, generateQuoteEmailContent } from "../constants/email.constant.js"
import { EXPRESS_APP_URL } from "../constants/module.constant.js"
import { codeLogger } from "../libs/common.logger.js"
import QuoteRepo from "../repository/quote.repo.js"
 

class CronHelper {


    constructor(){
        this.emailHelper = new EmailHelper()
    }

  


    async cronHandlerForQuestions() {

        const allUsers = await GithubRepo.getAllAuthUser()

        const allAuthOctoIds = allUsers.map((data) =>  { return {id : data._id, email : data.email}})
  
        for(const item of allAuthOctoIds) {

                const userId = item.id
                

                const notifyDocuments = await NotifyRepo.getNotifyByUser(userId._id)

                if(!notifyDocuments) continue;

                const payload = {
                    language : notifyDocuments.language,
                    topics : notifyDocuments.topics,
                    questionCount  : notifyDocuments.questionCountPerData
                }

                const aggregationResult = await QuestionRepo.fetchQuestionDay(payload)
                
                for (const data of aggregationResult) {
                    const {question, answer , programmingLanguages,topic, _id} = data
                    const solveUrl = `${EXPRESS_APP_URL}/question/solve/${_id}`
                    const generateHtmlContent = generateQuestionHtmlContent(question,answer,programmingLanguages,topic,solveUrl)
                    const subject = `Daily Question Puzzle`
                    const text = `Please Solve The Below Questions`
                    await this.emailHelper.sendEmail(item.email,subject,text,generateHtmlContent)

                    codeLogger.info(`Sended The Question For The ${item.email} at ${new Date().toDateString()}`)
            
                }

        }

    }


    async cronHandlerForQuotes() {
        const allUsers  = await GithubRepo.getAllAuthUser()
        const allAuthEmailIds = allUsers.map((item) => {return {id : item._id,email : item.email, mood : item.userMood}})

        if(Array.isArray(allAuthEmailIds) && allAuthEmailIds.length > 0) {

            for(const user of allAuthEmailIds) {

                const userId = user.id

                const userMood = user.mood

                const userEmail = user.email

                const notifyDocuments = await NotifyRepo.getNotifyByUser(userId._id)

                if(!notifyDocuments) continue;

                const userProgrammingLanguage = {
                    type : notifyDocuments.language
                }


                const payload = {
                    mood : userMood,
                    language : userProgrammingLanguage['type']
                }

                const quoteResult = (await QuoteRepo.getQuoteBasedOnMood(payload)).pop()

                const { quoteMessage , type , mood } = quoteResult

                const generatedHtmlContent = generateQuoteEmailContent(quoteMessage,payload['language'],mood)
                const subject = `Daily Quote of the Day`
                const text = `Quote is Based on ${type.programmingLanguage}`
                await this.emailHelper.sendEmail(userEmail,subject,text,generatedHtmlContent)

                codeLogger.info(`Daily Quotes Have Been Sended to the ${userEmail}`)
            }

        }
    }


}


export default CronHelper