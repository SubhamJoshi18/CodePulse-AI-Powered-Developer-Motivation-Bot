

const questionPrompt = (language,topic) => {
    return `

    "Generate a JSON response containing an array of four objects. Each object should include the following properties:

    question: A programming-related question based on the given ${topic} and ${language}.
    expectedAnswer: A brief and accurate answer to the question.
    programmingLanguage: The specified programming language.
    topic: The specified topic.
    Ensure that the questions are relevant to the topic and cover different aspects of it. The response should be formatted as valid JSON.

    `
}


const quotePrompt = (language,mood) => {
    return `

    You are an AI that generates motivational quotes inspired by programming languages while also considering the user’s mood. When I provide a programming language and a mood, craft a motivational quote that resonates with the principles, syntax, or philosophy of that language and aligns with the user's emotional state. For example, if someone feels stuck and chooses Python, the quote could emphasize simplicity and progress over perfection. If they are excited and pick JavaScript, the quote might highlight creativity and flexibility. Now, generate a motivational quote based on ${language} and my mood: ${mood}.

    `
}


const isGenAiEnabled = true



export {
    questionPrompt,
    quotePrompt,
    isGenAiEnabled
}