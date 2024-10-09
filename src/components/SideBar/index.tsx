import { LayoutGrid } from "lucide-react";

import { ShoppingBag } from "lucide-react";

import BotoesSideBar from "./button";

export function SideBar() {
  return (
    <div className="w-64 bg-white">
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold">STOCKLY</h1>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <BotoesSideBar
          href="/"
          icons={<LayoutGrid size={18} />}
          texto="DashBoard"
        />

        <BotoesSideBar
          href="/produtos"
          icons={<LayoutGrid size={18} />}
          texto="Produtos"
        />

        <BotoesSideBar
          href="/vendas"
          icons={<ShoppingBag size={18} />}
          texto="Vendas"
        />
      </div>
    </div>
  );
}
