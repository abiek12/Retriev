import { IndexTextDtoType } from "./dto/index-text.dto";

class TextService {
  async index(c: IndexTextDtoType) {
    const { textContent } = c;
    const textContentLength = textContent.length;

    // Chunk

    // Embedded

    // Store vector embedded

    return;
  }
}

export default new TextService();
