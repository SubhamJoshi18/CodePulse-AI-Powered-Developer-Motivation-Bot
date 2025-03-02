import { Octokit } from "@octokit/rest"
import { createAccessToken } from "../helpers/jsonwebtoken.helper.js"
import crypto from 'node:crypto'
import { getGenericEnvValue } from "../utils/env.utils.js"
import GithubRepo from "../repository/github.repo.js"
import { getEnvValue } from "../config/env.config.js"

class GithubService {

    
    async loginAsGithubService(payload){
        
        const { githubAccessToken } = payload

        const octokit = new Octokit({
            auth : githubAccessToken
        })

        const existsAccessToken = await GithubRepo.searchAccessToken(githubAccessToken)

        const getAllUser = await GithubRepo.getAllAuthUser()

        
        if(existsAccessToken)  {
       
            const payloadAuth = {
                githubAccessToken : existsAccessToken.githubAccessToken,
                githubId : existsAccessToken.githubId,
                avatarUrl : existsAccessToken.avatarUrl,
                githubUsername : existsAccessToken.githubUsername,
                userOctoId : existsAccessToken.userOctoId,
                userRole : existsAccessToken.userRole,
                userMood : existsAccessToken.userMood,
                email : existsAccessToken.email
            }

            const accessToken = await createAccessToken(payloadAuth)

            return {
                octoId : existsAccessToken.userOctoId,
                accessToken
            }



        }

        const { data } = await octokit.request('GET /user')

        const emailContent = await octokit.request('GET /user/emails')

        const filteredData = emailContent.data.filter((item) => item.verified && item.primary)

        const githubEmail = filteredData.map((data) => data.email).pop()

        const { id : githubId ,avatar_url : avatarUrl, login : githubUsername} = data

        const isEmptyDoc = Array.isArray(getAllUser) && getAllUser.length === 0

        const payloadAuth = {
            githubAccessToken,
            githubId,
            avatarUrl,
            githubUsername,
            userRole :  isEmptyDoc ? 'admin' : 'user',
            userMood : 'Idle',
            email : githubEmail
        }

        const githubHashKey = crypto.createHmac('sha256', getEnvValue('CRYPTO_SECRET_KEY')).update(githubAccessToken).digest('hex');

        const octoIdInPayload = 'userOctoId' in payloadAuth

        if(!octoIdInPayload) payloadAuth['userOctoId'] = githubHashKey;

        const savedResult = await GithubRepo.addGithubAuth(payloadAuth)
        
        const accessToken = await createAccessToken(payloadAuth)

        return {
            octoId : githubHashKey,
            accessToken
        }
    }
}

export default new GithubService()