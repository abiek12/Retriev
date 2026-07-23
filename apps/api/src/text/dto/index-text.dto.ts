import z from "zod";

export const IndexTextDto = z.object({
  textContent: z.string().min(5),
});

export type IndexTextDtoType = z.infer<typeof IndexTextDto>;
