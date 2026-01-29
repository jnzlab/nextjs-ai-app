import { google } from "@ai-sdk/google";
import { type UIMessage, convertToModelMessages, streamText } from "ai";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  try {
    const result = streamText({
      model: google("gemini-2.5-flash-lite"),
      messages: await convertToModelMessages(messages),
    });

    result.usage.then((usage) => {
      console.log({
        messageCount: messages.length,
        inputTokens: usage.inputTokens,
        outputTokens: usage.outputTokens,
        totalTokens: usage.totalTokens,
      });
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error generating response: ", error);
    return Response.json(
      { error: "Error generating response" },
      { status: 500 },
    );
  }
}
