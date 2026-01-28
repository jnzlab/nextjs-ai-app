"use client";
import { useCompletion } from "@ai-sdk/react";
export default function Page() {
  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    completion,
    stop,
  } = useCompletion({ api: "/api/stream" });

  return (
    <div>
      {error && <div>{error.message}</div>}
      {isLoading && !completion && <div>Loading...</div>}
      {completion && <div>{completion}</div>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setInput("");
          handleSubmit(e);
        }}
      >
        <input
          placeholder="Ask me anything..."
          value={input}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <button type="submit">Send</button>
        {isLoading && <button onClick={stop}>Stop</button>}
      </form>
    </div>
  );
}
