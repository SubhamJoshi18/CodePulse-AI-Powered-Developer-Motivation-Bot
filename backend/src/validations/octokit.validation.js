import {z} from 'zod'


const createGithubaAccountSchema = z.object({
    githubAccessToken : z.string(),
})

export {
    createGithubaAccountSchema
}