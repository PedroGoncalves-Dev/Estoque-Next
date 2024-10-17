import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/date-table";
import { getProduto } from "@/data-access/produto/getProduto";
import { PlusIcon } from "lucide-react";
import { columns } from "./__components/Table-Coluns";

const Produtos = async () => {
  // data accsses
  const produtos = await getProduto();
  // const response = await fetch("http://localhost:3000/api/produtos",{
  // method: get,
  // cache: 'no-cache'}); //router handles
  // const produtos = await response.json();

  return (
    <div className="mx-8 w-full space-y-8 rounded-xl bg-white p-4">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xl font-semibold text-slate-500">
            Gestão de produtos
          </span>

          <h2 className="text-xl font-semibold">Produtos</h2>
        </div>

        <Button className="gap-2">
          <PlusIcon size={20} />
          Novo produto
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={JSON.parse(JSON.stringify(produtos))} // somente desta forma é possivel passar class, jsx...
      />
    </div>
  );
};

export default Produtos;
