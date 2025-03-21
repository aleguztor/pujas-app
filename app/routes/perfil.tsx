import { Input } from '@/components/ui/input';
import { GithubProfile } from '@/service/auth';
import { isAuthPages } from '@/utils/cookies';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { LoaderFunction } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';

export const loader: LoaderFunction = async ({ request }) => {
  const { response, isAuth, session } = await isAuthPages(request);

  if (isAuth) {
    return session.get('user');
  }
  return response;
};
export default function Perfil() {
  const user = useLoaderData<GithubProfile>();
  return (
    <>
      <header className="text-center">
        <h1>Mi perfil</h1>
      </header>
      <main className="mr-auto ml-auto flex max-w-2xl flex-col items-center justify-center">
        <section id="mini-profile" className="mb-5 flex items-center gap-1.5">
          <h3>{user.name || 'No tiene nombre'}</h3>
          <Avatar>
            <AvatarImage className="w-[50px]" src={user.avatar_url} alt="profile" />
            <AvatarFallback>ES</AvatarFallback>
          </Avatar>
        </section>
        <section className="[&>div]:[&>h2]:1/3 [&>div]:bg-secondary grid w-[400px] grid-cols-3 gap-1.5 text-center [&>div]:[&>div]:flex [&>div]:aspect-square [&>div]:[&>div]:h-2/3 [&>div]:[&>div]:items-center [&>div]:[&>div]:justify-center [&>div]:rounded-xl [&>div]:border-2 [&>div]:[&>div]:[&>h3]:text-center [&>div]:[&>div]:[&>h3]:text-5xl [&>div]:[&>div]:[&>h3]:font-light">
          <div>
            <h2>Mis pujas</h2>
            <div>
              <h3>2</h3>
            </div>
          </div>
          <div>
            <h2>Vendidos</h2>
            <div>
              <h3>1</h3>
            </div>
          </div>
          <div>
            <h2>Activos</h2>
            <div>
              <h3>5</h3>
            </div>
          </div>
        </section>
        <section className="w-full">
          <Form method="post">
            <label htmlFor="localitation">Localización</label>
            <Input disabled type="text" id="localization" placeholder="Localización" value={user.location} />
          </Form>
        </section>
      </main>
    </>
  );
}
