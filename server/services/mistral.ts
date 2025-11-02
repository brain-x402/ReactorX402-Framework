import { Mistral } from "@mistralai/mistralai";
import type { Message } from "@shared/schema";
import * as fs from "fs";
import * as path from "path";

const apiKey = process.env.MISTRAL_API_KEY;

if (!apiKey) {
  console.warn("MISTRAL_API_KEY is not set. AI features will not work.");
}

const client = apiKey ? new Mistral({ apiKey }) : null;

let systemPrompt: string = "";

try {
  const characterPath = path.join(process.cwd(), "character.txt");
  systemPrompt = fs.readFileSync(characterPath, "utf-8");
  console.log("BrainX character persona loaded successfully");
} catch (error) {
  console.warn("character.txt not found. Using default system prompt.");
  systemPrompt = "You are BrainX, a helpful and witty AI assistant.";
}

export async function generateChatResponse(
  userMessage: string,
  conversationHistory: Message[] = []
): Promise<string> {
  if (!client) {
    throw new Error("Mistral AI is not configured. Please add MISTRAL_API_KEY to your secrets.");
  }

  try {
    const messages = [
      {
        role: "system" as const,
        content: systemPrompt,
      },
      ...conversationHistory.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: "user" as const,
        content: userMessage,
      }
    ];

    const chatResponse = await client.chat.complete({
      model: "mistral-large-latest",
      messages,
      temperature: 0.7,
    });

    const responseContent = chatResponse.choices?.[0]?.message?.content;
    
    if (!responseContent) {
      throw new Error("No response from Mistral AI");
    }

    if (typeof responseContent === "string") {
      return responseContent;
    }

    throw new Error("Unexpected response format from Mistral AI");
  } catch (error: any) {
    console.error("Mistral AI error:", error);
    throw new Error(`Failed to generate AI response: ${error.message}`);
  }
}
