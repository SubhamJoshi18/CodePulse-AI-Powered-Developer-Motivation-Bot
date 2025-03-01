import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { getGenericEnvValue } from '../utils/env.utils.js';
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
              name: "Pet Aid",
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
             petAidLogger.info(res)
            })
            .catch((err) => {
              petAidLogger.error(err)
            });
    }

}


export default EmailHelper