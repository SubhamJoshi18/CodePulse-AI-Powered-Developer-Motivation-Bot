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

}


export default new NotifyRepository()