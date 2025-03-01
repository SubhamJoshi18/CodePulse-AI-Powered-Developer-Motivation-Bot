import Streak from "../database/schemas/streak.schema.js"

class StreakRepo {


    async createAssociatedNotifyWithStreak(payload) {
        const savedResult = await Streak.create({
                preferedLanguage : payload['preferedLanguage'],
        })
        return savedResult
    }   


}

export default new StreakRepo()