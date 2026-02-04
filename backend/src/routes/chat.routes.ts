import { Router } from "express";
import { postMessage, fetchHistory } from "../controllers/chat.controller";

const router = Router();

router.post("/message", postMessage);
router.get("/history/:sessionId", fetchHistory);

export default router;
