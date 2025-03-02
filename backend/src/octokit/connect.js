import {Octokit} from '@octokit/rest'
import { getGenericEnvValue } from '../utils/env.utils.js'
import { getEnvValue } from '../config/env.config.js'


const octokit = new Octokit({
    auth :  getEnvValue('GITHUB_TOKEN')
})


export default octokit