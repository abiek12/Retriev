import { Hono } from "hono";
import controller from "./document.controller";

const router = new Hono();

router.post("/index", (c) => controller.index(c));

export default router;
