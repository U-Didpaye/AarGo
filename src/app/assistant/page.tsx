"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Send,
  Bot,
  User,
  CheckSquare,
  Copy,
  Check,
  Download,
  ShieldAlert,
  Building2,
  Calendar,
  MapPin,
  RefreshCw,
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
    } catch (err) {
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
      {/* Header */}
      <div className="mb-6">
        <FadeIn>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3D43C8] dark:text-[#A5AAFF]">
              Conversational Planning
            </span>
            <Badge variant="primary">
              <Sparkles className="w-3 h-3 text-indigo-500 mr-1" />
              Powered by Google Gemini 2.5
            </Badge>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Gemini Journey Assistant
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Build custom checklists, prepare companion travel logistics, and verify non-clinical paperwork with AI.
          </p>
        </FadeIn>
      </div>

      {/* Safety Notice */}
      <div className="mb-6 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
        <span>
          <strong>Non-Clinical Scope:</strong> The assistant answers travel, lodging, documentation, and coordination questions only. Clinical diagnosis, medical triage, and medication questions must be directed to licensed doctors.
        </span>
      </div>

      {/* Active Context Banner */}
      {hospParam && (
        <div className="mb-6 p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-between text-xs text-indigo-900 dark:text-indigo-200">
          <div className="flex items-center gap-3">
            <Building2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span>
              Target Hospital: <strong>{hospParam}</strong> ({cityParam || "Nagpur"})
            </span>
            {dateParam && <span>• Date: {dateParam}</span>}
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-200/60 dark:bg-indigo-800/60 text-indigo-800 dark:text-indigo-200">
            Active Context
          </span>
        </div>
      )}

      {/* Chat Area */}
      <GlassCard className="p-4 sm:p-6 mb-6 min-h-[460px] flex flex-col justify-between">
        {/* Message Thread */}
        <div className="space-y-6 overflow-y-auto max-h-[520px] pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 sm:gap-4 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "assistant" && (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#3D43C8] to-[#8C92FF] text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                  <Bot className="w-5 h-5" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 sm:p-5 text-sm ${
                  msg.sender === "user"
                    ? "bg-[#3D43C8] text-white rounded-tr-sm shadow-sm dark:bg-[#A5AAFF] dark:text-[#0B0D12]"
                    : "bg-white/90 dark:bg-[#151821] border border-slate-200 dark:border-slate-800 rounded-tl-sm text-slate-800 dark:text-slate-200 shadow-sm"
                }`}
              >
                {/* Assistant Model Badge & Timestamp */}
                <div className="flex items-center justify-between gap-3 text-[11px] mb-2 opacity-75">
                  <span className="font-semibold">
                    {msg.sender === "user" ? "You" : "AarogyaGo AI Assistant"}
                  </span>
                  <div className="flex items-center gap-2">
                    {msg.modelBadge && (
                      <span className="px-1.5 py-0.2 rounded bg-indigo-100 dark:bg-indigo-900/50 text-[#3D43C8] dark:text-[#A5AAFF] text-[10px] font-mono">
                        {msg.modelBadge}
                      </span>
                    )}
                    <span>{msg.timestamp}</span>
                  </div>
                </div>

                {/* Formatted Content */}
                <div className="whitespace-pre-wrap leading-relaxed text-xs sm:text-sm font-sans space-y-2">
                  {msg.content}
                </div>

                {/* Assistant Message Actions (Copy & Export) */}
                {msg.sender === "assistant" && (
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-3 text-xs">
                    <button
                      onClick={() => copyToClipboard(msg.content, msg.id)}
                      className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-500">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => exportAsText(msg.content)}
                      className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export .txt</span>
                    </button>
                  </div>
                )}
              </div>

              {msg.sender === "user" && (
                <div className="w-9 h-9 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 shadow-sm mt-1">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 items-center text-xs text-slate-500 dark:text-slate-400 pl-12">
              <div className="w-2 h-2 rounded-full bg-[#3D43C8] dark:bg-[#A5AAFF] animate-ping" />
              <span>Gemini is generating your personalized non-clinical itinerary...</span>
            </div>
          )}
        </div>

        {/* Prompt Suggestion Chips */}
        <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 mt-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-2">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Suggested Non-Clinical Queries:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_PROMPTS.map((promptText, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(promptText)}
                disabled={isLoading}
                className="text-xs px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-[#3D43C8]/10 hover:text-[#3D43C8] dark:hover:bg-[#A5AAFF]/15 dark:hover:text-[#A5AAFF] text-slate-700 dark:text-slate-300 transition-colors text-left"
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
            placeholder="Ask about hospital transit, guest lodging, outstation file checklist..."
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-xl text-sm bg-white dark:bg-[#151821] border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3D43C8]/40 text-slate-900 dark:text-white"
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
    <Suspense fallback={<div className="p-12 text-center text-sm text-slate-500">Loading Gemini Assistant...</div>}>
      <AssistantContent />
    </Suspense>
  );
}
