import { Hono } from 'hono'
import { FileTypes } from './utils/enums'
import { ChunkFile, filePrepareFactory } from './prepare';

const app = new Hono()

app.get('/', async (c) => {
  const loader = filePrepareFactory.createFileLoader(FileTypes.PDF);
  const filePath = `${import.meta.dir}/test.pdf`;

  const fileContent = await loader.load(filePath);
  const contentSplitter = new ChunkFile(500, 100);
  const chunks = contentSplitter.textSplitter(fileContent);

  return c.json(chunks);
})

export default app;
