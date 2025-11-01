import { Mistral } from "@mistralai/mistralai";
import type { Message } from "@shared/schema";

const apiKey = process.env.MISTRAL_API_KEY;

if (!apiKey) {
  console.warn("MISTRAL_API_KEY is not set. AI features will not work.");
}

const client = apiKey ? new Mistral({ apiKey }) : null;

export async function generateChatResponse(
  userMessage: string,
  conversationHistory: Message[] = []
): Promise<string> {
  if (!client) {
    throw new Error("Mistral AI is not configured. Please add MISTRAL_API_KEY to your secrets.");
  }

  try {
    const messages = [
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
      model: "mistral-small-latest",
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
