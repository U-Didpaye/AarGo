import { NextRequest, NextResponse } from "next/server";
import { generateJourneyPlan } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, context } = body;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "A valid prompt query is required." },
        { status: 400 }
      );
    }

    const response = await generateJourneyPlan(prompt, context);
    return NextResponse.json({
      success: true,
      data: response,
      modelUsed: "gemini-2.5-flash",
    });
  } catch (error) {
    console.error("Error in Gemini assistant route:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate journey plan.",
        fallback: true,
      },
      { status: 500 }
    );
  }
}
