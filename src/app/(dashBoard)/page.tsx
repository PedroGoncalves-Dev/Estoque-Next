import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex justify-center items-center w-full h-screen">
      <div className="bg-neutral-200 animate-jump animate-once animate-duration-[2000ms] w-60 h-60 shadow-xl rounded-lg flex flex-col items-center justify-around">
        <h2>Paogina home</h2>
        <Link href={"/produtos"}>
          <button className=" bg-green-300 animate-fade-up animate-once p-2 rounded-2xl font-bold active:bg-slate-300 transition ease-in duration-150 hover:scale-110">
            Go to Products
          </button>
        </Link>
      </div>
    </main>
  );
}
