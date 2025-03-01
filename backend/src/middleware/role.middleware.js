import { ValidationExceptions } from "../exceptions/index.js";
import statusCode from 'http-status-codes'


async function isAdmin(req,res,next) {
    try{
        if('userRole' in req.user) {
            const userRole = req.user.userRole
            const validAdmin = userRole.includes('admin')
            if(validAdmin) {
                return next();
            }
        }
        throw new ValidationExceptions(`The Role is not Admin, Access Denied`,statusCode.BAD_REQUEST);
    }catch(err){
        next(err)
    }
   
   
}

export {
    isAdmin
}