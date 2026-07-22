import EmbeddingFactory from "../embeddings/embedding.factory";
import { EmbeddingsModelConfig } from "../embeddings/embedding.types";
import { ChunkFile, filePrepareFactory } from "../prepare";
import { FileTypes } from "../utils/enums";
import VectorStoreFactory from "../vector-store/vector-store.factory";
import { VectorStoreConfig } from "../vector-store/vector-store.types";

class DocumentService {
  async index(payload: { filePath: string }) {
    // File preperation
    const contentSplitter = new ChunkFile(500, 100);

    // Load files
    const loader = filePrepareFactory.createFileLoader(FileTypes.PDF);
    const fileContent = await loader.load(payload.filePath);

    // Split loaded content into chunks
    const chunks = await contentSplitter.textSplitter(fileContent);

    // Embeddings
    const embeddingProvider = EmbeddingFactory.getInstance(
      EmbeddingsModelConfig.OPENAI,
    );
    let embeddings;
    try {
      embeddings = await embeddingProvider.embedDocumentChunks(chunks);
    } catch (err) {
      console.log("Error while embedding doc: ", err);
      throw new Error("error while embeddings");
    }

    // prepare vector
    const vectors = chunks.map((chunk, index) => ({
      id: crypto.randomUUID(),
      values: embeddings[index],
      metadata: {
        text: chunk,
      },
    }));

    // Store in vector store
    const vectorStoreProvider = VectorStoreFactory.getInstance(
      VectorStoreConfig.PINECONE,
    );
    try {
      await vectorStoreProvider.addDocuments(vectors);
    } catch (err) {
      console.log("Error while store embeddings to store: ", err);
      throw new Error("Error while store embeddings to store");
    }

    return;
  }
}

export default new DocumentService();
