import { GoogleGenAI, Part, Tool, Content, GenerateContentResponse } from "@google/genai";
import { Mode, Message, Source, ChatHistory, Language, Type } from '../types';
import { MODE_CONFIG, MODEL_NAME, IMPROVE_PROMPT_CONFIG, SUGGESTIONS_PROMPT_CONFIG } from '../constants';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const toApiHistory = (history: ChatHistory): Content[] => {
  return history.map(msg => {
    const parts: Part[] = [];
    if (msg.text) {
      parts.push({ text: msg.text });
    }
    if (msg.role === 'user' && msg.image && msg.mimeType) {
      const base64Data = msg.image.split(',')[1];
      parts.push({ inlineData: { data: base64Data, mimeType: msg.mimeType } });
    }
    // If there are no parts, add an empty text part to avoid errors
    if (parts.length === 0) {
      parts.push({ text: "" });
    }
    return {
      role: msg.role,
      parts: parts,
    };
  });
};

export const improvePrompt = async (prompt: string, mode: Mode, language: Language): Promise<string> => {
  if (!prompt) return '';

  const systemInstruction = IMPROVE_PROMPT_CONFIG[mode]?.[language] || IMPROVE_PROMPT_CONFIG[Mode.Normal][language];

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.5,
      }
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error improving prompt:", error);
    throw new Error("プロンプトの改善中にエラーが発生しました。");
  }
};

export const streamChat = async (
  mode: Mode,
  history: ChatHistory,
  onChunk: (text: string) => void,
  onSources: (sources: Source[]) => void,
  onComplete: (finalText: string, finalSources: Source[]) => void
) => {
  const modeConfig = MODE_CONFIG[mode];
  const tools: Tool[] = mode === Mode.CompetitorResearch ? [{ googleSearch: {} }] : [];

  let fullText = '';
  let finalSources: Source[] = [];

  try {
    const stream = await ai.models.generateContentStream({
      model: MODEL_NAME,
      contents: toApiHistory(history),
      config: {
        systemInstruction: modeConfig.systemInstruction,
        tools: tools,
      }
    });
    
    for await (const chunk of stream) {
      const chunkText = chunk.text;
      if (chunkText) {
        fullText += chunkText;
        onChunk(fullText);
      }

      if (chunk.candidates?.[0]?.groundingMetadata?.groundingChunks) {
        const sources: Source[] = chunk.candidates[0].groundingMetadata.groundingChunks
          .map((c: any) => ({
            uri: c.web?.uri || '',
            title: c.web?.title || c.web?.uri || '',
          }))
          .filter((s: Source) => s.uri && !finalSources.some(fs => fs.uri === s.uri));
        
        if(sources.length > 0) {
            finalSources = [...finalSources, ...sources];
            onSources(finalSources);
        }
      }
    }
  } catch (error) {
    console.error("Error during chat stream:", error);
    onChunk("申し訳ありません、エラーが発生しました。");
  } finally {
    onComplete(fullText, finalSources);
  }
};

export const generateSuggestions = async (
  history: ChatHistory,
  mode: Mode,
  language: Language
): Promise<string[]> => {
  if (history.length === 0) return [];
  
  const systemInstruction = SUGGESTIONS_PROMPT_CONFIG[mode]?.[language] 
    || SUGGESTIONS_PROMPT_CONFIG[Mode.Normal][language];
  
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: toApiHistory(history),
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "An array of 3 distinct, concise, and actionable follow-up suggestions for the user."
        },
        temperature: 0.8,
      },
    });

    const jsonText = response.text.trim();
    const parsed = JSON.parse(jsonText);
    if (Array.isArray(parsed) && parsed.every(item => typeof item === 'string')) {
      return parsed.slice(0, 3); // Ensure only 3 suggestions are returned
    }
    return [];
  } catch (error) {
    console.error("Error generating suggestions:", error);
    return []; // Return empty array on error, don't throw
  }
};