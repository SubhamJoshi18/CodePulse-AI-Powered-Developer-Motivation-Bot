import { ValidationExceptions } from "../exceptions/index.js"
import statusCode from 'http-status-codes'
import { verifyAccessToken } from "../helpers/jsonwebtoken.helper.js";


async function verifyOctoToken(req,res,next) {

    try{

        let token = req.headers.authorization ?? req.headers['Authorization']

        if(!token) {
            throw new ValidationExceptions(`The Token is missing`,statusCode.BAD_REQUEST);
        }
    
        token = token.startsWith('B') ? token.split(' ')[1] : token

        const decodedPayload = await verifyAccessToken(token)

        const validPayload = Object.entries(decodedPayload).length > 0

        if(!validPayload) throw new ValidationExceptions(`The Token is Empty`,statusCode.BAD_REQUEST);

        req.user = decodedPayload
        next()
    }catch(err){
        next(err)
    }



}

export {
    verifyOctoToken
}