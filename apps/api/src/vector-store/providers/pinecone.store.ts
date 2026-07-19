import { IVectorStore } from "../vector-store.interface";

class PineconeStore implements IVectorStore {
  async connect(): Promise<void> {
    console.log("Pinecone Connected!");
  }

  async addDocuments(chunks: any[]): Promise<void> {
    console.log("Document added!");
  }
};

export default PineconeStore;
