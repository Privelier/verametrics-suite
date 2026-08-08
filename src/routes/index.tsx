import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  Container,
  Eyebrow,
  FigureRow,
  Note,
  RuledItem,
  Section,
  SectionHeading,
} from "@/components/institutional";
import { DIMENSIONS, PAPER_TOTAL_MARKS, PAPER_TOTAL_MINUTES } from "@/data/framework";
import { FACULTIES } from "@/data/faculties";
import { examinationForFaculty } from "@/data/examinations";

const title =
  "VeraMetrics Certification Institute — the certifying examination for graduating cohorts";
const description =
  "One integrated case, five assessed dimensions, one 180-minute sitting. An independent certifying examination administered with university faculties, testing what a degree establishes and what it cannot: judgement under conditions the curriculum does not simulate.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <Proposition />
        <Structure />
        <TwoSources />
        <Faculties />
        <Documents />
        <Integrity />
      </main>
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="border-b border-rule">
      <Container className="pb-16 pt-16 sm:pb-20 sm:pt-28">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
          <div>
            <Eyebrow index="EST. MMXXV">Independent certifying body</Eyebrow>
            <h1 className="mt-7 text-pretty font-serif text-[2.25rem] font-semibold leading-[1.08] tracking-tight sm:text-[3.25rem]">
              A degree establishes what a graduate knows.
              <br className="hidden sm:block" />{" "}
              <span className="text-primary">This establishes what they do with it.</span>
            </h1>
            <span aria-hidden className="rule-accent mt-8" />
            <p className="measure mt-8 text-[1.0625rem] leading-relaxed text-muted-foreground">
              VeraMetrics administers a single certifying examination to graduating cohorts, in
              partnership with university faculties. One integrated case, drawn from a documented
              institutional failure. Five assessed dimensions. One 180-minute sitting. Every part is
              written so that it cannot be answered from coursework alone, and cannot be answered by
              research alone.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/universities"
                hash="briefing"
                className="inline-flex items-center bg-primary px-5 py-3 text-[13px] font-semibold tracking-tight text-primary-foreground transition-colors hover:bg-ink-deep"
              >
                Request a faculty briefing
              </Link>
              <Link
                to="/faculties"
                className="inline-flex items-center border border-rule-strong px-5 py-3 text-[13px] font-semibold tracking-tight transition-colors hover:bg-foreground hover:text-background"
              >
                Read a specimen paper
              </Link>
            </div>
          </div>

          <aside className="lg:pt-3">
            <div className="border-t-2 border-foreground pt-6">
              <p className="eyebrow-muted">The examination at a glance</p>
              <dl className="mt-6 space-y-5">
                {[
                  ["Format", "One integrated case, five parts, sat in one session"],
                  ["Duration", `${PAPER_TOTAL_MINUTES} minutes`],
                  ["Scale", `${PAPER_TOTAL_MARKS} marks, reported as five dimension sub-scores`],
                  ["Conditions", "Open-source. Internet, databases and course materials permitted"],
                  ["Marking", "Two independent markers; a third on disagreement beyond one band"],
                ].map(([label, value]) => (
                  <div key={label} className="border-b border-rule pb-5 last:border-b-0">
                    <dt className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      {label}
                    </dt>
                    <dd className="mt-2 text-[13.5px] leading-relaxed">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}

function Proposition() {
  return (
    <Section tone="paper">
      <Container>
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]">
          <SectionHeading
            eyebrow="The proposition"
            eyebrowIndex="01"
            title="Universities certify knowledge. Nobody certifies judgement."
          />
          <div className="measure space-y-5 text-[15px] leading-relaxed text-muted-foreground lg:pt-2">
            <p>
              A transcript records what a graduate was taught and how reliably they reproduced it.
              It is an excellent instrument for that purpose and a poor proxy for the thing
              employers actually select on, which is what a person does when the evidence is
              incomplete, when the correct course and the comfortable course diverge, and when the
              method they were taught does not reach the problem in front of them.
            </p>
            <p>
              Employers have responded by building their own screens: aptitude batteries, case
              interviews, assessment centres. These are inconsistent between firms, unvalidated in
              most cases, opaque to the candidate, and they place the burden of proof on the
              graduate at precisely the moment they have least leverage.
            </p>
            <p className="text-foreground">
              The Institute&rsquo;s position is that this belongs with the awarding body. A faculty
              that graduates a cohort is better placed than any employer to say what that cohort can
              do, and a certificate issued alongside the degree, on a published rubric, with a
              published answer key, is a more honest instrument than a screen the candidate never
              sees.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Structure() {
  return (
    <Section tone="white" id="structure">
      <Container>
        <SectionHeading
          eyebrow="Structure"
          eyebrowIndex="02"
          title="Five dimensions. One case. One sitting."
          lede="This is not a battery of five tests. It is a single case file examined five times, from five positions. A candidate cannot revise for one dimension in isolation, because each part inherits the decisions taken in the part before it — and Part IV requires them to set aside the findings they made in Parts I and II."
        />

        <div className="mt-14 border-t border-rule-strong">
          {DIMENSIONS.map((dimension) => (
            <RuledItem
              key={dimension.code}
              index={dimension.numeral}
              title={dimension.title}
              meta={`${dimension.marks} marks · ${dimension.minutes} min`}
            >
              <p className="measure text-[14px] leading-relaxed text-muted-foreground">
                {dimension.construct}
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {dimension.scored_dimensions.map((sub) => (
                  <li
                    key={sub}
                    className="text-[11.5px] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  >
                    {sub}
                  </li>
                ))}
              </ul>
            </RuledItem>
          ))}
        </div>

        <div className="mt-14">
          <FigureRow
            items={[
              {
                value: "05",
                label: "Assessed dimensions",
                note: "Reported as separate sub-scores",
              },
              {
                value: String(PAPER_TOTAL_MINUTES),
                label: "Minutes",
                note: "A single invigilated sitting",
              },
              { value: String(PAPER_TOTAL_MARKS), label: "Marks", note: "Institute scale, banded" },
              {
                value: "02",
                label: "Independent markers",
                note: "A third adjudicates disagreement",
              },
            ]}
          />
        </div>
      </Container>
    </Section>
  );
}

function TwoSources() {
  return (
    <Section tone="ink" ruled={false}>
      <Container>
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]">
          <SectionHeading
            eyebrow="Construction"
            eyebrowIndex="03"
            tone="inverse"
            title="The two-source rule."
            lede="Every part of every paper is written so that it is unanswerable from either source alone."
          />
          <div className="lg:pt-2">
            <div className="grid gap-px bg-white/15 sm:grid-cols-2">
              {[
                {
                  label: "Curriculum anchor",
                  body: "Settled material the candidate is expected to have covered in an accredited degree programme. A relief valve sizing case. A mass balance. The reliability hierarchy of audit evidence. The prostacyclin–thromboxane balance. Nothing exotic, and nothing that can be looked up quickly enough to substitute for having learned it.",
                },
                {
                  label: "Research mandate",
                  body: "Material deliberately absent from the paper: a statutory notification deadline, an acceptable intake limit, a published benchmark, and — in every case — a documented real-world failure with the same causal structure, which the candidate must locate in the public record and apply. The precedent is never named.",
                },
              ].map((item) => (
                <div key={item.label} className="bg-ink-deep p-8">
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
                    {item.label}
                  </p>
                  <p className="mt-5 text-[14px] leading-relaxed text-white/80">{item.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-2xl text-[14px] leading-relaxed text-white/60">
              A candidate with strong coursework and no research capability fails on applicability.
              A candidate who researches well but cannot deploy the discipline&rsquo;s own settled
              methods fails on technical competence. The research is scored as its own dimension,
              carrying 30 per cent of the paper, and a correct citation that leaves the
              recommendation unchanged is capped at 40 per cent of that dimension &mdash; because
              the question is whether the finding moved the answer or merely decorated it.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Faculties() {
  return (
    <Section tone="paper">
      <Container>
        <SectionHeading
          eyebrow="Faculties"
          eyebrowIndex="04"
          title="Four faculties. Seventeen specialisations. Four documented failures."
          lede="The faculty determines the case. The specialisation determines Annex A — the technical exhibit bound into the back of the paper, carrying requirements attaching to Parts I, II and IV. Two candidates from the same faculty sit the same institutional failure and answer materially different technical questions about it."
        />

        <div className="mt-14 border-t border-rule-strong">
          {FACULTIES.map((faculty) => {
            const examination = examinationForFaculty(faculty.slug);
            return (
              <RuledItem
                key={faculty.slug}
                index={faculty.code}
                title={faculty.name}
                meta={`${faculty.specialisations.length} specialisations`}
              >
                <p className="measure text-[14px] leading-relaxed text-muted-foreground">
                  {faculty.summary}
                </p>
                {examination ? (
                  <p className="mt-4 font-serif text-[15px] tracking-tight">
                    {examination.case_title}
                  </p>
                ) : null}
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                  {faculty.specialisations.map((s) => (
                    <li key={s.slug} className="text-[12.5px] text-muted-foreground">
                      {s.name}
                    </li>
                  ))}
                </ul>
              </RuledItem>
            );
          })}
        </div>

        <Link
          to="/faculties"
          className="mt-12 inline-flex items-center bg-primary px-5 py-3 text-[13px] font-semibold tracking-tight text-primary-foreground transition-colors hover:bg-ink-deep"
        >
          Select a faculty and generate a paper
        </Link>
      </Container>
    </Section>
  );
}

function Documents() {
  return (
    <Section tone="white">
      <Container>
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]">
          <SectionHeading
            eyebrow="Documents"
            eyebrowIndex="05"
            title="A typeset paper, and a separate examiner's key."
            lede="Both are produced as designed, paginated documents ready for print or PDF. The paper is what the candidate sits. The key is what the board of examiners marks against, and is marked confidential."
          />
          <div className="lg:pt-2">
            <div className="grid gap-px bg-rule sm:grid-cols-2">
              {[
                {
                  label: "The paper",
                  items: [
                    "Cover with paper reference, duration, marks and candidate fields",
                    "The case file, printed in full before Part I",
                    "Five parts, each with its curriculum anchor, situation, numbered requirements, materials and compulsory research mandate",
                    "Annex A: the specialisation exhibit and its requirements",
                    "The research integrity rubric, printed for the candidate",
                  ],
                },
                {
                  label: "The examiner's key",
                  items: [
                    "The documented real-world precedent, with the analogues in the public record",
                    "Grade bands with descriptors and target distribution",
                    "For each part: what earns the marks, the discriminating signal, the red-flag schedule",
                    "Verification probes for separating research from fabrication",
                    "The scope of attestation, and what the certificate does not claim",
                  ],
                },
              ].map((doc) => (
                <div key={doc.label} className="bg-background p-8">
                  <p className="eyebrow">{doc.label}</p>
                  <ul className="mt-6 space-y-3">
                    {doc.items.map((item) => (
                      <li
                        key={item}
                        className="grid grid-cols-[1.1rem_minmax(0,1fr)] gap-x-1 text-[13px] leading-relaxed text-muted-foreground"
                      >
                        <span aria-hidden className="pt-[10px]">
                          <span className="block h-px w-2.5 bg-primary" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Integrity() {
  return (
    <Section tone="paper">
      <Container>
        <SectionHeading
          eyebrow="Integrity"
          eyebrowIndex="06"
          title="An open-book examination in a world of generative models."
          lede="The Institute's position is that closing the book is no longer a defence, and pretending otherwise produces an instrument that measures whether a candidate cheated rather than whether they can think."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-12">
          {[
            {
              heading: "The internet is permitted",
              body: "So are databases, statutory texts and course materials. Every part requires external material by design. A script answered entirely from the case file is capped at the Pass band regardless of technical quality.",
            },
            {
              heading: "Generative models are permitted and declared",
              body: "Candidates state what they asked and what they verified independently. An undeclared model-generated citation is treated as a fabricated citation — which is the heaviest penalty in the instrument, scored below an admitted research gap.",
            },
            {
              heading: "Fabrication is detected by method, not by phrasing",
              body: "The examiner probes for the sample, scope and methodology behind any cited figure. An invented source survives a request for its title and collapses under a request for its method. Two unrecovered fabrications void the paper.",
            },
          ].map((item) => (
            <div key={item.heading} className="border-t-2 border-foreground pt-6">
              <h3 className="text-[15px] font-semibold tracking-tight">{item.heading}</h3>
              <p className="mt-4 text-[13.5px] leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-rule pt-12">
          <Note label="Calibration status">
            The band boundaries and target attainment rates published by the Institute are design
            targets expressing an intended difficulty spread. They are not empirical. Before any use
            affecting a student&rsquo;s progression, award or employment, this instrument requires
            pilot administration with the partner institution, inter-rater reliability work on the
            answer keys, and an adverse-impact review. The Institute supplies content and marking
            architecture; validation is a joint exercise with the faculty, and is documented as
            such.
          </Note>
        </div>
      </Container>
    </Section>
  );
}
