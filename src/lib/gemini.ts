import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";

let genAI: GoogleGenerativeAI | null = null;
if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
}

export const SYSTEM_INSTRUCTION = `You are the AarogyaGo Non-Clinical Journey Assistant for the platform 'AarogyaGo: Healthcare Without Borders' presented at Hack Days @ NFSU Nagpur.

CRITICAL NON-CLINICAL SAFETY MANDATES:
1. You are strictly a non-clinical medical travel & journey coordinator.
2. You NEVER diagnose conditions, interpret symptoms, prescribe medication, recommend medical treatments, or provide clinical triage.
3. If a patient or user asks clinical medical questions, immediately provide a warm, courteous boundary notice: remind them that AarogyaGo specializes exclusively in practical travel logistics, accommodation, language assistance, and hospital visit coordination, and advise them to consult their licensed doctor.
4. Focus your advice exclusively on:
   - Practical travel preparation (tickets, transit distance, arrival timing)
   - Non-clinical documents to bring (government photo ID, past discharge summaries, physical file folders, insurance card, payment modes)
   - Hospital arrival navigation (locating reception, outstation facilitation counters, wheelchair assistance desks)
   - Attendant & lodging arrangements (guest houses, Dharmashalas, budget lodging near hospitals)
   - Language interpreter & local transport coordination
   - Practical checklist for the patient and companion

OUTPUT FORMAT:
Provide responses with:
- Warm, empathetic tone
- A structured Non-Clinical Checklist with checkboxes
- Key Logistics Highlights (Travel, Stay, Documents)
- Tips for the hospital visit day
- A clear disclaimer: "AarogyaGo coordinates practical visit logistics and does not provide clinical or medical advice."`;

export async function generateJourneyPlan(userPrompt: string, context?: {
  destinationCity?: string;
  hospitalName?: string;
  visitDate?: string;
  servicesNeeded?: string[];
}) {
  if (!genAI || !apiKey) {
    return generateFallbackPlan(userPrompt, context);
  }

  try {
    // Using gemini-2.5-flash as verified on this API key
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    const fullPrompt = `User Query / Request:
"${userPrompt}"

${
  context
    ? `Patient Context Details:
- Destination City: ${context.destinationCity || "Not specified"}
- Target Hospital: ${context.hospitalName || "General Visit"}
- Preferred Date: ${context.visitDate || "Upcoming"}
- Services Requested: ${context.servicesNeeded?.join(", ") || "General coordination"}`
    : ""
}

Please formulate an actionable, structured non-clinical journey preparation guide for this visit.`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API call failed, using graceful fallback:", error);
    return generateFallbackPlan(userPrompt, context);
  }
}

export function generateFallbackPlan(userPrompt: string, context?: {
  destinationCity?: string;
  hospitalName?: string;
  visitDate?: string;
  servicesNeeded?: string[];
}): string {
  const city = context?.destinationCity || "your destination";
  const hospital = context?.hospitalName || "the medical center";
  const date = context?.visitDate || "your scheduled date";

  return `### 📋 AarogyaGo Non-Clinical Journey Guide

**Destination:** ${hospital} (${city})  
**Target Window:** ${date}

---

#### 1. Essential Travel & Transit Checklist
- [ ] Book return transit (arrive at least 3 hours prior to hospital reporting time).
- [ ] Arrange dedicated station/airport pickup or pre-book verified app cab.
- [ ] Note down the hospital's central inquiry desk and emergency entrance landmarks.

#### 2. Documentation & Identification (Physical Folder)
- [ ] Carry 2 government-issued photo IDs (Aadhaar / Voter ID / Passport) for patient and attendant.
- [ ] Chronologically index all past reports, diagnostic scans (CDs/films), and discharge summaries in a water-resistant folder.
- [ ] Keep insurance cards, pre-authorization letters, or corporate TPA documents handy.
- [ ] Keep digital scans backed up securely on your mobile device.

#### 3. Stay & Attendant Comfort
- [ ] Finalize lodging within 3-5 km of ${hospital} to minimize local traffic stress.
- [ ] Confirm attendant rest facilities (attendant passes, canteen operating hours).
- [ ] Pack comfort essentials: water bottle, power bank, light blanket, and prescription glasses.

#### 4. Day-of-Visit Protocol
- [ ] Report first to the **Outstation / New Registration Facilitation Desk**.
- [ ] Request on-site wheelchair support at gate entry if required.
- [ ] Verify billing payment options (UPI / NetBanking / Debit Card / Cash limit).

---
*Safety Notice: AarogyaGo coordinates practical journey logistics, accommodation, and hospital facilitation. We do not provide clinical diagnosis, prescriptions, or medical treatment recommendations.*`;
}
