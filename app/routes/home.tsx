import { buttonVariants } from "@/components/ui/button";
import { commitSession, getSession } from "@/session";
import { LoaderFunction } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";
export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const data = { error: session.get("error") };
  return Response.json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
export default function Home() {
  return (
    <>
      <header className="h-[50px]  bg-primary flex  justify-between pl-5 pr-5 items-center shadow-xl">
        <div>
          <h3 className="text-white">Pújame</h3>
        </div>
        <div className="flex gap-0.5">
          <Link
            to={"/usuario"}
            className={buttonVariants({ variant: "outline" })}>
            Usuario
          </Link>
        </div>
      </header>
      <main className="flex justify-center items-center p-10">
        <div className="max-w-7xl">
          <Outlet />
        </div>
      </main>
      <footer className="h-[150px] flex justify-center items-center ">
        <p>Created by Alejandro G</p>
      </footer>
    </>
  );
}
