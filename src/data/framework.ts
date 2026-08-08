/**
 * VeraMetrics Institute — Examination Framework
 *
 * The Institute administers ONE certifying examination. It is not a battery of
 * five separate tests: it is a single integrated case, sat in one sitting, in
 * which five competence dimensions are assessed against the same body of
 * evidence. A candidate cannot revise for one dimension in isolation, because
 * every part of the paper draws on the same case file and each part inherits
 * the decisions taken in the part before it.
 *
 * CONSTRUCTION PRINCIPLE — the two-source rule
 * Every part of every paper is written so that it is unanswerable from either
 * source alone:
 *   (a) a CURRICULUM ANCHOR, which is settled material the candidate is
 *       expected to have covered in an accredited degree programme, and
 *   (b) a RESEARCH MANDATE, which requires the candidate to locate, in the
 *       public record, a documented real-world failure, standard, regulation or
 *       dataset that is deliberately not supplied in the paper.
 * A candidate with strong coursework and no research capability fails on
 * applicability. A candidate who researches well but cannot deploy the
 * discipline's own settled methods fails on technical competence.
 *
 * REAL-WORLD ANCHORING
 * Each case is fictional in its names and figures, and structurally faithful to
 * a documented public failure. Identifying that precedent from the public
 * record is itself an assessed task, which is why the precedent is never named
 * in the candidate's paper — only in the examiner's key.
 *
 * CALIBRATION STATUS — read before institutional use.
 * The band boundaries and target attainment rates below are DESIGN targets
 * expressing an intended difficulty spread. They are not empirical. Before any
 * use that affects a student's progression, award or employment, this
 * instrument requires pilot administration with the partner institution,
 * inter-rater reliability work on the answer keys, and an adverse-impact
 * review. The Institute supplies content and marking architecture; validation
 * is a joint exercise with the faculty and is documented as such.
 */

export type DimensionCode = "ETA" | "ARB" | "PDC" | "CFC" | "TNA";

export interface Dimension {
  /** Part number as it appears on the paper. */
  numeral: "I" | "II" | "III" | "IV" | "V";
  code: DimensionCode;
  title: string;
  /** What the dimension actually measures, in one sentence. */
  construct: string;
  /** Sub-scores reported to the faculty on the candidate transcript. */
  scored_dimensions: string[];
  /** Marks available, out of a 1000-mark paper. */
  marks: number;
  /** Nominal minutes within the 180-minute sitting. */
  minutes: number;
}

export const DIMENSIONS: Dimension[] = [
  {
    numeral: "I",
    code: "ETA",
    title: "Evidence Triage under Ambiguity",
    construct:
      "Whether the candidate can establish what is actually known from a body of incomplete, partly contradictory evidence, and separate observation from inference before committing to a position.",
    scored_dimensions: [
      "Observation and inference separated",
      "Cheapest disambiguating test identified",
      "Hypotheses held in parallel",
      "Confidence proportionate to evidence",
      "Scarce resource budgeted explicitly",
    ],
    marks: 200,
    minutes: 35,
  },
  {
    numeral: "II",
    code: "ARB",
    title: "Adversarial Review and Blind-Spot Audit",
    construct:
      "Whether the candidate can attack their own conclusion and the evidence supporting it, locating failure modes in method and incentive rather than only in the artefact.",
    scored_dimensions: [
      "Assumption audit",
      "Method and instrument interrogation",
      "Adversary modelling",
      "Detection design with thresholds",
      "Proceed-or-halt judgement",
    ],
    marks: 200,
    minutes: 35,
  },
  {
    numeral: "III",
    code: "PDC",
    title: "Professional Duty and Conflicted Interest",
    construct:
      "Behaviour where the candidate's professional obligation, their employer's interest, and their own advancement point in different directions, and where the lawful course and the candid course are not the same course.",
    scored_dimensions: [
      "Legality and candour separated",
      "Interest disclosed rather than managed privately",
      "Escalation proportionate and evidenced",
      "Mechanism preferred over sentiment",
      "Personal cost accepted",
    ],
    marks: 200,
    minutes: 35,
  },
  {
    numeral: "IV",
    code: "CFC",
    title: "Cascading Failure and Crisis Command",
    construct:
      "Sequenced decision-making across a live multi-stage failure in which each decision reshapes the next failure surface, under a statutory or clinical clock the candidate must know without being told.",
    scored_dimensions: [
      "Containment sequencing",
      "Irreversibility triage",
      "Record and evidence preservation",
      "Clock management against a statutory deadline",
      "Disclosure while facts are still unstable",
    ],
    marks: 250,
    minutes: 45,
  },
  {
    numeral: "V",
    code: "TNA",
    title: "Testimony, Negotiation and Self-Assessment",
    construct:
      "Composure and accuracy when giving an account to a body with power over the candidate, and the capacity to concede a correct criticism without either collapsing or counter-attacking.",
    scored_dimensions: [
      "Accuracy under pressure",
      "Scope discipline in testimony",
      "Concession structure",
      "Frame control without evasion",
      "Separation of ego from mandate",
    ],
    marks: 150,
    minutes: 30,
  },
];

export const PAPER_TOTAL_MARKS = DIMENSIONS.reduce((sum, d) => sum + d.marks, 0);
export const PAPER_TOTAL_MINUTES = DIMENSIONS.reduce((sum, d) => sum + d.minutes, 0);

/**
 * Applied to the research component of every part, at every faculty. Scored
 * separately from technical quality, then combined at the weight declared on
 * each part.
 */
