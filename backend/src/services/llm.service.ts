import OpenAI from "openai";
import { SYSTEM_PROMPT } from "../utils/prompt";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function generateReply(
  history: { role: "user" | "assistant"; content: string }[],
  userMessage: string
): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...history,
        { role: "user", content: userMessage },
      ],
      max_tokens: 200,
      temperature: 0.3,
    });

    return completion.choices[0].message.content || "";
  } catch (error) {
    console.error("LLM error:", error);
    throw new Error("LLM_FAILED");
  }
}
