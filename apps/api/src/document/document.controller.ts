import type { Context } from "hono";
import documentService from "./document.service";

class DocumentController {
  async indexFile(c: Context) {
    const filePath = `${import.meta.dir}/../test.pdf`;
    const type = "file";

    await documentService.index({ type, filePath });

    return c.json({
      success: true,
      message: "Document indexed successfully",
    });
  }

  async indexText(c: Context) {
    const dto: any = c.body;
    const type = "text";

    await documentService.index({ type, text: dto.textContent });

    return c.json({
      success: true,
      message: "Document indexed successfully",
    });
  }
}

export default new DocumentController();
