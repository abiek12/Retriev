export interface IEmbeddingsProvider {
  embedQuery(text: string): Promise<number[]>;

  embedDocument(text: string): Promise<number[]>;
};
