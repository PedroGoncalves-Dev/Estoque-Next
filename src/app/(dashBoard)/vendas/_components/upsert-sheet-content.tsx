"use client";
import { Button } from "@/components/ui/button";
import { Combobox, ComboBoxOption } from "@/components/ui/combo-box";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/helpers/currency";

import { zodResolver } from "@hookform/resolvers/zod";
import { Produto } from "@prisma/client";

import { PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import SalesTableDropDownMenu from "./table-dropdown-menu";

const formSchema = z.object({
  productId: z.string().uuid({
    message: "O produto é obrigátorio",
  }),
  quantity: z.coerce.number().int().positive(),
});

type FormSchema = z.infer<typeof formSchema>;

interface UpsertSheetContentProps {
  products: Produto[];
  productOptions: ComboBoxOption[];
}

interface SelectedProducts {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const UpsertSheetContent = ({
  products,
  productOptions,
}: UpsertSheetContentProps) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProducts[]>(
    [],
  );
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });

  const onSubmit = (data: FormSchema) => {
    const selectedProducts = products.find(
      (product) => product.id === data.productId,
    );
    if (!selectedProducts) return;

    setSelectedProducts((currentProducts) => {
      const existingProduct = currentProducts.find(
        (product) => product.id === selectedProducts.id,
      );

      if (existingProduct) {
        // verifica se o id do produto ja foi adicionado e concatena com o oque foi adiciona com o novo adicionado
        return currentProducts.map((product) => {
          if (product.id === selectedProducts.id) {
            return {
              ...product,
              quantity: product.quantity + data.quantity,
            };
          }

          return product;
        });
      }

      return [
        ...currentProducts,
        {
          ...selectedProducts,
          price: Number(selectedProducts.price),
          quantity: data.quantity,
        },
      ];
    });

    form.reset();
  };

  const productTotal = useMemo(() => {
    return selectedProducts.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  }, [selectedProducts]);

  const onDelete = (productid: string) => {
    setSelectedProducts((currentProduct) => {
      return currentProduct.filter((product) => product.id !== productid);
    });
  };

  return (
    <SheetContent className="!max-w-[700px]">
      <SheetHeader>
        <SheetTitle>Nova venda</SheetTitle>
        <SheetDescription>Insira as informações abaixo</SheetDescription>
      </SheetHeader>

      <Form {...form}>
        <form className="space-y-6 py-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="pr-3">Produto</FormLabel>
                <FormControl>
                  <Combobox
                    options={productOptions}
                    placeholder="Selecione um produto"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Digite a quantidade"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" variant={"secondary"} className="w-full">
            <PlusIcon size={20} />
            Adicionar nova venda
          </Button>
        </form>
      </Form>

      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Preço unitário</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                {formatCurrency(product.price * product.quantity)}
              </TableCell>
              <TableCell>
                <SalesTableDropDownMenu product={product} onDelete={onDelete} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              {formatCurrency(productTotal)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </SheetContent>
  );
};

export default UpsertSheetContent;
