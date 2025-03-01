import httpStatusCode from 'http-status-codes'



function sendApiResponse(res,data,message,statusCode){
    return res.status(httpStatusCode.ACCEPTED).json({
        data,
        message,
        statusCode,
        error : false
    })
}

export {
    sendApiResponse
}