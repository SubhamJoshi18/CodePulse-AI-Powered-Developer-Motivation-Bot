import {GoogleGenerativeAI} from '@google/generative-ai'

class GemimiHelper {

    constructor(apikey){
        this.apikey = apikey
    }

    async connectGemini(){
        const genaAi = new GoogleGenerativeAI(this.apikey)
        return genaAi
    }


    async getGeminiModel(modelName){
        const genAiClient = await this.connectGemini()
        const model = genAiClient.getGenerativeModel({model : modelName})
        return model 
    }
}

export default GemimiHelper