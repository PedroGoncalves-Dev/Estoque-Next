"use client";

import { Badge } from "@/components/ui/badge";
import { Produto } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
const getStatusLabel = (status: string) => {
  if (status == "IN_STOCK") {
    return "Em estoque";
  } else {
    return "Sem estoque";
  }
};

export const columns: ColumnDef<Produto>[] = [
  {
    accessorKey: "name",
    header: "Nome Protudo",
  },
  {
    accessorKey: "price",
    header: "Preço",
  },
  {
    accessorKey: "stock",
    header: "Quantidade",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row) => {
      const produto = row.row.original;
      const label = getStatusLabel(produto.status);
      return <Badge>{label}</Badge>;
    },
  },
];
