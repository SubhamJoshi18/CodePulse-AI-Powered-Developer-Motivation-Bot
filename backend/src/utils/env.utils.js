import dotenv from 'dotenv'
dotenv.config()


function checkKeyExists(key){
    if(process.env.hasOwnProperty(key) && process.env[key]) {
        return true
    }else{
        return false
    }
}

function getEnvValue (key) {
    return process.env[key]
}


function getGenericEnvValue (key) {
    const keyExists = checkKeyExists(key)
    return keyExists ? getEnvValue(key) : null
}



export {
    getGenericEnvValue
}