import { FileTypes } from "./utils/enums";
import { FileLoader } from "./utils/interfaces";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"

class PdfLoader implements FileLoader {
  async load(filePath: string):Promise<any> {
    const loader = new PDFLoader(filePath);
    const docs = await loader.load();

    return docs;
  }
}

class TextLoader implements FileLoader {
  load(filePath: string): any {
    return ['text content']
  }
}

export class fileLoaderFactory {
  private constructor() { }

  public static createFileLoader(type: FileTypes): FileLoader {
    switch(type) {
      case FileTypes.PDF:
        return new PdfLoader();
      case FileTypes.TEXT:
        return new TextLoader();
      default:
        throw new Error("Invalid file type!")
    }
  }
}
