

class AdminRepo {


    async bulkInsert(schemaCollection, content) {
        const insertResult = await schemaCollection.insertMany(content)
        return insertResult
    }



}


export default new AdminRepo()
