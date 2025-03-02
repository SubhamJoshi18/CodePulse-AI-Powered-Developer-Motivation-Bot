import { getEnvValue } from "../config/env.config.js"
import { getGenericEnvValue } from "../utils/env.utils.js"

const EXPRESS_APP_URL = `http://localhost:${getEnvValue('PORT')}`

export {
    EXPRESS_APP_URL
}