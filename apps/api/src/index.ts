import { Hono } from 'hono'
import { fileLoaderFactory } from './loader'
import { FileTypes } from './utils/enums'

const app = new Hono()

app.get('/', async (c) => {
  const loader = fileLoaderFactory.createFileLoader(FileTypes.PDF);
  const filePath = `${import.meta.dir}/test.pdf`;

  const fileContent = await loader.load(filePath);
  return c.json(fileContent);
})

export default app
