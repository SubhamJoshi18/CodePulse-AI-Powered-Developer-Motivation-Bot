import { Octokit } from "@octokit/rest"
import { createAccessToken } from "../helpers/jsonwebtoken.helper.js"
import crypto from 'node:crypto'
import { getGenericEnvValue } from "../utils/env.utils.js"
import GithubRepo from "../repository/github.repo.js"

class GithubService {

    
    async loginAsGithubService(payload){
        const { githubAccessToken } = payload

        const octokit = new Octokit({
            auth : githubAccessToken
        })

        const existsAccessToken = await GithubRepo.searchAccessToken(githubAccessToken)
        
        if(existsAccessToken)  {
       
            const payloadAuth = {
                githubAccessToken : existsAccessToken.githubAccessToken,
                githubId : existsAccessToken.githubId,
                avatarUrl : existsAccessToken.avatarUrl,
                githubUsername : existsAccessToken.githubUsername,
                userOctoId : existsAccessToken.userOctoId,
                userRole : existsAccessToken.userRole,
                userMood : existsAccessToken.userMood
            }

            const accessToken = await createAccessToken(payloadAuth)

            return {
                octoId : existsAccessToken.userOctoId,
                accessToken
            }



        }


        const { data } = await octokit.request('GET /user')
        
        const { id : githubId ,avatar_url : avatarUrl, login : githubUsername} = data

        const payloadAuth = {
            githubAccessToken,
            githubId,
            avatarUrl,
            githubUsername,
            userRole : 'user',
            userMood : 'Idle'
        }

        const githubHashKey = crypto.createHmac('sha256', getGenericEnvValue('CRYPTO_SECRET_KEY')).update(githubAccessToken).digest('hex');

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