import { Hono } from 'hono'
import { FileTypes } from './utils/enums'
import { ChunkFile, filePrepareFactory } from './prepare';
import { OpenAIEmbeddings } from '@langchain/openai';
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";

const app = new Hono()

app.get('/', async (c) => {
  const contentSplitter = new ChunkFile(500, 100);

  const loader = filePrepareFactory.createFileLoader(FileTypes.PDF);
  const filePath = `${import.meta.dir}/test.pdf`;

  const fileContent = await loader.load(filePath);

  const chunks = await contentSplitter.textSplitter(fileContent);

  // Embeddings
  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small"
  });

  const pinecone = new PineconeClient();
  const pineconeIndex = pinecone.index(process.env.PINECONE_INDEX!);
  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    maxConcurrency: 5
  });

  return c.json(chunks);
})

export default app;
