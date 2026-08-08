import { AssessmentSlot } from "@/components/assessment-slot";

const pillars = [
  {
    id: "01",
    name: "Ambiguity & Chaos Navigation",
    summary:
      "Measures decision quality when data is incomplete, contradictory, and shifting mid-scenario.",
    signals: ["Signal triage", "Reversible bets", "Tempo control"],
  },
  {
    id: "02",
    name: "Red-Teaming & Blindspot Hunter",
    summary:
      "Tests the candidate's ability to attack their own plan and surface failure modes before they surface in production.",
    signals: ["Threat modeling", "Assumption audit", "Counter-evidence"],
  },
  {
    id: "03",
    name: "Ethical Integrity & Blindspot Matrix",
    summary:
      "Profiles behavior under incentive pressure, disclosure trade-offs, and conflicting stakeholder duties.",
    signals: ["Disclosure bias", "Duty conflicts", "Escalation ethics"],
  },
  {
    id: "04",
    name: "The Cascading Failure Stress Test",
    summary:
      "A live multi-stage incident where each decision alters the next failure surface in real time.",
    signals: ["Containment", "Sequencing", "Recovery cost"],
  },
  {
    id: "05",
    name: "Adversarial Negotiation & Ego Audit",
    summary:
      "Evaluates composure, concession strategy, and self-regard when challenged by an adaptive opponent.",
    signals: ["Concession curve", "Status defense", "Frame control"],
  },
];

export function Pillars() {
  return (
    <section id="matrix" className="border-b border-border/60">
      <div className="mx-auto max-w-7xl px-5 py-20">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-accent">Assessment Matrix</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            The 5 core assessment pillars
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every certification runs across five adversarial simulation domains, each scored on a
            calibrated 0&ndash;1000 institute scale.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {pillars.map((pillar, i) => (
            <article
              key={pillar.id}
              className={`glass-panel rounded-xl p-6 transition-shadow hover:glow-ring ${
                i === pillars.length - 1 ? "lg:col-span-2" : ""
              }`}
            >
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold tracking-tight">{pillar.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {pillar.summary}
                  </p>
                </div>
                <span className="shrink-0 rounded-md border border-border bg-secondary/60 px-2.5 py-1 font-mono text-xs text-muted-foreground">
                  {pillar.id}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {pillar.signals.map((signal) => (
                  <span
                    key={signal}
                    className="rounded-full border border-border bg-card/60 px-2.5 py-1 text-[11px] text-muted-foreground"
                  >
                    {signal}
                  </span>
                ))}
              </div>

              <AssessmentSlot name={pillar.name} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
