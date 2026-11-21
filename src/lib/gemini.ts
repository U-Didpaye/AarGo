import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";

let genAI: GoogleGenerativeAI | null = null;
if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
}

export const SYSTEM_INSTRUCTION = `You are the AarogyaGo Journey Assistant for 'AarogyaGo: Healthcare Without Borders' (presented at Hack Days @ NFSU Nagpur).

CORE PURPOSE:
You are an intelligent, friendly, and reassuring medical journey coordinator. You help patients and their companions organize all non-clinical, logistical aspects of planned hospital visits.

CRITICAL NON-CLINICAL SAFETY BOUNDARIES:
1. You are strictly a non-clinical journey coordinator.
2. You NEVER diagnose medical conditions, interpret symptoms, prescribe medicines, suggest dosages, evaluate medical lab values, or provide clinical triage.
3. If a user asks medical or clinical questions, provide a warm, courteous boundary notice: explain that AarogyaGo specializes exclusively in practical travel, lodging, documents, and hospital facilitation, and advise them to speak directly with their licensed physician.
4. Never invent hospital partnerships, pricing, bed availability, transport timetables, or verified clinic claims. Distinguish helpful recommendations from verified hospital facts.

CONVERSATION & RESPONSE STYLE GUIDELINES:
1. Be concise, warm, and natural. Never overwhelm the user with enormous unbroken walls of text.
2. Structure your replies thoughtfully:
   - Direct, helpful answer first (1-2 sentences).
   - Clear subheadings (e.g. "### 📁 Documents to Carry" or "### 🏨 Outstation Lodging").
   - Actionable checklists using Markdown checkbox syntax: '- [ ] Item detail'.
   - Practical tips for the patient and accompanying family member.
   - A short, relevant follow-up question at the end to guide the conversation.
3. Respect journey context:
   - If the patient has already selected a hospital, destination city, or visit date, acknowledge it and do NOT ask for information you already know.
   - If critical travel information is missing, ask one simple clarifying question.
4. Do NOT repeat the initial greeting paragraph in follow-up answers.`;

export interface ChatHistoryItem {
  role: "user" | "assistant";
  content: string;
}

export async function generateJourneyPlan(
  userPrompt: string,
  context?: {
    destinationCity?: string;
    hospitalName?: string;
    visitDate?: string;
    servicesNeeded?: string[];
  },
  history?: ChatHistoryItem[]
) {
  if (!genAI || !apiKey) {
    return generateFallbackPlan(userPrompt, context);
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    // Format previous messages for Gemini multi-turn chat (up to last 10 messages)
    const formattedHistory = (history || [])
      .slice(-10)
      .filter((h) => h.content && h.content.trim() !== "")
      .map((h) => ({
        role: h.role === "user" ? ("user" as const) : ("model" as const),
        parts: [{ text: h.content }],
      }));

    // Inject active journey context if present
    const contextPrefix = context && (context.hospitalName || context.destinationCity || context.visitDate)
      ? `[Active Journey Context: Hospital: ${context.hospitalName || "Not set"}, City: ${context.destinationCity || "Not set"}, Planned Date: ${context.visitDate || "Not set"}]\n\n`
      : "";

    if (formattedHistory.length > 0) {
      const chat = model.startChat({
        history: formattedHistory,
      });
      const result = await chat.sendMessage(contextPrefix + userPrompt);
      const response = await result.response;
      return response.text();
    } else {
      const fullPrompt = `${contextPrefix}User Query:\n"${userPrompt}"\n\nPlease provide a structured, practical non-clinical response.`;
      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      return response.text();
    }
  } catch (error) {
    console.error("Gemini API call failed, using graceful fallback:", error);
    return generateFallbackPlan(userPrompt, context);
  }
}

export function generateFallbackPlan(
  userPrompt: string,
  context?: {
    destinationCity?: string;
    hospitalName?: string;
    visitDate?: string;
    servicesNeeded?: string[];
  }
): string {
  const city = context?.destinationCity || "your destination";
  const hospital = context?.hospitalName || "the medical center";
  const date = context?.visitDate || "your scheduled date";

  return `### 📋 Practical Visit Preparation Guide

**Destination:** ${hospital} (${city})  
**Target Window:** ${date}

Here are the practical non-clinical steps to organize for your visit:

#### 📁 Essential Documents & File Organization
- [ ] 2 Government-issued photo IDs (Aadhaar / Voter ID / Passport) for patient and attendant.
- [ ] Chronologically index past discharge summaries and diagnostic scans in a water-resistant folder.
- [ ] Insurance cards, TPA pre-authorization documents, or corporate policy details.
- [ ] Keep digital backups scanned on your mobile device.

#### 🚆 Transit & Timing
- [ ] Plan arrival at least 3 hours before registration counters open.
- [ ] Pre-book verified local transport or taxi to the main hospital entrance.
- [ ] Note down the hospital's central help desk location.

#### 🏨 Attendant Lodging & Comfort
- [ ] Reserve lodging within 3 km of the hospital to minimize local commute stress.
- [ ] Confirm attendant entry passes and canteen timings.
- [ ] Pack essentials: power bank, refillable water bottle, light shawl, and medication organizers.

---
*Safety Note: AarogyaGo coordinates practical journey logistics and accommodation. We do not provide clinical diagnosis or medical treatment.*

Would you like me to help you plan specific lodging options or local transport for this visit?`;
}
