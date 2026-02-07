"use client";
import { useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import {
  HiOutlinePaperAirplane,
  HiOutlineStop,
} from "react-icons/hi2";
import { userSchema } from "@/app/api/structured-data/schema";

export default function Page() {
  const [input, setInput] = useState("");
  const { object, error, submit, isLoading, stop } = useObject({
    api: "/api/structured-data",
    schema: userSchema,
  });

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    setInput("");
    submit({ prompt: input });
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
        <main className="flex-1 overflow-y-auto px-4 py-6 mb-[110px]">
          <div className="mx-auto max-w-2xl flex flex-col items-center">
            {/* Structured Object Output */}
            {(object !== undefined && object !== null) ? (
              <div className="w-full rounded-2xl border border-slate-200 bg-white dark:bg-slate-800 dark:border-slate-700 shadow px-8 py-8 mb-8">
                <h2 className="font-semibold text-lg mb-4 text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  Generated User Object
                </h2>
                <dl className="divide-y divide-slate-200 dark:divide-slate-700">
                  <div className="py-2 flex items-center gap-2">
                    <dt className="font-medium text-slate-700 dark:text-slate-300 w-24">Name:</dt>
                    <dd className="flex-1 text-slate-900 dark:text-slate-100">{object?.name ?? (isLoading ? "..." : "—")}</dd>
                  </div>
                  <div className="py-2 flex items-center gap-2">
                    <dt className="font-medium text-slate-700 dark:text-slate-300 w-24">Email:</dt>
                    <dd className="flex-1 text-slate-900 dark:text-slate-100">{object?.email ?? (isLoading ? "..." : "—")}</dd>
                  </div>
                  <div className="py-2 flex items-center gap-2">
                    <dt className="font-medium text-slate-700 dark:text-slate-300 w-24">Age:</dt>
                    <dd className="flex-1 text-slate-900 dark:text-slate-100">{object?.age ?? (isLoading ? "..." : "—")}</dd>
                  </div>
                </dl>
              </div>
            ) : (
              <div className="w-full rounded-2xl border border-dashed border-slate-200 bg-slate-100/50 px-8 py-12 text-center dark:border-slate-700 dark:bg-slate-800/30 text-slate-500 dark:text-slate-400 mb-8">
                No user generated yet.
              </div>
            )}
            {isLoading && (
              <div className="flex justify-center items-center my-4">
                <svg
                  className="h-5 w-5 animate-spin text-indigo-600 dark:text-indigo-400 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
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
                <span>Generating user...</span>
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
              placeholder="Generate a random user"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20"
              autoComplete="off"
            />
            {isLoading ? (
              <button
                type="button"
                onClick={stop}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 flex items-center gap-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <HiOutlineStop className="w-5 h-5" />
                Stop
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="rounded-xl bg-indigo-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 flex items-center gap-2 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                <HiOutlinePaperAirplane className="w-5 h-5" />
                Generate
              </button>
            )}
          </form>
        </footer>
      </div>
    </div>
  );
}
