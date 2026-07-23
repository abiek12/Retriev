import type { Context } from "hono";
import documentService from "./document.service";
import { IndexDocumentDtoType } from "./dto/index-document.dto";

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
    let body: IndexDocumentDtoType = await c.req.json();
    body.type = "text";

    await documentService.index(body);

    return c.json({
      success: true,
      message: "Document indexed successfully",
    });
  }
}

export default new DocumentController();
