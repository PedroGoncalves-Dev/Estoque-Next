import { db } from "@/lib/prisma";

export async function GET() {
  const produtos = await db.produto.findMany({});

  return Response.json(produtos, {
    status: 200,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const name = body.name;
  const price = body.price;
  const stock = body.stock;

  await db.produto.create({
    data: {
      name,
      price,

      stock,
    },
  });

  return Response.json(
    {},
    {
      status: 201,
    },
  );
}
