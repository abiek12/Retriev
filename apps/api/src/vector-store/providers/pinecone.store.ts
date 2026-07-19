import { env } from "../../config/env";
import { IEmbeddingsProvider } from "../../embeddings/embedding.interface";
import { IVectorStore } from "../vector-store.interface";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";

class PineconeStore implements IVectorStore {
  private pinecone = new PineconeClient();
  // Will automatically read the PINECONE_API_KEY and PINECONE_ENVIRONMENT env vars
  private pineconeIndex = this.pinecone.Index(env.pineconeIndex);

  private constructor(
    private embeddings: IEmbeddingsProvider
  ) {}

  async addDocuments(chunks: any[]): Promise<void> {
    console.log("Document added!");
  };

  async similaritySearch(query: string): Promise<any[]> {
    console.log("Document got!");
    return new Promise(() => {
      return ['1']
    })
  };
};

export default PineconeStore;
