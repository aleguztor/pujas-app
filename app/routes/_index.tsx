import { Button } from "@/components/ui/button";
import type { MetaFunction } from "@remix-run/node";
import { Outlet, redirect } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
      <header className="h-[50px] bg-secondary flex justify-between gap-1.5 items-center pl-5 pr-5">
        <div>
          <h3>Pújame</h3>
        </div>
        <Button
          size={"icon"}
          variant={"link"}
          onClick={() => redirect("/")}>
          H
        </Button>
        <Button>Usuario</Button>
      </header>
      <main className="p-[20px] flex justify-center items-center">
        <div className="max-w-7xl">
          <Outlet />
        </div>
      </main>
      <footer className="h-[150px]">footer</footer>
    </>
  );
}
