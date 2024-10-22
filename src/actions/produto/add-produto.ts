"use server";

// o correto é apenas exportar a funcao que a action function de um use server

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { CreateProductSchema } from "./create-product/schema";

export const createProduct = async (data: CreateProductSchema) => {
  await db.produto.create({
    data,
  });

  //revalida a pagina
  revalidatePath("/produtos");
};
