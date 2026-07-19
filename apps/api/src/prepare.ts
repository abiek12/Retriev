import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { FileTypes } from "./utils/enums";
import { IFileLoader } from "./utils/interfaces";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"

class PdfLoader implements IFileLoader {
  async load(filePath: string):Promise<any> {
    const loader = new PDFLoader(filePath, {splitPages: false});
    const doc = await loader.load();

    return doc[0].pageContent;
  }
}

class TextLoader implements IFileLoader {
  load(filePath: string): any {
    return ['text content']
  }
}

export class filePrepareFactory {
  private constructor() { }

  public static createFileLoader(type: FileTypes): IFileLoader {
    switch(type) {
      case FileTypes.PDF:
        return new PdfLoader();
      case FileTypes.TEXT:
        return new TextLoader();
      default:
        throw new Error("Invalid file type!")
    }
  };
}

export class ChunkFile {
  constructor(
    chunkSize: number,
    chunkOverlap: number
  ) {
    this.splitter = new RecursiveCharacterTextSplitter({
      chunkSize: chunkSize,
      chunkOverlap: chunkOverlap
    });
  }

  private splitter;

  public async textSplitter(content: string) {
    return await this.splitter.splitText(content);
  }
};
