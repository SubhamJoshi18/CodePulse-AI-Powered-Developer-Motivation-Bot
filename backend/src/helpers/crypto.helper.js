import crypto from 'node:crypto'
import { algorithm } from '../constants/algorithm.constant.js'


const encrypt = (token,key,iv) => {

    const cipher = crypto.createCipheriv(algorithm,key,iv)
    let encrypted = cipher.update(text, 'utf8', 'hex'); 
    encrypted += cipher.final('utf-8')
    return {
        iv : iv.toString('hex'),
        encryptedData : encrypted
    }

}


const decrypt = (encryptedText, ivHex) => {
    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(ivHex, 'hex'));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}


export {
    encrypt,
    decrypt
}