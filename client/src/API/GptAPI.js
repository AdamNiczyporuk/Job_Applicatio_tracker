import OpenAI from "openai";


const openai = new OpenAI({ apiKey: process.env.VUE_APP_API_KEY });



export async function generateCV(userData) {
  try { 
    const prompt = `Create a text for a CV based on the following user data.  
    Format the output as bullet points so that it is ready to use in a document.  
    User data:  
    - Full name: ${userData.name} ${userData.surname}  
    - Email: ${userData.email}  
    - Work experience: ${userData.experience}  
    - Skills: ${userData.skills}  
    - Education: ${userData.education}  
    - Languages: ${userData.languages}  
    - Additional information: ${userData.additionalInfo} 
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