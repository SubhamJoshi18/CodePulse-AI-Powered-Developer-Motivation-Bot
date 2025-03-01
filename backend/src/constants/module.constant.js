import { getGenericEnvValue } from "../utils/env.utils.js"

const EXPRESS_APP_URL = `http://localhost:${getGenericEnvValue('PORT')}`

export {
    EXPRESS_APP_URL
}