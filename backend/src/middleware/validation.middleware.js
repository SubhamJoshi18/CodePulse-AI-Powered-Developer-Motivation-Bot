import { ValidationExceptions } from "../exceptions/index.js";
import { notifyCreateSchema } from "../validation/notfiy.validation.js";
import statusCode from 'http-status-codes'
import { createGithubaAccountSchema } from "../validations/octokit.validation.js";


const parseValidBody = async (req,res,next) => {
    try{
        const content = req.body
        const parseBody = await notifyCreateSchema.parseAsync(content)
        if(!parseBody){
            throw new ValidationExceptions(`Validation Failed: Validation Exception Due to invalid Content`,statusCode.BAD_REQUEST);
        }else{
            next()
        }
    }catch(err){
        next(err)
    }

}


const parseValidAccessToken = async (req,res,next) => {
    try{
        const content = req.body
        const parseBody = await createGithubaAccountSchema.parseAsync(content)
        if(!parseBody){
            throw new ValidationExceptions(`Validation Failed: Validation Exception Due to invalid Content`,statusCode.BAD_REQUEST);
        }else{
            next()
        }
    }catch(err){
        next(err)
    }

}

export {
    parseValidBody,
    parseValidAccessToken
}