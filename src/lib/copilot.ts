import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateConsultationNotes(symptoms: string) {
  try {
    const prompt = `Rédige une fiche de consultation médicale professionnelle à partir des symptômes suivants : "${symptoms}". 
Inclue un diagnostic, des observations cliniques et une recommandation, en français.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("❌ Erreur OpenAI :", error);
    throw error;
  }
}
