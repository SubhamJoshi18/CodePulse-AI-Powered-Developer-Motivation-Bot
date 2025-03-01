import AuthGithub from "../database/schemas/auth.schema.js";




class GithubRepo {

    async addGithubAuth(payload) {
        const savedResult = await AuthGithub.create({
            ...payload
        })
        return savedResult
    }

    async searchAccessToken(githubAccessToken) {
        const savedResult = await AuthGithub.findOne(
            {
                githubAccessToken : githubAccessToken
            }
        )
        return savedResult
    }



    async searchOctoId(octoId) {
        const savedResult = await AuthGithub.findOne(
            {
                userOctoId : octoId
            }
        )
        return savedResult
    }
}

export default new GithubRepo()
