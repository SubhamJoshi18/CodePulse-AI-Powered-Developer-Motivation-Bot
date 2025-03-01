
import GithubRepo from "../repository/github.repo.js"
import NotifyRepo from "../repository/notify.repo.js"
import EmailHelper from '../helpers/smtp.helper.js'
import QuestionRepo from "../repository/question.repo.js"
import { generateQuestionHtmlContent } from "../constants/email.constant.js"
import { EXPRESS_APP_URL } from "../constants/module.constant.js"
import { codeLogger } from "../libs/common.logger.js"
 

class CronHelper {


    constructor(){
        this.emailHelper = new EmailHelper()
    }

  


    async cronHandler() {

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


}


export default CronHelper