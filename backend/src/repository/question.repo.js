import Question from "../database/schemas/question.schema.js"


class QuestionRepo {

    async fetchQuestionDay(payload){
        const {language , topics , questionCount } = payload

        const result = await Question.aggregate([
            {
                $match: {
                    programmingLanguages: language,
                    topic: { $in: topics }  
                }
            },
            {
                $project: {
                    _id: 1,
                    question: 1,
                    answer: 1,
                    programmingLanguages : 1,
                    questionSolvedCount:1,
                    topic : 1

                }
            },
            {
                $limit: questionCount || 2  
            }
        ]);
        return result
    }
}

export default new QuestionRepo()