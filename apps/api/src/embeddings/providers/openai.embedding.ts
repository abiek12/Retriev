import { OpenAIEmbeddings } from "@langchain/openai";
import { IEmbeddingsProvider } from "../embedding.interface";
import OpenAI from "openai";
import { env } from "../../config/env";

class OpenAIEmbeddingProvider implements IEmbeddingsProvider {
  private openai = new OpenAI();

  async embedDocument(text: string): Promise<number[]> {
    const response = await this.openai.embeddings.create({
      model: env.embeddingModel,
      input: text,
      encoding_format: 'float'
    });

    return response.data[0].embedding;
  }

  async embedDocumentChunks(chunks: string[]): Promise<any[]> {
    const response = await this.openai.embeddings.create({
      model: env.embeddingModel,
      input: chunks,
      encoding_format: 'float'
    });

    return response.data;
  }

  async embedQuery(text: string): Promise<number[]> {
    console.log("embeded query");

    return new Promise(() => {
      return [1,2]
    })
  }
};

export default OpenAIEmbeddingProvider;
