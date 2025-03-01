import express from 'express'
import MainApp from "./server.js";
import cron from 'node-cron'
import { getGenericEnvValue } from "./utils/env.utils.js";
import CronHelper from './cron/cron.helper.js';
import { codeLogger } from './libs/common.logger.js';

const port = getGenericEnvValue('PORT') ?? 3000
const app = express()
const cronInstance = new CronHelper()


cron.schedule('0 19 * * *', async () => {
    try {
        codeLogger.info('Running cron job every day 7 PM  to send Questions');
      await cronInstance.cronHandler();
    } catch (error) {
      codeLogger.error('Cron job failed:', error);
    }
  });
  

const startServer = async () => {
    const serverInstance = await MainApp.getServerInstance(port,app)
    await serverInstance.startServer()
}

(async () => {await startServer()})()

