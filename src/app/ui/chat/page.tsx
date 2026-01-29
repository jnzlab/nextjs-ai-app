"use client";
import { useState } from "react";
import { useChat } from "@ai-sdk/react";
export default function Page() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, error, status, stop } = useChat();

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    sendMessage({ text: input });
    setInput("");
  };
  return (
    <div>
      {error && <div>{error.message}</div>}
      {messages.map((message) => {
        return (
          <div key={message.id}>
            <div>{message.role === "user" ? "User:" : "AI:"}</div>
            {message.parts.map((part, index) => {
              switch (part.type) {
                case "text":
                  return (
                    <div key={`${message.id} - ${index}`}>{part.text}</div>
                  );
                default:
                  return null;
              }
            })}
          </div>
        );
      })}
      {status === "submitted" ||
        (status === "streaming" && <div>Loading...</div>)}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Ask my anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" disabled={status != "ready"}>
          Send
        </button>
        {status == "submitted" ||
          (status == "streaming" && <button onClick={stop}>Stop</button>)}
      </form>
    </div>
  );
}
