/**
 * VeraMetrics Institute — paper assembly.
 *
 * Composes a faculty case (examinations.ts) with a specialisation annex
 * (faculties.ts) into the object rendered by the examination paper and the
 * examiner's answer key.
 *
 * CONFIDENTIALITY — read before changing these functions.
 * A route loader's return value is serialised into the page's hydration
 * payload, so anything a loader returns is readable in the page source whether
 * or not it is rendered. `composePaper` returns the full case, including
 * `examination.precedent`, every part's `key`, and the annex `key`. It must
 * therefore only ever be used by the examiner's key route.
 *
 * The candidate's paper route must use `composeCandidatePaper`, which builds a
 * deliberately narrow shape field by field rather than omitting fields from the
 * full one. That is the point: a whitelist cannot leak a field somebody adds to
 * the source types later, and a blacklist can. Do not "simplify" it into an
 * Omit<> of the full type.
 *
 * Examiner-only content, for reference:
 *   examination.precedent          the documented real-world case (identifying
 *                                  it is an assessed task)
 *   part.key.*                     model answer, discriminating signal, red flags
 *   part.research.probes           verification probes for the oral follow-up
 *   specialisation.annex.key.*     annex model answer and red flags
 */

import {
  parsePaperId,
  type AnnexRequirement,
  type Faculty,
  type Specialisation,
} from "./faculties";
import { examinationForFaculty, type Examination, type ExamPart } from "./examinations";
import { PAPER_TOTAL_MARKS, PAPER_TOTAL_MINUTES } from "./framework";

/* ==========================================================================
   Full composition — EXAMINER USE ONLY
   ========================================================================== */

export interface ComposedPaper {
  paperId: string;
  /** Printed reference, e.g. "VM/ENG-CP/26". */
  reference: string;
  faculty: Faculty;
  specialisation: Specialisation;
  examination: Examination;
  /** Session label printed on the cover. */
  session: string;
  totalMarks: number;
  totalMinutes: number;
}

/** The two-digit year used in the paper reference. */
function sessionYear(): string {
  return String(new Date().getFullYear()).slice(-2);
}

export function sessionLabel(): string {
  const now = new Date();
  const half = now.getMonth() < 6 ? "Spring" : "Autumn";
  return `${half} ${now.getFullYear()} session`;
}

function reference(faculty: Faculty, specialisation: Specialisation): string {
  return `VM/${faculty.code}-${specialisation.code}/${sessionYear()}`;
}

/**
 * Full composition including all examiner-only content.
 * Use ONLY in the answer-key route. See the confidentiality note above.
 */
export function composePaper(paperId: string): ComposedPaper | undefined {
  const parsed = parsePaperId(paperId);
  if (!parsed) return undefined;
  const examination = examinationForFaculty(parsed.faculty.slug);
  if (!examination) return undefined;

  return {
    paperId,
    reference: reference(parsed.faculty, parsed.specialisation),
    faculty: parsed.faculty,
    specialisation: parsed.specialisation,
    examination,
    session: sessionLabel(),
    totalMarks: PAPER_TOTAL_MARKS,
    totalMinutes: PAPER_TOTAL_MINUTES,
  };
}

/* ==========================================================================
   Candidate composition — safe to serialise to the browser
   ========================================================================== */

export interface CandidateResearch {
  mandate: string;
  target_sources: string[];
}

export interface CandidatePart {
  numeral: ExamPart["numeral"];
  title: string;
  marks: number;
  minutes: number;
  curriculum_anchor: string;
  situation: string;
  task: string[];
  exhibits: string[];
  research: CandidateResearch;
  deliverable: string;
  /** Requirements from Annex A attaching to this part, and their marks. */
  annexRequirements: AnnexRequirement[];
  /** Marks awarded on the annex within this part. */
  annexMarks: number;
  /** Marks awarded on the part itself. */
  coreMarks: number;
}

