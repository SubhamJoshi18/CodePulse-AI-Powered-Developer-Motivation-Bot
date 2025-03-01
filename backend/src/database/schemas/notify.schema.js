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

        streak : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Streak'
        }
    },
    {
        timestamps : true
    }
)

const Notify = mongoose.model('Notify',notifySchema)
export default Notify