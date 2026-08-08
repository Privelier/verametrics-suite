import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Platform" },
  { to: "/dashboard", label: "Dashboard" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-surface-deep/80 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3.5 sm:flex sm:justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-primary/40 bg-primary/10 text-sm font-bold tracking-tight text-primary">
            VM
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold tracking-tight">
              VeraMetrics
            </span>
            <span className="block truncate text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Cognitive Assessment Institute
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeProps={{ className: "text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                activeOptions={{ exact: true }}
                className="rounded-md px-3 py-2 text-sm transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button size="sm" className="shrink-0">
            Request Demo
          </Button>
        </div>
      </div>
    </header>
  );
}
