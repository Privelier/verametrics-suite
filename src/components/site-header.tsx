import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/programme", label: "The examination" },
  { to: "/faculties", label: "Faculties" },
  { to: "/universities", label: "For universities" },
  { to: "/dashboard", label: "Registrar" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header
      data-site-header
      className="sticky top-0 z-50 border-b border-rule bg-background/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 sm:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span aria-hidden className="h-7 w-[3px] shrink-0 bg-primary" />
          <span className="min-w-0 leading-none">
            <span className="block font-serif text-[15px] font-semibold tracking-tight">
              VeraMetrics
            </span>
            <span className="mt-1.5 block truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Certification Institute
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "text-foreground" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="text-[13px] tracking-tight transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/universities"
            hash="briefing"
            className="bg-primary px-4 py-2.5 text-[12.5px] font-semibold tracking-tight text-primary-foreground transition-colors hover:bg-ink-deep"
          >
            Request faculty briefing
          </Link>
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="border border-rule p-2 text-foreground lg:hidden"
        >
          {open ? <X aria-hidden className="size-4" /> : <Menu aria-hidden className="size-4" />}
        </button>
      </div>

      <div className={cn("border-t border-rule lg:hidden", open ? "block" : "hidden")}>
        <nav className="mx-auto max-w-6xl px-6 py-3 sm:px-8">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              activeProps={{ className: "text-foreground" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="block border-b border-rule py-3 text-[13.5px] last:border-b-0"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
