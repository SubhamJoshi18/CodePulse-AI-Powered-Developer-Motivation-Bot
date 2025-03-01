import mongoose from "mongoose";

const quotesSchema = new mongoose.Schema({

    quoteMessage : {
        type : String,
        required : [true,'Quote is Required']
    },

    type : {
        programmingLanguage : {
            type : String,
            required : [true,'Programming Language is Required']
        }
    },

    mood : {
        type : String,
        enum : ['Happy','Sad','Stress','Motivated','Idle'],
        default : 'Idle'
    }

})

const Quotes = mongoose.model('Quote',quotesSchema)
export default Quotes