"use client";

import React, { useState } from "react";
import { Square, CheckSquare } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  // Parse inline styles: bold (**text**), italic (*text*), inline code (`code`), links ([text](url))
  const renderInline = (text: string): React.ReactNode[] => {
    const elements: React.ReactNode[] = [];
    // Regular expression matching bold, italic, code, and links
    const regex = /(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))/g;
    const parts = text.split(regex);

    parts.forEach((part, index) => {
      if (!part) return;

      if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
        elements.push(
          <strong
            key={index}
            className="font-bold text-[#0D7A6E] dark:text-[#2DD4BF]"
          >
            {part.slice(2, -2)}
          </strong>
        );
      } else if (part.startsWith("*") && part.endsWith("*") && part.length >= 2) {
        elements.push(
          <em key={index} className="italic text-[#0F1C1A] dark:text-[#F2FAF8]">
            {part.slice(1, -1)}
          </em>
        );
      } else if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
        elements.push(
          <code
            key={index}
            className="px-1.5 py-0.5 rounded text-xs font-mono font-semibold bg-[#DAF0EC] text-[#0D7A6E] dark:bg-[rgba(45,212,191,0.15)] dark:text-[#2DD4BF]"
          >
            {part.slice(1, -1)}
          </code>
        );
      } else if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
        const match = part.match(/\[(.*?)\]\((.*?)\)/);
        if (match) {
          const [, linkText, href] = match;
          elements.push(
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0D7A6E] dark:text-[#2DD4BF] underline hover:opacity-80 transition-opacity font-medium"
            >
              {linkText}
            </a>
          );
        } else {
          elements.push(part);
        }
      } else {
        elements.push(part);
      }
    });

    return elements;
  };

  // Split lines and group into structured blocks
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];

  let currentList: { type: "bullet" | "numbered" | "checklist"; items: React.ReactNode[] } | null = null;

  const flushList = () => {
    if (!currentList) return;
    if (currentList.type === "checklist") {
      blocks.push(
        <ul key={`list-${blocks.length}`} className="my-2.5 space-y-2">
          {currentList.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-[15px] leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );
    } else if (currentList.type === "numbered") {
      blocks.push(
        <ol key={`list-${blocks.length}`} className="my-2 pl-5 list-decimal space-y-1 text-sm sm:text-[15px] leading-relaxed marker:text-[#0D7A6E] dark:marker:text-[#2DD4BF] marker:font-bold">
          {currentList.items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ol>
      );
    } else {
      blocks.push(
        <ul key={`list-${blocks.length}`} className="my-2 pl-4 space-y-1.5 text-sm sm:text-[15px] leading-relaxed">
          {currentList.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0D7A6E] dark:bg-[#2DD4BF] mt-2 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    }
    currentList = null;
  };

  lines.forEach((rawLine, lineIndex) => {
    const line = rawLine.trim();

    if (!line) {
      flushList();
      return;
    }

    // Horizontal Rule: --- or ***
    if (line === "---" || line === "***" || line === "___") {
      flushList();
      blocks.push(
        <hr
          key={`hr-${lineIndex}`}
          className="my-3 border-t border-[#DBE9E6] dark:border-[rgba(16,148,133,0.25)]"
        />
      );
      return;
    }

    // Headings
    if (line.startsWith("### ")) {
      flushList();
      blocks.push(
        <h3
          key={`h3-${lineIndex}`}
          className="text-base sm:text-lg font-bold text-[#0F1C1A] dark:text-[#F2FAF8] mt-4 mb-2 flex items-center gap-2"
        >
          {renderInline(line.slice(4))}
        </h3>
      );
      return;
    }
    if (line.startsWith("#### ")) {
      flushList();
      blocks.push(
        <h4
          key={`h4-${lineIndex}`}
          className="text-sm sm:text-base font-bold text-[#0D7A6E] dark:text-[#2DD4BF] mt-3 mb-1.5"
        >
          {renderInline(line.slice(5))}
        </h4>
      );
      return;
    }
    if (line.startsWith("## ")) {
      flushList();
      blocks.push(
        <h2
          key={`h2-${lineIndex}`}
          className="text-lg sm:text-xl font-extrabold text-[#0F1C1A] dark:text-[#F2FAF8] mt-5 mb-2"
        >
          {renderInline(line.slice(3))}
        </h2>
      );
      return;
    }
    if (line.startsWith("# ")) {
      flushList();
      blocks.push(
        <h1
          key={`h1-${lineIndex}`}
          className="text-xl sm:text-2xl font-black text-[#0F1C1A] dark:text-[#F2FAF8] mt-5 mb-2"
        >
          {renderInline(line.slice(2))}
        </h1>
      );
      return;
    }

    // Blockquote: > text
    if (line.startsWith("> ")) {
      flushList();
      blocks.push(
        <div
          key={`quote-${lineIndex}`}
          className="my-2.5 pl-3.5 py-2 border-l-3 border-[#0D7A6E] dark:border-[#2DD4BF] bg-[#DAF0EC]/40 dark:bg-[rgba(45,212,191,0.08)] rounded-r-lg text-xs sm:text-sm text-[#4E6B63] dark:text-[#8FA8A1]"
        >
          {renderInline(line.slice(2))}
        </div>
      );
      return;
    }

    // Checklists: - [ ] or - [x]
    const checklistMatch = line.match(/^[-*]\s+\[([ xX])\]\s+(.*)/);
    if (checklistMatch) {
      const isChecked = checklistMatch[1].toLowerCase() === "x";
      const itemContent = checklistMatch[2];

      if (!currentList || currentList.type !== "checklist") {
        flushList();
        currentList = { type: "checklist", items: [] };
      }

      currentList.items.push(
        <ChecklistItem
          key={lineIndex}
          defaultChecked={isChecked}
          label={renderInline(itemContent)}
        />
      );
      return;
    }

    // Bullet items: - or *
    const bulletMatch = line.match(/^[-*•]\s+(.*)/);
    if (bulletMatch) {
      if (!currentList || currentList.type !== "bullet") {
        flushList();
        currentList = { type: "bullet", items: [] };
      }
      currentList.items.push(renderInline(bulletMatch[1]));
      return;
    }

    // Numbered list items: 1. or 2.
    const numberedMatch = line.match(/^(\d+)\.\s+(.*)/);
    if (numberedMatch) {
      if (!currentList || currentList.type !== "numbered") {
        flushList();
        currentList = { type: "numbered", items: [] };
      }
      currentList.items.push(renderInline(numberedMatch[2]));
      return;
    }

    // Regular paragraph
    flushList();
    blocks.push(
      <p
        key={`p-${lineIndex}`}
        className="my-2 text-sm sm:text-[15px] text-[#0F1C1A] dark:text-[#F2FAF8] leading-relaxed"
      >
        {renderInline(line)}
      </p>
    );
  });

  flushList();

  return <div className={`space-y-1 ${className}`}>{blocks}</div>;
}

function ChecklistItem({
  defaultChecked,
  label,
}: {
  defaultChecked: boolean;
  label: React.ReactNode;
}) {
  const [checked, setChecked] = useState(defaultChecked);

  const toggle = () => setChecked(!checked);

  return (
    <div
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
      className={`group flex items-start gap-2.5 p-2 rounded-xl border cursor-pointer select-none transition-all w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D7A6E] dark:focus-visible:ring-[#2DD4BF] ${
        checked
          ? "bg-[#DAF0EC]/70 dark:bg-[rgba(45,212,191,0.15)] border-[#BCE1D8] dark:border-[rgba(45,212,191,0.3)] text-[#0D7A6E] dark:text-[#2DD4BF]"
          : "bg-white/70 dark:bg-[#0D1C1E]/60 border-[#DBE9E6] dark:border-[rgba(16,148,133,0.2)] hover:border-[#0D7A6E]/40"
      }`}
    >
      <div className="mt-0.5 shrink-0">
        {checked ? (
          <CheckSquare className="w-4 h-4 text-[#0D7A6E] dark:text-[#2DD4BF]" />
        ) : (
          <Square className="w-4 h-4 text-[#4E6B63] dark:text-[#8FA8A1] group-hover:text-[#0D7A6E]" />
        )}
      </div>
      <span className={`text-xs sm:text-sm leading-snug ${checked ? "line-through opacity-80" : ""}`}>
        {label}
      </span>
    </div>
  );
}
