import { Hono } from "hono";
import controller from "./chat.controller";

const router = new Hono();

router.post("/chat/messages", (c) => controller.chat(c));
