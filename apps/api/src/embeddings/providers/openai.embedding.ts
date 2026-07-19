import { OpenAIEmbeddings } from "@langchain/openai";
import { IEmbeddingsProvider } from "../embedding.interface";

class OpenAIEmbeddingProvider implements IEmbeddingsProvider {
  private embeddings = new OpenAIEmbeddings({
    model: process.env.OPENAI_EMBEDDING_MODEL
  });

  embedDocument(text: string): Promise<number[]> {
    console.log("embeded doc");

    return new Promise(() => {
      return [1,2]
    })
  }

  embedQuery(text: string): Promise<number[]> {
    console.log("embeded query");

    return new Promise(() => {
      return [1,2]
    })
  }
};

export default OpenAIEmbeddingProvider;
