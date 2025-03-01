import Question from "../database/schemas/question.schema.js";
import Quotes from "../database/schemas/quotes.schema.js";
import { DatabaseExceptions } from "../exceptions/index.js"
import AdminRepo from "../repository/admin.repo.js"
import statusCode from 'http-status-codes'

class AdminService {


    async bulkInsertQuestionService(content){
        if(Array.isArray(content) && content.length === 0) throw new DatabaseExceptions(`The Content is Empty`,statusCode.BAD_REQUEST);
        const bulkResult = await AdminRepo.bulkInsert(Question,content)
        return bulkResult

    }

    async bulkInsertQuotesService(content) {
        if(Array.isArray(content) && content.length === 0) throw new DatabaseExceptions(`The Content is Empty`,statusCode.BAD_REQUEST);
        const bulkResult = await AdminRepo.bulkInsert(Quotes,content)
        return bulkResult
    }

}


export default new AdminService()