import mongoose from "mongoose";


const authSchema = new mongoose.Schema({

    githubAccessToken : {
        type : String,
        required : [true,'Github Access Token is Required']
    },


    userOctoId : {
        type : String,
        required : [true,'User Octo Id is Required']
    },

    githubUsername : {
        type : String,
        required : [true,'Github Username is Required']
    },

    githubId : {
        type : Number,
        required : [true,'Github Id is Required']
    },

    avatarUrl : {
        type : String,
        required : [true,'Avatar Url is Required']
    },

    userRole : {
        type : String,
        enum : ['admin','user'],
        default : 'user'
    },

    userMood : {
        type : String,
        default : 'Idle'
    }


})

const AuthGithub = mongoose.model('AuthGithub',authSchema)
export default AuthGithub