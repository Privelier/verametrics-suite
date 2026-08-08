import { createFileRoute } from "@tanstack/react-router";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container, Note, Section, SectionHeading } from "@/components/institutional";
import { DashboardPanel } from "@/components/dashboard-panel";

const title = "Registrar workspace — VeraMetrics Certification Institute";
const description =
  "The cohort return as the registrar and the board of examiners see it: dimension sub-scores, band distribution, the source tier each candidate reached, and the adjudication queue.";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Section tone="white" ruled={false} className="pb-12 pt-14 sm:pb-14 sm:pt-24">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Registrar workspace"
                eyebrowIndex="00"
                title="Cohort return, Faculty of Engineering."
                lede="Specimen data. The return is organised by dimension rather than by an overall score, because the sub-scores are the part a faculty can act on: a cohort weak on Part II needs a different intervention from one weak on Part III."
              />
              <p className="ref shrink-0 border border-rule-strong px-3 py-2 text-muted-foreground">
                Specimen · not live data
              </p>
            </div>
          </Container>
        </Section>

        <Section tone="paper" ruled={false} className="pt-0">
          <Container>
            <DashboardPanel />
          </Container>
        </Section>

        <Section tone="white">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <Note label="What the registrar sees">
                Dimension sub-scores, band, and the tier of source each candidate reached &mdash;
                primary, secondary or none. The source tier is reported separately from the mark
                because it is the single most actionable figure a faculty receives: a cohort that
                reaches secondary summaries and stops is telling you something specific about how
                research is taught, and it is not the same signal as a low overall mark.
              </Note>
              <Note label="What the registrar does not see">
                Nothing is shared with any employer without the candidate&rsquo;s specific consent,
                per recipient. There is no employer-facing search of the candidate population, and
                there will not be one. Candidates receive their own transcript before the faculty
                receives the cohort return.
              </Note>
            </div>
          </Container>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
