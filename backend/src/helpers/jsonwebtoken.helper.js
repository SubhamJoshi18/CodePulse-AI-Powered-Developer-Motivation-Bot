import { getGenericEnvValue } from "../utils/env.utils.js"
import jwt from 'jsonwebtoken'

async function createAccessToken(payload){

    const options = {
        issuer : 'Shubham Raj Joshi',
        expiresIn : '1h'
    }

    const secretKey = getGenericEnvValue('JWT_ACCESS_TOKEN_SECRET')

    return new Promise((resolve,reject) => {

        jwt.sign(payload,secretKey,options,(err,token) => {
            if(err) {
                throw new Error(`Error while creating the Token`)
            }
            resolve(token)
        })

    })
}


async function verifyAccessToken (token) {
    const secretKey = getGenericEnvValue('JWT_ACCESS_TOKEN_SECRET')

    return new Promise((resolve,reject) => {
        jwt.verify(token,secretKey,(err,decodedToken) => {
            if(err){
                throw err
            }
            resolve(decodedToken)
        })
    })
}

export {
    createAccessToken,
    verifyAccessToken
}