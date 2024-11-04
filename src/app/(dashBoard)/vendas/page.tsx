import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import UpsertSheetContent from "./_components/upsert-sheet-content";
import { getProduto } from "@/data-access/produto/getProduto";
import { ComboBoxOption } from "@/components/ui/combo-box";
import { late } from "zod";

const SalesPage = async () => {
  const product = await getProduto();
  const productsOptions: ComboBoxOption[] = product.map((product) => ({
    label: product.name,
    value: product.id,
  }));
  return (
    <div className="mx-8 w-full space-y-8 rounded-xl bg-white p-4">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xl font-semibold text-slate-500">
            Gestão de Vendas
          </span>

          <h2 className="text-xl font-semibold">Vendas</h2>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button>Nova venda</Button>
          </SheetTrigger>
          <UpsertSheetContent productOptions={productsOptions} />
        </Sheet>
      </div>
    </div>
  );
};

export default SalesPage;
