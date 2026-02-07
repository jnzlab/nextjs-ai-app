"use client";
import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import {
  HiUserCircle,
  HiOutlineSparkles,
  HiOutlinePaperAirplane,
  HiOutlineStop,
} from "react-icons/hi2";

export default function Page() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, error, status, stop } = useChat();

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    setInput("");
    sendMessage({ text: input });
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
          Next.js AI Chat
        </h1>
      </header>
      {error && (
        <div className="mx-4 mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          {error.message}
        </div>
      )}
      <div className="relative flex flex-1 flex-col">
        <main className="flex-1 overflow-y-auto px-4 py-6 mb-[84px]">
          <div className="mx-auto flex max-w-2xl flex-col gap-6">
            {messages.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-100/50 px-8 py-12 text-center dark:border-slate-700 dark:bg-slate-800/30">
                <p className="text-slate-500 dark:text-slate-400">
                  Send a message to get started
                </p>
              </div>
            )}
            {messages.map((message) => {
              const isUser = message.role === "user";
              return (
                <div
                  key={message.id}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      isUser
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "bg-white text-slate-800 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700"
                    }`}
                  >
                    <div className="mb-1 text-xs font-medium flex items-center gap-1 opacity-80">
                      {isUser ? (
                        <>
                          <HiUserCircle className="w-4 h-4 inline-block align-middle" />
                        </>
                      ) : (
                        <>
                          <HiOutlineSparkles className="w-4 h-4 inline-block align-middle" />
                        </>
                      )}
                    </div>
                    <div className="space-y-1 text-[15px] leading-relaxed">
                      {message.parts.map((part, index) => {
                        switch (part.type) {
                          case "text":
                            return (
                              <div
                                key={`${message.id}-${index}`}
                                className="whitespace-pre-wrap wrap-break-word"
                              >
                                {part.text}
                              </div>
                            );
                          default:
                            return null;
                        }
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
            {(status === "submitted" || status === "streaming") && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <svg
                      className="h-4 w-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
        <footer className="fixed left-0 right-0 bottom-0 border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-900 z-10">
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-2xl gap-3"
          >
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20"
            />
            {(status === "submitted" || status === "streaming") ? (
              <button
                type="button"
                onClick={stop}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 flex items-center gap-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <HiOutlineStop className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={status !== "ready"}
                className="rounded-xl bg-indigo-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 flex items-center gap-2 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                <HiOutlinePaperAirplane className="w-5 h-5" />
              </button>
            )}
          </form>
        </footer>
      </div>
    </div>
  );
}
