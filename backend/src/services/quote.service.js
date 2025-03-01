import { DatabaseExceptions } from "../exceptions/index.js"
import { codeLogger } from "../libs/common.logger.js"
import GithubRepo from "../repository/github.repo.js"
import statusCode from 'http-status-codes'
import { checkMood } from "../utils/mood.utils.js"
import NotifyRepo from "../repository/notify.repo.js"
import QuoteRepo from "../repository/quote.repo.js"


class QuotesService {

    
    async storeMoodService(mood,userData){

        let moodState = 'Idle'

        const {userOctoId} = userData

        const userDoc = await GithubRepo.searchOctoId(userOctoId)

        if(!userDoc) throw new DatabaseExceptions(`The User Octokit is Expired or Does not Exists`,statusCode.BAD_REQUEST);

        const userCurrentMood =  userDoc.userMood.includes(mood) 

        if (userCurrentMood) {
            moodState = 'Previous'
        }else{
            moodState = 'New'
        }


        const isPreviousMood = typeof moodState === 'string' && moodState.includes("Previous")

        if(isPreviousMood) {

            codeLogger.info(`The User Mood is Previous Day Mood`)

            const moodStatus = checkMood(mood)

            if(typeof moodStatus === 'boolean' && !moodStatus) {

                codeLogger.info(`The User Mood is not Stable`)


                const notifyDoc = await NotifyRepo.getNotifyByUser(userDoc._id)

                const userProgrammingLanguage = {
                    type : notifyDoc.language
                }

                const payload = {
                    mood,
                    language : userProgrammingLanguage['type']
                }

                const quoteResult = await QuoteRepo.getQuoteBasedOnMood(payload)

                return {
                    quote : quoteResult
                }
            }


            codeLogger.info(`The User Mood is Alright`)
            const allQuotes = await QuoteRepo.getAllQuotes()
            const filteredHappyQuotes = allQuotes.filter((data) => data.mood === 'Happy')
            return filteredHappyQuotes[Math.random() * filteredHappyQuotes.length - 1]
        
        }



        codeLogger.info(`The User Insert a new Mood`)


        const notifyDoc = await NotifyRepo.getNotifyByUser(userDoc._id)

        const userProgrammingLanguage = {
            type : notifyDoc.language
        }

        const payload = {
            mood,
            language : userProgrammingLanguage['type']
        }

        const quoteResult = await QuoteRepo.getQuoteBasedOnMood(payload)

        return {
            newQuote : quoteResult
        }
    }

}

export default new QuotesService()