import { IVectorStore } from "../../utils/interfaces";

class MongoVectorStore implements IVectorStore {
  async connect(): Promise<void> {
    console.log("Mongo vector connnected!")
  }

  async addDocuments(chunks: any[]): Promise<void> {
    console.log("Document added!")
  }
};

export default MongoVectorStore;
