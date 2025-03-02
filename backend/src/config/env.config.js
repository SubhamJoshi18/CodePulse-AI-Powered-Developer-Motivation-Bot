
const envConfig = {
        PORT  : 3000,
        GOOGLE_API_KEY : 'AIzaSyDzwGCeIJtw5tXjYgE0bOBbmsQ6ayd4OMc',
        MONGO_URL : 'mongodb+srv://admin:CpXUcC3bP1XdAJ7u@subhamcluster.dlvdzvs.mongodb.net/CodePluse',
        LOCAL_MONGO_URL : 'mongodb://localhost:27017/CodePluse',
        JWT_ACCESS_TOKEN_SECRET : 'secrets',
        CRYPTO_SECRET_KEY: 'secrets',
        APP_PASSWORD : 'yeua sqwi bltu kzoo',
        APP_EMAIL: 'shubhamrajjoshi69@gmail.com'
}


const getEnvValue = (key) => {
    return envConfig[key]
}

export {
    getEnvValue
}