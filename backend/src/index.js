import express from 'express'
import MainApp from "./server.js";
import { getGenericEnvValue } from "./utils/env.utils.js";

const port = getGenericEnvValue('PORT') ?? 3000
const app = express()

const startServer = async () => {
    const serverInstance = await MainApp.getServerInstance(port,app)
    await serverInstance.startServer()
}

(async () => {await startServer()})()

