import {Router} from 'express'
import GithubController from '../controller/github/github.controller.js'

const githubRouter = Router()

githubRouter.post('/github/login',GithubController.loginAsGithub)

export default githubRouter