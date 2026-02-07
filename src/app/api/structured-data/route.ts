import { Output, streamText, wrapLanguageModel, extractJsonMiddleware } from "ai";
import { google } from "@ai-sdk/google";
import { userSchema } from "./schema";

const model = wrapLanguageModel({
    model: google("gemini-2.5-flash-lite"),
    middleware: extractJsonMiddleware(),
});

export async function POST(req: Request) {
    const { prompt } = await req.json();

    try {
    const result = streamText({
        model,
        prompt,
        output: Output.object({ schema: userSchema }),
    });

    result.usage.then((usage) => {
        console.log({
            inputTokens: usage.inputTokens,
            outputTokens: usage.outputTokens,
            totalTokens: usage.totalTokens,
        });
    });

    return result.toTextStreamResponse();
    } catch (error) {
        console.error("Error generating response: ", error);
        return Response.json(
            { error: "Error generating response" },
            { status: 500 },
        );
    }
}