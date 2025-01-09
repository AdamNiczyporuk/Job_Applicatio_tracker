import OpenAI from "openai";

console.log(process.env.VUE_APP_API_KEY);
const openai = new OpenAI({ apiKey: process.env.VUE_APP_API_KEY,dangerouslyAllowBrowser: true});
// Hide this in server side
export async function generateCV(userData) {
  try { 
    const prompt = 
    `Create a text for a CV based on the following user data.
    This is must be a personalized CV  that will give user a job.
    Format the output as bullet points so that it is ready to use in a document.  
    User data:  
    - Full name: ${userData.name} ${userData.surname} 
    - Email: ${userData.email}   
    - Job title: ${userData.jobTitle} 
    - Required Exprience: ${userData.reqExperience} 
    - Job Description : ${userData.jobDescription}
    Format the response clearly for a professional CV. `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
          { role: "system", content: "You are a professional CV writer." },
          { role: "user", content: prompt },
      ],
  });

  return completion.choices[0].message.content;
  }
  catch (error) {
    console.error("Error generating CV:", error);
  }
}