import type { MetaFunction } from "@remix-run/node";
import { Theme } from "@twilio-paste/core/theme";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import ErrorBoundary from "./components/error-boundary/error-boundary";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1",
});

export const App = () => {
  return (
    <ErrorBoundary>
      <html lang="en">
        <head>
          <title>Dwellby</title>
          <Meta />
          <Links />
        </head>
        <body>
          <Theme.Provider theme="dark">
            <Outlet />
            <ScrollRestoration />
          </Theme.Provider>
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </ErrorBoundary>
  );
};

export default App;
