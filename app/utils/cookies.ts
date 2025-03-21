import { commitSession, getSession } from '@/session';
import { TypedResponse } from '@remix-run/node';
import { redirect } from '@remix-run/react';

export async function isAuthPages(request: any) {
  const session = await getSession(request.headers.get('Cookie'));
  const isAuth = session.has('user');
  if (!isAuth) {
    return {
      response: redirect('/login'),
      isAuth,
      session,
    };
  }

  const data = { error: session.get('error') };

  return {
    response: Response.json(data, {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    }),
    isAuth,
    session,
  };
}

export async function isAuthLoginPage(request: any): Promise<Response | TypedResponse<never>> {
  const session = await getSession(request.headers.get('Cookie'));
  if (session.has('user')) {
    return redirect('/home/pujas');
  }

  const data = { error: session.get('error') };

  return Response.json(data, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}
