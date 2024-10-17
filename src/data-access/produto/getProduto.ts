"server-only";
import { db } from "@/lib/prisma";
import { Produto } from "@prisma/client";

export const getProduto = async (): Promise<Produto[]> => {
  console.log("fetching of products..");
  return await db.produto.findMany({});
};
