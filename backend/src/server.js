import { codeLogger } from "./libs/common.logger.js"
import { serverRouter } from "./routes/server.routes.js"
import { serverMiddleware } from "./middleware/server.middleware.js"
import { connectToAtlasMongo } from "./database/connect.js"

class MainApp {

    static serverInstance = new Map()
    
    constructor(serverPort,expressApp) {
        this.serverPort = serverPort
        this.expressApp = expressApp
    }


    static async getServerInstance(serverPort,expressApp){
        if(!this.serverInstance.has(serverPort)) {
            this.serverInstance.set(serverPort,new MainApp(serverPort,expressApp))
        }
        return this.serverInstance.get(serverPort)
    }

     async startServer(){
        try{
            const {port , app}  = await this.getPortAndApp()
            await this.initalizeServer(app)
            connectToAtlasMongo().then((dbCon) => {
                codeLogger.info(`Database is Connected, Connection Name : ${dbCon.connection.name}`)
                app.listen(port,() => {
                    codeLogger.info(`Server is running on the ${port}`)
                })
            }).catch((err) => {
                throw err
            })
        }catch(err){
            codeLogger.error(`Error in starting the Express Server`,err)
            process.exit(0)
        }
    }


    async initalizeServer(expressApp){
        await serverMiddleware(expressApp)
        await serverRouter(expressApp) 
    } 


     async getPortAndApp(){
        return {
            port : this.serverPort,
            app : this.expressApp
        }
    }
    

}


export default MainApp