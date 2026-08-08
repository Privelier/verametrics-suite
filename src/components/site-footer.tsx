import { Link } from "@tanstack/react-router";
import { ATTESTATION_SCOPE } from "@/data/framework";

const columns = [
  {
    heading: "The examination",
    links: [
      { to: "/programme", label: "Structure and marking" },
      { to: "/programme", hash: "integrity", label: "Research integrity rubric" },
      { to: "/programme", hash: "bands", label: "Grade bands" },
      { to: "/faculties", label: "Faculties and specialisations" },
    ],
  },
  {
    heading: "For institutions",
    links: [
      { to: "/universities", label: "Institutional case" },
      { to: "/universities", hash: "validation", label: "Validation and calibration" },
      { to: "/universities", hash: "deployment", label: "Deployment" },
      { to: "/dashboard", label: "Registrar workspace" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer data-site-footer className="border-t border-rule-strong bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_repeat(2,minmax(0,1fr))]">
          <div>
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-7 w-[3px] bg-primary" />
              <span className="font-serif text-[15px] font-semibold tracking-tight">
                VeraMetrics Certification Institute
              </span>
            </div>
            <p className="measure mt-5 text-[13.5px] leading-relaxed text-muted-foreground">
              An independent certifying examination for graduating cohorts, administered in
              partnership with university faculties. One integrated case, five assessed dimensions,
              one sitting.
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.heading}>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-foreground">
                {column.heading}
              </p>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      // Spread rather than pass `hash={undefined}`: the router's
                      // link props are exact-optional, so the key must be absent.
                      {...("hash" in link && link.hash ? { hash: link.hash } : {})}
                      className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 border-t border-rule pt-8">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-foreground">
            What the certificate does not attest to
          </p>
          <ul className="mt-4 grid gap-3 lg:grid-cols-3">
            {ATTESTATION_SCOPE.does_not_attest.map((item) => (
              <li key={item} className="text-[12.5px] leading-relaxed text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-8">
          <p className="text-[12px] text-muted-foreground">
            © {new Date().getFullYear()} VeraMetrics Certification Institute. All organisations,
            individuals and figures appearing in examination content are fictional.
          </p>
          <p className="ref text-muted-foreground">Pre-pilot · calibration in progress</p>
        </div>
      </div>
    </footer>
  );
}
