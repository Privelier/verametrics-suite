import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Printer } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Print document chrome.
 *
 * The examination paper and the answer key are real documents, not web pages
 * with a print stylesheet bolted on. On screen they are shown as a sheet on a
 * grey ground; on paper the sheet becomes the page, and the running head and
 * foot below are repeated on every sheet by the browser (both Chrome and
 * Firefox repeat position:fixed elements across printed pages, which is what
 * `.print-running-head` in styles.css relies on).
 *
 * Page numbers come from the browser's own print footer. No shipping browser
 * implements the CSS @page margin boxes that would let us typeset them here,
 * so the document is instead paginated by content: the cover, the case file
 * and each of the five parts begin on a fresh sheet.
 */

export function DocumentToolbar({
  title,
  reference,
  backTo,
  backLabel,
  counterpart,
}: {
  title: string;
  reference: string;
  backTo: string;
  backLabel: string;
  counterpart?: { to: string; label: string };
}) {
  return (
    <div className="print-hide sticky top-0 z-40 border-b border-rule bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-[210mm] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-3">
        <div className="flex min-w-0 items-center gap-4">
          <Link
            to={backTo}
            className="inline-flex shrink-0 items-center gap-2 text-[12.5px] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft aria-hidden className="size-3.5" />
            {backLabel}
          </Link>
          <span aria-hidden className="hidden h-4 w-px bg-rule sm:block" />
          <p className="hidden min-w-0 truncate text-[12.5px] text-muted-foreground sm:block">
            <span className="ref text-foreground">{reference}</span>
            <span className="mx-2 text-rule">·</span>
            {title}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {counterpart ? (
            <Link
              to={counterpart.to}
              className="border border-rule px-3.5 py-2 text-[12px] font-semibold tracking-tight text-muted-foreground transition-colors hover:border-rule-strong hover:text-foreground"
            >
              {counterpart.label}
            </Link>
          ) : null}
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 bg-primary px-4 py-2 text-[12px] font-semibold tracking-tight text-primary-foreground transition-colors hover:bg-ink-deep"
          >
            <Printer aria-hidden className="size-3.5" />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * The sheet. On screen it is A4-width with generous margins on a grey ground;
 * in print the margins come from @page and this wrapper collapses.
 */
export function DocumentSheet({
  children,
  runningHead,
  runningFoot,
}: {
  children: ReactNode;
  runningHead: { left: string; right: string };
  runningFoot: { left: string; right: string };
}) {
  return (
    <div className="print-hide-ground bg-secondary py-0 sm:py-10">
      <div className="print-running-head" aria-hidden>
        <span>{runningHead.left}</span>
        <span>{runningHead.right}</span>
      </div>

      <article className="document print-sheet mx-auto w-full max-w-[210mm] bg-background px-7 py-12 shadow-[0_1px_0_0_var(--rule)] sm:px-16 sm:py-16">
        {children}
      </article>

      <div className="print-running-foot" aria-hidden>
        <span>{runningFoot.left}</span>
        <span>{runningFoot.right}</span>
      </div>
    </div>
  );
}

/** A document division that begins on a fresh sheet when printed. */
export function DocumentPage({
  children,
  first = false,
  className,
}: {
  children: ReactNode;
  first?: boolean;
  className?: string;
}) {
  return (
    <section className={cn(!first && "page-break pt-12 sm:pt-14", className)}>{children}</section>
  );
}

/** Numbered document heading: "PART III — Professional Duty…" */
export function DocumentHeading({
  overline,
  title,
  meta,
}: {
  overline: string;
  title: string;
  meta?: string;
}) {
  return (
    <header className="keep-together mb-8 border-b-2 border-foreground pb-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <p className="ref font-semibold uppercase tracking-[0.16em] text-primary">{overline}</p>
        {meta ? <p className="ref text-muted-foreground">{meta}</p> : null}
      </div>
      <h2 className="mt-3 font-serif text-[1.35rem] leading-tight tracking-tight">{title}</h2>
    </header>
  );
}

/** Sub-heading inside a part: "Requirements", "Exhibits", etc. */
export function DocumentSubheading({ children }: { children: ReactNode }) {
  return (
    <h3 className="keep-together mb-3 mt-8 border-b border-rule pb-1.5 font-sans text-[10.5px] font-bold uppercase tracking-[0.16em] text-foreground">
      {children}
    </h3>
  );
}

export function DocumentProse({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={cn("mb-3 text-[10.5pt] leading-[1.55]", className)}>{children}</p>;
}

/** Numbered requirement list, set as a document would set it. */
export function NumberedList({
  items,
  start = 1,
  marker = "decimal",
}: {
  items: ReactNode[];
  start?: number;
  marker?: "decimal" | "lower-roman";
}) {
  return (
    <ol className="mb-3 space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="keep-together grid grid-cols-[1.9rem_minmax(0,1fr)] gap-x-1">
          <span className="ref pt-[3px] text-muted-foreground">
            {marker === "decimal" ? `${start + i}.` : `(${toRoman(start + i).toLowerCase()})`}
          </span>
          <span className="text-[10.5pt] leading-[1.55]">{item}</span>
        </li>
      ))}
    </ol>
  );
}

/** Bulleted list with a rule-derived marker rather than a dot. */
export function DashList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mb-3 space-y-2">
      {items.map((item, i) => (
        <li key={i} className="keep-together grid grid-cols-[1.9rem_minmax(0,1fr)] gap-x-1">
          <span aria-hidden className="pt-[10px]">
            <span className="block h-px w-3 bg-muted-foreground" />
          </span>
          <span className="text-[10.5pt] leading-[1.55]">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Boxed field, used for the research mandate and other set-apart blocks. */
export function DocumentField({
  label,
  children,
  tone = "blue",
}: {
  label: string;
  children: ReactNode;
  tone?: "blue" | "ink" | "plain";
}) {
  return (
    <div
      className={cn(
        "keep-together mb-4 border-l-2 py-4 pl-5 pr-4",
        tone === "blue" && "field-blue border-primary",
        tone === "ink" && "border-foreground bg-secondary",
        tone === "plain" && "border-rule-strong",
      )}
    >
      <p
        className={cn(
          "mb-2.5 font-sans text-[10px] font-bold uppercase tracking-[0.16em]",
          tone === "blue" ? "text-primary" : "text-foreground",
        )}
      >
        {label}
      </p>
      {children}
    </div>
  );
}

function toRoman(n: number): string {
  const map: [number, string][] = [
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let out = "";
  let rest = n;
  for (const [value, numeral] of map) {
    while (rest >= value) {
      out += numeral;
      rest -= value;
    }
  }
  return out;
}
