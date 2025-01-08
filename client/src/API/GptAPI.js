import OpenAI from "openai";


const openai = new OpenAI({ apiKey: process.env.VUE_APP_API_KEY });



export async function generateCV(promptData) {
  try { 
    const prompt = `prompt: ${promptData}`;
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