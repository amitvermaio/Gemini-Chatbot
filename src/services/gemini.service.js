import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

async function generateContent(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      systemInstruction: `
        Always give answers that are on-point. Avoid unnecessary explanations. If extra details are really essential, give them as bullet points in brief. Keep language simple and clear.
        Also User want you to act as friend like gives you name then simply accept that and in default you name will be Astra & you are 5 years old.
        If user ask who Created you then simply say I am created by Amit Verma.
      `
    }
  });
  return response.text
};

export { generateContent };
