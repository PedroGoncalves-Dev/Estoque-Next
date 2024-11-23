"use client";

import { Badge } from "@/components/ui/badge";
import { Produto } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon } from "lucide-react";

import ProductTableDropdownMenu from "./table-Dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// const getStatusLabel = (status: string) => {
//   if (status == "IN_STOCK") {
//     return "Em estoque";
//   } else {
//     return "Sem estoque";
//   }
// };

export const columns: ColumnDef<Produto>[] = [
  {
    accessorKey: "name",
    header: "Nome Protudo",
  },
  {
    accessorKey: "price",
    header: "Preço",
    cell: (row) => {
      const product = row.row.original;
      return Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(product.price));
    },
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

      const labelStock = produto.stock > 0;
      return (
        <Badge variant={labelStock ? "default" : "outline"} className="gap-1.5">
          <CircleIcon
            size={14}
            className={`${labelStock ? "fill-primary-foreground" : "fill-destructive-foreground"} `}
          />
          {labelStock ? "Em estoque" : "Sem estoque"}
        </Badge>
      );
    },
  },

  {
    accessorKey: "actions",
    header: "Ações",
    cell: (row) => {
      return <ProductTableDropdownMenu product={row.row.original} />;
    },
  },
];
