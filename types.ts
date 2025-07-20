import { Type as GenaiType } from "@google/genai";

export enum Mode {
  Normal = 'Normal',
  Ideation = 'Ideation',
  Brainstorming = 'Brainstorming',
  CompetitorResearch = 'CompetitorResearch',
  Presentation = 'Presentation',
  MVP = 'MVP',
}

export interface Source {
  uri: string;
  title: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  sources?: Source[];
  image?: string; // base64 data URL
  mimeType?: string;
}

export type ChatHistory = Message[];

export type Theme = string; // Represents theme ID

export type ColorMode = 'light' | 'dark';

export type Language = 'en' | 'ja';

// Re-exporting to avoid conflicts with our own 'Type' if we had one
export const Type = GenaiType;