import Quotes from "../database/schemas/quotes.schema.js"


class QuoteRepo {

    async getQuoteBasedOnMood(payload) {
        const {mood, language} = payload
        const result = await Quotes.aggregate(
            [
               {
                $match: {
                    "type.programmingLanguage": language, 
                    mood: mood 
                  }
               },
               {
                $project : {
                    _id : 0,
                    quoteMessage : 1,
                    type : 1,
                    mood : 1
                }
               },
               {
                $limit : 1
               }
            ]
        )
        return result
    }

    async getAllQuotes(){
        const allQuotes = await Quotes.find({})
        return allQuotes
    }
  
}

export default new QuoteRepo()