"use server";

import { db } from "@/lib/prisma";

interface Iprops {
  name: string;
  price: number;
  stock: number;
}

export const createProduct = async ({ name, price, stock }: Iprops) => {
  await db.produto.create({
    data: {
      name,
      price,
      stock,
    },
  });
};
