import { Request, Response } from "express";
import {
  handleChatMessage,
  getConversationHistory,
} from "../services/chat.service";

export async function postMessage(req: Request, res: Response) {
  try {
    const { message, sessionId } = req.body;
    const result = await handleChatMessage(message, sessionId);
    res.json(result);
  } catch (err: any) {
    if (err.message === "EMPTY_MESSAGE") {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    res.status(500).json({
      error: "Sorry, the agent is unavailable right now.",
    });
  }
}

export async function fetchHistory(req: Request, res: Response) {
  const { sessionId } = req.params;
  const messages = await getConversationHistory(sessionId);
  res.json({ messages });
}
