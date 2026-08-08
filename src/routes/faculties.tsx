import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container, Eyebrow, Note, Section, SectionHeading } from "@/components/institutional";
import { FACULTIES, type Faculty, type Specialisation } from "@/data/faculties";
import { examinationForFaculty } from "@/data/examinations";
import { cn } from "@/lib/utils";

const title = "Faculties and specialisations — VeraMetrics Certification Institute";
const description =
  "Declare a faculty and a specialisation. The faculty determines the case; the specialisation determines the technical annex bound into the back of the paper.";

export const Route = createFileRoute("/faculties")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
  }),
  component: FacultiesPage,
});

/** Free-text match across faculty name, specialisation name, summary and coursework. */
function matches(faculty: Faculty, specialisation: Specialisation, query: string): boolean {
  if (!query.trim()) return true;
  const haystack = [
    faculty.name,
    faculty.summary,
    ...faculty.degree_examples,
    specialisation.name,
    specialisation.summary,
    ...specialisation.curriculum_anchor,
    specialisation.annex.exhibit_title,
  ]
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

function FacultiesPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(
    () =>
      FACULTIES.map((faculty) => ({
        faculty,
        specialisations: faculty.specialisations.filter((s) => matches(faculty, s, query)),
      })).filter((group) => group.specialisations.length > 0),
    [query],
  );

  const totalShown = results.reduce((sum, g) => sum + g.specialisations.length, 0);
  const totalAvailable = FACULTIES.reduce((sum, f) => sum + f.specialisations.length, 0);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Section tone="white" ruled={false} className="pb-10 pt-14 sm:pb-12 sm:pt-20">
          <Container>
            <SectionHeading
              eyebrow="Register for a sitting"
              eyebrowIndex="01"
              title="Declare your faculty, then your specialisation."
              lede="The faculty determines the case: one integrated institutional failure, examined across five parts in a single 180-minute sitting. The specialisation determines Annex A, the technical exhibit bound into the back of the paper, which carries requirements attaching to Parts I, II and IV and is marked against its own key."
            />

            <div className="mt-12 max-w-2xl">
              <label htmlFor="major-search" className="eyebrow-muted">
                Search by degree, discipline or subject
              </label>
              <div className="mt-4 flex items-center gap-3 border-b-2 border-foreground pb-3">
                <Search aria-hidden className="size-4 shrink-0 text-muted-foreground" />
                <input
                  id="major-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="e.g. computer, pharmacology, audit, structural, epidemiology"
                  className="w-full bg-transparent text-[15px] tracking-tight outline-none placeholder:text-muted-foreground/70"
                />
              </div>
              <p className="mt-3 text-[12.5px] text-muted-foreground">
                {query.trim()
                  ? `${totalShown} of ${totalAvailable} specialisations match.`
                  : `${totalAvailable} specialisations across ${FACULTIES.length} faculties.`}
              </p>
            </div>
          </Container>
        </Section>

        {results.length === 0 ? (
          <Section tone="paper">
            <Container>
              <p className="measure text-[15px] leading-relaxed text-muted-foreground">
                No specialisation matches that search. The Institute currently examines four
                faculties. If your discipline is not represented, a faculty briefing is the route to
                commissioning a case for it &mdash; new faculties are authored with the partner
                institution rather than adapted from an existing one.
              </p>
              <Link
                to="/universities"
                hash="briefing"
                className="mt-8 inline-flex bg-primary px-5 py-3 text-[13px] font-semibold tracking-tight text-primary-foreground transition-colors hover:bg-ink-deep"
              >
                Request a faculty briefing
              </Link>
            </Container>
          </Section>
        ) : (
          results.map(({ faculty, specialisations }, index) => {
            const examination = examinationForFaculty(faculty.slug);
            return (
              <Section
                key={faculty.slug}
                tone={index % 2 === 0 ? "paper" : "white"}
                className="py-14 sm:py-20"
              >
                <Container>
                  <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
                    <div className="lg:sticky lg:top-28 lg:self-start">
                      <Eyebrow index={faculty.code}>Faculty</Eyebrow>
                      <h2 className="mt-5 text-[1.5rem] leading-tight tracking-tight">
                        {faculty.name}
                      </h2>
                      <span aria-hidden className="rule-accent mt-5" />
                      <p className="mt-5 text-[13.5px] leading-relaxed text-muted-foreground">
                        {faculty.summary}
                      </p>

                      {examination ? (
                        <div className="mt-7 border-t border-rule pt-5">
                          <p className="eyebrow-muted">Case</p>
                          <p className="mt-3 font-serif text-[15px] tracking-tight">
                            {examination.case_title}
                          </p>
                          <p className="ref mt-2 text-muted-foreground">
                            {examination.case_code} · 5 parts · 1000 marks
                          </p>
                        </div>
                      ) : null}

                      <div className="mt-6 border-t border-rule pt-5">
                        <p className="eyebrow-muted">Written for</p>
                        <ul className="mt-3 space-y-1.5">
                          {faculty.degree_examples.map((degree) => (
                            <li key={degree} className="text-[12.5px] text-muted-foreground">
                              {degree}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="border-t border-rule-strong">
                      {specialisations.map((specialisation) => {
                        const paperId = `${faculty.slug}-${specialisation.slug}`;
                        return (
                          <article
                            key={specialisation.slug}
                            className="grid gap-x-8 gap-y-5 border-b border-rule py-8 sm:grid-cols-[3.5rem_minmax(0,1fr)]"
                          >
                            <p className="ref pt-1 text-primary">{specialisation.code}</p>
                            <div className="min-w-0">
                              <h3 className="text-[1.0625rem] font-semibold tracking-tight">
                                {specialisation.name}
                              </h3>
                              <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                                {specialisation.summary}
                              </p>

                              <p className="mt-5 eyebrow-muted">Annex A exhibit</p>
                              <p className="mt-2.5 text-[13px] leading-relaxed">
                                {specialisation.annex.exhibit_title.replace(/^Annex A — /, "")}
                              </p>

                              <p className="mt-5 eyebrow-muted">Assumed coursework</p>
                              <ul className="mt-2.5 space-y-1.5">
                                {specialisation.curriculum_anchor.map((item) => (
                                  <li
                                    key={item}
                                    className="grid grid-cols-[0.9rem_minmax(0,1fr)] gap-x-1 text-[12.5px] leading-relaxed text-muted-foreground"
                                  >
                                    <span aria-hidden className="pt-[9px]">
                                      <span className="block h-px w-2 bg-muted-foreground" />
                                    </span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>

                              <div className="mt-7 flex flex-wrap gap-2.5">
                                <Link
                                  to="/paper/$paperId"
                                  params={{ paperId }}
                                  className="inline-flex items-center bg-primary px-4 py-2.5 text-[12.5px] font-semibold tracking-tight text-primary-foreground transition-colors hover:bg-ink-deep"
                                >
                                  Generate examination paper
                                </Link>
                                <Link
                                  to="/answer-key/$paperId"
                                  params={{ paperId }}
                                  className="inline-flex items-center border border-rule-strong px-4 py-2.5 text-[12.5px] font-semibold tracking-tight transition-colors hover:bg-foreground hover:text-background"
                                >
                                  Examiner&rsquo;s key
                                </Link>
                              </div>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </div>
                </Container>
              </Section>
            );
          })
        )}

        <Section tone="paper">
          <Container>
            <div className={cn("grid gap-10 lg:grid-cols-2 lg:gap-16")}>
              <Note label="On the answer key">
                Both documents are produced as designed, paginated PDFs from the buttons above: the
                paper for the candidate, and a separate examiner&rsquo;s key marked confidential.
                The key carries the model answers, the discriminating signal for each part, the
                red-flag schedule, the verification probes, and the documented real-world precedent
                the case is built on &mdash; which is deliberately absent from the candidate&rsquo;s
                paper, because identifying it is an assessed task.
              </Note>
              <Note label="On new faculties">
                The Institute examines four faculties. A fifth is not adapted from an existing case:
                it is authored with the partner faculty, anchored to a documented failure in that
                discipline&rsquo;s own public record, and calibrated against that faculty&rsquo;s
                own graduating cohort before it is used for any purpose affecting a student.
              </Note>
            </div>
          </Container>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
