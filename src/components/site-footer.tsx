export function SiteFooter() {
  return (
    <footer className="bg-surface-deep/80">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-10 sm:flex sm:justify-between">
        <p className="min-w-0 text-sm text-muted-foreground">
          © {new Date().getFullYear()} VeraMetrics Institute. Certification records are
          cryptographically attested.
        </p>
        <p className="shrink-0 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          SOC 2 · ISO 27001 · GDPR
        </p>
      </div>
    </footer>
  );
}
