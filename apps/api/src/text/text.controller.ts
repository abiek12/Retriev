import { IndexTextDtoType } from "./dto/index-text.dto";
import textService from "./text.service";

class TextController {
  async index(c) {
    const dto: IndexTextDtoType = c.req.valid("json");

    await textService.index(dto);

    return c.json({
      success: true,
      message: "Document indexed successfully",
    });
  }
}

export default new TextController();
