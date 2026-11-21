"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Sparkles,
  Send,
  Bot,
  User,
  Copy,
  Check,
  Download,
  ShieldAlert,
  Building2,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { FadeIn } from "@/components/motion/MotionWrapper";

interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  content: string;
  timestamp: string;
  modelBadge?: string;
}

const SAMPLE_PROMPTS = [
  "Non-clinical document folder checklist for outstation hospital visit",
  "How to arrange attendant lodging and transit near AIIMS Nagpur?",
  "What practical questions should an escort ask at the hospital reception desk?",
  "Checklist for traveling with an elderly patient requiring wheelchair assistance",
];

function AssistantContent() {
  const searchParams = useSearchParams();
  const hospParam = searchParams.get("hospital");
  const cityParam = searchParams.get("city");
  const dateParam = searchParams.get("date");

  const [inputPrompt, setInputPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const initialAssistantMessage: ChatMessage = {
    id: "welcome-msg",
    sender: "assistant",
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    modelBadge: "Google Gemini 2.5 Flash",
    content: `Namaste! I am your **AarogyaGo Journey Assistant**, powered by **Google Gemini**.

I help you and your family organize all the **practical, non-clinical aspects** of your planned medical journey:
* Essential documents and indexed files to carry
* Companion lodging options (Dharmashalas & guest houses)
* Transit arrival times and station/airport transfers
* Wheelchair and regional language desk protocols

${
  hospParam
    ? `*I noticed you are coordinating a visit to **${hospParam}** in **${cityParam || "Nagpur"}** on **${dateParam || "your planned date"}**.*`
    : ""
}

How can I help you prepare for your journey today?`,
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialAssistantMessage]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputPrompt).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: "usr-" + Date.now(),
      sender: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputPrompt("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/gemini/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: query,
          context: {
            destinationCity: cityParam || undefined,
            hospitalName: hospParam || undefined,
            visitDate: dateParam || undefined,
          },
        }),
      });

      const data = await res.json();
      const assistantText = data.data || data.error || "Unable to retrieve advice.";

      const reply: ChatMessage = {
        id: "ast-" + Date.now(),
        sender: "assistant",
        content: assistantText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        modelBadge: data.modelUsed || "Gemini 2.5",
      };

      setMessages((prev) => [...prev, reply]);
    } catch {
      const errorReply: ChatMessage = {
        id: "err-" + Date.now(),
        sender: "assistant",
        content:
          "Network hiccup. Please verify your connection or try again. AarogyaGo continues to support your visit logistics.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const exportAsText = (content: string) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "AarogyaGo_Journey_Checklist.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header with HealthOrbit Status Ready Indicator */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <FadeIn>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0D7A6E] dark:text-[#2DD4BF]">
              Conversational Planning
            </span>
            <Badge variant="ai">
              <Sparkles className="w-3 h-3 text-[#E07A68] mr-1" />
              Powered by Google Gemini 2.5
            </Badge>
          </div>
          <h1 className="text-3xl font-extrabold text-[#0F1C1A] dark:text-[#F2FAF8]">
            Gemini Journey Assistant
          </h1>
          <p className="text-sm text-[#4E6B63] dark:text-[#8FA8A1] mt-1">
            Build custom checklists, prepare companion travel logistics, and verify non-clinical paperwork with AI.
          </p>
        </FadeIn>

        {/* HealthOrbit Ready Dot Badge */}
        <div className="flex items-center gap-2 self-start sm:self-center px-3 py-1.5 rounded-full bg-[#DAF0EC] dark:bg-[#13282B] border border-[#BCE1D8] dark:border-[rgba(45,212,191,0.3)] text-xs font-bold text-[#0D7A6E] dark:text-[#2DD4BF]">
          <span className="w-2 h-2 rounded-full bg-[#109485] dark:bg-[#2DD4BF] animate-ping" />
          <span>Gemini Model Ready</span>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="mb-6 p-3 rounded-xl bg-[#FBE4DE] dark:bg-[rgba(224,122,104,0.18)] border border-[#F8C8BD] dark:border-[rgba(224,122,104,0.3)] text-xs text-[#9C3826] dark:text-[#F8A393] flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 text-[#E07A68] shrink-0" />
        <span>
          <strong>Non-Clinical Scope:</strong> The assistant answers travel, lodging, documentation, and coordination questions only. Clinical diagnosis, medical triage, and medication questions must be directed to licensed doctors.
        </span>
      </div>

      {/* Active Context Banner with Sage Pill */}
      {hospParam && (
        <div className="mb-6 p-3.5 rounded-xl bg-[#DAF0EC]/80 dark:bg-[rgba(45,212,191,0.12)] border border-[#BCE1D8] dark:border-[rgba(45,212,191,0.25)] flex items-center justify-between text-xs text-[#0D7A6E] dark:text-[#2DD4BF]">
          <div className="flex items-center gap-3">
            <Building2 className="w-4 h-4 text-[#0D7A6E] dark:text-[#2DD4BF] shrink-0" />
            <span>
              Target Hospital: <strong>{hospParam}</strong> ({cityParam || "Nagpur"})
            </span>
            {dateParam && <span>• Date: {dateParam}</span>}
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#0D7A6E] text-white dark:bg-[#2DD4BF] dark:text-[#071112]">
            Active Context
          </span>
        </div>
      )}

      {/* Chat Area styled like HealthOrbit ai-assistant workspace */}
      <GlassCard className="p-4 sm:p-6 mb-6 min-h-[460px] flex flex-col justify-between border-[#DBE9E6] dark:border-[rgba(16,148,133,0.3)] card-shine">
        {/* Message Thread */}
        <div
          role="log"
          aria-label="Assistant conversation"
          aria-live="polite"
          aria-relevant="additions"
          className="space-y-6 overflow-y-auto max-h-[520px] pr-2"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 sm:gap-4 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "assistant" && (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0D7A6E] to-[#109485] text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                  <Bot className="w-5 h-5" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 sm:p-5 text-sm ${
                  msg.sender === "user"
                    ? "bg-[#0D7A6E] text-white rounded-tr-sm shadow-sm dark:bg-[#2DD4BF] dark:text-[#071112]"
                    : "bg-white dark:bg-[#0D1C1E] border border-[#DBE9E6] dark:border-[rgba(16,148,133,0.25)] rounded-tl-sm text-[#0F1C1A] dark:text-[#F2FAF8] shadow-sm"
                }`}
              >
                {/* Assistant Model Badge & Timestamp */}
                <div className="flex items-center justify-between gap-3 text-[11px] mb-2 opacity-80">
                  <span className="font-bold">
                    {msg.sender === "user" ? "You" : "AarogyaGo AI Assistant"}
                  </span>
                  <div className="flex items-center gap-2">
                    {msg.modelBadge && (
                      <span className="px-1.5 py-0.2 rounded bg-[#DAF0EC] dark:bg-[rgba(45,212,191,0.2)] text-[#0D7A6E] dark:text-[#2DD4BF] text-[10px] font-mono font-bold">
                        {msg.modelBadge}
                      </span>
                    )}
                    <span>{msg.timestamp}</span>
                  </div>
                </div>

                {/* Formatted Content */}
                <div className="whitespace-pre-wrap leading-7 text-sm sm:text-[15px] font-sans space-y-2">
                  {msg.content}
                </div>

                {/* Assistant Message Actions (Copy & Export) */}
                {msg.sender === "assistant" && (
                  <div className="mt-4 pt-3 border-t border-[#DBE9E6]/60 dark:border-[rgba(16,148,133,0.2)] flex items-center gap-3 text-xs">
                    <button
                      type="button"
                      aria-label={copiedId === msg.id ? "Answer copied" : "Copy assistant answer"}
                      onClick={() => copyToClipboard(msg.content, msg.id)}
                      className="inline-flex items-center gap-1 text-[#4E6B63] hover:text-[#0D7A6E] dark:text-[#8FA8A1] dark:hover:text-[#2DD4BF] transition-colors font-medium"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      aria-label="Export assistant answer as a text file"
                      onClick={() => exportAsText(msg.content)}
                      className="inline-flex items-center gap-1 text-[#4E6B63] hover:text-[#0D7A6E] dark:text-[#8FA8A1] dark:hover:text-[#2DD4BF] transition-colors font-medium"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export .txt</span>
                    </button>
                  </div>
                )}
              </div>

              {msg.sender === "user" && (
                <div className="w-9 h-9 rounded-xl bg-[#DAF0EC] dark:bg-[#13282B] text-[#0D7A6E] dark:text-[#2DD4BF] flex items-center justify-center shrink-0 shadow-sm mt-1 font-bold">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div role="status" className="flex gap-3 items-center text-sm text-[#0D7A6E] dark:text-[#2DD4BF] pl-12 font-medium">
              <div className="w-2 h-2 rounded-full bg-[#109485] dark:bg-[#2DD4BF] animate-ping" />
              <span>Gemini is generating your personalized non-clinical itinerary...</span>
            </div>
          )}
        </div>

        {/* Prompt Suggestion Chips in HealthOrbit Soft Sage */}
        <div className="pt-4 border-t border-[#DBE9E6]/70 dark:border-[rgba(16,148,133,0.2)] mt-4">
          <div className="flex items-center gap-1.5 text-xs text-[#4E6B63] dark:text-[#8FA8A1] mb-2 font-medium">
            <Lightbulb className="w-3.5 h-3.5 text-[#E07A68]" />
            <span>Suggested Non-Clinical Queries:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_PROMPTS.map((promptText, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(promptText)}
                disabled={isLoading}
                className="text-xs px-3 py-1.5 rounded-xl bg-[#DAF0EC]/60 hover:bg-[#DAF0EC] dark:bg-[#13282B]/60 dark:hover:bg-[#13282B] text-[#0D7A6E] dark:text-[#2DD4BF] border border-[#BCE1D8]/60 dark:border-[rgba(45,212,191,0.2)] transition-colors text-left font-medium"
              >
                {promptText}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="mt-4 flex gap-2"
        >
          <input
            type="text"
            aria-label="Ask the non-clinical journey assistant"
            placeholder="Ask about hospital transit, guest lodging, outstation file checklist..."
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-xl text-sm bg-white dark:bg-[#0D1C1E] border border-[#DBE9E6] dark:border-[rgba(16,148,133,0.3)] focus:outline-none focus:ring-2 focus:ring-[#0D7A6E]/40 text-[#0F1C1A] dark:text-[#F2FAF8]"
          />
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isLoading || !inputPrompt.trim()}
            icon={<Send className="w-4 h-4" />}
          >
            Ask
          </Button>
        </form>
      </GlassCard>
    </div>
  );
}

export default function AssistantPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-[#4E6B63]">Loading Gemini Assistant...</div>}>
      <AssistantContent />
    </Suspense>
  );
}
