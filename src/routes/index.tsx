import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero, TrustBadges } from "@/components/hero";
import { Pillars } from "@/components/pillars";
import { DashboardPreview } from "@/components/dashboard-panel";
import { Pricing } from "@/components/pricing";

const title = "VeraMetrics — Elite Cognitive & Crisis Assessment";
const description =
  "AI-driven behavioral simulations that certify critical thinking, ambiguity navigation, and strategic resilience for corporate leadership.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <TrustBadges />
        <Pillars />
        <DashboardPreview />
        <Pricing />
      </main>
      <SiteFooter />
    </div>
  );
}
