import { GoogleGenAI } from "@google/genai";
import { Language, MaterialType } from "../types";

// Note: In a real deployment, ensure process.env.API_KEY is available.
// Since the prompt instructs not to create UI for API keys, we assume it's there.
// If it's missing, we handle the error gracefully.

const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const getEcoFact = async (
  count: number,
  material: MaterialType,
  lang: Language
): Promise<string> => {
  if (!apiKey) {
    console.warn("Gemini API Key is missing. Returning default message.");
    return "";
  }

  try {
    const materialName = material === MaterialType.PLASTIC ? 'plastic bottles' : 'paper sheets';
    const languageName = lang === Language.AZE ? 'Azerbaijani' : lang === Language.RU ? 'Russian' : 'English';

    const prompt = `
      The user just recycled ${count} ${materialName}.
      Generate a very short, motivating, one-sentence fun fact or congratulatory message about how much CO2 or energy they saved.
      The message must be in ${languageName}.
      Keep it under 20 words.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "";
  } catch (error) {
    console.error("Error fetching Gemini fact:", error);
    return "";
  }
};