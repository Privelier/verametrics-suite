import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Growth",
    price: "$499",
    cadence: "/mo",
    blurb: "For scaling teams certifying their first cohort of leaders.",
    features: [
      "Up to 25 assessments / mo",
      "3 assessment pillars",
      "Standard resilience reporting",
      "Email support",
    ],
    cta: "Start with Growth",
    featured: false,
  },
  {
    name: "Professional",
    price: "$1,299",
    cadence: "/mo",
    blurb: "Full-matrix certification with verified digital badging.",
    features: [
      "Up to 120 assessments / mo",
      "All 5 assessment pillars",
      "Verified digital badges",
      "ATS + HRIS integrations",
      "Dedicated success manager",
    ],
    cta: "Choose Professional",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    blurb: "Institute-grade deployment with private simulation models.",
    features: [
      "Unlimited assessments",
      "Custom scenario authoring",
      "SSO, SCIM, audit logs",
      "On-prem / VPC deployment",
      "24/7 assurance SLA",
    ],
    cta: "Talk to Sales",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="border-b border-border/60 bg-surface-deep/50">
      <div className="mx-auto max-w-7xl px-5 py-20">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-accent">Plans</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Pricing built for institutional rollout
          </h2>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`glass-panel flex flex-col rounded-xl p-7 ${
                tier.featured ? "glow-ring border-primary/50" : ""
              }`}
            >
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <h3 className="min-w-0 truncate text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {tier.name}
                </h3>
                {tier.featured && (
                  <span className="shrink-0 rounded-full bg-accent/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
                    Most selected
                  </span>
                )}
              </div>

              <p className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight">{tier.price}</span>
                <span className="text-sm text-muted-foreground">{tier.cadence}</span>
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{tier.blurb}</p>

              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="min-w-0">{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="mt-8 w-full"
                variant={tier.featured ? "default" : "outline"}
              >
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
