import {Octokit} from '@octokit/rest'
import { getGenericEnvValue } from '../utils/env.utils.js'


const octokit = new Octokit({
    auth :  getGenericEnvValue('GITHUB_TOKEN')
})


export default octokit