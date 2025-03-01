import { Router } from "express";
import statusCode from 'http-status-codes'
import notifyRouter from "./notify.routes.js";
import githubRouter from "./github.routes.js";
import { globalErrorHandler } from "../middleware/error.middleware.js";


async function serverRouter(expressApp) {
    
    expressApp.use('/api',[notifyRouter,githubRouter])
    expressApp.use('*',(req,res) => {
        return res.status(statusCode.NOT_FOUND).json({
            message : `${req.originalUrl} Does not Exists on the System`
        })
    })
    expressApp.use(globalErrorHandler)
}


export {
    serverRouter
}