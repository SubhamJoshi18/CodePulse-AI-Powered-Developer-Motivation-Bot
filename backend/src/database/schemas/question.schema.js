import mongoose from "mongoose";


const questionSchema = new mongoose.Schema(
    {
        question : {
            type : String,
            required : [true,'Question is Required']
        },

        programmingLanguages : {
            type : String,
            required : [true,'Programming Language is Required']
        },

        questionSolvedCount  : {
            type : Number,
            default : 0
        },

        answer : {
            type : String,
            default : ''
        },

        questionSolvedBy : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'AuthGithub'
        }],
        
        topic : {
            type : String,
            required : [true,'Topic is Required']
        }
    },
    {
        timestamps : true
    }
)

const Question = mongoose.model('Question',questionSchema)
export default Question