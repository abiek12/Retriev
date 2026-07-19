export interface IVectorStore {
  addDocuments(chunks: any[]): Promise<void>;
  similaritySearch(query: string): Promise<any[]>;
};
