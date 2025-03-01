import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { getGenericEnvValue } from '../utils/env.utils.js';
import { codeLogger } from '../libs/common.logger.js';
dotenv.config()


class EmailHelper {


    async sendEmail(to,subject,text,html) {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 456,
            secure: true,
            auth: {
              user:  getGenericEnvValue('APP_EMAIL'),
              pass:  getGenericEnvValue('APP_PASSWORD')
            },
          });
        
          let methodOptions = {
            from: {
              name: "Code Pluse",
              address: getGenericEnvValue('APP_EMAIL'),
            },
            to,
            subject,
            text,
            html,
          };
        
          return transporter
            .sendMail(methodOptions)
            .then((res) => {
             codeLogger.info(res)
            })
            .catch((err) => {
              codeLogger.error(err)
            });
    }

}


export default EmailHelper