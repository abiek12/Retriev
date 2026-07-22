import { Hono } from "hono";
import controller from "./document.controller";

const router = new Hono();

router.post("/index", controller.index(c));

export default router;