export const RESEARCH_INTEGRITY_RUBRIC = {
  weight_of_paper: 0.3,
  dimensions: [
    {
      name: "Verifiability",
      weight: 0.25,
      standard:
        "Every external claim carries a named source and a date. An unattributed figure scores zero on this dimension rather than partial credit, however plausible it is. Primary sources — official investigation reports, regulatory text, standards, marketing authorisations, filed accounts, trial registries — outrank secondary summaries, and the transcript records which tier the candidate reached.",
    },
    {
      name: "Factual accuracy",
      weight: 0.2,
      standard:
        "Each cited figure, clock, threshold and standard is checked against a maintained reference set. Substantive errors — a superseded limit, the wrong notification window, a misnamed standard, a misapplied jurisdiction — are penalised in proportion to how much of the candidate's decision rests on the error.",
    },
    {
      name: "Applicability",
      weight: 0.25,
      standard:
        "The decisive question is whether the finding changed the candidate's answer or merely decorated it. A correct citation that leaves the recommendation unchanged, or that is quoted without being applied to the case's own numbers, caps the research score at 40 per cent. Research that visibly moves the answer scores highest.",
    },
    {
      name: "Unit and base-rate hygiene",
      weight: 0.15,
      standard:
        "External benchmarks must be normalised before comparison: per-patient against per-1,000-patient-years, relative against absolute risk, per-unit against per-batch, nominal against real. Comparing an unnormalised external figure to one from the case is scored as a reasoning failure, not a clerical one.",
    },
    {
      name: "Calibration and gap disclosure",
      weight: 0.15,
      standard:
        "A candidate who states what they could not find, and how that gap limits their conclusion, scores above a candidate presenting uniform confidence. Naming a source's scope limitation is worth more than adding another source.",
    },
  ],
  fabrication_policy:
    "A fabricated citation is the single heaviest penalty in the instrument and is scored below an admitted research gap. Detection is adaptive rather than lexical: the examiner probes for the methodology, sample, scope and publication context behind any cited figure, since an invented source survives a request for its title and collapses under a request for its method. Two unrecovered fabrications void the paper and refer the attempt to the faculty's academic integrity officer.",
  no_research_penalty:
    "A script answered entirely from the case file is capped at the Pass band regardless of technical quality, because every part contains at least one parameter whose correct handling depends on a standard, limit, clock or precedent not stated in the paper.",
  permitted_materials:
    "This is an open-source examination. Candidates may use the open internet, library databases, statutory and regulatory texts, and their own course materials. They may not communicate with another person about the paper during the sitting. Use of a generative model is permitted and must be declared in the Sources and Methods appendix, including what was asked and what was verified independently — an undeclared model-generated citation is treated as a fabricated citation.",
} as const;

export interface GradeBand {
  band: string;
  range: string;
  lower: number;
  descriptor: string;
  /** Design target for the share of a graduating cohort expected to land here. */
  target_share: number;
}

export const GRADE_BANDS: GradeBand[] = [
  {
    band: "Distinction",
    range: "850–1000",
    lower: 850,
    descriptor:
      "Reaches the primary record without prompting, identifies the historical precedent underlying the case, and lets the finding change the recommendation. Holds competing explanations open past the point at which most scripts close. States plainly what cannot be resolved by any amount of further work, and still delivers a decision.",
    target_share: 0.07,
  },
  {
    band: "Merit",
    range: "700–849",
    lower: 700,
    descriptor:
      "Technically sound and correctly sourced. Research is accurate but tends to confirm a position already taken rather than to alter it. Recognises the conflict of duty and acts on it, though usually through escalation rather than through a mechanism the candidate designs themselves.",
    target_share: 0.21,
  },
  {
    band: "Pass",
    range: "550–699",
    lower: 550,
    descriptor:
      "Applies the discipline's settled methods correctly to the material supplied. Research is present but secondary and largely decorative. Closes on the first sufficient explanation, and treats the absence of a contrary signal as evidence that no problem exists.",
    target_share: 0.44,
  },
  {
    band: "Referred",
    range: "0–549",
    lower: 0,
    descriptor:
      "Either the curriculum component or the research component is absent. Common patterns: a fluent narrative unsupported by the exhibits; a decision taken on seniority rather than evidence; a statutory clock missed; or citations that do not survive a methodology probe. Referral is to a resit, not a fail: the transcript states which component was deficient.",
    target_share: 0.28,
  },
];

/** How the Institute states what the certificate does and does not attest to. */
export const ATTESTATION_SCOPE = {
  attests: [
    "That the named candidate sat the paper under the invigilation conditions recorded on the certificate.",
    "That the script was marked against the published answer key by two independent markers, with a third on disagreement beyond one band.",
    "The candidate's mark on each of the five dimensions, on the Institute's 1000-mark scale, alongside the cohort distribution for their faculty and sitting.",
    "The tier of source the candidate reached in the research components — primary, secondary, or none.",
  ],
  does_not_attest: [
    "Aptitude for any specific role or employer. The instrument measures reasoning under the conditions described, not job performance.",
    "Technical competence in the candidate's discipline beyond the narrow content of the case. It is not a substitute for a degree, a licence, or a professional registration.",
    "Any predictive claim about future conduct. No longitudinal validity study has been completed, and the Institute will not make such a claim until one has.",
  ],
} as const;

export function dimensionByNumeral(numeral: Dimension["numeral"]): Dimension {
  const found = DIMENSIONS.find((d) => d.numeral === numeral);
  if (!found) throw new Error(`Unknown dimension numeral: ${numeral}`);
  return found;
}
