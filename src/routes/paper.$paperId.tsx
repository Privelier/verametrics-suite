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
import { composeCandidatePaper } from "@/data/paper";
import { RESEARCH_INTEGRITY_RUBRIC } from "@/data/framework";
import { allPaperIds } from "@/data/faculties";

export const Route = createFileRoute("/paper/$paperId")({
  /**
   * `composeCandidatePaper`, never `composePaper`. A loader's return value is
   * serialised into the page's hydration payload and is readable in the page
   * source whether or not it is rendered — so the full composition would ship
   * the answer key and the documented precedent to the candidate's browser.
   * See the confidentiality note in src/data/paper.ts.
   */
  loader: ({ params }) => {
    const paper = composeCandidatePaper(params.paperId);
    if (!paper) throw notFound();
    return paper;
  },
  head: ({ loaderData }) => {
    const title = loaderData
      ? `${loaderData.reference} — Certifying Examination — VeraMetrics`
      : "Examination paper — VeraMetrics";
    return {
      meta: [
        { title },
        {
          name: "description",
          content: loaderData
            ? `The VeraMetrics certifying examination paper for ${loaderData.faculty.name}, ${loaderData.specialisation.name}. One integrated case, five assessed parts, 180 minutes.`
            : "VeraMetrics certifying examination paper.",
        },
        { name: "robots", content: "noindex" },
      ],
    };
  },
  component: PaperDocument,
});

