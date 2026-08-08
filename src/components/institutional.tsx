import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared institutional layout primitives.
 *
 * The whole site is built from four things: a hairline rule, a small-caps
 * label, a serif heading, and a measure of text. Anything that cannot be built
 * from those does not belong on this site.
 */

export function Container({
  children,
  className,
  width = "default",
}: {
  children: ReactNode;
  className?: string;
  width?: "default" | "wide" | "narrow";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 sm:px-8",
        width === "narrow" && "max-w-3xl",
        width === "default" && "max-w-6xl",
        width === "wide" && "max-w-7xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
  tone = "paper",
  ruled = true,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "paper" | "white" | "ink";
  ruled?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-24",
        ruled && "border-t border-rule",
        tone === "paper" && "bg-paper",
        tone === "white" && "bg-background",
        tone === "ink" && "border-t-0 bg-ink-deep text-white",
        className,
      )}
    >
      {children}
    </section>
  );
}

/** Small-caps section label with an optional numeric prefix. */
export function Eyebrow({
  children,
  index,
  tone = "primary",
  className,
}: {
  children: ReactNode;
  index?: string | undefined;
  tone?: "primary" | "muted" | "inverse";
  className?: string | undefined;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[11px] font-semibold uppercase leading-none tracking-[0.18em]",
        tone === "primary" && "text-primary",
        tone === "muted" && "text-muted-foreground",
        tone === "inverse" && "text-white/60",
        className,
      )}
    >
      {index ? (
        <span
          className={cn(
            "ref font-semibold",
            tone === "inverse" ? "text-white/45" : "text-muted-foreground",
          )}
        >
          {index}
        </span>
      ) : null}
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  eyebrowIndex,
  title,
  lede,
  tone = "default",
  className,
}: {
  eyebrow?: string;
  eyebrowIndex?: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: "default" | "inverse";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <Eyebrow index={eyebrowIndex} tone={tone === "inverse" ? "inverse" : "primary"}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <h2
        className={cn(
          "mt-5 text-pretty text-[1.75rem] leading-[1.15] sm:text-[2.125rem]",
          tone === "inverse" && "text-white",
        )}
      >
        {title}
      </h2>
      <span className={cn("rule-accent mt-6", tone === "inverse" && "bg-white/40")} aria-hidden />
      {lede ? (
        <p
          className={cn(
            "measure mt-6 text-[0.9375rem] leading-relaxed",
            tone === "inverse" ? "text-white/70" : "text-muted-foreground",
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Hairline-ruled figure row. Deliberately not a card grid: the rules do the
 * separating, which is how a printed table of contents or a statistical
 * abstract is set.
 */
export function FigureRow({
  items,
  tone = "default",
  columns = 4,
}: {
  items: { value: string; label: string; note?: string }[];
  tone?: "default" | "inverse";
  columns?: 3 | 4;
}) {
  return (
    <dl
      className={cn(
        "grid border-t",
        tone === "inverse" ? "border-white/20" : "border-rule-strong",
        columns === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3",
      )}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className={cn(
            "border-b py-6 pr-6 sm:border-r sm:last:border-r-0",
            tone === "inverse" ? "border-white/15" : "border-rule",
          )}
        >
          <dt
            className={cn(
              "font-serif text-[1.75rem] leading-none tracking-tight tabular-nums",
              tone === "inverse" ? "text-white" : "text-foreground",
            )}
          >
            {item.value}
          </dt>
          <dd className="mt-3 pr-2">
            <span
              className={cn(
                "block text-[10.5px] font-semibold uppercase tracking-[0.16em]",
                tone === "inverse" ? "text-white/55" : "text-muted-foreground",
              )}
            >
              {item.label}
            </span>
            {item.note ? (
              <span
                className={cn(
                  "mt-2 block text-[12.5px] leading-relaxed",
                  tone === "inverse" ? "text-white/45" : "text-muted-foreground",
                )}
              >
                {item.note}
              </span>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** A numbered entry in a ruled list — used for the five parts and elsewhere. */
export function RuledItem({
  index,
  title,
  meta,
  children,
  className,
}: {
  index: string;
  title: ReactNode;
  meta?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "grid gap-x-8 gap-y-4 border-b border-rule py-8 sm:grid-cols-[4.5rem_minmax(0,1fr)]",
        className,
      )}
    >
      <p className="ref pt-1 text-primary">{index}</p>
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h3 className="text-[1.0625rem] font-semibold tracking-tight">{title}</h3>
          {meta ? <span className="ref shrink-0 text-muted-foreground">{meta}</span> : null}
        </div>
        {children ? <div className="mt-3">{children}</div> : null}
      </div>
    </article>
  );
}

/** Institutional button. Two variants only: solid blue, and ruled outline. */
export function ActionLink({
  children,
  href,
  variant = "solid",
  className,
  ...rest
}: {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "outline" | "quiet";
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 px-5 py-3 text-[13px] font-semibold tracking-tight transition-colors",
        variant === "solid" && "bg-primary text-primary-foreground hover:bg-ink-deep",
        variant === "outline" &&
          "border border-rule-strong text-foreground hover:bg-foreground hover:text-background",
        variant === "quiet" &&
          "border border-rule text-muted-foreground hover:border-rule-strong hover:text-foreground",
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  );
}

/** A short attributed note set in the margin voice. Used for caveats. */
export function Note({
  label = "Note",
  children,
  className,
}: {
  label?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("border-l-2 border-primary pl-5", className)}>
      <p className="eyebrow">{label}</p>
      <p className="measure mt-3 text-[13.5px] leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}
