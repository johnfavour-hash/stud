
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getAcademicAdvice(prompt: string, context?: string) {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: `You are an expert Academic Advisor for EduFlow University. 
        Your goal is to help students with course planning, study strategies, and career advice. 
        Keep responses professional, encouraging, and concise. 
        Context of current student state: ${context || 'General inquiry'}.`,
        temperature: 0.7,
      },
    });
    return response.text;
  }

  async summarizeNote(text: string) {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Please summarize the following course notes into key takeaways and action items: \n\n ${text}`,
    });
    return response.text;
  }
}

export const geminiService = new GeminiService();
