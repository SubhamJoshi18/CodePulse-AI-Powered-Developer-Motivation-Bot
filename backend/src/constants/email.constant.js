

function generateQuestionHtmlContent(question, expectedAnswer, programmingLanguage, topic, solveLink) {
    const htmlContent = `
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    background-color: #f4f4f4;
                }
                .container {
                    max-width: 600px;
                    margin: auto;
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h2 {
                    color: #333;
                    text-align: center;
                }
                p {
                    font-size: 16px;
                    color: #555;
                }
                .button-container {
                    text-align: center;
                    margin-top: 20px;
                }
                .button {
                    display: inline-block;
                    padding: 12px 20px;
                    font-size: 16px;
                    color: white;
                    background-color: #007bff;
                    text-decoration: none;
                    border-radius: 5px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>New Question Available</h2>
                <p><strong>Question:</strong> ${question}</p>
                <p><strong>Expected Answer:</strong> ${expectedAnswer}</p>
                <p><strong>Programming Language:</strong> ${programmingLanguage}</p>
                <p><strong>Topic:</strong> ${topic}</p>
                <div class="button-container">
                    <a href="${solveLink}" target="_blank" class="button">Solve Now</a>
                </div>
            </div>
        </body>
        </html>
    `;
    
    return htmlContent;
}





export {
    generateQuestionHtmlContent
}