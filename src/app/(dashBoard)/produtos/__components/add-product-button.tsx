"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
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

import { Button } from "@/components/ui/button";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { z } from "zod";
import { NumericFormat } from "react-number-format";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createProduct } from "@/actions/produto/add-produto";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "O nome do produto é obrigatorio",
  }),
  price: z.coerce
    .number()
    .positive({
      message: "A quantidade dese ser positiva",
    })
    .min(0.01, {
      message: "O preço do produto é obrigátorio",
    }),
  stock: z.coerce
    .number()
    .positive({
      message: "A quantidade de estoque deve ser positiva",
    })
    .int()
    .min(0, {
      message: "A quantidade de estoque é obrigátorio",
    }),
});

type FormSchema = z.infer<typeof formSchema>;

const AddProductButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FormSchema>({
    shouldUnregister: true, //faz com que o form seja resetado
    resolver: zodResolver(formSchema), //pego a validação do zood
    defaultValues: {
      name: "",
      price: 0,
      stock: 1,
    },
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      await createProduct(data);

      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="gap-2">
            <PlusIcon size={20} />
            Novo produto
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar produto</DialogTitle>

            <DialogDescription>
              adicione um novo produto aqui...
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o nome do produto"
                        {...field}
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
                        onValueChange={(value) =>
                          field.onChange(value.floatValue)
                        }
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
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddProductButton;
