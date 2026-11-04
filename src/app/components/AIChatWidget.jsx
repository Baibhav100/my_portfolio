"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Sparkles, Send, X, Bot, User, Zap, AlertCircle,
  AlertTriangle, CheckCircle2, RefreshCw, Database,
  ChevronDown, ChevronUp, PenLine
} from "lucide-react";
import { useProjectPreview } from "@/context/ProjectPreviewContext";
import { portfolioChunks } from "@/data/portfolioChunks";

// ── Suggestion chips ────────────────────────────────────────────
const SUGGESTIONS = [
  "What are your key skills?",
  "Tell me about SprintDesk",
  "What's your work experience?",
  "Are you open to new roles?",
  "How can I contact you?",
];

// ── Confidence badge ─────────────────────────────────────────────
const ConfidenceBadge = ({ confidence }) => {
  if (confidence == null) return null;
  const pct = Math.round(confidence * 100);
  const color =
    pct >= 80 ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
    : pct >= 60 ? "text-yellow-400 bg-yellow-500/10 border-yellow-500/30"
    : "text-red-400 bg-red-500/10 border-red-500/30";
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full border font-medium ${color}`}>
      <CheckCircle2 className="w-2.5 h-2.5" /> {pct}% confidence
    </span>
  );
};

// ── RAG sources panel ───────────────────────────────────────────
const SourcesPanel = ({ sources }) => {
  const [open, setOpen] = useState(false);
  if (!sources?.length) return null;
  return (
    <div className="mt-1.5">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-[10px] text-white/30 hover:text-white/60 transition-colors"
      >
        <Database className="w-2.5 h-2.5" />
        {sources.length} source{sources.length > 1 ? "s" : ""} retrieved
        {open ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
      </button>
      {open && (
        <div className="mt-1 flex flex-wrap gap-1">
          {sources.map((s) => (
            <span
              key={s.id}
              className="text-[10px] px-1.5 py-0.5 rounded bg-white/8 border border-white/10 text-white/40"
              title={`Similarity: ${s.score}`}
            >
              {s.category}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

// ── HITL Clarification widget ────────────────────────────────────
const HITLWidget = ({ onSubmitCorrection, isLoading }) => {
  const [text, setText] = useState("");
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mt-2 p-2.5 rounded-xl bg-yellow-500/8 border border-yellow-500/25">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />
          <span className="text-yellow-300 text-xs font-semibold">AI is uncertain</span>
        </div>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-[10px] text-white/40 hover:text-white/70 flex items-center gap-1 transition-colors"
        >
          <PenLine className="w-3 h-3" />
          {expanded ? "Cancel" : "Help me improve"}
        </button>
      </div>
      {!expanded && (
        <p className="text-white/40 text-[11px]">
          The AI could not retrieve enough context. Click &quot;Help me improve&quot; to clarify.
        </p>
      )}
      {expanded && (
        <div className="space-y-1.5">
          <p className="text-white/50 text-[11px]">
            Add context or rephrase your question so the AI can retrieve better information:
          </p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g. 'I'm asking about his React projects specifically' or 'I meant his Python skills'"
            rows={2}
            className="w-full bg-white/8 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-white/25 focus:outline-none focus:border-yellow-500/50 transition-colors resize-none"
          />
          <button
            onClick={() => { onSubmitCorrection(text); setText(""); setExpanded(false); }}
            disabled={!text.trim() || isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-500/80 hover:bg-yellow-400/80 disabled:opacity-40 text-black text-xs font-semibold transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            Re-generate with this context
          </button>
        </div>
      )}
    </div>
  );
};

// ── Markdown-like message formatter ─────────────────────────────
const boldify = (text) =>
  text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

const formatMessage = (text) => {
  // Strip the CONFIDENCE: line before rendering
  const cleanText = text.replace(/CONFIDENCE:\s*[0-9.]+\s*$/im, "").trim();
  return cleanText.split("\n").map((line, i) => {
    if (line.trim() === "---" || line.trim() === "───") {
      return <hr key={i} className="my-2 border-gray-200 dark:border-gray-700" />;
    }
    if (line.startsWith("• ") || line.startsWith("- ")) {
      return (
        <div key={i} className="flex items-start gap-2 py-0.5">
          <span className="text-purple-400 mt-0.5 shrink-0">•</span>
          <span dangerouslySetInnerHTML={{ __html: boldify(line.slice(2)) }} />
        </div>
      );
    }
    if (/^\d+\.\s/.test(line.trim())) {
      return (
        <div key={i} className="py-0.5 font-medium"
          dangerouslySetInnerHTML={{ __html: boldify(line) }} />
      );
    }
    if (line.trim() === "") return <div key={i} className="h-1" />;
    return (
      <div key={i} className="py-0.5 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: boldify(line) }} />
    );
  });
};

// ── Typing cursor ────────────────────────────────────────────────
const Cursor = () => (
  <span className="inline-block w-0.5 h-3.5 bg-purple-400 ml-0.5 animate-pulse rounded" />
);

// ── Main AIChatWidget ────────────────────────────────────────────
const AIChatWidget = () => {
  const { isSplit, isExpanded, splitRatio } = useProjectPreview();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "model",
      text: "Hey there! 👋 I'm Baibhav's AI assistant — powered by Gemini with RAG retrieval. Ask me anything about his skills, projects, experience, or how to get in touch!",
      confidence: null,
      isUncertain: false,
      sources: [],
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [activeModel, setActiveModel] = useState(null);
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  // ── Core: send message via RAG+streaming API ─────────────────
  const sendMessage = useCallback(
    async (text, humanCorrection = null) => {
      if (!text.trim() || isStreaming) return;
      setError(null);

      const userMsg = { role: "user", text };

      // The full conversation for context
      const conversationHistory = humanCorrection
        ? messages // re-use history as-is (correction is passed separately)
        : [...messages, userMsg];

      // Optimistically add user message + empty AI placeholder
      if (!humanCorrection) {
        setMessages((prev) => [
          ...prev,
          userMsg,
          { role: "model", text: "", streaming: true, sources: [], confidence: null },
        ]);
      } else {
        // For HITL re-generation, replace last AI message with a fresh placeholder
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "model",
            text: "",
            streaming: true,
            sources: [],
            confidence: null,
            isHITL: true,
          };
          return updated;
        });
      }

      setUserInput("");
      setIsStreaming(true);

      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const body = humanCorrection
          ? { messages: conversationHistory, humanCorrection }
          : { messages: conversationHistory };

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          signal: controller.signal,
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let accumulated = "";
        let metaSources = [];

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split("\n\n");
          buffer = parts.pop() ?? "";

          for (const part of parts) {
            const line = part.replace(/^data:\s*/, "").trim();
            if (!line) continue;
            try {
              const parsed = JSON.parse(line);

              if (parsed.type === "meta") {
                metaSources = parsed.retrievedChunks || [];
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    ...updated[updated.length - 1],
                    sources: metaSources,
                  };
                  return updated;
                });
              } else if (parsed.type === "model" || parsed.type === "fallback") {
                setActiveModel(parsed.model);
              } else if (parsed.type === "chunk") {
                accumulated += parsed.text;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    ...updated[updated.length - 1],
                    text: accumulated,
                    streaming: true,
                  };
                  return updated;
                });
              } else if (parsed.type === "done") {
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    ...updated[updated.length - 1],
                    text: accumulated,
                    streaming: false,
                    confidence: parsed.confidence,
                    isUncertain: parsed.isUncertain,
                    sources: metaSources,
                  };
                  return updated;
                });
              } else if (parsed.type === "error") {
                throw new Error(parsed.message);
              }
            } catch {
              // skip malformed SSE
            }
          }
        }
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message || "Something went wrong. Please try again.");
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last?.streaming) {
            updated[updated.length - 1] = {
              ...last,
              text: last.text || "⚠️ Could not get a response. Please try again.",
              streaming: false,
              isError: true,
            };
          }
          return updated;
        });
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, isStreaming]
  );

  // HITL: user provided clarification
  const handleHITLCorrection = (correction) => {
    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
    if (lastUserMsg) {
      sendMessage(lastUserMsg.text, correction);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(userInput);
  };

  return (
    <div
      className={`fixed bottom-6 z-50 transition-all duration-300 ${
        isExpanded ? "hidden pointer-events-none" : ""
      }`}
      style={
        isSplit
          ? { right: `calc(${100 - splitRatio}% + 1.5rem)` }
          : { right: "1.5rem" }
      }
    >
      {/* ── Chat window ─────────────────────────────────────── */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] h-[560px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-white/15 mb-3">

          {/* Header */}
          <header className="px-4 py-3 bg-gradient-to-r from-purple-800 to-purple-500 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-purple-700" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-none">
                  Baibhav&apos;s AI <span className="text-white/50 font-normal">(RAG)</span>
                </p>
                {activeModel && (
                  <p className="text-white/60 text-[10px] mt-0.5 flex items-center gap-1">
                    <Zap className="w-2.5 h-2.5" /> {activeModel}
                    <span className="mx-1 text-white/30">·</span>
                    <Database className="w-2.5 h-2.5" /> Embedding retrieval
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </header>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-4 bg-gray-50/30 dark:bg-[#0f1115]/30">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.role === "model" ? "items-start" : "items-end"}`}
              >
                <div className={`flex items-end gap-2 max-w-[92%] ${msg.role === "model" ? "flex-row" : "flex-row-reverse"}`}>
                  {/* Avatar */}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === "model" ? "bg-purple-600" : "bg-emerald-500"
                  }`}>
                    {msg.role === "model"
                      ? <Bot className="w-3.5 h-3.5 text-white" />
                      : <User className="w-3.5 h-3.5 text-white" />
                    }
                  </div>

                  {/* Bubble */}
                  <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === "model"
                      ? `bg-white dark:bg-gray-800 border rounded-bl-sm text-gray-700 dark:text-gray-200 ${
                          msg.isError
                            ? "border-red-300 dark:border-red-800"
                            : "border-gray-200/60 dark:border-gray-700/60"
                        }`
                      : "bg-gradient-to-br from-purple-700 to-indigo-600 text-white rounded-br-sm"
                  }`}>
                    {msg.role === "model" ? (
                      <>{formatMessage(msg.text)}{msg.streaming && <Cursor />}</>
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>

                {/* Footer: label + confidence + sources + HITL */}
                {msg.role === "model" && (
                  <div className="px-8 mt-1 w-full">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                        {msg.isHITL ? "Re-generated" : "Assistant"}
                      </span>
                      {!msg.streaming && (
                        <ConfidenceBadge confidence={msg.confidence} />
                      )}
                    </div>
                    {!msg.streaming && msg.sources?.length > 0 && (
                      <SourcesPanel sources={msg.sources} />
                    )}
                    {/* HITL widget */}
                    {!msg.streaming && msg.isUncertain && !isStreaming && (
                      <HITLWidget
                        onSubmitCorrection={handleHITLCorrection}
                        isLoading={isStreaming}
                      />
                    )}
                  </div>
                )}
                {msg.role === "user" && (
                  <span className="mt-1 text-[10px] text-gray-400 uppercase tracking-wider px-8">You</span>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isStreaming && messages[messages.length - 1]?.text === "" && (
              <div className="flex items-end gap-2">
                <div className="w-6 h-6 rounded-full bg-purple-600/50 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-gray-700/60 flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 text-xs">
                <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                {error}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions (first open) */}
          {messages.length <= 1 && !isStreaming && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5 flex-shrink-0">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => sendMessage(s)}
                  className="text-xs px-2.5 py-1.5 rounded-full border border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors">
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* RAG info bar */}
          <div className="px-3 py-1.5 bg-purple-500/5 border-t border-purple-500/10 flex items-center gap-1.5 flex-shrink-0">
            <Database className="w-3 h-3 text-purple-400/60" />
            <span className="text-[10px] text-white/30">
              Gemini RAG · {portfolioChunks.length} portfolio chunks indexed
            </span>
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit}
            className="p-3 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 flex items-center gap-2 flex-shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask about skills, projects, experience…"
              disabled={isStreaming}
              className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40 disabled:opacity-50 transition"
            />
            <button type="submit" disabled={!userInput.trim() || isStreaming}
              className="p-2.5 bg-gradient-to-r from-purple-800 to-purple-600 text-white rounded-xl hover:to-purple-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              aria-label="Send">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* ── Floating button ────────────────────────────────── */}
      <div className="relative inline-flex items-center">
        {!isOpen && (
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap before:content-[''] before:absolute before:top-1/2 before:-right-2 before:-translate-y-1/2 before:border-y-8 before:border-y-transparent before:border-l-8 before:border-l-gray-800 animate-bounce">
            Talk with me!
          </div>
        )}
        <button onClick={() => setIsOpen((v) => !v)}
          className="p-4 bg-gradient-to-r from-purple-800 to-purple-600 text-white rounded-full shadow-xl hover:to-purple-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-white/20"
          aria-label="Open AI chat">
          <Sparkles className="w-7 h-7 fill-white/20" />
        </button>
      </div>
    </div>
  );
};

export default AIChatWidget;