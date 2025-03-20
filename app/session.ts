import { createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno

type SessionData = {
  token: string;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__session",
      maxAge: 60,
      sameSite: "lax",
      secrets: [process.env.COOKIE_SESSION_SECRET_ID],
      secure: true,
    },
  });

export { commitSession, destroySession, getSession };
