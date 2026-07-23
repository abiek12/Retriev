import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import controller from "./document.controller";
import { IndexDocumentDto } from "./dto/index-document.dto";

const router = new Hono();

router.post("/index-file", zValidator("json", IndexDocumentDto), (c) =>
  controller.indexFile(c),
);
router.post("/index-text", zValidator("json", IndexDocumentDto), (c) =>
  controller.indexText(c),
);

export default router;
