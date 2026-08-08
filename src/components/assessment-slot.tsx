import { useId, useState } from "react";
import {
  ChevronDown,
  Clock,
  Eye,
  EyeOff,
  Gauge,
  ListChecks,
  Search,
  Sparkles,
  TriangleAlert,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  scenariosForTest,
  type AssessmentScenario,
  type DifficultyLevel,
} from "@/data/assessment-bank";

const TIERS: DifficultyLevel[] = ["Easy", "Moderate", "Hard"];

const TIER_DOT: Record<DifficultyLevel, string> = {
  Easy: "bg-[oklch(0.7_0.15_150)]",
  Moderate: "bg-accent",
  Hard: "bg-destructive",
};

function Disclosure({
  label,
  meta,
  icon,
  tone = "default",
  defaultOpen = false,
  children,
}: {
  label: string;
  meta?: string;
  icon: React.ReactNode;
  tone?: "default" | "research" | "examiner";
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div
      className={cn(
        "rounded-md border bg-card/40",
        tone === "research" && "border-accent/40 bg-accent/[0.06]",
        tone === "examiner" && "border-destructive/35 bg-destructive/[0.05]",
        tone === "default" && "border-border/70",
      )}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 px-3 py-2 text-left"
      >
        <span
          className={cn(
            "shrink-0",
            tone === "research"
              ? "text-accent"
              : tone === "examiner"
                ? "text-destructive"
                : "text-primary",
          )}
        >
          {icon}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em]">{label}</span>
        {meta ? (
          <span className="truncate font-mono text-[10px] text-muted-foreground">{meta}</span>
        ) : null}
        <ChevronDown
          aria-hidden
          className={cn(
            "ml-auto size-3.5 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {open ? (
        <div id={panelId} className="border-t border-border/60 px-3 py-3">
          {children}
        </div>
      ) : null}
    </div>
  );
}

