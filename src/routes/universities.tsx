import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  Container,
  FigureRow,
  Note,
  RuledItem,
  Section,
  SectionHeading,
} from "@/components/institutional";
import { FACULTIES } from "@/data/faculties";

const title = "For universities — VeraMetrics Certification Institute";
const description =
  "How the certifying examination is validated, deployed and governed in partnership with a university faculty: calibration, invigilation, marking, academic integrity and the terms on which the Institute will and will not make claims.";

export const Route = createFileRoute("/universities")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
  }),
  component: UniversitiesPage,
});

const validationStages = [
  {
    index: "I",
    title: "Content review by the faculty",
    duration: "4–6 weeks",
    body: "Two nominated academics from the faculty review the case, the annexes and the answer keys against their own curriculum, and mark the curriculum anchors that their programme does not in fact cover. Anchors that fail this review are rewritten, not waived. The Institute does not administer a paper whose curriculum component the faculty has not confirmed it teaches.",
  },
  {
    index: "II",
    title: "Pilot administration",
    duration: "One sitting",
    body: "A volunteer sample from the graduating cohort sits the paper under examination conditions, with no consequence attached to the result. The pilot produces the first empirical distribution, which is compared against the published design targets. Where the two diverge materially, the Institute revises the paper rather than the targets.",
  },
  {
    index: "III",
    title: "Inter-rater reliability",
    duration: "3–4 weeks",
    body: "Faculty markers and Institute markers independently mark the same pilot scripts. Agreement is measured per dimension, not per script, because the dimensions do not behave alike — Part I marks consistently and Part III does not. Where agreement on a dimension falls below the published threshold, the answer key for that dimension is rewritten and the exercise repeated.",
  },
  {
    index: "IV",
    title: "Adverse impact review",
    duration: "4 weeks",
    body: "The pilot distribution is examined for differential attainment across the protected characteristics the institution already monitors, and against first-language status, which matters disproportionately in an instrument this dependent on written argument. Findings are reported to the faculty in full, including where the sample is too small to support a conclusion — which, in a first pilot, it usually is.",
  },
  {
    index: "V",
    title: "Live administration",
    duration: "Per sitting",
    body: "Only after stages I to IV is a result attached to anything a student cares about. The Institute will not certify a cohort on an uncalibrated instrument, and will say so in writing to any faculty that asks it to.",
  },
];

const governance = [
  {
    heading: "The faculty chairs the board of examiners",
    body: "The Institute supplies the paper, the key and a second marker. The faculty chairs the board, holds the casting decision on any adjudicated script, and can overturn any Institute mark. A certifying body that cannot be overruled by the awarding institution is not a partner, it is a vendor with a veto.",
  },
  {
    heading: "The answer key is published to the faculty in full",
    body: "Before the first sitting, not after. A rubric that examiners cannot inspect is not a rubric. The key remains confidential to candidates for the obvious reason, and its release invalidates the paper for that cohort.",
  },
  {
    heading: "Academic integrity referrals go to the institution",
    body: "Fabricated citation is the heaviest penalty in the instrument, and a finding of it is referred to the institution's own academic integrity officer under the institution's own procedure. The Institute does not adjudicate misconduct by a student it does not enrol.",
  },
  {
    heading: "Results are the student's before they are anyone else's",
    body: "The candidate receives their transcript first, including the dimension sub-scores and the source tier they reached. Release to any employer requires the candidate's specific consent, per recipient. There is no employer-facing search of the candidate population and there will not be one.",
  },
];

