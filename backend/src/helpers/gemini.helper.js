import {GoogleGenerativeAI} from '@google/generative-ai'
import { geminiConfig } from '../config/gemini.config.js'
import { questionPrompt, quotePrompt } from '../constants/gemini.constant.js'

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
        const model = genAiClient.getGenerativeModel({model : modelName},geminiConfig)
        return model 
    }



    async generateQuoteBasedOnLanguage(language,mood) {
        const modelName = "gemini-1.5-flash"
        const model = await this.getGeminiModel(modelName)
        const result = await model.generateContent(quotePrompt(language,mood))
        const response = result.response
        return {
            data : response.text()
        }
    }


}

export default GemimiHelper