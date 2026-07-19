import { Hono } from 'hono'
import { FileTypes } from './utils/enums'
import { ChunkFile, filePrepareFactory } from './prepare';
import EmbeddingFactory from './embeddings/embedding.factory';
import { EmbeddingsModelConfig } from './embeddings/embedding.types';

const app = new Hono()

app.get('/index', async (c) => {
  const contentSplitter = new ChunkFile(500, 100);

  const loader = filePrepareFactory.createFileLoader(FileTypes.PDF);
  const filePath = `${import.meta.dir}/test.pdf`;

  const fileContent = await loader.load(filePath);

  const chunks = await contentSplitter.textSplitter(fileContent);

  // Embeddings
  const embeddingProvider = EmbeddingFactory.getInstance(EmbeddingsModelConfig.OPENAI);
  const embeddings = await embeddingProvider.embedDocumentChunks(chunks);

  return c.json(chunks);
})

export default app;
