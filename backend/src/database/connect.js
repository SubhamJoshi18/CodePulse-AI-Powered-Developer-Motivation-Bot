import mongoose from 'mongoose'
import statusCode from 'http-status-codes'
import { codeLogger } from '../libs/common.logger.js'  
import { DatabaseExceptions } from '../exceptions/index.js'
import { getGenericEnvValue } from '../utils/env.utils.js'


async function connectToAtlasMongo(){
    let retryCount = 4
    let retryStatus = true

    while(retryCount > 0 && retryStatus) {
        try{
            const mongoUrl = getGenericEnvValue('MONGO_URL')
            const mongoClient = await mongoose.connect(mongoUrl)
            return mongoClient
        }catch(err){
            const expiresConnect = retryCount.toString().startsWith('0')
            if(expiresConnect) throw new DatabaseExceptions(`Maximum Database Connection Pool Exceeded`,statusCode.BAD_GATEWAY);
            codeLogger.error(`Error while connecting to the Database Atlas, Decrementing the Retry Count ${retryCount}`)
            retryCount -= 1
            await connectToAtlasMongo()
        }
    }
}

export {
    connectToAtlasMongo
}