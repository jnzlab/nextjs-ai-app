import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  try {
    const { input } = await req.json();
    const { text } = await generateText({
      model: google("gemini-2.5-flash-lite"),
      prompt: input,
    });

    return Response.json({ text });
  } catch (error) {
    console.error("Error while generating response", error);
    return Response.json(
      { error: "Failed to generate response" },
      { status: 500 },
    );
  }
}
