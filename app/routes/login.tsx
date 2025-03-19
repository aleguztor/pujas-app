import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect } from "@remix-run/react";

export default function Login() {
  return (
    <>
      <div className="flex items-center center w-full justify-center h-full">
        <section className="bg-amber-400 flex items-center justify-center w-[65%] shadow-2xl h-screen max-md:hidden ">
          <h1>Pújame</h1>
        </section>
        <section className="flex items-center justify-center flex-col w-[35%]">
          <h3 className="p-4">Inicio de sesión</h3>
          <form
            className="flex items-center  center flex-col gap-5 w-fit"
            action=""
            method="post">
            <div>
              <label htmlFor="username"></label>
              <Input
                type="text"
                placeholder="username"
              />
            </div>
            <div>
              <label htmlFor="password"></label>
              <Input
                type="password"
                placeholder="password"
              />
            </div>
            <div>
              <Button type="submit">Entrar</Button>
            </div>
          </form>
          <div className="p-2">
            <Button variant={"secondary"}>Iniciar sesión con gmail</Button>
          </div>
        </section>
      </div>
    </>
  );
}

export const action = async () => {
  return redirect("/");
};
