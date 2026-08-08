import { DIMENSIONS, GRADE_BANDS } from "@/data/framework";
import { cn } from "@/lib/utils";

/**
 * Registrar workspace.
 *
 * A cohort return, set as a statistical abstract rather than as a product
 * dashboard: hairline rules, tabular figures, no colour beyond the single blue.
 * Candidates are shown by candidate number, because the registrar's view of a
 * cohort is not a view of named people.
 */

type SourceTier = "Primary" | "Secondary" | "None";

interface CohortRow {
  number: string;
  specialisation: string;
  /** Dimension marks in paper order: I, II, III, IV, V. */
  marks: [number, number, number, number, number];
  tier: SourceTier;
  flag?: string;
}

const COHORT: CohortRow[] = [
  {
    number: "ENG/2611",
    specialisation: "Chemical and Process",
    marks: [178, 171, 152, 219, 121],
    tier: "Primary",
  },
  {
    number: "ENG/2614",
    specialisation: "Electrical and Control",
    marks: [161, 148, 139, 186, 108],
    tier: "Primary",
  },
  {
    number: "ENG/2619",
    specialisation: "Civil and Structural",
    marks: [140, 126, 131, 158, 96],
    tier: "Secondary",
  },
  {
    number: "ENG/2623",
    specialisation: "Computer and Software",
    marks: [155, 163, 118, 171, 89],
    tier: "Secondary",
    flag: "Citation probe unresolved — Part II",
  },
  {
    number: "ENG/2628",
    specialisation: "Mechanical",
    marks: [121, 109, 104, 142, 74],
    tier: "None",
    flag: "Capped at Pass — no external source reached",
  },
  {
    number: "ENG/2634",
    specialisation: "Chemical and Process",
    marks: [149, 138, 166, 176, 118],
    tier: "Primary",
  },
];

function total(row: CohortRow): number {
  return row.marks.reduce((sum, m) => sum + m, 0);
}

function bandFor(score: number): string {
  return GRADE_BANDS.find((b) => score >= b.lower)?.band ?? "Referred";
}

/** Horizontal rule-bar. Blue for the value, hairline for the remainder. */
function Bar({
  value,
  max,
  tone = "primary",
}: {
  value: number;
  max: number;
  tone?: "primary" | "ink";
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <span className="flex items-center gap-3">
      <span className="relative block h-[3px] w-full min-w-10 bg-rule">
        <span
          className={cn(
            "absolute inset-y-0 left-0 block",
            tone === "primary" ? "bg-primary" : "bg-foreground",
          )}
          style={{ width: `${pct}%` }}
        />
      </span>
      <span className="w-9 shrink-0 text-right text-[11.5px] tabular-nums text-muted-foreground">
        {value}
      </span>
    </span>
  );
}