function PaperDocument() {
  const paper = Route.useLoaderData();
  const { faculty, specialisation, examination, annex, reference } = paper;

  return (
    <>
      <DocumentToolbar
        title={`${faculty.name} — ${specialisation.name}`}
        reference={reference}
        backTo="/faculties"
        backLabel="Faculties"
        counterpart={{ to: `/answer-key/${paper.paperId}`, label: "Examiner's key" }}
      />

      <DocumentSheet
        runningHead={{ left: reference, right: "Certifying Examination" }}
        runningFoot={{
          left: `${faculty.name} — ${specialisation.name}`,
          right: paper.session,
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
              Independent certifying examination for graduating cohorts
            </p>
          </div>

          <div className="mt-16">
            <p className="eyebrow">Certifying examination</p>
            <h1 className="mt-5 font-serif text-[2.1rem] leading-[1.12] tracking-tight">
              {examination.case_title}
            </h1>
            <span aria-hidden className="rule-accent mt-6" />
            <p className="mt-6 max-w-[46ch] text-[10.5pt] leading-[1.55] text-muted-foreground">
              {examination.synopsis}
            </p>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-x-8 border-t border-foreground sm:grid-cols-4">
            {[
              ["Paper", reference],
              ["Duration", `${paper.totalMinutes} minutes`],
              ["Marks", String(paper.totalMarks)],
              ["Parts", "Five"],
            ].map(([label, value]) => (
              <div key={label} className="border-b border-rule py-4 pr-4">
                <dt className="font-sans text-[9.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {label}
                </dt>
                <dd className="mt-2 font-serif text-[1.05rem] tabular-nums tracking-tight">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <dl className="mt-8 space-y-3 border-t border-rule pt-6">
            {[
              ["Faculty", faculty.name],
              ["Specialisation", specialisation.name],
              ["Annex A", annex.exhibit_title.replace(/^Annex A — /, "")],
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
              Instructions to candidates
            </p>
            <NumberedList
              items={[
                "Answer all five parts. Each part carries the marks shown against it. The parts are not independent: Part IV explicitly requires you to set aside findings you make in Parts I and II, and any answer that imports them will have the offending passage struck out before marking.",
                <>
                  This is an <strong>open-source examination</strong>. You may use the open
                  internet, library and database subscriptions, statutory and regulatory texts, and
                  your own course materials. You may not communicate with another person about this
                  paper during the sitting.
                </>,
                <>
                  Use of a generative model is permitted and <strong>must be declared</strong> in
                  your Sources and Methods appendix, stating what you asked and what you verified
                  independently. An undeclared model-generated citation is treated as a fabricated
                  citation.
                </>,
                "Every part carries a research mandate. Each mandate requires you to reach material that is deliberately not supplied in this paper. A script answered entirely from the case file is capped at the Pass band regardless of its technical quality.",
                "Every external claim must carry a named source and a date. An unattributed figure scores zero rather than partial credit. Fabricated citations are the heaviest penalty in this instrument and are scored below an admitted research gap.",
                "Word limits are stated against each deliverable and are enforced. Sources and Methods appendices are excluded from the limit where so stated.",
                <>
                  Annex A, bound at the back of this paper, carries requirements attaching to Parts
                  I, II and IV, and is specific to your declared specialisation. Its marks are drawn
                  from those parts&rsquo; allocations and are shown against each requirement.
                </>,
              ]}
            />
          </div>

          <div className="mt-10 border-t border-rule pt-8">
            <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {["Candidate name", "Candidate number", "Institution", "Invigilator signature"].map(
                (field) => (
                  <div key={field}>
                    <span className="block h-6 border-b border-foreground" />
                    <span className="mt-2 block font-sans text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      {field}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>

          <p className="mt-10 border-t border-rule pt-5 text-[8.5pt] leading-relaxed text-muted-foreground">
            All organisations, individuals and figures appearing in this paper are fictional. The
            case is structurally faithful to a documented failure in the public record; identifying
            that precedent is an assessed task and it is not named in this paper. Do not turn over
            until instructed.
          </p>
        </DocumentPage>

        {/* ---------------------------------------------------------------
            CASE FILE
            --------------------------------------------------------------- */}
        <DocumentPage>
          <DocumentHeading
            overline="Case file"
            title={examination.case_title}
            meta={examination.case_code}
          />
          <p className="mb-6 text-[10.5pt] leading-[1.55] text-muted-foreground">
            Read the whole file before beginning Part I. It is not repeated in the parts that
            follow, and every part draws on it.
          </p>
          <NumberedList items={examination.case_file.map((item) => item)} marker="decimal" />
        </DocumentPage>

        {/* ---------------------------------------------------------------
            PARTS I – V
            --------------------------------------------------------------- */}
        {examination.parts.map((part) => {
          const annexReqs = part.annexRequirements;

          return (
            <DocumentPage key={part.numeral}>
              <DocumentHeading
                overline={`Part ${part.numeral}`}
                title={part.title}
                meta={`${part.marks} marks · ${part.minutes} min`}
              />

              <DocumentField label="Curriculum anchor" tone="plain">
                <p className="text-[10pt] leading-[1.5] text-muted-foreground">
                  {part.curriculum_anchor}
                </p>
              </DocumentField>

              <DocumentSubheading>Situation</DocumentSubheading>
              <DocumentProse>{part.situation}</DocumentProse>

              <DocumentSubheading>
                Requirements
                {annexReqs.length > 0
                  ? ` · ${part.coreMarks} marks here, ${part.annexMarks} on Annex A`
                  : null}
              </DocumentSubheading>
              <NumberedList items={part.task} />

              <DocumentSubheading>Materials supplied</DocumentSubheading>
              <DashList items={part.exhibits} />

              <DocumentField label="Research mandate — compulsory">
                <p className="mb-4 text-[10pt] leading-[1.5]">{part.research.mandate}</p>
                <p className="mb-2 font-sans text-[9px] font-bold uppercase tracking-[0.16em] text-primary">
                  Classes of source expected
                </p>
                <ul className="space-y-1.5">
                  {part.research.target_sources.map((source) => (
                    <li
                      key={source}
                      className="grid grid-cols-[1.1rem_minmax(0,1fr)] gap-x-1 text-[9.5pt] leading-[1.5] text-muted-foreground"
                    >
                      <span aria-hidden className="pt-[9px]">
                        <span className="block h-px w-2.5 bg-primary" />
                      </span>
                      <span>{source}</span>
                    </li>
                  ))}
                </ul>
              </DocumentField>

              <DocumentSubheading>Deliverable</DocumentSubheading>
              <DocumentProse className="text-muted-foreground">{part.deliverable}</DocumentProse>

              {annexReqs.length > 0 ? (
                <p className="mt-6 border-t border-rule pt-4 text-[9.5pt] leading-[1.5] text-muted-foreground">
                  <strong className="font-sans text-[9px] font-bold uppercase tracking-[0.16em] text-foreground">
                    Annex A applies.{" "}
                  </strong>
                  {annexReqs.length === 1 ? "One requirement" : `${annexReqs.length} requirements`}{" "}
                  attaching to this part are set out in Annex A, carrying {part.annexMarks} of this
                  part&rsquo;s {part.marks} marks.
                </p>
              ) : (
                <p className="mt-6 border-t border-rule pt-4 text-[9.5pt] leading-[1.5] text-muted-foreground">
                  <strong className="font-sans text-[9px] font-bold uppercase tracking-[0.16em] text-foreground">
                    No annex.{" "}
                  </strong>
                  This part is examined at faculty level. Professional duty under conflicted
                  interest and giving an account to a body with power over you are competences the
                  Institute assesses in common across all specialisations.
                </p>
              )}
            </DocumentPage>
          );
        })}

        {/* ---------------------------------------------------------------
            ANNEX A
            --------------------------------------------------------------- */}
        <DocumentPage>
          <DocumentHeading
            overline="Annex A"
            title={annex.exhibit_title.replace(/^Annex A — /, "")}
            meta={`${specialisation.name} · ${annex.totalMarks} marks`}
          />

          <DocumentField label="Assumed coursework" tone="plain">
            <ul className="space-y-1.5">
              {specialisation.curriculum_anchor.map((item) => (
                <li
                  key={item}
                  className="grid grid-cols-[1.1rem_minmax(0,1fr)] gap-x-1 text-[9.5pt] leading-[1.5] text-muted-foreground"
                >
                  <span aria-hidden className="pt-[9px]">
                    <span className="block h-px w-2.5 bg-muted-foreground" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </DocumentField>

          <DocumentSubheading>Exhibit</DocumentSubheading>
          <NumberedList items={annex.exhibit} marker="lower-roman" />

          <DocumentSubheading>Requirements</DocumentSubheading>
          <div className="space-y-5">
            {annex.requirements.map((req) => (
              <div key={req.part} className="keep-together border-l-2 border-foreground pl-5">
                <p className="mb-2 font-sans text-[9.5px] font-bold uppercase tracking-[0.16em]">
                  Attaching to Part {req.part}
                  <span className="ml-3 font-normal text-muted-foreground">{req.marks} marks</span>
                </p>
                <p className="text-[10.5pt] leading-[1.55]">{req.text}</p>
              </div>
            ))}
          </div>

          <DocumentField label="Annex research mandate — compulsory">
            <p className="mb-4 text-[10pt] leading-[1.5]">{annex.research.mandate}</p>
            <p className="mb-2 font-sans text-[9px] font-bold uppercase tracking-[0.16em] text-primary">
              Classes of source expected
            </p>
            <ul className="space-y-1.5">
              {annex.research.target_sources.map((source) => (
                <li
                  key={source}
                  className="grid grid-cols-[1.1rem_minmax(0,1fr)] gap-x-1 text-[9.5pt] leading-[1.5] text-muted-foreground"
                >
                  <span aria-hidden className="pt-[9px]">
                    <span className="block h-px w-2.5 bg-primary" />
                  </span>
                  <span>{source}</span>
                </li>
              ))}
            </ul>
          </DocumentField>
        </DocumentPage>

        {/* ---------------------------------------------------------------
            MARKING NOTICE
            --------------------------------------------------------------- */}
        <DocumentPage>
          <DocumentHeading
            overline="Notice"
            title="How the research component of this paper is marked"
            meta={`${Math.round(RESEARCH_INTEGRITY_RUBRIC.weight_of_paper * 100)}% of the paper`}
          />

          <DocumentProse className="text-muted-foreground">
            The research mandates are not background reading. They are scored as their own
            dimension, on the criteria below, and combined with your technical marks at the weight
            shown against each part.
          </DocumentProse>

          <table className="mb-6 w-full border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-foreground">
                <th className="w-[9rem] pb-2 pr-4 font-sans text-[9px] font-bold uppercase tracking-[0.16em]">
                  Criterion
                </th>
                <th className="w-[3.5rem] pb-2 pr-4 font-sans text-[9px] font-bold uppercase tracking-[0.16em]">
                  Weight
                </th>
                <th className="pb-2 font-sans text-[9px] font-bold uppercase tracking-[0.16em]">
                  Standard applied
                </th>
              </tr>
            </thead>
            <tbody>
              {RESEARCH_INTEGRITY_RUBRIC.dimensions.map((d) => (
                <tr key={d.name} className="border-b border-rule align-top">
                  <td className="py-3 pr-4 text-[9.5pt] font-semibold leading-snug">{d.name}</td>
                  <td className="py-3 pr-4 text-[9.5pt] tabular-nums leading-snug text-muted-foreground">
                    {Math.round(d.weight * 100)}%
                  </td>
                  <td className="py-3 text-[9.5pt] leading-[1.5] text-muted-foreground">
                    {d.standard}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <DocumentField label="Fabrication" tone="ink">
            <p className="text-[10pt] leading-[1.5]">
              {RESEARCH_INTEGRITY_RUBRIC.fabrication_policy}
            </p>
          </DocumentField>

          <DocumentField label="Answering from the case file alone" tone="ink">
            <p className="text-[10pt] leading-[1.5]">
              {RESEARCH_INTEGRITY_RUBRIC.no_research_penalty}
            </p>
          </DocumentField>

          <p className="mt-10 border-t-2 border-foreground pt-5 text-center font-sans text-[9px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
            End of paper {reference}
          </p>
        </DocumentPage>
      </DocumentSheet>
    </>
  );
}

/** Exposed so the faculties page can validate links against real papers. */
export const VALID_PAPER_IDS = allPaperIds();
