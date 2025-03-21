import { createCookieSessionStorage } from '@remix-run/node'; // or cloudflare/deno
import { GithubProfile } from './service/auth';

type SessionData = {
  user: GithubProfile;
  refreshToken: string;
  token: string;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: '__session',
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax',
      secrets: [process.env.COOKIE_SESSION_SECRET_ID],
      secure: process.env.NODE_ENV === 'production',
    },
  });

export { commitSession, destroySession, getSession };
