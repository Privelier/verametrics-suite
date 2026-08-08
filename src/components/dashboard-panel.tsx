const candidates = [
  { name: "A.Варга", role: "VP Engineering", resilience: 92, thinking: 88, badge: "Verified" },
  { name: "M. Okonkwo", role: "Director, Risk", resilience: 84, thinking: 91, badge: "Verified" },
  { name: "S. Lindqvist", role: "Head of Platform", resilience: 71, thinking: 76, badge: "In review" },
  { name: "R. Delgado", role: "Chief of Staff", resilience: 64, thinking: 69, badge: "Pending" },
  { name: "T. Nakamura", role: "SVP Operations", resilience: 88, thinking: 82, badge: "Verified" },
];

const badgeTone: Record<string, string> = {
  Verified: "border-primary/40 bg-primary/10 text-primary",
  "In review": "border-accent/40 bg-accent/10 text-accent",
  Pending: "border-border bg-secondary/60 text-muted-foreground",
};

function Meter({ value }: { value: number }) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <div className="h-1.5 w-full min-w-12 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="w-8 shrink-0 text-right font-mono text-xs text-muted-foreground">
        {value}
      </span>
    </div>
  );
}

export function DashboardPanel({ compact = false }: { compact?: boolean }) {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Active candidates", "1,284", "+8.2% vs last cycle"],
          ["Mean resilience index", "78.6", "Cohort percentile 71"],
          ["Critical thinking score", "812", "Institute scale 0–1000"],
          ["Badges issued", "347", "12 awaiting attestation"],
        ].map(([label, value, sub]) => (
          <div key={label} className="glass-panel rounded-xl p-5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
            <p className="mt-3 text-3xl font-bold tracking-tight">{value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="glass-panel rounded-xl p-6 lg:col-span-2">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <h3 className="min-w-0 truncate text-sm font-semibold tracking-tight">
              Candidate certification pipeline
            </h3>
            <span className="shrink-0 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Q3 cohort
            </span>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-140 text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  <th className="pb-3 font-medium">Candidate</th>
                  <th className="pb-3 font-medium">Resilience</th>
                  <th className="pb-3 font-medium">Critical thinking</th>
                  <th className="pb-3 font-medium">Badge</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((c) => (
                  <tr key={c.name} className="border-t border-border/60">
                    <td className="py-3.5 pr-6">
                      <p className="font-medium">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.role}</p>
                    </td>
                    <td className="w-40 py-3.5 pr-6">
                      <Meter value={c.resilience} />
                    </td>
                    <td className="w-40 py-3.5 pr-6">
                      <Meter value={c.thinking} />
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] ${badgeTone[c.badge]}`}
                      >
                        {c.badge}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-6">
          <h3 className="text-sm font-semibold tracking-tight">Pillar distribution</h3>
          <ul className="mt-5 space-y-4">
            {[
              ["Ambiguity & Chaos", 81],
              ["Red-Teaming", 74],
              ["Ethical Integrity", 88],
              ["Cascading Failure", 66],
              ["Adversarial Negotiation", 72],
            ].map(([label, value]) => (
              <li key={label as string}>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="min-w-0 truncate pr-3">{label}</span>
                  <span className="shrink-0 font-mono">{value}</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>

          {!compact && (
            <div className="mt-6 rounded-lg border border-border/70 bg-surface-deep/70 p-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Attestation queue
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                12 certifications awaiting executive counter-signature.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function DashboardPreview() {
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-7xl px-5 py-20">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-accent">Enterprise Dashboard</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            One command surface for HR and executives
          </h2>
        </div>
        <div className="mt-12">
          <DashboardPanel compact />
        </div>
      </div>
    </section>
  );
}
