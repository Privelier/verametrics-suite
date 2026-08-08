import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { DashboardPanel } from "@/components/dashboard-panel";

const title = "Enterprise Dashboard — VeraMetrics";
const description =
  "Track candidate profiles, resilience indexes, critical thinking scores, and verified digital badge status across your leadership cohort.";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 py-12">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-bold tracking-tight sm:text-3xl">
              Cohort Intelligence
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Northbridge Capital · Leadership certification workspace
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-primary">
            Live sync
          </span>
        </header>
        <div className="mt-10">
          <DashboardPanel />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
