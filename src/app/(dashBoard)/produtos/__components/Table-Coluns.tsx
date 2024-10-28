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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import AlertDialogDelete from "./delete-dialog";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import UpsertProductDialogContent from "./upsert-dialog-content";
import { useState } from "react";

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
      const product = row.row.original;

      const [dialogOpen, setDialogOpen] = useState(false);
      return (
        <AlertDialog>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} className="outline-none">
                  <MoreHorizontalIcon size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer gap-1.5"
                  onClick={() => navigator.clipboard.writeText(product.id)}
                >
                  <ClipboardCopyIcon size={16} />
                  Copiar ID
                </DropdownMenuItem>

                <DialogTrigger asChild>
                  <DropdownMenuItem className="cursor-pointer gap-1.5">
                    <EditIcon size={16} />
                    Editar
                  </DropdownMenuItem>
                </DialogTrigger>

                <AlertDialogTrigger asChild>
                  <DropdownMenuItem className="cursor-pointer gap-1.5">
                    <DeleteIcon size={16} />
                    Deletar
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* content alertDialog fora do dropDown menu */}
            <AlertDialogDelete id={product.id} />
            <DialogContent>
              <UpsertProductDialogContent
                defaultValues={{
                  id: product.id,
                  name: product.name,
                  price: Number(product.price),
                  stock: product.stock,
                }}
                onSuccess={() => setDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </AlertDialog>
      );
    },
  },
];
