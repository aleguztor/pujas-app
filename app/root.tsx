import { LinksFunction } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { ThemeSwitcherSafeHTML } from './components/theme-switcher';
import styles from './globals.css?url';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeSwitcherSafeHTML lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </ThemeSwitcherSafeHTML>
  );
}

export default function App() {
  return <Outlet />;
}
