"use server";

// o correto é apenas exportar a funcao que a action function de um use server

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { UpsertProductSchema } from "./upsertProduct/schema";

export const upsertProduct = async (data: UpsertProductSchema) => {
  await db.produto.upsert({
    where: { id: data.id ?? "" },
    update: {
      name: data.name,
      price: data.price,
      stock: data.stock,
    },
    create: {
      name: data.name,
      price: data.price,
      stock: data.stock,
    },
  });

  //revalida a pagina
  revalidatePath("/produtos");
};
