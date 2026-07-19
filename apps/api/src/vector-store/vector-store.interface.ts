export interface IVectorStore {
  addDocuments(chunks: any[]): Promise<void>;
  similaritySearch(query: number[]): Promise<any>;
};
