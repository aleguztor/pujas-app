import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authenticator } from '@/service/auth.server';
import { commitSession, getSession } from '@/session';
import { isAuthLoginPage } from '@/utils/cookies';
import { ActionFunction, LoaderFunction, redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';
export let loader: LoaderFunction = async ({ request }) => {
  return await isAuthLoginPage(request);
};
export default function Login() {
  return (
    <>
      <div className="center flex h-full w-full items-center justify-center">
        <section className="flex h-screen w-[65%] items-center justify-center bg-amber-400 shadow-2xl max-md:hidden">
          <h1>Pújame</h1>
        </section>
        <section className="flex w-[35%] flex-col items-center justify-center">
          <h3 className="p-4">Inicio de sesión</h3>
          <form className="center flex w-fit flex-col items-center gap-5" action="" method="post">
            <div>
              <label htmlFor="username"></label>
              <Input type="text" placeholder="username" />
            </div>
            <div>
              <label htmlFor="password"></label>
              <Input type="password" placeholder="password" />
            </div>
            <div>
              <Button type="submit">Entrar</Button>
            </div>
          </form>
          <Form method="post">
            <button>Login with GitHub</button>
          </Form>
        </section>
      </div>
    </>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const user = await authenticator.authenticate('github', request);

  try {
    const session = await getSession(request.headers.get('Cookie'));
    if (user == null) {
      session.flash('error', 'Invalid username/password');

      // Redirect back to the login page with errors.
      return redirect('/login', {
        headers: {
          'Set-Cookie': await commitSession(session),
        },
      });
    }
    session.set('user', user);
    return redirect('/home', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  } catch (error) {
    console.error('Error durante la autenticación de GitHub:', error);
    return new Response('Hubo un error en el proceso de autenticación', {
      status: 500,
    });
  }
};
