import mongoose from "mongoose";

const streakSchema = new mongoose.Schema(
    {
        preferedLanguage : {
            type : String,
            required : [true,'Prefered Language is Required']
        },

        streakCount : {
            type : Number,
            default : 0
        },

        solveQuestion : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Question'
        }],

        lastSolvedAt: {
            type: Date,
            default : new Date()
        },

    },

    {
        timestamps : true
    }
)

const Streak = mongoose.model('Streak',streakSchema)
export default Streak