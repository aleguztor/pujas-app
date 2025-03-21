import { buttonVariants } from '@/components/ui/button';
import { isAuthPages } from '@/utils/cookies';
import { LoaderFunction, redirect } from '@remix-run/node';
import { Link, Outlet } from '@remix-run/react';
export const loader: LoaderFunction = async ({ request }) => {
  const { response } = await isAuthPages(request);

  return response;
};
export default function Home() {
  return (
    <>
      <header className="bg-primary flex h-[50px] items-center justify-between pr-5 pl-5 shadow-xl">
        <div>
          <h3 className="text-white">Pújame</h3>
        </div>
        <div className="flex gap-0.5">
          <Link to={'/perfil'} className={buttonVariants({ variant: 'outline' })}>
            Usuario
          </Link>
        </div>
      </header>
      <main className="flex items-center justify-center p-10">
        <div className="max-w-7xl">
          <Outlet />
        </div>
      </main>
      <footer className="flex h-[150px] items-center justify-center">
        <p>Created by Alejandro G</p>
      </footer>
    </>
  );
}
