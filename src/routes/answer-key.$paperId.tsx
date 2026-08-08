import { createFileRoute, notFound } from "@tanstack/react-router";

import {
  DocumentField,
  DocumentHeading,
  DocumentPage,
  DocumentProse,
  DocumentSheet,
  DocumentSubheading,
  DocumentToolbar,
  DashList,
  NumberedList,
} from "@/components/print-document";
import { annexRequirementsFor, composePaper, markSplit } from "@/data/paper";
import { GRADE_BANDS, ATTESTATION_SCOPE } from "@/data/framework";

export const Route = createFileRoute("/answer-key/$paperId")({
  loader: ({ params }) => {
    const paper = composePaper(params.paperId);
    if (!paper) throw notFound();
    return paper;
  },
  head: ({ loaderData }) => {
    const title = loaderData
      ? `${loaderData.reference} — Examiner's Key — VeraMetrics`
      : "Examiner's key — VeraMetrics";
    return {
      meta: [
        { title },
        {
          name: "description",
          content:
            "Examiner's marking key. Contains model answers, discriminating signals, red flags and the documented precedent underlying the case.",
        },
        { name: "robots", content: "noindex" },
      ],
    };
  },
  component: AnswerKeyDocument,
});

function AnswerKeyDocument() {
  const paper = Route.useLoaderData();
  const { faculty, specialisation, examination, reference } = paper;
  const annex = specialisation.annex;

  return (
    <>
      <DocumentToolbar
        title={`Examiner's key — ${specialisation.name}`}
        reference={`${reference}/K`}
        backTo="/faculties"
        backLabel="Faculties"
        counterpart={{ to: `/paper/${paper.paperId}`, label: "Candidate's paper" }}
      />

      <DocumentSheet
        runningHead={{ left: `${reference}/K`, right: "Confidential — examiner copy" }}
        runningFoot={{
          left: `${faculty.name} — ${specialisation.name}`,
          right: "Not for release to candidates",
        }}
      >
        {/* ---------------------------------------------------------------
            COVER
            --------------------------------------------------------------- */}
        <DocumentPage first>
          <div className="border-b-2 border-foreground pb-5">
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.22em]">
              VeraMetrics Certification Institute
            </p>
            <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Board of examiners — marking key
            </p>
          </div>

          <div className="mt-10 border-2 border-foreground bg-foreground px-6 py-5 text-background">
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.22em]">
              Confidential — examiner copy
            </p>
            <p className="mt-3 text-[10pt] leading-[1.5] opacity-85">
              This document contains the model answers, the discriminating signals, the red-flag
              schedule and the documented precedent underlying the case. It must not be released to
              candidates, nor to any person sitting the paper in the current or a future session.
              Release invalidates the paper for the cohort concerned.
            </p>
          </div>

          <div className="mt-14">
            <p className="eyebrow">Marking key</p>
            <h1 className="mt-5 font-serif text-[2rem] leading-[1.12] tracking-tight">
              {examination.case_title}
            </h1>
            <span aria-hidden className="rule-accent mt-6" />
          </div>

          <dl className="mt-12 space-y-3 border-t border-foreground pt-6">
            {[
              ["Paper", `${reference} / K`],
              ["Faculty", faculty.name],
              ["Specialisation", specialisation.name],
              ["Marks", `${paper.totalMarks} across five parts`],
              ["Session", paper.session],
            ].map(([label, value]) => (
              <div key={label} className="grid grid-cols-[8.5rem_minmax(0,1fr)] gap-4">
                <dt className="font-sans text-[9.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {label}
                </dt>
                <dd className="text-[10.5pt] leading-snug">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 border-t-2 border-foreground pt-6">
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.16em]">
              Instructions to markers
            </p>
            <NumberedList
              items={[
                "Every script is marked independently by two markers. Where the two marks differ by more than one band on any part, a third marker adjudicates and the adjudication is recorded on the transcript.",
                "Mark the reasoning, not the conclusion. A script reaching the expected conclusion by an unsound route scores below one reaching a defensible different conclusion by a sound route. The model answers below describe the reasoning that earns marks, not a required answer.",
                "Verify citations by methodology, not by title. A candidate who cannot state the sample, scope or method behind a figure they cited has not read the source. Use the verification probes set out against each part.",
                "Two unrecovered fabrications void the paper and refer the attempt to the partner institution's academic integrity officer. Record the probe and the response verbatim.",
                "Red flags are diagnostic, not automatically penal. A single red flag in an otherwise strong script is a marking note; three or more indicate a systematic failure of the dimension and should be reflected in the band.",
                "In Part IV, strike out any passage relying on a finding the candidate made in Part I or Part II before marking, and mark the requirement on what remains. Record what was struck.",
              ]}
            />
          </div>
        </DocumentPage>

        {/* ---------------------------------------------------------------
            PRECEDENT
            --------------------------------------------------------------- */}
        <DocumentPage>
          <DocumentHeading
            overline="Examiner briefing"
            title="The documented precedent underlying this case"
            meta="Not printed on the candidate's paper"
          />

          <DocumentField label="How the precedent is credited" tone="ink">
            <p className="text-[10pt] leading-[1.5]">{examination.precedent.note}</p>
          </DocumentField>

          <DocumentSubheading>Analogues in the public record</DocumentSubheading>
          <DashList items={examination.precedent.documented_analogues} />

          <DocumentSubheading>Grade bands</DocumentSubheading>
          <table className="mb-6 w-full border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-foreground">
                <th className="w-[7rem] pb-2 pr-4 font-sans text-[9px] font-bold uppercase tracking-[0.16em]">
                  Band
                </th>
                <th className="w-[5.5rem] pb-2 pr-4 font-sans text-[9px] font-bold uppercase tracking-[0.16em]">
                  Marks
                </th>
                <th className="w-[4.5rem] pb-2 pr-4 font-sans text-[9px] font-bold uppercase tracking-[0.16em]">
                  Target
                </th>
                <th className="pb-2 font-sans text-[9px] font-bold uppercase tracking-[0.16em]">
                  Descriptor
                </th>
              </tr>
            </thead>
            <tbody>
              {GRADE_BANDS.map((band) => (
                <tr key={band.band} className="border-b border-rule align-top">
                  <td className="py-3 pr-4 text-[9.5pt] font-semibold leading-snug">{band.band}</td>
                  <td className="py-3 pr-4 text-[9.5pt] tabular-nums leading-snug text-muted-foreground">
                    {band.range}
                  </td>
                  <td className="py-3 pr-4 text-[9.5pt] tabular-nums leading-snug text-muted-foreground">
                    {Math.round(band.target_share * 100)}%
                  </td>
                  <td className="py-3 text-[9.5pt] leading-[1.5] text-muted-foreground">
                    {band.descriptor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="text-[9pt] leading-[1.5] text-muted-foreground">
            Target shares are pre-pilot design targets expressing an intended difficulty spread.
            They are not observed rates and must not be used as a marking quota. Where a cohort's
            distribution departs markedly from them, report it to the Institute rather than adjust
            marks toward them.
          </p>
        </DocumentPage>

        {/* ---------------------------------------------------------------
            PART KEYS
            --------------------------------------------------------------- */}
        {examination.parts.map((part) => {
          const annexReqs = annexRequirementsFor(paper, part);
          const split = markSplit(paper, part);

          return (
            <DocumentPage key={part.numeral}>
              <DocumentHeading
                overline={`Key — Part ${part.numeral}`}
                title={part.title}
                meta={
                  annexReqs.length
                    ? `${split.core} + ${split.annex} annex = ${part.marks} marks`
                    : `${part.marks} marks`
                }
              />

              <DocumentField label="Discriminating signal" tone="ink">
                <p className="text-[10.5pt] font-medium leading-[1.55]">
                  {part.key.discriminating_signal}
                </p>
                <p className="mt-3 text-[9pt] leading-[1.5] opacity-75">
                  This is the single behaviour separating a Distinction script from an articulate
                  Merit script. Its presence or absence should be recorded against the part on the
                  mark sheet.
                </p>
              </DocumentField>

              <DocumentSubheading>What earns the marks</DocumentSubheading>
              <DocumentProse>{part.key.expected}</DocumentProse>

              <DocumentSubheading>Red flags</DocumentSubheading>
              <DashList items={part.key.red_flags} />

              <DocumentSubheading>Verification probes</DocumentSubheading>
              <p className="mb-3 text-[9.5pt] leading-[1.5] text-muted-foreground">
                Put these to the candidate in the adaptive follow-up. Record the response verbatim.
                An invented source survives a request for its title and collapses under a request
                for its method.
              </p>
              <NumberedList items={part.research.probes} />

              {annexReqs.length > 0 ? (
                <>
                  <DocumentSubheading>
                    Annex A — {specialisation.name} · {split.annex} marks
                  </DocumentSubheading>
                  <p className="mb-3 text-[9.5pt] leading-[1.5] text-muted-foreground">
                    Requirement
                    {annexReqs.length > 1 ? "s" : ""}{" "}
                    {annexReqs.map((r) => `Part ${r.part}`).join(", ")}. The full annex key is set
                    out once, at the end of this document.
                  </p>
                </>
              ) : null}
            </DocumentPage>
          );
        })}

        {/* ---------------------------------------------------------------
            ANNEX KEY
            --------------------------------------------------------------- */}
        <DocumentPage>
          <DocumentHeading
            overline="Key — Annex A"
            title={annex.exhibit_title.replace(/^Annex A — /, "")}
            meta={`${specialisation.name} · ${annex.requirements.reduce((s, r) => s + r.marks, 0)} marks`}
          />

          <DocumentSubheading>What earns the marks</DocumentSubheading>
          <DocumentProse>{annex.key.expected}</DocumentProse>

          <DocumentSubheading>Red flags</DocumentSubheading>
          <DashList items={annex.key.red_flags} />

          <DocumentSubheading>Mark allocation</DocumentSubheading>
          <table className="mb-6 w-full border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-foreground">
                <th className="w-[7rem] pb-2 pr-4 font-sans text-[9px] font-bold uppercase tracking-[0.16em]">
                  Attaches to
                </th>
                <th className="w-[4.5rem] pb-2 pr-4 font-sans text-[9px] font-bold uppercase tracking-[0.16em]">
                  Marks
                </th>
                <th className="pb-2 font-sans text-[9px] font-bold uppercase tracking-[0.16em]">
                  Requirement
                </th>
              </tr>
            </thead>
            <tbody>
              {annex.requirements.map((req) => (
                <tr key={req.part} className="border-b border-rule align-top">
                  <td className="py-3 pr-4 text-[9.5pt] font-semibold leading-snug">
                    Part {req.part}
                  </td>
                  <td className="py-3 pr-4 text-[9.5pt] tabular-nums leading-snug text-muted-foreground">
                    {req.marks}
                  </td>
                  <td className="py-3 text-[9.5pt] leading-[1.5] text-muted-foreground">
                    {req.text}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </DocumentPage>

        {/* ---------------------------------------------------------------
            SCOPE OF ATTESTATION
            --------------------------------------------------------------- */}
        <DocumentPage>
          <DocumentHeading
            overline="Notice to the board of examiners"
            title="What this certificate attests to, and what it does not"
          />

          <DocumentSubheading>The certificate attests</DocumentSubheading>
          <DashList items={[...ATTESTATION_SCOPE.attests]} />

          <DocumentSubheading>The certificate does not attest</DocumentSubheading>
          <DashList items={[...ATTESTATION_SCOPE.does_not_attest]} />

          <DocumentField label="Calibration status" tone="ink">
            <p className="text-[10pt] leading-[1.5]">
              The band boundaries and target attainment rates in this key are design targets
              expressing an intended difficulty spread. They are not empirical. Before any use that
              affects a student&rsquo;s progression, award or employment, this instrument requires
              pilot administration with the partner institution, inter-rater reliability work on
              these keys, and an adverse-impact review. The Institute supplies content and marking
              architecture; validation is a joint exercise with the faculty and is documented as
              such.
            </p>
          </DocumentField>

          <p className="mt-10 border-t-2 border-foreground pt-5 text-center font-sans text-[9px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
            End of key {reference}/K
          </p>
        </DocumentPage>
      </DocumentSheet>
    </>
  );
}
