import { streamText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const response = streamText({
      model: google("gemini-2.5-flash-lite"),
      prompt,
    });

    return response.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error while generating the response: ", error);
    return Response.json(
      { error: "Error while generating the response" },
      { status: 500 },
    );
  }
}
