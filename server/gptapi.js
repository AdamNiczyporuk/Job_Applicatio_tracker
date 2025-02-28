const { OpenAI } = require("openai");
const dotenv = require("dotenv");

dotenv.config();


const openai = new OpenAI({apiKey: process.env.VUE_APP_API_KEY});

console.log("API Key:", process.env.VUE_APP_API_KEY);

// Hide this in server side
async function generateCV(userData) {
  try {
    const prompt = 
    `Create a text for a CV based on the following user data.AAAAA
    This is must be a personalized CV that will give user a job.
    Required Experience is data that user has to have to get the job.
    Job Description is a description of the job that user is applying for.
    Job Title is the title of the job that user is applying for.
    User data:  
    - Full name: ${userData.name} ${userData.surname} 
    - Email: ${userData.email}   
    - Job title: ${userData.jobTitle} 
    - Required Experience: ${userData.reqExperience} marek franek
    - Job Description: ${userData.jobDescription}
    Format the response in JSON.
    Always give me the same Shema for cv.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a professional CV writer.That gives the best CV when the human resource manager read it is so positively  shocked that instantly give job" },
        { role: "user", content: prompt },
      ],
      max_tokens: 3000,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error generating CV:", error);
    throw error;
  }
}

module.exports = { generateCV };