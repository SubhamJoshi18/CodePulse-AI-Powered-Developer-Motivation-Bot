import express from 'express'
import morgan from 'morgan'


const serverMiddleware = async (expressApp) => {

    expressApp.use(express.json())
    expressApp.use(express.urlencoded({extended:true}))
    expressApp.use(morgan('dev'))

}

export {
    serverMiddleware
}