function Bullets({ items, marker = "text-primary" }: { items: string[]; marker?: string }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-[11px] leading-relaxed text-muted-foreground">
          <span aria-hidden className={cn("mt-[7px] size-1 shrink-0 rounded-full", marker)} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ScenarioDetail({ scenario }: { scenario: AssessmentScenario }) {
  const [examiner, setExaminer] = useState(false);
  const { parameters: p, research_requirement: r, calibration: c } = scenario;

  return (
    <div className="mt-3 space-y-2.5">
      {/* meta strip */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-md border border-border/70 bg-secondary/30 px-3 py-2">
        <span className="font-mono text-[10px] text-primary">{scenario.id}</span>
        <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <Clock aria-hidden className="size-3" />
          {p.duration_minutes} min
        </span>
        <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <Gauge aria-hidden className="size-3" />
          <span title="Pre-pilot design target, not an observed rate">
            {Math.round(c.target_pass_rate * 100)}% target pass
          </span>
        </span>
        <button
          type="button"
          aria-pressed={examiner}
          onClick={() => setExaminer((v) => !v)}
          className={cn(
            "ml-auto inline-flex items-center gap-1.5 rounded border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors",
            examiner
              ? "border-destructive/50 bg-destructive/10 text-destructive"
              : "border-border bg-card/60 text-muted-foreground hover:text-foreground",
          )}
        >
          {examiner ? (
            <Eye aria-hidden className="size-3" />
          ) : (
            <EyeOff aria-hidden className="size-3" />
          )}
          Examiner view
        </button>
      </div>

      <p className="text-[11px] leading-relaxed text-muted-foreground">
        <span className="font-semibold uppercase tracking-[0.14em] text-foreground/80">
          Format.{" "}
        </span>
        {p.format}
      </p>

      <p className="max-h-40 overflow-y-auto rounded-md border border-border/60 bg-background/40 p-3 text-xs leading-relaxed text-foreground/90">
        {scenario.scenario_brief}
      </p>

      <Disclosure
        label="Real-world research requirement"
        meta={`weight ${r.scoring_weight}`}
        icon={<Search aria-hidden className="size-3.5" />}
        tone="research"
        defaultOpen
      >
        <p className="text-[11px] leading-relaxed text-foreground/90">{r.mandate}</p>

        <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
          Target sources
        </p>
        <Bullets items={r.target_sources} marker="bg-accent/70" />

        <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
          Deliverable
        </p>
        <p className="text-[11px] leading-relaxed text-muted-foreground">{r.deliverable}</p>

        <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
          How findings are graded
        </p>
        <p className="text-[11px] leading-relaxed text-muted-foreground">{r.evaluation_method}</p>

        <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
          Verification probes
        </p>
        <ol className="space-y-1.5">
          {r.verification_probes.map((probe, i) => (
            <li
              key={probe}
              className="flex gap-2 text-[11px] leading-relaxed text-muted-foreground"
            >
              <span className="font-mono text-[10px] text-accent">{i + 1}</span>
              <span>{probe}</span>
            </li>
          ))}
        </ol>
      </Disclosure>

      <Disclosure
        label="Parameters"
        meta={`${p.injects.length} injects`}
        icon={<Zap aria-hidden className="size-3.5" />}
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground/80">
          Materials provided
        </p>
        <Bullets items={p.materials_provided} />

        <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground/80">
          Constraints
        </p>
        <Bullets items={p.constraints} />

        <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground/80">
          Timed injects
        </p>
        <ul className="space-y-1.5">
          {p.injects.map((inject) => (
            <li key={inject.at_minute} className="flex gap-2">
              <span className="mt-px shrink-0 rounded border border-primary/40 bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] text-primary">
                T+{inject.at_minute}m
              </span>
              <span className="text-[11px] leading-relaxed text-muted-foreground">
                {inject.content}
              </span>
            </li>
          ))}
        </ul>
      </Disclosure>

      <Disclosure
        label="Evaluation criteria"
        meta={`${scenario.evaluation_criteria.length} signals`}
        icon={<ListChecks aria-hidden className="size-3.5" />}
      >
        <Bullets items={scenario.evaluation_criteria} />
      </Disclosure>

      {examiner ? (
        <>
          <Disclosure
            label="Model answer key"
            icon={<Sparkles aria-hidden className="size-3.5" />}
            tone="examiner"
          >
            <p className="max-h-56 overflow-y-auto text-[11px] leading-relaxed text-foreground/90">
              {scenario.model_answer_key}
            </p>
            <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-destructive">
              Discriminating signal
            </p>
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              {c.discriminating_signal}
            </p>
          </Disclosure>

          <Disclosure
            label="Red flags"
            meta={`${scenario.red_flags.length}`}
            icon={<TriangleAlert aria-hidden className="size-3.5" />}
            tone="examiner"
          >
            <Bullets items={scenario.red_flags} marker="bg-destructive/70" />
          </Disclosure>
        </>
      ) : (
        <p className="rounded-md border border-dashed border-border/70 px-3 py-2 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          Answer key and red flags hidden from candidate view
        </p>
      )}
    </div>
  );
}

/**
 * Renders the injected assessment bank content for one pillar.
 * Replaces the original CLAUDE_CODE_TEST_SLOT placeholder.
 */
export function AssessmentSlot({ name }: { name: string }) {
  const scenarios = scenariosForTest(name);
  const [tier, setTier] = useState<DifficultyLevel>("Easy");
  const active = scenarios.find((s) => s.difficulty_level === tier) ?? scenarios[0];

  return (
    <div
      data-test-slot={name}
      className="mt-5 rounded-md border border-primary/30 bg-primary/[0.04] p-4"
    >
      {/* CLAUDE_CODE_TEST_SLOT: injected test cases render here */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
          Assessment bank
        </p>
        <p className="font-mono text-[10px] text-muted-foreground">
          {scenarios.length} scenarios &middot; open book
        </p>
      </div>

      {active ? (
        <>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {TIERS.map((level) => {
              const selected = active.difficulty_level === level;
              return (
                <button
                  key={level}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setTier(level)}
                  className={cn(
                    "flex items-center justify-center gap-1.5 rounded border px-2 py-2 text-[11px] font-medium transition-colors",
                    selected
                      ? "border-primary/60 bg-primary/15 text-foreground glow-ring"
                      : "border-border bg-card/50 text-muted-foreground hover:border-primary/40 hover:text-foreground",
                  )}
                >
                  <span aria-hidden className={cn("size-1.5 rounded-full", TIER_DOT[level])} />
                  {level}
                </button>
              );
            })}
          </div>
          <ScenarioDetail key={active.id} scenario={active} />
        </>
      ) : (
        <p className="mt-3 text-[11px] text-muted-foreground">
          No scenarios found for this pillar.
        </p>
      )}
    </div>
  );
}
