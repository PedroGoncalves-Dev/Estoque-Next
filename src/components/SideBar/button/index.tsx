"use client";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface iprops {
  href: string;
  icons: React.ReactNode;
  texto: string;
}

const BotoesSideBar = ({ href, icons, texto }: iprops) => {
  const pathName = usePathname();
  return (
    <Button
      variant={pathName === `${href}` ? "secondary" : "ghost"}
      className="justify-start gap-2"
      asChild
    >
      <Link href={href}>
        {icons}

        {texto}
      </Link>
    </Button>
  );
};

export default BotoesSideBar;
