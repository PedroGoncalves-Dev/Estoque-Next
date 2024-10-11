"server-only";
import { db } from "@/lib/prisma";
import { Produto } from "@prisma/client";

export const getProduto = async (): Promise<Produto[]> => {
  return await db.produto.findMany({});
};