export function DashboardPanel({ compact = false }: { compact?: boolean }) {
  const cohortMean = Math.round(COHORT.reduce((s, r) => s + total(r), 0) / COHORT.length);
  const primaryShare = Math.round(
    (COHORT.filter((r) => r.tier === "Primary").length / COHORT.length) * 100,
  );

  return (
    <div className="space-y-14">
      <dl className="grid border-t border-rule-strong sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Scripts marked", "184", "of 197 sat"],
          ["Cohort mean", String(cohortMean), "Institute 1000-mark scale"],
          ["Reached primary sources", `${primaryShare}%`, "Research dimension"],
          ["Integrity referrals", "3", "To the institution's officer"],
        ].map(([label, value, note]) => (
          <div
            key={label}
            className="border-b border-rule py-6 pr-6 sm:border-r sm:last:border-r-0"
          >
            <dt className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {label}
            </dt>
            <dd>
              <span className="mt-3 block font-serif text-[1.75rem] leading-none tracking-tight tabular-nums">
                {value}
              </span>
              <span className="mt-3 block text-[12.5px] text-muted-foreground">{note}</span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,19rem)] lg:gap-16">
        <section className="min-w-0">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-foreground pb-3">
            <h3 className="text-[15px] font-semibold tracking-tight">Candidate returns</h3>
            <p className="ref text-muted-foreground">Faculty of Engineering · specimen extract</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[46rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-rule">
                  <th className="w-[9rem] py-3 pr-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Candidate
                  </th>
                  {DIMENSIONS.map((d) => (
                    <th
                      key={d.code}
                      className="w-[3.4rem] py-3 pr-3 text-right text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"
                      title={d.title}
                    >
                      {d.numeral}
                    </th>
                  ))}
                  <th className="w-[4.5rem] py-3 pr-5 text-right text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Total
                  </th>
                  <th className="w-[6rem] py-3 pr-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Band
                  </th>
                  <th className="w-[5.5rem] py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Sources
                  </th>
                </tr>
              </thead>
              <tbody>
                {COHORT.map((row) => (
                  <tr key={row.number} className="border-b border-rule align-top">
                    <td className="py-4 pr-5">
                      <span className="ref block">{row.number}</span>
                      <span className="mt-1.5 block text-[12px] text-muted-foreground">
                        {row.specialisation}
                      </span>
                      {row.flag ? (
                        <span className="mt-2 block border-l-2 border-foreground pl-2.5 text-[11.5px] leading-snug text-muted-foreground">
                          {row.flag}
                        </span>
                      ) : null}
                    </td>
                    {row.marks.map((mark, i) => (
                      <td
                        key={DIMENSIONS[i]?.code ?? i}
                        className="py-4 pr-3 text-right text-[12.5px] tabular-nums"
                      >
                        {mark}
                      </td>
                    ))}
                    <td className="py-4 pr-5 text-right text-[12.5px] font-semibold tabular-nums">
                      {total(row)}
                    </td>
                    <td className="py-4 pr-4 text-[12.5px]">{bandFor(total(row))}</td>
                    <td className="py-4">
                      <span
                        className={cn(
                          "inline-flex border px-2 py-1 text-[10.5px] font-semibold uppercase tracking-[0.1em]",
                          row.tier === "Primary" && "border-primary text-primary",
                          row.tier === "Secondary" && "border-rule-strong text-foreground",
                          row.tier === "None" && "border-rule text-muted-foreground",
                        )}
                      >
                        {row.tier}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-5 text-[12px] leading-relaxed text-muted-foreground">
            Columns I to V are the dimension sub-scores. Candidates are identified by number; the
            registrar&rsquo;s view of a cohort is not a view of named people, and release of any
            return to a third party requires the candidate&rsquo;s specific consent per recipient.
          </p>
        </section>

        <aside>
          <div className="border-b-2 border-foreground pb-3">
            <h3 className="text-[15px] font-semibold tracking-tight">Dimension means</h3>
          </div>
          <ul className="mt-6 space-y-5">
            {DIMENSIONS.map((d, i) => {
              const mean = Math.round(
                COHORT.reduce((s, r) => s + (r.marks[i] ?? 0), 0) / COHORT.length,
              );
              return (
                <li key={d.code}>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="ref text-primary">{d.numeral}</span>
                    <span className="min-w-0 flex-1 truncate text-[12.5px]">{d.title}</span>
                  </div>
                  <div className="mt-2.5">
                    <Bar value={mean} max={d.marks} />
                  </div>
                  <p className="mt-1.5 text-[11px] text-muted-foreground">of {d.marks} available</p>
                </li>
              );
            })}
          </ul>

          {!compact ? (
            <div className="mt-10 border-t border-rule pt-6">
              <p className="eyebrow">Board of examiners</p>
              <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
                Seven scripts await third-marker adjudication, each differing by more than one band
                between the two independent markers. Part III accounts for five of the seven, which
                is the expected pattern: professional-duty scripts mark less consistently than
                technical ones, and the divergence is reported to the Institute rather than resolved
                by averaging.
              </p>
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
