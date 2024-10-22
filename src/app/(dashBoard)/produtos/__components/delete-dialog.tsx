import { DeleteProducts } from "@/actions/produto/delete-products/delete-products";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface IpropsDeleteProduct {
  id: string;
}

const AlertDialogDelete = ({ id }: IpropsDeleteProduct) => {
  const handleDeleteProduct = async () => {
    try {
      await DeleteProducts({ id });
      toast.success("Produto excluido com sucesso!");
    } catch (error) {
      console.log(error);
      toast.success("Erro ao excluir o produto!");
    }
  };
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Você tem certeza ?</AlertDialogTitle>
        <AlertDialogDescription>
          Você esta presta a exclir este produto...
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={() => handleDeleteProduct()}>
          Excluir
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default AlertDialogDelete;
