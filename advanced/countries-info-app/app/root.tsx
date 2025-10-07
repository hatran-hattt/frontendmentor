import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import Header from "./components/layout/Header";
import { Loader2 } from "lucide-react";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-base">
        <Header/>
        <main className="min-h-dvh mt-(--space-7xl) pt-(--space-m-xl) bg-(--cl-page-bg) text-(--cl-text-main)">
          {children}
        </main>
        <ScrollRestoration
          getKey={(location, matches) => {
            // Restore based on a unique location key (default behavior)
            // return location.key

            // Restore based on pathname
            return location.pathname
          }} />
        <Scripts />
      </body>
    </html>
  );
}

export function HydrateFallback() {
  return (
    <div 
      className="flex justify-center w-full"
    >
      <div className="flex flex-col items-center p-8 rounded-sm shadow-sm">
        <Loader2 className="w-8 h-8 animate-spin mb-3" />
        <p className="text-lg font-medium tracking-wide">
          Loading Data...
        </p>
        <p className="text-sm mt-1">
          Preparing your content.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
