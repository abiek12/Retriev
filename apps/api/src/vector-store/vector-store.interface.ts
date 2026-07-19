export interface IVectorStore {
  connect(): Promise<void>;

  addDocuments(chunks: any[]): Promise<void>
};
