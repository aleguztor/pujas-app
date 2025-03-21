import { GithubProfile } from '@/service/auth';
import { isAuthPages } from '@/utils/cookies';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

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
      <h1>Mi perfil</h1>
      <section id="mini-profile">
        <h3>{user.name || 'No tiene nombre'}</h3>
        <Avatar>
          <AvatarImage src={user.avatar_url} alt="profile" />
          <AvatarFallback>ES</AvatarFallback>
        </Avatar>
      </section>
      <section className="grid grid-cols-3 w-[400px] gap-1.5 [&>div]:bg-secondary  [&>div]:border-2 [&>div]:rounded-xl [&>div]:aspect-square">
        <div>
          <h2>Mis pujas</h2>
          <h3>2</h3>
        </div>
        <div>
          <h2>Vendidos</h2>
          <h3>4</h3>
        </div>
        <div>
          <h2>Activos</h2>
          <h3>4</h3>
        </div>
      </section>
    </>
  );
}
