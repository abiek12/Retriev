import { z } from "zod";

export const IndexDocumentDto = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("text"),
    text: z.string().min(5),
  }),

  z.object({
    type: z.literal("file"),
    filePath: z.string().min(1),
  }),
]);

export type IndexDocumentDtoType = z.infer<typeof IndexDocumentDto>;
