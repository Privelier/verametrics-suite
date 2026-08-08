import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  Container,
  Eyebrow,
  FigureRow,
  Note,
  Section,
  SectionHeading,
} from "@/components/institutional";
import {
  ATTESTATION_SCOPE,
  DIMENSIONS,
  GRADE_BANDS,
  PAPER_TOTAL_MARKS,
  PAPER_TOTAL_MINUTES,
  RESEARCH_INTEGRITY_RUBRIC,
} from "@/data/framework";

const title = "The examination — structure, marking and integrity — VeraMetrics";
const description =
  "One integrated case examined across five dimensions in a single 180-minute sitting. The full structure, the research integrity rubric, the grade bands, and the scope of what the certificate attests to.";

export const Route = createFileRoute("/programme")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ProgrammePage,
});

function ProgrammePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Section tone="white" ruled={false} className="pb-14 pt-14 sm:pb-16 sm:pt-24">
          <Container>
            <SectionHeading
              eyebrow="The examination"
              eyebrowIndex="00"
              title="One case, examined five times, from five positions."
              lede="The paper is a single institutional failure — an industrial accident, a corporate collapse, a manufacturing contamination, a withdrawn medicine — presented as a case file and then interrogated from five different seats. The parts are not independent, and they are not interchangeable."
            />
            <div className="mt-14">
              <FigureRow
                items={[
                  { value: "01", label: "Integrated case", note: "Not five separate tests" },
                  { value: "05", label: "Assessed dimensions", note: "Separate sub-scores" },
                  {
                    value: String(PAPER_TOTAL_MINUTES),
                    label: "Minutes",
                    note: "A single sitting",
                  },
                  {
                    value: String(PAPER_TOTAL_MARKS),
                    label: "Marks",
                    note: "Banded on the Institute scale",
                  },
                ]}
              />
            </div>
          </Container>
        </Section>

        <Section tone="paper" id="parts">
          <Container>
            <SectionHeading
              eyebrow="The five parts"
              eyebrowIndex="01"
              title="What each part is for."
            />

            <div className="mt-14 space-y-0 border-t border-rule-strong">
              {DIMENSIONS.map((dimension) => (
                <article
                  key={dimension.code}
                  className="grid gap-x-10 gap-y-6 border-b border-rule py-10 lg:grid-cols-[5rem_minmax(0,1fr)_minmax(0,16rem)]"
                >
                  <div>
                    <p className="font-serif text-[2rem] leading-none tracking-tight text-primary">
                      {dimension.numeral}
                    </p>
                    <p className="ref mt-3 text-muted-foreground">{dimension.code}</p>
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-[1.125rem] font-semibold tracking-tight">
                      {dimension.title}
                    </h3>
                    <p className="measure mt-4 text-[14px] leading-relaxed text-muted-foreground">
                      {dimension.construct}
                    </p>
                  </div>

                  <div className="lg:border-l lg:border-rule lg:pl-8">
                    <p className="eyebrow-muted">Reported sub-scores</p>
                    <ul className="mt-4 space-y-2">
                      {dimension.scored_dimensions.map((sub) => (
                        <li
                          key={sub}
                          className="text-[12.5px] leading-relaxed text-muted-foreground"
                        >
                          {sub}
                        </li>
                      ))}
                    </ul>
                    <p className="ref mt-5 border-t border-rule pt-4 text-muted-foreground">
                      {dimension.marks} marks · {dimension.minutes} min
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
              <Note label="Why Part IV follows Part I">
                Part I places the candidate after the event, in possession of the full record. Part
                IV places them back inside it, at the moment of decision, with only what was
                available at the time. Any passage in Part IV that relies on a finding the candidate
                made in Parts I or II is struck out before marking. The paper is testing whether a
                candidate can set aside a finding they themselves have just made &mdash; the single
                most common failure in real incident review, and one no conventional examination
                format can detect.
              </Note>
              <Note label="Why Parts III and V carry no annex">
                Annex A is specialisation-specific and attaches only to Parts I, II and IV.
                Professional duty under conflicted interest, and giving an account to a body with
                power over you, are faculty-level competences: a structural engineer and a software
                engineer face the same question when their employer asks them to keep a finding out
                of a report, and the Institute examines it in common.
              </Note>
            </div>
          </Container>
        </Section>

        <Section tone="white" id="integrity">
          <Container>
            <SectionHeading
              eyebrow="Research integrity"
              eyebrowIndex="02"
              title="The research is a marked dimension, not background reading."
              lede={`It carries ${Math.round(
                RESEARCH_INTEGRITY_RUBRIC.weight_of_paper * 100,
              )} per cent of the paper and is scored independently of technical quality, then combined at the weight declared on each part.`}
            />

            <div className="mt-14 overflow-x-auto">
              <table className="w-full min-w-[44rem] border-collapse text-left">
                <thead>
                  <tr className="border-b-2 border-foreground">
                    <th className="w-[13rem] pb-3 pr-6 text-[10.5px] font-semibold uppercase tracking-[0.16em]">
                      Criterion
                    </th>
                    <th className="w-[5rem] pb-3 pr-6 text-[10.5px] font-semibold uppercase tracking-[0.16em]">
                      Weight
                    </th>
                    <th className="pb-3 text-[10.5px] font-semibold uppercase tracking-[0.16em]">
                      Standard applied
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {RESEARCH_INTEGRITY_RUBRIC.dimensions.map((d) => (
                    <tr key={d.name} className="border-b border-rule align-top">
                      <td className="py-5 pr-6 text-[14px] font-semibold leading-snug">{d.name}</td>
                      <td className="py-5 pr-6 text-[14px] tabular-nums leading-snug text-primary">
                        {Math.round(d.weight * 100)}%
                      </td>
                      <td className="py-5 text-[13.5px] leading-relaxed text-muted-foreground">
                        {d.standard}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-14 grid gap-px bg-rule lg:grid-cols-3">
              {[
                ["Permitted materials", RESEARCH_INTEGRITY_RUBRIC.permitted_materials],
                ["Fabrication", RESEARCH_INTEGRITY_RUBRIC.fabrication_policy],
                [
                  "Answering from the case file alone",
                  RESEARCH_INTEGRITY_RUBRIC.no_research_penalty,
                ],
              ].map(([label, body]) => (
                <div key={label} className="bg-background p-8">
                  <p className="eyebrow">{label}</p>
                  <p className="mt-5 text-[13.5px] leading-relaxed text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        <Section tone="paper" id="bands">
          <Container>
            <SectionHeading
              eyebrow="Marking"
              eyebrowIndex="03"
              title="Grade bands and their descriptors."
              lede="Every script is marked independently by two markers, with a third adjudicating any disagreement beyond one band. Markers mark the reasoning, not the conclusion: a script reaching the expected conclusion by an unsound route scores below one reaching a defensible different conclusion soundly."
            />

            <div className="mt-14 border-t border-rule-strong">
              {GRADE_BANDS.map((band) => (
                <article
                  key={band.band}
                  className="grid gap-x-10 gap-y-4 border-b border-rule py-9 lg:grid-cols-[12rem_minmax(0,1fr)]"
                >
                  <div>
                    <h3 className="text-[1.0625rem] font-semibold tracking-tight">{band.band}</h3>
                    <p className="ref mt-2 text-primary">{band.range}</p>
                    <p className="mt-4 text-[12px] uppercase tracking-[0.14em] text-muted-foreground">
                      {Math.round(band.target_share * 100)}% design target
                    </p>
                  </div>
                  <p className="measure text-[14px] leading-relaxed text-muted-foreground">
                    {band.descriptor}
                  </p>
                </article>
              ))}
            </div>

            <p className="mt-8 max-w-2xl text-[13px] leading-relaxed text-muted-foreground">
              Design targets are not quotas. Where a cohort&rsquo;s distribution departs markedly
              from them, the board of examiners reports it to the Institute rather than adjusting
              marks toward it.
            </p>
          </Container>
        </Section>

        <Section tone="ink" ruled={false} id="attestation">
          <Container>
            <SectionHeading
              eyebrow="Scope"
              eyebrowIndex="04"
              tone="inverse"
              title="What the certificate attests to — and what it does not."
              lede="An instrument that overclaims is worse than no instrument, because a faculty cannot correct for a claim it was never told was being made."
            />

            <div className="mt-14 grid gap-px bg-white/15 lg:grid-cols-2">
              <div className="bg-ink-deep p-8">
                <Eyebrow tone="inverse">The certificate attests</Eyebrow>
                <ul className="mt-6 space-y-4">
                  {ATTESTATION_SCOPE.attests.map((item) => (
                    <li
                      key={item}
                      className="grid grid-cols-[1.2rem_minmax(0,1fr)] gap-x-1 text-[13.5px] leading-relaxed text-white/80"
                    >
                      <span aria-hidden className="pt-[11px]">
                        <span className="block h-px w-3 bg-white/50" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-ink-deep p-8">
                <Eyebrow tone="inverse">The certificate does not attest</Eyebrow>
                <ul className="mt-6 space-y-4">
                  {ATTESTATION_SCOPE.does_not_attest.map((item) => (
                    <li
                      key={item}
                      className="grid grid-cols-[1.2rem_minmax(0,1fr)] gap-x-1 text-[13.5px] leading-relaxed text-white/80"
                    >
                      <span aria-hidden className="pt-[11px]">
                        <span className="block h-px w-3 bg-white/50" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Link
              to="/faculties"
              className="mt-14 inline-flex items-center bg-background px-5 py-3 text-[13px] font-semibold tracking-tight text-foreground transition-colors hover:bg-white/85"
            >
              Read a specimen paper and its key
            </Link>
          </Container>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
