import type { Context } from "hono";
import documentService from "./document.service";

class DocumentController {
  async index(c: Context) {
    const filePath = `${import.meta.dir}/test.pdf`;

    await documentService.index({ filePath });

    return c.json({
      success: true,
      message: "Document indexed successfully",
    });
  }
}

export default new DocumentController();
