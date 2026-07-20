import { Hono } from 'hono'
import { FileTypes } from './utils/enums'
import { ChunkFile, filePrepareFactory } from './prepare';
import EmbeddingFactory from './embeddings/embedding.factory';
import { EmbeddingsModelConfig } from './embeddings/embedding.types';
import VectorStoreFactory from './vector-store/vector-store.factory';
import { VectorStoreConfig } from './vector-store/vector-store.types';

const app = new Hono()

app.get('/index', async (c) => {
  const contentSplitter = new ChunkFile(500, 100);

  const loader = filePrepareFactory.createFileLoader(FileTypes.PDF);
  const filePath = `${import.meta.dir}/test.pdf`;

  const fileContent = await loader.load(filePath);

  const chunks = await contentSplitter.textSplitter(fileContent);

  // Embeddings
  const embeddingProvider = EmbeddingFactory.getInstance(EmbeddingsModelConfig.OPENAI);
  let embeddings
  try {
    embeddings = await embeddingProvider.embedDocumentChunks(chunks);
  } catch (err) {
    console.log("Error while embedding doc: ", err);
    throw new Error("error while embeddings");
  }

  // prepare vector
  const vectors = chunks.map((chunk, index) => ({
    id: crypto.randomUUID(),
    value: embeddings[index],
    metadata: {
      text: chunk
    }
  }));

  // Store in vector store
  const vectorStoreProvider = VectorStoreFactory.getInstance(VectorStoreConfig.PINECONE);
  try {
    await vectorStoreProvider.addDocuments(vectors);
  } catch (err) {
    console.log("Error while store embeddings to store: ", err);
    throw new Error("Error while store embeddings to store");
  }

  return c.json({
    success: true,
    statusCode: 200,
    message: "Document indexed successfully!"
  });
})

export default app;
