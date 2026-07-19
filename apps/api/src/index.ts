import { Hono } from 'hono'
import { FileTypes } from './utils/enums'
import { ChunkFile, filePrepareFactory } from './prepare';

const app = new Hono()

app.get('/', async (c) => {
  const contentSplitter = new ChunkFile(500, 100);

  const loader = filePrepareFactory.createFileLoader(FileTypes.PDF);
  const filePath = `${import.meta.dir}/test.pdf`;

  const fileContent = await loader.load(filePath);

  const chunks = await contentSplitter.textSplitter(fileContent);

  return c.json(chunks);
})

export default app;
