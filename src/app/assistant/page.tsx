"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
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
  MapPin,
  Calendar,
  Lightbulb,
  FolderCheck,
  Hotel,
  Train,
  Accessibility,
  HelpCircle,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { FadeIn } from "@/components/motion/MotionWrapper";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";

interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  content: string;
  timestamp: string;
  modelBadge?: string;
  isError?: boolean;
}

interface SuggestedPrompt {
  title: string;
  query: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SUGGESTED_PROMPT_CARDS: SuggestedPrompt[] = [
  {
    title: "Prepare my document checklist",
    query: "Prepare a complete non-clinical document folder checklist for my planned outstation hospital visit.",
    icon: FolderCheck,
  },
  {
    title: "Plan accommodation for my attendant",
    query: "How should I plan affordable and safe accommodation options for a patient's attendant near the hospital?",
    icon: Hotel,
  },
  {
    title: "Organise travel to the hospital",
    query: "What travel arrangements and station-to-hospital transfers should we organize before our visit?",
    icon: Train,
  },
  {
    title: "Prepare a wheelchair assistance checklist",
    query: "What is the checklist for coordinating wheelchair and mobility assistance upon arrival at the hospital?",
    icon: Accessibility,
  },
  {
    title: "What should I ask at the hospital reception?",
    query: "What practical, non-clinical questions should an escort ask at the hospital reception desk on day one?",
    icon: HelpCircle,
  },
];

const WELCOME_TEXT = `Namaste! 👋

Welcome to your AarogyaGo Journey Assistant.

I'm here to make your planned hospital visit easier by helping you organise travel, accommodation, essential documents and other practical arrangements.

What would you like help with today?`;

function AssistantContent() {
  const searchParams = useSearchParams();
  const hospParam = searchParams.get("hospital");
  const cityParam = searchParams.get("city");
  const dateParam = searchParams.get("date");

  const [inputPrompt, setInputPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [lastFailedQuery, setLastFailedQuery] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const initialAssistantMessage: ChatMessage = {
    id: "welcome-msg",
    sender: "assistant",
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    modelBadge: "Google Gemini 2.5 Flash",
    content: WELCOME_TEXT,
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialAssistantMessage]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Has journey context fields
  const hasJourneyContext = Boolean(hospParam || cityParam || dateParam);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputPrompt).trim();
    if (!query || isLoading) return;

    setLastFailedQuery(null);

    const userMessage: ChatMessage = {
      id: "usr-" + Date.now(),
      sender: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputPrompt("");
    setIsLoading(true);

    // Build chat history for Gemini multi-turn context (exclude welcome message and errors)
    const historyPayload = updatedMessages
      .filter((m) => m.id !== "welcome-msg" && !m.isError)
      .map((m) => ({
        role: m.sender,
        content: m.content,
      }));

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
          history: historyPayload,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to retrieve response");
      }

      const assistantText = data.data || "I am ready to help coordinate your visit logistics.";

      const reply: ChatMessage = {
        id: "ast-" + Date.now(),
        sender: "assistant",
        content: assistantText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        modelBadge: data.modelUsed || "Gemini 2.5",
      };

      setMessages((prev) => [...prev, reply]);
    } catch {
      setLastFailedQuery(query);
      const errorReply: ChatMessage = {
        id: "err-" + Date.now(),
        sender: "assistant",
        content:
          "I ran into a temporary connection issue while reaching Gemini. Your journey details are safe. Please click **Retry** below to resend your request.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isError: true,
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastFailedQuery) {
      handleSendMessage(lastFailedQuery);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
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
    link.download = `AarogyaGo_Journey_Checklist_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
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

        {/* Gemini Status Indicator */}
        <div className="flex items-center gap-2 self-start sm:self-center px-3.5 py-1.5 rounded-full bg-[#DAF0EC] dark:bg-[#13282B] border border-[#BCE1D8] dark:border-[rgba(45,212,191,0.3)] text-xs font-bold text-[#0D7A6E] dark:text-[#2DD4BF] shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#109485] dark:bg-[#2DD4BF] animate-ping" />
          <span>Gemini Model Active</span>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="mb-6 p-3.5 rounded-xl bg-[#FBE4DE] dark:bg-[rgba(224,122,104,0.18)] border border-[#F8C8BD] dark:border-[rgba(224,122,104,0.3)] text-xs text-[#9C3826] dark:text-[#F8A393] flex items-center gap-2.5 shadow-sm">
        <ShieldAlert className="w-4 h-4 text-[#E07A68] shrink-0" />
        <span>
          <strong>Non-Clinical Scope:</strong> The assistant answers travel, lodging, documentation, and coordination questions only. Clinical diagnosis, medical triage, and medication questions must be directed to licensed doctors.
        </span>
      </div>

      {/* Chat Area */}
      <GlassCard className="p-4 sm:p-6 mb-6 min-h-[500px] flex flex-col justify-between border-[#DBE9E6] dark:border-[rgba(16,148,133,0.3)] card-shine">
        {/* Message Thread */}
        <div
          role="log"
          aria-label="Assistant conversation"
          aria-live="polite"
          aria-relevant="additions"
          className="space-y-6 overflow-y-auto max-h-[560px] pr-2 scrollbar-thin"
        >
          {messages.map((msg, idx) => (
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
                className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 sm:p-5 text-sm ${
                  msg.sender === "user"
                    ? "bg-[#0D7A6E] text-white rounded-tr-sm shadow-sm dark:bg-[#2DD4BF] dark:text-[#071112]"
                    : msg.isError
                    ? "bg-[#FDF2F0] dark:bg-[rgba(224,122,104,0.12)] border border-[#F8C8BD] dark:border-[rgba(224,122,104,0.3)] rounded-tl-sm text-[#0F1C1A] dark:text-[#F2FAF8] shadow-sm"
                    : "bg-white dark:bg-[#0D1C1E] border border-[#DBE9E6] dark:border-[rgba(16,148,133,0.25)] rounded-tl-sm text-[#0F1C1A] dark:text-[#F2FAF8] shadow-sm"
                }`}
              >
                {/* Assistant Model Badge & Timestamp */}
                <div className="flex items-center justify-between gap-3 text-[11px] mb-2.5 opacity-80">
                  <span className="font-bold">
                    {msg.sender === "user" ? "You" : "AarogyaGo AI Assistant"}
                  </span>
                  <div className="flex items-center gap-2">
                    {msg.modelBadge && (
                      <span className="px-2 py-0.5 rounded bg-[#DAF0EC] dark:bg-[rgba(45,212,191,0.2)] text-[#0D7A6E] dark:text-[#2DD4BF] text-[10px] font-mono font-bold">
                        {msg.modelBadge}
                      </span>
                    )}
                    <span>{msg.timestamp}</span>
                  </div>
                </div>

                {/* Formatted Content */}
                {msg.sender === "assistant" ? (
                  <div className="space-y-3">
                    <MarkdownRenderer content={msg.content} />

                    {/* Dedicated Journey Context Card on Welcome Message */}
                    {idx === 0 && hasJourneyContext && (
                      <div className="mt-3.5 p-3.5 rounded-xl bg-[#DAF0EC]/70 dark:bg-[rgba(45,212,191,0.12)] border border-[#BCE1D8] dark:border-[rgba(45,212,191,0.25)] text-xs text-[#0D7A6E] dark:text-[#2DD4BF]">
                        <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[#BCE1D8]/60 dark:border-[rgba(45,212,191,0.2)]">
                          <span className="font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5" />
                            Your journey context
                          </span>
                          <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#0D7A6E] text-white dark:bg-[#2DD4BF] dark:text-[#071112]">
                            Active
                          </span>
                        </div>
                        <ul className="space-y-1 text-[#0F1C1A] dark:text-[#E2F0EC] text-xs">
                          {hospParam && (
                            <li className="flex items-center gap-2">
                              <span className="font-semibold text-[#0D7A6E] dark:text-[#2DD4BF]">• Hospital:</span>
                              <span>{hospParam}</span>
                            </li>
                          )}
                          {cityParam && (
                            <li className="flex items-center gap-2">
                              <span className="font-semibold text-[#0D7A6E] dark:text-[#2DD4BF]">• Destination:</span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-[#0D7A6E] dark:text-[#2DD4BF]" />
                                {cityParam}
                              </span>
                            </li>
                          )}
                          {dateParam && (
                            <li className="flex items-center gap-2">
                              <span className="font-semibold text-[#0D7A6E] dark:text-[#2DD4BF]">• Visit date:</span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-[#0D7A6E] dark:text-[#2DD4BF]" />
                                {dateParam}
                              </span>
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap leading-relaxed font-sans">
                    {msg.content}
                  </div>
                )}

                {/* Assistant Message Actions (Copy, Export & Retry) */}
                {msg.sender === "assistant" && (
                  <div className="mt-3.5 pt-2.5 border-t border-[#DBE9E6]/60 dark:border-[rgba(16,148,133,0.2)] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        aria-label={copiedId === msg.id ? "Answer copied" : "Copy assistant answer"}
                        onClick={() => copyToClipboard(msg.content, msg.id)}
                        className="inline-flex items-center gap-1.5 text-[#4E6B63] hover:text-[#0D7A6E] dark:text-[#8FA8A1] dark:hover:text-[#2DD4BF] transition-colors font-medium"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied</span>
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
                        className="inline-flex items-center gap-1.5 text-[#4E6B63] hover:text-[#0D7A6E] dark:text-[#8FA8A1] dark:hover:text-[#2DD4BF] transition-colors font-medium"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export .txt</span>
                      </button>
                    </div>

                    {msg.isError && lastFailedQuery && (
                      <button
                        type="button"
                        onClick={handleRetry}
                        className="inline-flex items-center gap-1 text-[#E07A68] hover:text-[#C55A48] font-bold text-xs"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Retry
                      </button>
                    )}
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

          {/* Loading Indicator */}
          {isLoading && (
            <div role="status" className="flex items-center gap-3 pl-12 text-sm text-[#0D7A6E] dark:text-[#2DD4BF] font-medium py-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#109485] dark:bg-[#2DD4BF] animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 rounded-full bg-[#109485] dark:bg-[#2DD4BF] animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 rounded-full bg-[#109485] dark:bg-[#2DD4BF] animate-bounce" />
              </div>
              <span className="text-xs sm:text-sm">Gemini is preparing your personalized journey guidance...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Interactive Suggested Prompt Cards */}
        <div className="pt-4 border-t border-[#DBE9E6]/70 dark:border-[rgba(16,148,133,0.2)] mt-4">
          <div className="flex items-center gap-1.5 text-xs text-[#4E6B63] dark:text-[#8FA8A1] mb-2.5 font-medium">
            <Lightbulb className="w-3.5 h-3.5 text-[#E07A68]" />
            <span>Suggested Non-Clinical Inquiries (tap to ask instantly):</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {SUGGESTED_PROMPT_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSendMessage(card.query)}
                  disabled={isLoading}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#DAF0EC]/50 hover:bg-[#DAF0EC] dark:bg-[#13282B]/60 dark:hover:bg-[#13282B] text-[#0D7A6E] dark:text-[#2DD4BF] border border-[#BCE1D8]/60 dark:border-[rgba(45,212,191,0.2)] hover:border-[#0D7A6E]/40 transition-all text-left font-medium text-xs group disabled:opacity-50"
                >
                  <div className="w-7 h-7 rounded-lg bg-white/80 dark:bg-[#071112]/60 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    <Icon className="w-3.5 h-3.5 text-[#0D7A6E] dark:text-[#2DD4BF]" />
                  </div>
                  <span className="line-clamp-1 flex-1 leading-snug">{card.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Multiline Chat Input Area */}
        <div className="mt-4">
          <div className="relative flex items-end gap-2 p-1.5 rounded-2xl bg-white dark:bg-[#0D1C1E] border border-[#DBE9E6] dark:border-[rgba(16,148,133,0.3)] shadow-sm focus-within:ring-2 focus-within:ring-[#0D7A6E]/30 focus-within:border-[#0D7A6E]">
            <textarea
              ref={textareaRef}
              rows={2}
              aria-label="Ask the non-clinical journey assistant"
              placeholder="Ask about hospital transit, companion lodging, outstation file checklist... (Press Enter to send, Shift+Enter for new line)"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="flex-1 px-3 py-2 text-sm bg-transparent border-0 focus:outline-none resize-none text-[#0F1C1A] dark:text-[#F2FAF8] placeholder-[#7F9E96] dark:placeholder-[#55776F] max-h-32 leading-relaxed"
            />
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputPrompt.trim()}
              icon={<Send className="w-4 h-4" />}
              className="shrink-0 mb-1 mr-1"
            >
              Send
            </Button>
          </div>
          <div className="flex items-center justify-between mt-1.5 px-2 text-[11px] text-[#4E6B63] dark:text-[#8FA8A1]">
            <span>Press <strong>Enter ↵</strong> to send, <strong>Shift + Enter</strong> for a new line</span>
            <span className="hidden sm:inline">Coordination assistance only</span>
          </div>
        </div>
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
