import mongoose from "mongoose";

const notifySchema = new mongoose.Schema(
    {
        language : {
            type : String,
            required : [true,'Programming Language is Required'],
        },

        stopDate: {
            type : Date,
            required : [true,'Stop Date is Required']
        },

        topics : [{
            type : String,
        }],

        questionCountPerData : {
            type : Number,
            required : [true,'Question Count is Required']
        },

        time : {
            type : Date,
            required : [true,'Time is Required'],
        },
        streak : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Streak'
        },

        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'AuthGithub',
            required : [true,'User is required']
        },
        
        dayCount : {
            type : Number,
            default : 0
        }
    },
    {
        timestamps : true
    }
)

const Notify = mongoose.model('Notify',notifySchema)
export default Notify