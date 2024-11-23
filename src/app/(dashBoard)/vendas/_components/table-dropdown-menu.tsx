import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Produto } from "@prisma/client";
import {
  ClipboardCopyIcon,
  DeleteIcon,
  MoreHorizontalIcon,
} from "lucide-react";

interface ItableDropdownProps {
  product: Pick<Produto, "id">;
  onDelete: (id: string) => void;
}

const SalesTableDropDownMenu = ({ product, onDelete }: ItableDropdownProps) => {
  return (
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

        <DropdownMenuItem
          className="cursor-pointer gap-1.5"
          onClick={() => onDelete(product.id)}
        >
          <DeleteIcon size={16} />
          Deletar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SalesTableDropDownMenu;