function UniversitiesPage() {
  const specialisationCount = FACULTIES.reduce((sum, f) => sum + f.specialisations.length, 0);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Section tone="white" ruled={false} className="pb-14 pt-14 sm:pb-16 sm:pt-24">
          <Container>
            <SectionHeading
              eyebrow="For universities"
              eyebrowIndex="00"
              title="The awarding institution should hold the instrument."
              lede="A faculty that graduates a cohort is better placed than any employer to say what that cohort can do. The Institute exists to give that judgement a published rubric, an inspectable answer key, and a mark that means the same thing at two institutions — not to take the judgement away from the faculty."
            />
            <div className="mt-14">
              <FigureRow
                items={[
                  {
                    value: "04",
                    label: "Faculties",
                    note: "Engineering, Business, Pharmacy, Medicine",
                  },
                  {
                    value: String(specialisationCount),
                    label: "Specialisations",
                    note: "Each with its own technical annex",
                  },
                  {
                    value: "05",
                    label: "Validation stages",
                    note: "Before any result carries consequence",
                  },
                  {
                    value: "00",
                    label: "Claims made pre-pilot",
                    note: "No predictive validity is asserted",
                  },
                ]}
              />
            </div>
          </Container>
        </Section>

        <Section tone="paper">
          <Container>
            <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]">
              <SectionHeading
                eyebrow="The problem"
                eyebrowIndex="01"
                title="What happens between the transcript and the first appointment."
              />
              <div className="measure space-y-5 text-[15px] leading-relaxed text-muted-foreground lg:pt-2">
                <p>
                  A graduating cohort leaves with a transcript that records, accurately, what each
                  student was taught and how reliably they reproduced it. Within weeks, most of them
                  are assessed again — by aptitude batteries, case interviews, situational judgement
                  tests and assessment centres commissioned by employers, differing between firms,
                  unpublished in method, and in most cases unvalidated against anything.
                </p>
                <p>
                  The faculty has no visibility of those instruments, no ability to prepare students
                  for what they measure, and no way to contest a result. The student bears the cost
                  of the inconsistency. And the thing being measured — judgement under incomplete
                  evidence, under conflicted interest, under a clock — is precisely the thing the
                  faculty spent three to six years developing and has no instrument to evidence.
                </p>
                <p className="text-foreground">
                  The Institute&rsquo;s proposition is narrow: one published examination, sat under
                  the faculty&rsquo;s own invigilation, marked against a key the faculty has read,
                  reported to the student before anyone else. It does not replace the degree and it
                  does not predict job performance. It evidences one thing, and states plainly that
                  it evidences only that.
                </p>
              </div>
            </div>
          </Container>
        </Section>

        <Section tone="white" id="validation">
          <Container>
            <SectionHeading
              eyebrow="Validation"
              eyebrowIndex="02"
              title="Nothing is certified until it has been calibrated with your cohort."
              lede="The Institute publishes design targets for band distribution. They are not empirical, they are stated as such on every document, and they are replaced by your faculty's own pilot data before any result carries consequence."
            />

            <div className="mt-14 border-t border-rule-strong">
              {validationStages.map((stage) => (
                <RuledItem
                  key={stage.index}
                  index={stage.index}
                  title={stage.title}
                  meta={stage.duration}
                >
                  <p className="measure text-[14px] leading-relaxed text-muted-foreground">
                    {stage.body}
                  </p>
                </RuledItem>
              ))}
            </div>
          </Container>
        </Section>

        <Section tone="paper" id="deployment">
          <Container>
            <SectionHeading eyebrow="Deployment" eyebrowIndex="03" title="How a sitting runs." />

            <div className="mt-14 grid gap-px bg-rule lg:grid-cols-3">
              {[
                {
                  label: "Before",
                  items: [
                    "Faculty confirms curriculum anchors and nominates two markers",
                    "Candidates declare faculty and specialisation; papers are generated per candidate",
                    "Papers and keys are issued as typeset PDFs — the paper to invigilation, the key to the board only",
                    "Candidates are briefed on permitted materials and the model declaration requirement",
                  ],
                },
                {
                  label: "During",
                  items: [
                    "A single 180-minute invigilated sitting, open-source conditions",
                    "Internet, databases and course materials permitted; no communication about the paper",
                    "Generative model use permitted and declared in the Sources and Methods appendix",
                    "Adaptive verification probes are put to a sample of candidates on submission",
                  ],
                },
                {
                  label: "After",
                  items: [
                    "Two independent markers per script; a third adjudicates beyond one band",
                    "Verification probes resolve contested citations; responses recorded verbatim",
                    "Integrity referrals go to the institution's own officer under its own procedure",
                    "Transcripts issue to candidates first, with dimension sub-scores and source tier",
                  ],
                },
              ].map((phase) => (
                <div key={phase.label} className="bg-background p-8">
                  <p className="eyebrow">{phase.label}</p>
                  <ul className="mt-6 space-y-3">
                    {phase.items.map((item) => (
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
          </Container>
        </Section>

        <Section tone="white">
          <Container>
            <SectionHeading
              eyebrow="Governance"
              eyebrowIndex="04"
              title="Terms the Institute proposes, in writing, before any agreement."
              lede="These are the provisions faculties raise first, so they are stated first."
            />

            <div className="mt-14 grid gap-x-16 gap-y-12 sm:grid-cols-2">
              {governance.map((item) => (
                <div key={item.heading} className="border-t-2 border-foreground pt-6">
                  <h3 className="text-[15px] font-semibold tracking-tight">{item.heading}</h3>
                  <p className="mt-4 text-[13.5px] leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16 border-t border-rule pt-12">
              <Note label="On legal exposure">
                An instrument used in selection carries real legal exposure, and a faculty should
                assume it applies. Where results are shared with employers, the relevant employment
                discrimination law of the jurisdiction engages, as do data protection provisions on
                automated decision-making and, in the European Union, the classification of
                employment-related assessment tools as high-risk. The Institute&rsquo;s position is
                that these obligations sit with the parties, that adverse impact review is therefore
                a validation stage rather than an optional extra, and that no faculty should take
                the Institute&rsquo;s word for any of it &mdash; this is a matter for the
                institution&rsquo;s own counsel, and the Institute will provide whatever
                documentation that review requires.
              </Note>
            </div>
          </Container>
        </Section>

        <Section tone="ink" ruled={false} id="briefing">
          <Container>
            <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,28rem)_minmax(0,1fr)]">
              <SectionHeading
                eyebrow="Next step"
                eyebrowIndex="05"
                tone="inverse"
                title="A faculty briefing."
                lede="Ninety minutes with the faculty's nominated academics. The Institute brings the paper, the answer key and the pilot design; the faculty brings its curriculum map and its objections."
              />
              <div className="lg:pt-2">
                <div className="border-t border-white/25 pt-8">
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
                    What is covered
                  </p>
                  <ul className="mt-6 space-y-4">
                    {[
                      "A walk-through of the paper for your faculty, part by part, with the answer key open.",
                      "The curriculum anchor review: which assumed coursework your programme actually covers, and what is rewritten if it does not.",
                      "The pilot design: sample size, conditions, what the pilot can and cannot establish, and what the Institute will not claim on the strength of it.",
                      "The governance terms above, and any the faculty wishes to add before an agreement is drafted.",
                    ].map((item) => (
                      <li
                        key={item}
                        className="grid grid-cols-[1.2rem_minmax(0,1fr)] gap-x-1 text-[14px] leading-relaxed text-white/80"
                      >
                        <span aria-hidden className="pt-[11px]">
                          <span className="block h-px w-3 bg-white/50" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 flex flex-wrap gap-3">
                    <a
                      href="mailto:registrar@verametrics.institute?subject=Faculty%20briefing%20request"
                      className="inline-flex items-center bg-background px-5 py-3 text-[13px] font-semibold tracking-tight text-foreground transition-colors hover:bg-white/85"
                    >
                      Request a faculty briefing
                    </a>
                    <Link
                      to="/faculties"
                      className="inline-flex items-center border border-white/35 px-5 py-3 text-[13px] font-semibold tracking-tight text-white transition-colors hover:bg-white hover:text-foreground"
                    >
                      Read a specimen paper first
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
