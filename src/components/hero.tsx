import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="hero-aura absolute inset-0" aria-hidden />
      <div className="grid-lines absolute inset-0 opacity-[0.18]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:py-28">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            AI-Driven Behavioral Simulation
          </span>

          <h1 className="mt-6 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            <span className="text-gradient">
              The New Standard in Elite Cognitive &amp; Crisis Assessment.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Replace guesswork with dynamic, AI-driven behavioral simulations. Certify critical
            thinking, ambiguity navigation, and strategic resilience.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="glow-ring">
              Request Enterprise Demo
            </Button>
            <Button size="lg" variant="outline" className="border-border bg-card/40">
              Explore Assessment Matrix
            </Button>
          </div>
        </div>

        <dl className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border/70 bg-border/40 sm:grid-cols-4">
          {[
            ["98.4%", "Predictive validity"],
            ["42 min", "Median simulation"],
            ["120+", "Behavioral signals"],
            ["SOC 2", "Type II certified"],
          ].map(([value, label]) => (
            <div key={label} className="bg-surface-deep/80 px-5 py-6">
              <dt className="text-2xl font-bold tracking-tight text-foreground">{value}</dt>
              <dd className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function TrustBadges() {
  const logos = ["NORTHBRIDGE", "AXIOM LABS", "HELIOSTAT", "KERNEL & CO", "VANTA GROUP", "ORBIT9"];
  return (
    <section className="border-b border-border/60 bg-surface-deep/60">
      <div className="mx-auto max-w-7xl px-5 py-12">
        <p className="text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Trusted by forward-thinking engineering and executive teams
        </p>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {logos.map((logo) => (
            <div
              key={logo}
              className="rounded-md border border-border/60 bg-card/40 px-3 py-4 text-center text-[11px] font-semibold tracking-[0.18em] text-muted-foreground"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
