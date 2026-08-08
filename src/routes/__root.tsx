import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-lg border-t-2 border-foreground pt-8">
        <p className="ref text-primary">HTTP 404</p>
        <h1 className="mt-5 font-serif text-[2rem] leading-tight tracking-tight">
          No such document.
        </h1>
        <p className="mt-5 text-[14px] leading-relaxed text-muted-foreground">
          This address does not correspond to a page, an examination paper or an examiner&rsquo;s
          key. Papers are addressed by faculty and specialisation, and are generated from the
          faculty register.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            to="/faculties"
            className="inline-flex items-center bg-primary px-5 py-3 text-[13px] font-semibold tracking-tight text-primary-foreground transition-colors hover:bg-ink-deep"
          >
            Faculty register
          </Link>
          <Link
            to="/"
            className="inline-flex items-center border border-rule-strong px-5 py-3 text-[13px] font-semibold tracking-tight transition-colors hover:bg-foreground hover:text-background"
          >
            Return to the Institute
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-lg border-t-2 border-foreground pt-8">
        <p className="ref text-primary">Error</p>
        <h1 className="mt-5 font-serif text-[2rem] leading-tight tracking-tight">
          This page did not load.
        </h1>
        <p className="mt-5 text-[14px] leading-relaxed text-muted-foreground">
          Something failed on the Institute&rsquo;s side. Reloading usually resolves it; if it does
          not, the fault is recorded and will be looked at.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center bg-primary px-5 py-3 text-[13px] font-semibold tracking-tight text-primary-foreground transition-colors hover:bg-ink-deep"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center border border-rule-strong px-5 py-3 text-[13px] font-semibold tracking-tight transition-colors hover:bg-foreground hover:text-background"
          >
            Return to the Institute
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "VeraMetrics Certification Institute" },
      {
        name: "description",
        content:
          "An independent certifying examination for graduating cohorts, administered in partnership with university faculties. One integrated case, five assessed dimensions, one sitting.",
      },
      { name: "author", content: "VeraMetrics Certification Institute" },
      { name: "theme-color", content: "#ffffff" },
      { property: "og:site_name", content: "VeraMetrics Certification Institute" },
      { property: "og:title", content: "VeraMetrics Certification Institute" },
      {
        property: "og:description",
        content:
          "One integrated case, five assessed dimensions, one 180-minute sitting. A certifying examination held by the awarding institution.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&family=IBM+Plex+Mono:wght@400;500;600&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
