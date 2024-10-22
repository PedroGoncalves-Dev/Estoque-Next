"use server";
import { db } from "@/lib/prisma";
import { deleteProductSchema, DeleteProductSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const DeleteProducts = async ({ id }: DeleteProductSchema) => {
  deleteProductSchema.parse({ id }); //validação sendo feita
  await db.produto.delete({
    where: {
      id,
    },
  });

  revalidatePath("/produto");
};
