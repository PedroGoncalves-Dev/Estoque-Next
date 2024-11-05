"use client";

import { Badge } from "@/components/ui/badge";
import { Produto } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  CircleIcon,
  ClipboardCopyIcon,
  DeleteIcon,
  EditIcon,
  MoreHorizontalIcon,
} from "lucide-react";

import AlertDialogDelete from "./delete-dialog";

import ProductTableDropdownMenu from "./table-Dropdown-menu";

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
      const label = getStatusLabel(produto.status);
      return (
        <Badge
          variant={label === "Em estoque" ? "default" : "outline"}
          className="gap-1.5"
        >
          <CircleIcon
            size={14}
            className={`${label === "Em estoque" ? "fill-primary-foreground" : "fill-destructive-foreground"} `}
          />
          {label}
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
