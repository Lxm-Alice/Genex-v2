
import { GoogleGenAI, Type } from "@google/genai";
import { Member } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getCommunityInsights = async (members: Member[]) => {
  const memberDataSummary = members.map(m => ({
    name: m.name,
    status: m.status,
    metrics: m.metrics
  }));

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze this health community data and provide a summary for a community manager. 
    Focus on:
    1. Overall health trends.
    2. Specific groups or issues that need attention (the "At-Risk" members).
    3. Three actionable recommendations for community-wide wellness challenges or events.
    
    Data: ${JSON.stringify(memberDataSummary)}`,
    config: {
      temperature: 0.7,
      topP: 0.8,
      thinkingConfig: { thinkingBudget: 0 }
    }
  });

  return response.text;
};

export const generateMemberTip = async (member: Member) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `As a health community manager, write a 2-sentence encouraging personalized wellness tip for ${member.name}. 
    Member profile: Status ${member.status}, Avg Steps: ${member.metrics.avgSteps}, Avg Sleep: ${member.metrics.sleepHours}h.`,
  });

  return response.text;
};
