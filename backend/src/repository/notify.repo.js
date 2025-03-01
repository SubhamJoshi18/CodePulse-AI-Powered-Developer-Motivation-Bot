import Notify from "../database/schemas/notify.schema.js"



class NotifyRepository {

    async createNewNotify(payload){
        const savedResult = await Notify.create(
            {
                ...payload
            }
        )
        return savedResult
    } 

    async updateStreakId(notifyId,streakId) {
        const updatedResult = await Notify.updateOne(
            {
                _id : notifyId
            },
            {
                streak : streakId
            },
            {
                $new : true
            }
        )

        return updatedResult
    }

    async getNotifyByUser(userId) {
        const userDoc = await Notify.findOne({
            user : userId
        })
        return userDoc
    }

    async updateNotifyDayCount(notifyId,count) {
        const updatedResult = await Notify.updateOne(
            {
                _id : notifyId
            },
            {
                dayCount : count
            },
            {
                $new : true
            }
        )

        return updatedResult
    }

}


export default new NotifyRepository()