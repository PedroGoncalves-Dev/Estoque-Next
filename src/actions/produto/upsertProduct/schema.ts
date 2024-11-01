import { z } from "zod";

export const UpsertProductSchema = z.object({
  id: z.string().uuid().optional(), //opcional pq so sera usado em caso de edição
  name: z.string().trim().min(1, {
    message: "Digite um nome para o produto",
  }),
  price: z.coerce
    .number()
    .positive({
      message: "Digite um valor positivo",
    })
    .min(0.01, {
      message: "Digite um valor",
    }),
  stock: z.coerce
    .number()
    .positive({
      message: "Digite um número positico",
    })
    .int()
    .min(0, {
      message: "A quantidade de estoque é obrigatória",
    }),
});

export type UpsertProductSchema = z.infer<typeof UpsertProductSchema>;
