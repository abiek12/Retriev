import { Hono } from "hono";
import controller from "./text.controller";
import { zValidator } from "@hono/zod-validator";
import { IndexTextDto } from "./dto/index-text.dto";

const router = new Hono();

router.post("/index", zValidator("json", IndexTextDto), (c) =>
  controller.index(c),
);

export default router;
