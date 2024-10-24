"use client";

import { createProduct } from "@/actions/produto/add-produto";
import {
  createProductSchema,
  CreateProductSchema,
} from "@/actions/produto/create-product/schema";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";

interface Iprops {
  onSuccess?: () => void;
}

const UpsertProductDialogContent = ({ onSuccess }: Iprops) => {
  const form = useForm<CreateProductSchema>({
    shouldUnregister: true, //faz com que o form seja resetado
    resolver: zodResolver(createProductSchema), //pego a validação do zood
    defaultValues: {
      name: "",
      price: 0,
      stock: 1,
    },
  });

  const onSubmit = async (data: CreateProductSchema) => {
    try {
      await createProduct(data);
      onSuccess?.();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome do produto" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <NumericFormat
                  thousandSeparator="."
                  decimalSeparator=","
                  fixedDecimalScale
                  decimalScale={2}
                  prefix="R$"
                  allowNegative={false}
                  customInput={Input}
                  onValueChange={(value) => field.onChange(value.floatValue)}
                  {...field}
                  onChange={() => {}}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estoque</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"} type="reset">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="gap-2"
          >
            {form.formState.isSubmitting && (
              <Loader2Icon className="animate-spin" size={16} />
            )}
            Submit
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default UpsertProductDialogContent;
