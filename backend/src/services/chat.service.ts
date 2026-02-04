import { prisma } from "../db/prisma";
import { generateReply } from "./llm.service";

export async function handleChatMessage(
  message: string,
  sessionId?: string
) {
  if (!message.trim()) {
    throw new Error("EMPTY_MESSAGE");
  }

  if (message.length > 2000) {
    message = message.slice(0, 2000);
  }

  let conversation;

  if (sessionId) {
    conversation = await prisma.conversation.findUnique({
      where: { id: sessionId },
      include: { messages: true },
    });
  }

  if (!conversation) {
    conversation = await prisma.conversation.create({
      data: {},
      include: { messages: true },
    });
  }

  await prisma.message.create({
    data: {
      conversationId: conversation.id,
      sender: "user",
      text: message,
    },
  });

  const history = conversation.messages.map((m) => ({
    role: m.sender === "user" ? "user" : "assistant",
    content: m.text,
  }));

  const reply = await generateReply(history, message);

  await prisma.message.create({
    data: {
      conversationId: conversation.id,
      sender: "ai",
      text: reply,
    },
  });

  return { reply, sessionId: conversation.id };
}

export async function getConversationHistory(sessionId: string) {
  return prisma.message.findMany({
    where: { conversationId: sessionId },
    orderBy: { createdAt: "asc" },
  });
}
