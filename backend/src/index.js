import express from 'express'
import MainApp from "./server.js";
import cron from 'node-cron'
import { getGenericEnvValue } from "./utils/env.utils.js";
import CronHelper from './cron/cron.helper.js';
import { codeLogger } from './libs/common.logger.js';
import { getEnvValue } from './config/env.config.js';

const port = getEnvValue('PORT') ?? 3000
const app = express()
const cronInstance = new CronHelper()


// cron.schedule('0 19 * * *', async () => {
//     try {
//         codeLogger.info('Running cron job every day 7 PM  to send Questions');
//       await cronInstance.cronHandlerForQuestions();
//     } catch (error) {
//       codeLogger.error('Cron job failed:', error);
//     }
//   });




cron.schedule('0 19 * * *',async () => {
    try{
        codeLogger.info(`Running Cron Job Every Day 7 PM to send Daily Motivational Quotes`)
        await cronInstance.cronHandlerForQuotes()
    }catch(err){
        codeLogger.error(`Cron Job Failed`,err)
    }
})


  

const startServer = async () => {
    const serverInstance = await MainApp.getServerInstance(port,app)
    await serverInstance.startServer()
}

(async () => {await startServer()})()