export interface CandidatePaper {
  paperId: string;
  reference: string;
  session: string;
  totalMarks: number;
  totalMinutes: number;
  faculty: { slug: string; code: string; name: string };
  specialisation: {
    slug: string;
    code: string;
    name: string;
    curriculum_anchor: string[];
  };
  annex: {
    exhibit_title: string;
    exhibit: string[];
    requirements: AnnexRequirement[];
    totalMarks: number;
    research: CandidateResearch;
  };
  examination: {
    case_code: string;
    case_title: string;
    synopsis: string;
    case_file: string[];
    parts: CandidatePart[];
  };
}

/**
 * Builds the candidate-facing paper by whitelisting fields explicitly.
 *
 * Every field is copied by name. Nothing is spread from the source objects, so
 * a field added to `ExamPart`, `Examination` or `TechnicalAnnex` later cannot
 * reach the browser through this function without someone adding it here on
 * purpose.
 */
export function composeCandidatePaper(paperId: string): CandidatePaper | undefined {
  const parsed = parsePaperId(paperId);
  if (!parsed) return undefined;
  const examination = examinationForFaculty(parsed.faculty.slug);
  if (!examination) return undefined;

  const { faculty, specialisation } = parsed;
  const annex = specialisation.annex;

  const parts: CandidatePart[] = examination.parts.map((part) => {
    const annexRequirements = part.annex_attaches
      ? annex.requirements.filter((r) => r.part === part.numeral)
      : [];
    const annexMarks = annexRequirements.reduce((sum, r) => sum + r.marks, 0);

    return {
      numeral: part.numeral,
      title: part.title,
      marks: part.marks,
      minutes: part.minutes,
      curriculum_anchor: part.curriculum_anchor,
      situation: part.situation,
      task: [...part.task],
      exhibits: [...part.exhibits],
      // Note: part.research.probes is examiner-only and is deliberately absent.
      research: {
        mandate: part.research.mandate,
        target_sources: [...part.research.target_sources],
      },
      deliverable: part.deliverable,
      annexRequirements,
      annexMarks,
      coreMarks: part.marks - annexMarks,
    };
  });

  return {
    paperId,
    reference: reference(faculty, specialisation),
    session: sessionLabel(),
    totalMarks: PAPER_TOTAL_MARKS,
    totalMinutes: PAPER_TOTAL_MINUTES,
    faculty: { slug: faculty.slug, code: faculty.code, name: faculty.name },
    specialisation: {
      slug: specialisation.slug,
      code: specialisation.code,
      name: specialisation.name,
      curriculum_anchor: [...specialisation.curriculum_anchor],
    },
    annex: {
      exhibit_title: annex.exhibit_title,
      exhibit: [...annex.exhibit],
      requirements: [...annex.requirements],
      totalMarks: annex.requirements.reduce((sum, r) => sum + r.marks, 0),
      // Note: annex.key is examiner-only and is deliberately absent.
      research: {
        mandate: annex.research.mandate,
        target_sources: [...annex.research.target_sources],
      },
    },
    examination: {
      case_code: examination.case_code,
      case_title: examination.case_title,
      synopsis: examination.synopsis,
      case_file: [...examination.case_file],
      // Note: examination.precedent is examiner-only and is deliberately absent.
      parts,
    },
  };
}

/* ==========================================================================
   Mark helpers — used by the examiner's key, which holds the full composition
   ========================================================================== */

/** Annex requirements attaching to a given part, in paper order. */
export function annexRequirementsFor(paper: ComposedPaper, part: ExamPart): AnnexRequirement[] {
  if (!part.annex_attaches) return [];
  return paper.specialisation.annex.requirements.filter((r) => r.part === part.numeral);
}

/** Marks awarded on the annex within a part, and the balance on the part itself. */
export function markSplit(paper: ComposedPaper, part: ExamPart): { annex: number; core: number } {
  const annex = annexRequirementsFor(paper, part).reduce((sum, r) => sum + r.marks, 0);
  return { annex, core: part.marks - annex };
}
