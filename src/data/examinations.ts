/**
 * VeraMetrics Institute — Case files.
 *
 * One case per faculty. Five parts per case, sat in a single 180-minute
 * sitting, marked out of 1000. Parts I, II and IV additionally carry the
 * specialisation requirements set out in Annex A (see faculties.ts); the marks
 * shown against those parts here are the part total INCLUDING the annex
 * allocation.
 *
 * Every case is fictional in its names, figures and organisations, and
 * structurally faithful to a documented failure in the public record. The
 * precedent is never named in the candidate's paper. Locating it is an assessed
 * task, which is why it appears only in `precedent`, printed in the examiner's
 * key.
 *
 * A note on the ordering of Parts I and IV. Part I places the candidate after
 * the event, in possession of the full record. Part IV places them back inside
 * it, at the moment of decision, with only what was on the board at the time.
 * This is deliberate: the paper tests whether a candidate can set aside a
 * finding they themselves have just made, which is the single most common
 * failure in real incident review.
 */

import type { AnnexPart } from "./faculties";

export interface PartResearch {
  mandate: string;
  target_sources: string[];
  /** Adaptive follow-ups the examiner uses to separate research from recall. */
  probes: string[];
}

export interface ExamPart {
  numeral: "I" | "II" | "III" | "IV" | "V";
  /** Dimension title, repeated on the paper for the candidate's orientation. */
  title: string;
  /** Marks available INCLUDING the Annex A allocation where one attaches. */
  marks: number;
  minutes: number;
  /** True where Annex A carries additional requirements for this part. */
  annex_attaches: boolean;
  /** The settled coursework this part assumes. Printed on the paper. */
  curriculum_anchor: string;
  /** The candidate's position and the state of the world at this point. */
  situation: string;
  /** Numbered requirements. */
  task: string[];
  /** Materials supplied with this part, beyond the shared case file. */
  exhibits: string[];
  research: PartResearch;
  deliverable: string;
  key: {
    expected: string;
    discriminating_signal: string;
    red_flags: string[];
  };
}

export interface Examination {
  facultySlug: string;
  case_code: string;
  case_title: string;
  /** One paragraph, printed under the case title on the paper. */
  synopsis: string;
  /** The shared case file, printed in full before Part I. */
  case_file: string[];
  /** Examiner-only. Never printed on the candidate's paper. */
  precedent: {
    note: string;
    documented_analogues: string[];
  };
  parts: ExamPart[];
}

/** Which parts an Annex A requirement can attach to. */
export const ANNEX_PARTS: AnnexPart[] = ["I", "II", "IV"];

/* ==========================================================================
   ENGINEERING — Northgate
   ========================================================================== */

const NORTHGATE: Examination = {
  facultySlug: "engineering",
  case_code: "NORTHGATE",
  case_title: "The Northgate Isomerisation Unit",
  synopsis:
    "A refinery start-up in which every instrument reported a value, every procedure had a signature, every safety metric was the best in the parent company's portfolio, and the unit moved for ten hours into a state from which it could not be recovered.",
  case_file: [
    "Kelvedon Energy operates the Northgate refinery, a 470,000 barrel-per-day facility employing 1,100 staff and, during turnaround, up to 900 contractors. The refinery was acquired eleven years ago in a portfolio purchase. Since acquisition, capital expenditure has run at 61 per cent of the depreciation charge, and the site has absorbed two rounds of a group-wide cost reduction programme, the second of which reduced process safety expenditure by 25 per cent.",
    "The isomerisation unit had been shut for a scheduled turnaround and was being returned to service on the morning of 23 March. Start-up is the unit's highest-hazard operating state and its written procedure runs to 51 steps.",
    "Staffing at the time of the event: one board operator covering three units, against a manning study performed four years earlier that specified two. The unit supervisor had been reassigned to a second unit at 06:00 and was not present in the control room. Night shift handed over at 06:00 with no overlap period; the site's handover procedure requires a 30-minute overlap and records show it had not been achieved on any of the preceding 41 shifts.",
    "The unit's raffinate splitter, column C-401, was brought up on total circulation at 02:13. Feed was introduced with the bottom outlet control valve closed. The written procedure requires the outlet to be opened when the base level reaches 1.5 m. It was not opened for a further six hours.",
    "At 13:14 the column was overfilled and its base temperature had reached 153 °C against a procedural target of 135 °C. At approximately 13:20 the relief devices lifted and the column's contents passed through the relief header to blowdown drum D-405 and its 34 m atmospheric vent stack. A liquid release above the stack rim was followed by a ground-level vapour cloud, which found an ignition source in the adjacent contractor parking area.",
    "Nine occupied portable buildings stood between 24 m and 62 m from the unit boundary. At 13:20 they held 47 personnel, 41 of whom were contractors working on an unrelated turnaround with no operational role on the isomerisation unit.",
    "In the three years preceding the event, the site's OSHA recordable injury rate was the best of any refinery in the parent company's portfolio and was reported to the group board monthly under the heading 'Safety Performance'. Over the same three years the site recorded 14 loss-of-containment events, none of which was reported to the group board.",
    "Two prior overfill events to blowdown drum D-405 are recorded in the site's near-miss database. Neither was investigated beyond a shift log entry. The unit's HAZOP is eleven years old and records the safeguard against overfill as 'operator response to high level alarm'.",
    "You are a chartered engineer in Kelvedon Energy's central technical function. You did not work on this site before the event. You have been assigned to the internal investigation team, which reports to the refinery general manager, and you have been given the case file above, the exhibits attached to each part of this paper, and Annex A for your discipline.",
  ],
  precedent: {
    note: "Candidates are expected to identify a refinery process safety incident with this causal structure: a start-up overfill, an out-of-range level measurement, relief to an atmospheric blowdown system, occupied portable buildings sited close to a process unit, an excellent personal injury record concealing a degrading process safety condition, and a parent company cost reduction programme. A script that reaches the primary investigation report of such an incident, and uses its findings to structure the analysis, is operating at Distinction level. A script that names the incident without using it scores as decorative citation under the applicability dimension.",
    documented_analogues: [
      "BP Texas City refinery explosion, 23 March 2005 — US Chemical Safety and Hazard Investigation Board final investigation report, and the independent safety review panel report that followed. The closest structural match on every element of this case.",
      "Buncefield oil storage depot, 11 December 2005 — Major Incident Investigation Board reports; overfill with a defeated level measurement and an inadequate protection layer.",
      "Piper Alpha, 6 July 1988 — the public inquiry report; permit-to-work failure, handover, and the escalation of a contained release.",
      "Flixborough, 1 June 1974 — the official court of inquiry report; modification without adequate engineering review.",
    ],
  },
  parts: [
    {
      numeral: "I",
      title: "Evidence Triage under Ambiguity",
      marks: 200,
      minutes: 35,
      annex_attaches: true,
      curriculum_anchor:
        "Mass and energy balance; instrumentation and measurement error; the distinction between direct observation and inference in incident analysis; systematic hazard identification method.",
      situation:
        "You are 36 hours into the investigation. Three accounts of the morning are in circulation and they are not compatible with one another. Operations states that the level indication was normal throughout. Maintenance states that all instruments on the unit were in calibration and produces the records. The shift team states that the procedure was followed. None of the three is lying, and the physical evidence is unambiguous that the column overfilled.",
      task: [
        "State what is established by the physical evidence, what is established by the record, and what is asserted by a party. Label each of your findings with which of the three it rests on. Marks are lost for any finding that is not so labelled.",
        "Identify the single measurement in the case file that reconciles all three accounts, and prove the reconciliation. Your proof must be quantitative.",
        "Nominate the one further test, measurement or document request that would most reduce your remaining uncertainty, state its cost in hours, and state what result would change your conclusion.",
        "Complete the requirements set out in Annex A for your specialisation.",
      ],
      exhibits: [
        "Distributed control system trend, 1-minute averages, 02:00–13:20, for column base level, base temperature, feed flow totaliser and bottom outlet valve position.",
        "Instrument calibration certificates for all C-401 loops, all within date at the time of the event.",
        "Written start-up procedure, 51 steps, with the shift team's completed signature sheet.",
        "Shift handover log, night to day, 23 March, and the preceding 41 handover records.",
        "Site near-miss database extract for blowdown drum D-405.",
      ],
      research: {
        mandate:
          "Before writing, establish from the public record at least one documented process plant incident whose official investigation identified the same combination of causal elements present here: a start-up overfill, a level measurement that did not represent the true condition, relief to an atmospheric system, and an organisational safety indicator that failed to detect a degrading process safety condition. Name the investigating body, the year, and the report. Then state, in one paragraph, the specific finding from that report that changes what you look for in this case, and what you looked for because of it that you would not otherwise have looked for.",
        target_sources: [
          "Final reports of national process safety investigation bodies",
          "Independent review panel reports commissioned after major refinery incidents",
          "Public inquiry reports into major industrial accidents",
          "Regulatory enforcement notices and prosecution case summaries",
        ],
        probes: [
          "In the report you cited, what did the investigating body identify as the level measurement's actual condition, and how does that differ from what this case's calibration certificates show?",
          "You cited an organisational finding. What was the specific indicator that body said had failed, and what did it recommend be measured instead?",
          "What did you look for in the Northgate case file only because of what you read? Name the item.",
        ],
      },
      deliverable:
        "A findings note of not more than 900 words, structured as: established by physical evidence; established by record; asserted; the reconciling measurement with its proof; the single further request. Plus the Annex A requirement for Part I. Plus a Sources and Methods appendix of not more than 200 words.",
      key: {
        expected:
          "The three accounts are all true, and a candidate who begins by looking for the party that is wrong has already failed the part. Operations saw a normal indication; the instruments were in calibration; the procedure's steps were performed and signed. The reconciling measurement is the level transmitter, calibrated across 0–3.0 m on a 52 m column, which was reading the top of its span rather than the level in the vessel — so it was in calibration and it was correct and it conveyed nothing. The proof must be quantitative and the mass balance is the instrument: feed at 220 t/h into a base whose outlet is closed cannot produce a static level, and the rising base temperature independently excludes the alternative that feed had stopped. Strong scripts state the general principle rather than only the local finding: a reading pinned at the end of a span is an absence of information presented in the visual language of a value, and calibration records certify only that an instrument is faithful within its range, which is not the same certificate as fitness for the measurement being made. The best further request is the one with the highest information yield per hour, and the two defensible choices are the physical confirmation of the bottom outlet valve position and the retrieval of the 10-second historian data before it is overwritten — the latter is the stronger answer where the candidate recognises it is time-limited, because a request whose value decays is more urgent than one whose value does not. Marks for the organisational finding go to candidates who notice that 14 loss-of-containment events never reached the board while a recordable injury rate did, and who state the consequence: the board was receiving a real number that measured the wrong thing, which is more dangerous than receiving no number at all.",
        discriminating_signal:
          "Recognising that all three accounts are true, and that the failure is therefore in what the measurement system was capable of conveying rather than in anyone's honesty or diligence.",
        red_flags: [
          "Concludes that one of the three accounts must be false",
          "Attributes the overfill to operator error at the outset",
          "Treats in-date calibration certificates as evidence the measurement was fit for purpose",
          "Presents findings without labelling their evidential basis",
          "Requests a broad audit of all instrumentation rather than one targeted test",
          "Omits the cost and the decision-relevance of the further request",
        ],
      },
    },
    {
      numeral: "II",
      title: "Adversarial Review and Blind-Spot Audit",
      marks: 200,
      minutes: 35,
      annex_attaches: true,
      curriculum_anchor:
        "Hazard identification methodology and protection layer analysis; reliability and common-cause failure; the design of leading and lagging performance indicators; root cause analysis method and its failure modes.",
      situation:
        "The site has produced a draft causal analysis. It runs to 40 pages, is technically competent, and concludes that the immediate cause was the failure of the day shift to open the bottom outlet control valve in accordance with step 34 of the start-up procedure, with contributory factors of inadequate handover and high alarm load. It recommends procedure reinforcement, additional operator training, and an alarm rationalisation project. The refinery general manager considers it thorough. You are asked to review it before it is issued.",
      task: [
        "Identify the strongest argument in favour of the draft's conclusion, and state it in its most persuasive form before you attack it. A review that does not first make the case it is attacking scores zero on this requirement.",
        "Attack it. Identify what the draft's causal model is structurally incapable of finding, and demonstrate that with at least two findings from the case file that the draft's method would necessarily miss.",
        "Assess the site's safety performance measurement. State what the best recordable injury rate in the portfolio measured, what it did not measure, and specify two indicators — one leading, one lagging — that would have shown this site's true condition, with the threshold you would set for each and its basis.",
        "State the one recommendation you would add and the one you would remove, and justify both against expected loss rather than against plausibility.",
        "Complete the requirements set out in Annex A for your specialisation.",
      ],
      exhibits: [
        "Draft causal analysis, 40 pages, with its causal tree and its recommendation schedule.",
        "Site safety performance report to the group board, 36 monthly editions.",
        "Loss-of-containment register, 14 entries over three years, with severity classifications.",
        "Manning study, four years old, specifying two board operators for the three units concerned.",
        "Group cost reduction programme documentation and the site's process safety expenditure trend.",
      ],
      research: {
        mandate:
          "Establish, with citation, the recognised distinction between personal safety performance indicators and process safety performance indicators, naming the professional body or standard that sets out the distinction and giving its published examples of leading and lagging process safety indicators. Then establish at least one documented incident in which an official investigation found that an organisation's safety performance measurement had concealed a deteriorating process safety condition, naming the report and quoting its finding on the point. Your two proposed indicators in requirement 3 must be traceable to the published guidance you cite, and their thresholds must be justified against an external benchmark rather than chosen freely.",
        target_sources: [
          "Process safety performance indicator guidance from an institution of chemical engineers or an equivalent national body",
          "International guidance on process safety metrics from an intergovernmental economic organisation or an industry association",
          "Official investigation reports and independent review panel reports addressing safety culture and metrics",
          "Regulatory guidance on major accident hazard performance measurement",
        ],
        probes: [
          "Which body published the indicator framework you cited, and in what year? Give one leading indicator from it verbatim.",
          "You set a threshold. What external figure did you take it from, and what is this site's current baseline on that measure?",
          "The report you cited made a finding about safety metrics. Quote it, and state which part of the Northgate case file it applies to.",
        ],
      },
      deliverable:
        "A review memorandum of not more than 1,000 words addressed to the refinery general manager, containing: the steelman; the structural critique with two demonstrating findings; the indicator proposal with thresholds and their basis; the one addition and the one removal. Plus the Annex A requirement for Part II. Plus a Sources and Methods appendix of not more than 200 words.",
      key: {
        expected:
          "The steelman must be genuine and is worth real marks: step 34 was not performed, the handover was defective, the alarm load was extreme, and a causal analysis that identifies these has identified true things — the draft is not incompetent and treating it as such is itself a failure of the dimension being assessed. The attack must then be structural rather than additive. A causal model that terminates at the last human action before the event will always find the operator, because the operator is always there; it cannot reach a design decision taken eleven years earlier, a permit renewed nineteen times, an inspection interval exceeded by three years, or a budget reduction, because none of those is an action in the sequence. Two demonstrating findings that the draft's method necessarily misses are readily available and the candidate must produce them from the case file: the level transmitter's span, which is not an action at all, and the occupied portable buildings, whose siting determined the consequence entirely and appears nowhere in a causal chain that begins at 02:13. The metrics requirement is where the top band separates. The recordable injury rate measured the frequency with which individuals were hurt in ways that generate paperwork — slips, cuts, strains — and it was genuinely excellent; it did not and could not measure loss of primary containment, protection layer availability, overdue inspections, or the backlog of unclosed process safety actions, and the case file supplies the proof, since 14 loss-of-containment events reached no board while the injury rate reached every board. Proposed indicators must be traceable to published guidance and thresholded against something external: a lagging indicator of loss of primary containment events per unit time, and a leading indicator such as safety-critical inspection or proof test completion against schedule, are the expected pair. On the recommendations, the addition should address the protection layer or the siting rather than the procedure, and the removal is most defensibly the additional operator training — not because training is worthless but because expected loss reduction per pound spent is near zero when the operator's information was the thing that failed. The elite move is to say that explicitly: the draft's recommendations are all cheap, all plausible, and all aimed at the part of the system that was already working as designed.",
        discriminating_signal:
          "Recognising that the draft's causal model, not its diligence, is what produces the operator-error conclusion — and demonstrating it with a finding the method could not have reached rather than merely asserting the limitation.",
        red_flags: [
          "Attacks the draft without first stating its strongest case",
          "Adds causes to the draft's tree rather than challenging the tree",
          "Describes the recordable injury rate as a bad metric without saying what it correctly measured",
          "Proposes indicators with no threshold or with a threshold chosen freely",
          "Recommends more training or more procedure as the addition",
          "Justifies the removal on plausibility rather than on expected loss",
        ],
      },
    },
    {
      numeral: "III",
      title: "Professional Duty and Conflicted Interest",
      marks: 200,
      minutes: 35,
      annex_attaches: false,
      curriculum_anchor:
        "The professional engineer's duty to public safety and its priority within recognised codes of conduct; the obligations attaching to chartered status; the distinction between confidentiality and concealment; regulatory reporting duties in major hazard industries.",
      situation:
        "Two facts have emerged that concern you personally and institutionally. First, the temporary works permits for the nine occupied buildings were renewed nineteen times under a delegated authority held by the central technical function — your own department — and two of the renewals carry the signature of the engineer who now leads your team. Second, the refinery general manager, to whom your investigation reports, has asked that the siting of the occupied buildings be handled in a separate workstream reporting directly to him, on the stated ground that it raises contractual questions with the turnaround contractor and is therefore commercially sensitive. He has also mentioned, without connecting the two subjects, that you are the leading internal candidate for the site technical manager post that will be advertised next month.",
      task: [
        "State the conflicts that exist, distinguishing those that are yours from those that are institutional. For each, state whether it is disqualifying, manageable, or requires disclosure only.",
        "Assess the general manager's request. Set out the strongest legitimate reason for it, then state whether you will comply, and identify precisely what you would be agreeing to if you did.",
        "Design the mechanism you will use, rather than the position you will take. Specify who is told, in what form, in what order, and what record is created. Marks here are for mechanism; a statement of principle without a mechanism scores in the lowest band.",
        "State what you will do if the mechanism is refused, and what personal cost you are accepting in each branch. A branch with no cost stated is treated as unexamined.",
      ],
      exhibits: [
        "Temporary works permit file, nineteen renewals over four years, with signatories.",
        "Delegated authority schedule for the central technical function.",
        "Terms of reference of the internal investigation, showing its reporting line to the refinery general manager.",
        "The relevant professional code of conduct for chartered engineers in the jurisdiction.",
        "Correspondence in which the separate workstream is proposed.",
      ],
      research: {
        mandate:
          "Establish, with citation: (1) the code of conduct of a named professional engineering institution, and the specific rule that governs the priority of public safety over the interests of a client or employer — quote the rule and give its number; (2) the statutory duty, in a named jurisdiction, to report a dangerous condition or a major accident hazard to the regulator, identifying who holds the duty and whether it can be discharged by reporting internally; (3) any published protection for a person making a disclosure in the public interest in that jurisdiction, naming the instrument and the conditions that must be met for the protection to apply; and (4) at least one documented case in which an engineer raised, or failed to raise, a safety concern within an organisation and the outcome of doing so. Your mechanism in requirement 3 must satisfy the conditions of the protection you cite, and you must state where in your sequence each condition is met.",
        target_sources: [
          "Codes of conduct and professional guidance from a named engineering institution",
          "Health and safety legislation and major accident hazard regulations in a named jurisdiction",
          "Public interest disclosure legislation and the published guidance of a national regulator on raising concerns",
          "Published accounts, inquiry findings or professional disciplinary decisions concerning engineers raising safety concerns",
        ],
        probes: [
          "Quote the rule on public safety from the code you cited and give its number.",
          "Under the protection you cite, what conditions must a disclosure satisfy? At which step of your mechanism is each one satisfied?",
          "Can the statutory duty you identified be discharged by an internal report? What is your source for that answer?",
          "What is the personal cost of your chosen branch, stated concretely?",
        ],
      },
      deliverable:
        "A written position of not more than 900 words containing: the conflict register with a disposition against each; the assessment of the request; the mechanism, specified as a sequence with named recipients, forms and records; and the refusal branch with its cost. Plus a Sources and Methods appendix of not more than 200 words.",
      key: {
        expected:
          "The conflict register must separate three things that scripts habitually merge. The promotion is the candidate's own interest and is disclosable rather than disqualifying — the correct treatment is to state it in writing to whoever will decide the investigation's scope, not to withdraw dramatically nor to reason that it has no effect. The team leader's signature on two permit renewals is institutional and is disqualifying for that individual on that scope, which requires a mechanism rather than a conversation. The department's ownership of the delegated authority is the largest of the three and is the one most likely to be missed: the investigation is being conducted by the function whose delegated authority produced the exposure, so the investigation's independence is compromised at its root and no amount of personal integrity cures it. On the general manager's request, the steelman is real and must be constructed: contractual liability with the turnaround contractor is a genuine commercial matter, legal privilege may legitimately attach to parts of it, and a separate workstream is not on its face improper. The correct disposal is precise: separating the siting question is defensible; separating it into a workstream reporting to the person accountable for the site is not, because it removes the highest-consequence finding from the report that will be read as the account of the event. What the candidate would be agreeing to, stated plainly, is the production of a document that describes an event that killed people without describing the decision that determined how many. The mechanism is where the marks are, and it must be a sequence rather than a sentiment: a written record of the conflict and the request, made contemporaneously; the concern raised in writing to the accountable person first, because every protective framework requires that the internal route be attempted; escalation to the site's designated safety authority and the board's safety committee on a stated timescale if it is not resolved; and, where the statutory duty is engaged, notification to the regulator, which the candidate must correctly establish cannot be discharged by an internal report. The strongest scripts note that the mechanism should be constructed so that it does not depend on the candidate's continued employment, because a disclosure route that terminates when the discloser is removed is not a route. Every branch must carry its cost, stated concretely — the promotion, the working relationship, the possibility of dismissal — and a candidate who describes a course of action with no cost has not modelled it.",
        discriminating_signal:
          "Identifying that the department conducting the investigation holds the delegated authority that produced the exposure — an institutional conflict that no personal integrity resolves — and building a mechanism that survives the candidate's own removal.",
        red_flags: [
          "Treats the promotion as disqualifying and withdraws, or treats it as irrelevant and does not disclose it",
          "Misses the department's ownership of the delegated authority",
          "Refuses the general manager's request without constructing its legitimate case",
          "States a principle without a mechanism",
          "Escalates externally before attempting the internal route, or treats an internal report as discharging a statutory duty",
          "Presents a course of action with no personal cost attached",
          "Resigns as the primary answer",
        ],
      },
    },
    {
      numeral: "IV",
      title: "Cascading Failure and Crisis Command",
      marks: 250,
      minutes: 45,
      annex_attaches: true,
      curriculum_anchor:
        "Emergency response and incident command structures; the reversibility of engineering interventions; statutory notification duties and their trigger points; evidence preservation after a major accident.",
      situation:
        "You are placed at 13:14 on 23 March, in the control room, in the position of the senior engineer present. You have six minutes. You know only what is on the board and what a person in that room would know: an indication reading 96.7 per cent, a base temperature of 153 °C against a target of 135 °C, an alarm list with 312 standing alarms, a single board operator, and no supervisor present. You do not know what you established in Parts I and II. Any part of your answer that relies on a finding from Parts I or II will be struck out before marking, and the requirement will be marked on what remains.",
      task: [
        "State your actions from 13:14 in sequence, each with the time it takes and the person who executes it. Distinguish reversible actions from irreversible ones and take them in that order unless you justify a departure.",
        "State the point at which you stop trying to establish what is happening and act on the possibility that you cannot. Give the clock time and the trigger.",
        "Address the 47 people in the nine occupied buildings: what you instruct, through what channel, on what authority, and what you do when that authority is not immediately available.",
        "The event occurs at 13:20. From 13:20 to 13:20 plus 72 hours, state your notification sequence: who is told, in what order, against what statutory deadline, and what you notify before the cause is known. Identify separately the evidence preservation actions you take and the point at which they compete with the response.",
        "Complete the requirements set out in Annex A for your specialisation.",
      ],
      exhibits: [
        "Control room screenshot at 13:14: level indication, temperature, feed totaliser, valve positions.",
        "Live alarm list, 13:04–13:14.",
        "Site emergency response plan, with muster points and the authority schedule for evacuation.",
        "Site plan showing the nine occupied buildings, the unit, the blowdown stack and the contractor parking area.",
        "Statutory notification schedule for the jurisdiction, with deadlines left blank for the candidate to complete.",
      ],
      research: {
        mandate:
          "Establish, with citation: (1) the statutory duty to notify a major accident or dangerous occurrence to the regulator in a named jurisdiction — the deadline, the form, the trigger event, and specifically whether the clock runs from the occurrence or from the determination of its cause; (2) the regulatory requirement to preserve the scene and the records after a major accident, and the point at which that duty arises; (3) at least one documented incident in which evidence critical to the investigation was lost in the first 48 hours, naming the report and the finding; and (4) the recognised incident command framework used in the process industries in that jurisdiction, and where the authority to order an evacuation sits within it. Complete the notification schedule exhibit with the deadlines you have established and their source, and state which deadline expires first.",
        target_sources: [
          "Reporting of injuries and dangerous occurrences regulations, or the equivalent in a named jurisdiction",
          "Major accident hazard regulations and the associated regulator guidance on notification",
          "Official investigation reports addressing loss of evidence or records after an incident",
          "Published incident command system documentation for industrial emergency response",
        ],
        probes: [
          "What triggers the notification clock in the regulation you cited — occurrence or determination? Quote the words.",
          "Which of your notifications expires first, and by how much does it precede the second?",
          "You ordered an evacuation. Under the site's authority schedule, who holds that authority, and what did you do about it not being present?",
          "Name one thing you did in the first hour purely to preserve evidence, and state what it cost the response.",
        ],
      },
      deliverable:
        "A timed action log from 13:14 to 13:20 at one-minute resolution, followed by a 72-hour notification and preservation schedule with statutory deadlines and sources. Plus the Annex A requirement for Part IV. Plus a Sources and Methods appendix of not more than 200 words. Not more than 1,000 words in total excluding the logs.",
      key: {
        expected:
          "The first thing the marker looks for is whether hindsight has been stripped. A script that says at 13:14 'the transmitter is out of range' has imported Part I and loses the requirement; a script that says 'I do not trust this indication because it has not moved while feed continues, and I will act on the mass balance rather than on the number' has reached the same operational conclusion by a route available to a person in that room, and scores at the top. That distinction is the whole design of this part. The reversible actions are cheap, fast and correct in any world: stop feed, open the bottom outlet, initiate depressuring on a defined route, sound the unit alarm, stop non-essential work in the vicinity. The irreversible ones follow. The stop-investigating trigger must be given as a clock time and a condition rather than as a disposition — a defensible answer is that by 13:16, with the temperature excursion unexplained and the level indication static, the candidate acts on the worst credible state rather than continuing to characterise it, and the reasoning is that the cost of acting on a false alarm is a lost start-up while the cost of not acting is unbounded. The occupied buildings are where most scripts lose the part. The authority to order evacuation sits with a role that is not present, and the correct answer neither waits for it nor ignores it: the candidate acts, states the ground on which they act, and records the fact that they acted outside the schedule — because in every framework the authority to protect life in an immediate hazard is not the same as the authority to declare a site emergency, and a candidate who cannot separate them will either freeze or act without a record. The honest answer to whether nine buildings can be cleared in six minutes is no, and the strongest scripts say so and act on the achievable part, including the direction of movement, which matters more than the instruction. On notification, the research must be applied rather than reported: the clock runs from the occurrence, not from the determination of cause, and a candidate who has established that will notify inside the deadline with the facts held and the cause stated as unknown, which is the correct professional act and the one most scripts avoid. The preservation requirement is answered well when the candidate names a specific action — a hold on the control system historian before its 48-hour data is overwritten is the strongest available — states what it cost the response, and gives the resolution rule where they compete, which is that preservation is achieved by copying and never by delaying a safety action.",
        discriminating_signal:
          "Reaching the correct operational action at 13:14 by a route available to someone standing in that control room, without importing the finding the candidate made in Part I.",
        red_flags: [
          "Uses a Part I or Part II finding to justify an action at 13:14",
          "Attempts to diagnose the column's true state before acting",
          "Waits for the absent authority before addressing the occupied buildings",
          "Claims a full evacuation of nine buildings inside six minutes",
          "Delays statutory notification until the cause is established",
          "Delays a safety action to preserve evidence, or takes no preservation action at all",
          "Presents an untimed list of actions rather than a sequence",
        ],
      },
    },
    {
      numeral: "V",
      title: "Testimony, Negotiation and Self-Assessment",
      marks: 150,
      minutes: 30,
      annex_attaches: false,
      curriculum_anchor:
        "The obligations of an expert or factual witness; the distinction between fact, opinion and speculation in evidence; the limits of professional competence; reflective practice.",
      situation:
        "Fourteen months later. A statutory inquiry is sitting. You are called as a witness of fact. Before you give evidence, the parent company's external counsel meets you and makes three requests: that you confine your answers to the questions asked, that you avoid characterising the group cost reduction programme, and that where you are uncertain you say so rather than estimating. Counsel notes that the company is paying for your representation. During the hearing, counsel to the inquiry puts it to you that your own investigation's terms of reference, which you accepted, excluded the siting of the occupied buildings, and that you therefore produced a report you knew to be incomplete. This is substantially correct.",
      task: [
        "Assess each of counsel's three requests separately. State which you will follow, which you will not, and why. One of the three is proper, one is improper, and one is proper in form and improper in the use being made of it: identify which is which.",
        "Answer the proposition put to you by counsel to the inquiry. Write the answer you would actually give, in the first person, in not more than 200 words. It will be marked as testimony, not as an essay.",
        "State the boundary of your own competence in this inquiry: name one question you expect to be asked that you are not qualified to answer, and state what you will say when it is asked.",
        "Write a self-assessment of not more than 250 words: the judgement you made during this investigation that you would now make differently, what you would have needed to know at the time to make it differently, and whether that information was available to you.",
      ],
      exhibits: [
        "Inquiry terms of reference and the list of matters on which evidence is sought.",
        "Your investigation's terms of reference, with the scope exclusion visible and your acceptance recorded.",
        "Counsel's written note of the pre-hearing meeting.",
        "The professional code of conduct rule on giving evidence.",
      ],
      research: {
        mandate:
          "Establish, with citation: (1) the duties of a witness giving evidence to a statutory inquiry or a court in a named jurisdiction, distinguishing the duties of a witness of fact from those of an expert witness, and identifying to whom the expert's duty is owed; (2) the professional conduct rule governing an engineer giving evidence, quoted and numbered; (3) the rules or guidance governing communication between a party's counsel and a witness before evidence is given, and what may and may not properly be discussed; and (4) at least one documented inquiry or hearing in which a professional witness's evidence was criticised for scope limitation, deference to an employer, or overreach beyond competence, naming the inquiry and the criticism. Your assessment of counsel's three requests must be grounded in the rules you cite, not in intuition.",
        target_sources: [
          "Procedural rules and published guidance for statutory inquiries in a named jurisdiction",
          "Civil procedure rules or equivalent on expert and factual evidence",
          "Professional institution codes of conduct on giving evidence and on competence",
          "Published inquiry reports containing findings about the conduct or reliability of professional witnesses",
        ],
        probes: [
          "Which of counsel's three requests is improper, and under which rule?",
          "To whom does an expert witness owe their duty, and what is your source?",
          "You said you were not qualified to answer a particular question. Who is, and how do you know where the boundary falls?",
          "In your self-assessment you named a judgement you would change. Was the information you would have needed available to you at the time? Answer yes or no first.",
        ],
      },
      deliverable:
        "Four short pieces: the assessment of the three requests; the testimony passage in the first person, not more than 200 words; the competence boundary statement; the self-assessment, not more than 250 words. Plus a Sources and Methods appendix of not more than 150 words.",
      key: {
        expected:
          "The three requests are the analytical core and the classification is not obvious. Confining answers to the questions asked is proper: it is what a witness of fact is supposed to do, and a witness who volunteers is a witness who strays outside competence. Saying so rather than estimating where uncertain is proper in form — it is exactly what the rules require — and improper in the use being made of it, because counsel is deploying a correct rule selectively, to encourage uncertainty on one subject rather than accuracy on all subjects; the candidate should follow the rule and name the use. Avoiding characterisation of the cost reduction programme is the improper request, and the reason must be stated correctly: it is not improper because the programme was causal, which the candidate cannot assert as a witness of fact, but because it is an instruction not to answer a question the inquiry may lawfully ask, given by a party with an interest in the answer, to a witness whose representation that party is funding. Naming the funding as the reason the request is improper rather than merely uncomfortable is the top-band move. The testimony passage is marked as testimony: it must concede the correct proposition first and without qualification, because the proposition is substantially true and a witness who fights a true proposition loses the tribunal for the rest of their evidence. The expected shape is a concession that the scope excluded siting and that the report is therefore incomplete on that point, followed by the two facts that place it — that the exclusion was directed and that the candidate recorded an objection to it, if that is what Part III produced — with no attack on the general manager and no self-justification. A passage that begins with explanation and reaches the concession late scores in the middle band however accurate its content. The competence boundary requires a specific question, not a category; the strongest scripts name something genuinely adjacent to their expertise, such as the toxicological consequences of the release or the contractual allocation of responsibility for the portable buildings, because naming an obviously remote question is not a real boundary. The self-assessment is marked on whether the candidate answers the third question honestly. A candidate who names a judgement, then states that the information needed was in fact available to them at the time, has done the difficult thing; a candidate who concludes that the information was unavailable has usually chosen a judgement that protects them, and the examiner probes for it.",
        discriminating_signal:
          "Conceding the true proposition in the first sentence of the testimony, and locating the impropriety of counsel's request in who is funding the representation rather than in the subject matter.",
        red_flags: [
          "Treats all three of counsel's requests as improper, or all as proper",
          "Contests the substantially correct proposition put by counsel to the inquiry",
          "Begins the testimony with explanation and concedes late",
          "Volunteers opinion beyond a witness of fact's role",
          "Names a competence boundary so remote that it costs nothing to admit",
          "Produces a self-assessment in which the information needed was conveniently unavailable",
        ],
      },
    },
  ],
};

/* ==========================================================================
   BUSINESS — Corvina
   ========================================================================== */

const CORVINA: Examination = {
  facultySlug: "business",
  case_code: "CORVINA",
  case_title: "The Corvina Trustee Balances",
  synopsis:
    "A listed payments group reporting €1.9bn of cash, €1.4bn of it in accounts no person outside the company had ever independently confirmed, defended by a market regulator that banned short selling rather than asking where the money was.",
  case_file: [
    "Corvina Payments Group is a listed payments and merchant acquiring business with a reported market capitalisation of €21bn at its peak. Reported revenue grew from €412m to €1,840m over five years, with a stated EBITDA margin rising from 21 per cent to 31 per cent against a peer range of 9 to 17 per cent.",
    "Corvina's own licensed operations are profitable but unremarkable. Fifty-four per cent of reported group EBITDA is attributed to three third-party acquiring partners operating in jurisdictions where Corvina holds no acquiring licence. Their combined disclosed headcount is 46. Corvina holds no merchant-level data for any partner-originated account and has never had system access to any partner platform.",
    "Cash and equivalents are reported at €1.9bn, of which €1.4bn is described in the audited notes as held in trustee accounts on behalf of the acquiring partners. The trustee is a three-person professional firm in a jurisdiction outside the group's principal markets and is not a licensed deposit-taking institution.",
    "Over the same period the group raised €900m of convertible bonds and drew €1.75bn on a revolving credit facility. Cumulative reported profit exceeds cumulative free cash flow by €820m.",
    "Two years ago an investment research firm published a report alleging that the trustee balances did not exist and that partner revenues were substantially fabricated. Corvina responded within 36 hours with two press releases attacking the researchers' motives and announcing a criminal complaint. The market regulator imposed a two-month prohibition on new net short positions in Corvina shares, citing market confidence, and announced no investigation of the allegations. Media pick-up of the criminal complaint exceeded pick-up of the original allegation by approximately four to one.",
    "The same audit firm has held the engagement for eleven years and the same engagement partner for seven. Non-audit fees have averaged 42 per cent of total fees. Trustee balance confirmations were obtained through the client's own finance function for three consecutive years, and in the fourth year a screenshot of an online banking portal supplied by the client was accepted in place of a confirmation. The engagement quality control reviewer raised the confirmation issue in year two; the file records the response as 'discussed with management, satisfied'.",
    "Three directors of the acquiring partners appear in a public corporate registry as former Corvina employees. The group's management representation letter asserts that all related party relationships have been disclosed.",
    "You were appointed to the Corvina board three months ago as an independent non-executive director and a member of the audit committee. You have no prior relationship with the company. You have read the research report. The chair has told you, pleasantly, that the committee's practice is to take the auditor's opinion as its assurance and not to duplicate work the auditor has done.",
    "Note on Annex A. For your specialisation, Annex A may place you in a seat other than the board seat described above. This is intended: the case is the same institutional failure viewed from the position your discipline would actually occupy.",
  ],
  precedent: {
    note: "Candidates are expected to identify a listed company whose reported cash or escrow balances were found not to exist, where the auditor obtained confirmations through the client, where a regulator restricted short selling rather than investigating, and where the profitable operations were attributed to third-party partners in jurisdictions the company was not licensed in. A script that reaches the parliamentary or regulatory inquiry report of such a case and uses its specific findings — particularly on the confirmation procedure and on the regulator's conduct — is operating at Distinction level.",
    documented_analogues: [
      "Wirecard AG, collapse June 2020 — German parliamentary committee of inquiry report, BaFin and FREP reviews, and the audit oversight proceedings that followed. The closest structural match, including the short-selling prohibition and the trustee account mechanism.",
      "Satyam Computer Services, 2009 — fabricated bank balances and confirmations; Indian regulatory and criminal findings.",
      "Parmalat, 2003 — a forged bank confirmation for a non-existent account, and the audit failure that followed.",
      "Luckin Coffee, 2020 — fabricated transaction volume attributed to third parties, and the short-seller report that preceded the admission.",
    ],
  },
  parts: [
    {
      numeral: "I",
      title: "Evidence Triage under Ambiguity",
      marks: 200,
      minutes: 35,
      annex_attaches: true,
      curriculum_anchor:
        "Financial statement analysis and the relationship between profit, cash and financing; the assertions underlying a set of accounts; the reliability hierarchy of evidence; base rates and peer comparison.",
      situation:
        "Your first audit committee meeting is in six days. You have the annual report, the research report, a two-page management rebuttal, and whatever you ask for. The chair has indicated that a request for the auditor to redo confirmation work would be read as a vote of no confidence in the auditor and would need to be justified to the board. You have one analyst from the company secretariat for two days, and no authority to instruct the finance function directly.",
      task: [
        "Separate what the annual report establishes, what it asserts, and what it omits. State each finding under the correct heading. Findings presented without this classification are not marked.",
        "Identify the single relationship in the reported figures that is hardest to reconcile with the company's own account of itself, and prove it. Your proof must not depend on believing or disbelieving the research report.",
        "Nominate the one document or confirmation you will request, state its cost in political capital, and state what result would satisfy you and what result would not. You may nominate only one.",
        "State what you will say at the committee meeting if your request is refused, and to whom.",
        "Complete the requirements set out in Annex A for your specialisation.",
      ],
      exhibits: [
        "Annual report and accounts, current year, with the cash note and the segment disclosure.",
        "Five-year financial summary: revenue, EBITDA, operating cash flow, free cash flow, cash, debt drawn.",
        "The research report and the company's two-page rebuttal.",
        "Audit committee papers for the preceding four meetings.",
        "Peer group financial summary, six comparable listed acquirers.",
      ],
      research: {
        mandate:
          "Establish, with citation: (1) at least one documented case in which a listed company's reported cash or escrow balances were found not to exist, giving the company, the year, the amount, and the specific mechanism by which the balances were evidenced to the auditor; (2) published benchmark EBITDA margins for listed merchant acquirers and payment processors, with the source, sample and year, normalised before comparison with Corvina's 31 per cent; and (3) a recognised published framework for assessing earnings quality or accrual divergence, which you must apply to Corvina's €820m cumulative gap rather than describe. State, in one sentence, the finding from the documented case that determined which single request you made in requirement 3.",
        target_sources: [
          "Parliamentary or legislative inquiry reports, regulatory investigations and court judgments concerning accounting fraud at listed companies",
          "Payments industry benchmark studies and the published accounts of listed acquirers",
          "Peer-reviewed and practitioner literature on earnings quality, accruals and cash conversion",
          "Audit oversight body findings on confirmation procedures",
        ],
        probes: [
          "In the case you cited, what exactly did the auditor hold as evidence of the balance, and how does it compare with what Corvina's auditor holds?",
          "What sample and year does your margin benchmark cover, and does it separate licensed acquiring from platform revenue?",
          "You applied an earnings quality framework. Give the computed figure for Corvina and state what value would be unremarkable.",
        ],
      },
      deliverable:
        "A note to yourself of not more than 900 words, structured as established / asserted / omitted, followed by the reconciliation proof, the single request with its cost and its acceptance criteria, and the refusal response. Plus the Annex A requirement for Part I. Plus a Sources and Methods appendix of not more than 200 words.",
      key: {
        expected:
          "The reconciliation the candidate must find is between reported cash and actual borrowing, and the reason it is the right answer must be understood rather than recited: a company sitting on €1.9bn does not raise €900m of convertibles and draw €1.75bn on a revolver, and — decisively — the borrowing is externally verifiable while the cash is an assertion, so the anomaly can be established without believing or disbelieving anybody. That is exactly what requirement 2 demands and most scripts miss the constraint, reaching instead for the margin, which requires a judgement about plausibility, or for the research report, which requires trusting a source. The margin and the €820m accrual gap are genuine supporting findings and should appear under 'asserted' and 'established' respectively, correctly classified. Under 'omitted' the strongest scripts place the things whose absence is the finding: no merchant-level data, no system access, no partner site visit, no direct confirmation. The single request is where judgement is assessed, and there is a right answer: a direct confirmation of the trustee balances obtained by the committee, or its own agent, from the institution holding the funds — not from the trustee, and not through management. Candidates who request the auditor's working papers, a management explanation, or a third-party expert review have chosen something that management or the auditor can satisfy without the money existing, and the acceptance criteria requirement exposes this: a satisfying result is a confirmation received directly from a regulated institution identifying the account and the balance, and an unsatisfying result is anything routed through the company, including a portal screenshot, a trustee letter or a management assurance. The political cost must be priced honestly rather than dismissed; the chair has pre-framed the request as a vote of no confidence, and a candidate who does not acknowledge that has not read the situation. On refusal, the correct answer is procedural rather than confrontational: the request and the refusal are minuted, in terms, and the candidate states plainly that a director who cannot obtain evidence of the largest asset on the balance sheet cannot discharge their duty — which is a statement of position, recorded, not a resignation.",
        discriminating_signal:
          "Selecting the cash-versus-borrowing contradiction because it is externally verifiable, rather than the margin anomaly, which requires a judgement about what is plausible.",
        red_flags: [
          "Builds the case on the research report's allegations",
          "Selects the EBITDA margin as the primary irreconcilable finding",
          "Requests something management or the auditor can satisfy without the cash existing",
          "Omits the political cost, or treats the chair's framing as irrelevant",
          "Fails to classify findings as established, asserted or omitted",
          "Responds to refusal by resigning, or by accepting it without a minute",
        ],
      },
    },
    {
      numeral: "II",
      title: "Adversarial Review and Blind-Spot Audit",
      marks: 200,
      minutes: 35,
      annex_attaches: true,
      curriculum_anchor:
        "Audit evidence and the assertions it supports; independence and the safeguards framework; market microstructure and the informational content of short selling; the interpretation of regulatory action as a signal.",
      situation:
        "Management has produced a defence of the trustee arrangement. It is coherent. It argues that the balances are client money held on trust, that the trust structure is the reason they cannot be commingled or drawn, that the borrowing is a treasury matter reflecting the ring-fencing of that cash, that the margin premium reflects a genuinely differentiated technology platform, and that the research firm holds a short position and is therefore not a disinterested party. Every one of these statements is either true or arguable.",
      task: [
        "Construct management's case in its strongest form, in your own words, before attacking it. A script that does not do this scores zero on requirements 2 and 3.",
        "Attack it. For each element of the defence, state the specific evidence that would confirm it and identify which elements are confirmable and which are constructed so that no evidence could settle them. Identify the single point at which the defence changes the subject.",
        "Assess the regulator's short-selling prohibition as information. State what it told a competent observer, what it did not tell them, and in which direction a rational analyst should have updated on it. Justify the direction.",
        "State the strongest argument against your own conclusion — the case that Corvina is a genuine business being attacked by short sellers — and state what evidence would move you to it.",
        "Complete the requirements set out in Annex A for your specialisation.",
      ],
      exhibits: [
        "Management's defence memorandum, six pages.",
        "The trust deed governing the trustee accounts.",
        "Audit engagement letter, fee schedule showing the audit and non-audit split, and the independence declaration.",
        "Regulator's announcement of the short-selling prohibition and its stated reasoning.",
        "Net short position disclosures over the preceding two years.",
      ],
      research: {
        mandate:
          "Establish, with citation: (1) the auditing standard governing external confirmations, named and numbered, and specifically what it requires as to the auditor's control over the process and what it directs where management interferes with a request; (2) the regulatory basis on which a market authority may restrict short selling in a named jurisdiction, together with at least one published academic or regulatory review of whether such restrictions achieve their stated aim, giving its finding; (3) the independence provisions governing non-audit fee ratios and partner rotation in a named jurisdiction, with the actual limits, compared against 42 per cent and seven years; and (4) at least one documented case in which a short seller's published allegation about a listed company was subsequently substantiated, giving the company, the year and the interval between publication and confirmation. Your answer to requirement 3 must be grounded in the review you cite, not in intuition about market sentiment.",
        target_sources: [
          "International Standards on Auditing on external confirmation and on fraud",
          "Market authority regulations on short selling and disclosure of net short positions, and post-hoc reviews of short selling bans",
          "Statutory audit regulations and ethical standards on independence, fee caps and rotation",
          "Inquiry reports, enforcement findings or court judgments concerning substantiated short-seller allegations",
        ],
        probes: [
          "Quote what the confirmation standard requires as to control of the process, and state what it directs where management refuses.",
          "The review you cited on short-selling bans — what did it find about price discovery and about liquidity?",
          "What are the fee cap and rotation limits in the jurisdiction you named, and does Corvina's position breach them?",
          "In the substantiated short-seller case you cited, how long was the interval between publication and confirmation?",
        ],
      },
      deliverable:
        "A committee paper of not more than 1,000 words: the steelman; the element-by-element attack with confirmability stated for each; the regulator signal analysis with a stated direction; the counter-case against your own conclusion. Plus the Annex A requirement for Part II. Plus a Sources and Methods appendix of not more than 200 words.",
      key: {
        expected:
          "The steelman must be built properly, because management's defence is genuinely coherent and the candidate who cannot state it has not earned the right to dismiss it. Client money held on trust really is restricted; ring-fenced cash really can coexist with borrowing; a differentiated platform really can carry a margin premium; and the research firm really does hold a position. The attack must then proceed element by element with confirmability as the test, and the results are asymmetric in a way the candidate should notice and name: the trust structure is confirmable in an afternoon by a direct request to the institution holding the funds; the ring-fencing explanation is confirmable by the same act; the platform differentiation is only weakly confirmable and would take months; and the short-seller's motive is not confirmable at all and, more importantly, is not responsive — whether the researchers profit from being right has no bearing on whether they are right. That is the point at which the defence changes the subject, and identifying it precisely is the highest-value single observation in the part. The correct summary is that the defence explains why the cash is unavailable and never once addresses why it is unconfirmable, and those are different questions. On the regulator, the analysis must be structural: a prohibition on new net short positions conveys information about the regulator's institutional posture, its reading of its own mandate, and possibly its political exposure, and conveys nothing whatever about the trustee balances. A rational analyst should have updated toward the short thesis, and the justification is that the regulator removed from the market the participants with the strongest financial incentive to establish the truth, while declining to establish it itself — so the population of people investigating the allegation fell at the moment the allegation was made. Candidates who read the ban as validation are marked wrong, and candidates who read it as neutral are marked below those who reach the direction and justify it. The counter-case requirement is not decoration: a candidate who cannot state what evidence would move them to believing Corvina is genuine has not held the hypothesis open, and the correct answer is specific and small — a direct institutional confirmation would do it, which is the same test as everything else in the part, and noticing that convergence is itself a distinction-level observation.",
        discriminating_signal:
          "Identifying that the entire defence answers why the cash is unavailable and never addresses why it is unconfirmable — and that a single direct confirmation would settle every confirmable element at once.",
        red_flags: [
          "Dismisses the defence without constructing it",
          "Treats the short seller's position as an answer to the short seller's evidence",
          "Reads the regulatory prohibition as validation, or declines to state a direction",
          "Assesses confirmability qualitatively without identifying which elements are unfalsifiable",
          "States a counter-case with no evidence attached that would move them",
          "Cites the confirmation standard without applying it to what the file actually contains",
        ],
      },
    },
    {
      numeral: "III",
      title: "Professional Duty and Conflicted Interest",
      marks: 200,
      minutes: 35,
      annex_attaches: false,
      curriculum_anchor:
        "Directors' duties and their statutory formulation; the role of the independent non-executive and of the audit committee; disclosure of interests; the distinction between confidentiality and concealment; market abuse and inside information.",
      situation:
        "Three things arrive in the same week. Your appointment fee is €140,000 a year, which is a material part of your income. The chair proposes that you take on an additional advisory mandate with a Corvina subsidiary at €90,000, describing it as recognition of your contribution; it would not be disclosed as a related party transaction under the group's own threshold. And you now hold information — that the committee has no independent evidence of €1.4bn — that is arguably inside information, while your appointment came with a shareholding you are contractually encouraged to build.",
      task: [
        "Set out the conflicts, separating your own interests from those attaching to your office. For each, state whether it is disqualifying, manageable with disclosure, or requires you to decline.",
        "Assess the advisory mandate. State the strongest legitimate reading of it and then state what accepting it would do to your position on the committee, in mechanism terms rather than in terms of how you would feel.",
        "Design the mechanism. Specify what you require the committee to do, in what order, with what record, and what you require of the auditor directly. Marks are for mechanism; a statement of principle without a mechanism scores in the lowest band.",
        "State what you do if the mechanism is refused by the chair, addressing in order: the board, the auditor, the regulator, and public disclosure. For each step state what triggers it, what you are permitted to disclose, and what you are prohibited from disclosing.",
        "State the personal cost of your chosen course, concretely. A course with no cost stated is treated as unexamined.",
      ],
      exhibits: [
        "Your letter of appointment, fee schedule and shareholding encouragement provision.",
        "The proposed advisory mandate and the group's related party disclosure threshold.",
        "Board and audit committee terms of reference.",
        "The applicable corporate governance code.",
        "Extract from the market abuse regime on inside information and the obligations of a person in possession of it.",
      ],
      research: {
        mandate:
          "Establish, with citation: (1) the statutory duties of a director in a named jurisdiction, quoted and sectioned, identifying specifically the duty to exercise independent judgement and the duty to declare an interest, and what the statute requires where an interest is not caught by a company's own disclosure threshold; (2) the corporate governance code provision governing the independence of a non-executive director, and what it says about additional fees and about tenure; (3) the market abuse regime's definition of inside information in that jurisdiction, whether the information described in this part meets it, and what obligations follow for a person holding it; and (4) the route by which a director may report a concern to the financial regulator or the audit oversight body, whether any protection attaches, and at least one documented case in which a non-executive director resigned or reported over an audit or disclosure concern, with the outcome. Your escalation sequence must be consistent with the market abuse obligations you identify.",
        target_sources: [
          "Companies legislation setting out directors' duties in a named jurisdiction",
          "The applicable corporate governance code and its guidance on board effectiveness and independence",
          "Market abuse regulation and regulator guidance on inside information",
          "Regulator whistleblowing routes, and published accounts or enforcement findings concerning non-executive directors reporting concerns",
        ],
        probes: [
          "Quote the statutory duty to exercise independent judgement and give its section number.",
          "Does the information you hold meet the definition of inside information in the regime you cited? Answer yes or no, then justify.",
          "Your escalation includes public disclosure. At what point does that become lawful, and what would make it unlawful?",
          "State the personal cost of your chosen course in figures.",
        ],
      },
      deliverable:
        "A written position of not more than 900 words: the conflict register with dispositions; the mandate assessment; the mechanism as an ordered sequence with records; the escalation ladder with triggers and disclosure limits at each step; the personal cost. Plus a Sources and Methods appendix of not more than 200 words.",
      key: {
        expected:
          "The advisory mandate is the item on which the part turns, and the correct analysis is mechanical rather than moral. A candidate who declines it because it feels like a bribe has reached the right answer for a weak reason and will be marked below one who states what it does: it raises the candidate's income from the company by 64 per cent, it falls below the group's own related party threshold so it would not be visible to shareholders, and it therefore converts an independent non-executive into a person with an undisclosed financial dependency on the executives whose accounts they are examining — which does not require anyone to intend a bribe for the independence to be gone. The strongest scripts note that the threshold's placement is itself the finding, and that the correct response is not only to decline but to raise the threshold question with the committee, because a disclosure threshold that permits a 64 per cent undisclosed increase in a director's remuneration is not a threshold that works. The fee dependency is manageable with disclosure, not disqualifying, and a candidate who treats €140,000 as automatically fatal has not distinguished materiality from prohibition. The inside information point must be answered as a yes or no with a justification: the absence of independent evidence for €1.4bn of a €21bn company is precise, non-public and price-sensitive, so it meets the definition, and the consequences the candidate must reach are that they cannot deal, cannot build the encouraged shareholding, and cannot disclose selectively — including to the research firm, which some scripts propose and which would be an offence. The mechanism must be a sequence with records: a written request to the committee for direct confirmation, minuted; a direct written request to the auditor with a deadline, because the committee's route to the auditor does not run through management; a paper to the full board if the committee declines; and then the regulator. The escalation ladder is well answered when each rung has a trigger and a disclosure limit, and the strongest scripts identify that public disclosure is almost never the right rung for a director holding inside information, because the lawful route is the regulator and the unlawful route is the market. On cost, concrete figures are expected: the €140,000, the €90,000 declined, the probable loss of the appointment, and the reputational exposure of being the director who was on the board when it collapsed either way.",
        discriminating_signal:
          "Analysing the advisory mandate mechanically — as a 64 per cent undisclosed increase in dependency that sits deliberately below the company's own threshold — rather than as a question of whether it is a bribe.",
        red_flags: [
          "Declines the mandate on instinct without stating what it does structurally",
          "Treats the appointment fee as automatically disqualifying",
          "Does not answer the inside information question as a yes or no",
          "Proposes disclosing to the research firm, the press, or the market",
          "Produces an escalation ladder with no triggers or no disclosure limits",
          "Resigns as the first substantive step",
          "States a course of action with no personal cost",
        ],
      },
    },
    {
      numeral: "IV",
      title: "Cascading Failure and Crisis Command",
      marks: 250,
      minutes: 45,
      annex_attaches: true,
      curriculum_anchor:
        "Continuous disclosure obligations and the timing of a market announcement; insolvency triggers and directors' obligations as solvency becomes doubtful; crisis governance; the preservation of records under investigation.",
      situation:
        "It is 08:00 on a Wednesday. The auditor has informed the chair that it is unable to obtain evidence for €1.4bn of trustee balances and will not sign. The chief operating officer, who controls the partner relationships, is not answering. The shares are not yet suspended. Two directors are on aircraft. The chair asks you, as the committee member who raised the confirmation question, to take the lead. You are placed in the moment: you know only what is above and what you established in Parts I to III.",
      task: [
        "State your actions from 08:00 in sequence, each with a time and an owner, for the first eight hours. Distinguish reversible actions from irreversible ones.",
        "Address disclosure. State when the announcement is made, what it says, what it does not say, and against what obligation. State specifically whether you announce before you understand the position, and justify it against the rule rather than against comfort.",
        "Address the money. State what you do about the €500m of cash not in trustee accounts, the drawn revolving facility, and the payments the group is due to make to merchants who are not party to any of this. Rank these and justify the ranking.",
        "Address the record. State the preservation actions you take in the first two hours, over what systems, and by what authority, and identify the point at which preservation competes with the response.",
        "State the point at which the board's obligation shifts from shareholders to creditors, what triggers it, and what changes in your decision-making after it.",
        "Complete the requirements set out in Annex A for your specialisation.",
      ],
      exhibits: [
        "The auditor's written communication to the chair.",
        "Group cash position by account, entity and jurisdiction as at close of business Tuesday.",
        "Revolving credit facility agreement, with covenant and event of default clauses.",
        "Merchant settlement obligations due within five business days.",
        "Continuous disclosure obligations extract for the listing venue, with deadlines left blank for the candidate to complete.",
      ],
      research: {
        mandate:
          "Establish, with citation: (1) the continuous disclosure obligation applying to a listed issuer in a named jurisdiction — the trigger, the deadline, and the conditions under which disclosure may lawfully be delayed, quoting the delay conditions; (2) the point at which directors' duties shift toward creditors as insolvency becomes likely in that jurisdiction, naming the doctrine or the statutory provision and the trigger; (3) the obligations owed to clients or merchants whose funds an authorised payments firm holds, and how those funds rank on insolvency, naming the safeguarding rules; and (4) at least one documented corporate collapse in which the timing or content of the disclosure announcement was subsequently criticised by a regulator, inquiry or court, with the finding. Complete the disclosure obligations exhibit with the deadlines you establish and state which expires first.",
        target_sources: [
          "Listing rules and market abuse regulation on continuous disclosure and delayed disclosure",
          "Insolvency legislation and case law on the shift of directors' duties toward creditors",
          "Payment services safeguarding rules and client money regulations",
          "Inquiry reports, regulatory findings or judgments concerning disclosure timing in a corporate collapse",
        ],
        probes: [
          "Quote the conditions under which disclosure may lawfully be delayed. Are they met here?",
          "What triggers the shift of duty toward creditors in the jurisdiction you named, and what is your source?",
          "How do safeguarded merchant funds rank on insolvency, and does that change your ranking in requirement 3?",
          "You preserved records. Over which systems, and who had authority to instruct it at 08:00?",
        ],
      },
      deliverable:
        "An eight-hour action log with times and owners; a draft announcement of not more than 150 words; the money ranking with justification; the preservation schedule; the duty-shift analysis. Plus the Annex A requirement for Part IV. Plus a Sources and Methods appendix of not more than 200 words. Not more than 1,100 words excluding the log and the announcement.",
      key: {
        expected:
          "The disclosure question is the one the part is built around and it has a correct answer that most scripts avoid. The obligation is triggered by inside information, the candidate already holds it, and the conditions for lawful delay are narrow and cumulative — they do not include 'we do not yet understand our own position'. So the announcement goes today, before the position is understood, and it says the only three things the board actually knows: that the auditor has been unable to obtain evidence for a stated balance, that the accounts will not be signed on the expected date, and that the company will update by a stated time. A candidate who delays to establish the facts has chosen the comfortable answer and must be marked down against the rule they were required to cite; a candidate who announces and states more than is known has made the opposite error. The draft announcement is marked on what it omits as much as on what it contains: no reassurance, no characterisation of the trustee balances, no attack on the auditor, no forecast. On sequencing, the reversible and cheap actions come first and should be recognised as such — securing the €500m that is under the group's own control, stopping discretionary payments, instructing preservation, convening the board — while the irreversible ones, principally the announcement and any approach to the regulator, follow within the same day rather than later. The money ranking is where professional judgement is most exposed. Merchant funds held under safeguarding requirements are not the group's money and do not rank as the group's asset; a candidate who reaches the safeguarding rules will place them first and will say why, which is that they were never available to the group in the first place. The revolver is second in urgency because drawing further on it once the position is known raises a real question about deception of a lender, and a candidate who proposes drawing the remaining facility 'to preserve liquidity' has walked into the trap the part sets. The duty shift must be answered with a named trigger and a stated consequence: once insolvency is likely, the board's decisions must be tested against creditor interest, which means the group can no longer trade in a way that improves the shareholders' position at creditors' expense, and the candidate should state concretely what they stop doing at that moment. Preservation is answered well by naming systems rather than intentions — the partner reporting systems, the finance function's correspondence, the treasury records — and by acknowledging that the chief operating officer's non-response is itself a preservation risk, since the systems most at risk are the ones only he controls.",
        discriminating_signal:
          "Announcing before the position is understood, because the delay conditions in the rule are not met — and drafting an announcement that states only what the board knows.",
        red_flags: [
          "Delays the announcement to establish the facts",
          "Drafts an announcement containing reassurance or characterisation",
          "Proposes drawing further on the revolving facility",
          "Treats safeguarded merchant funds as a group asset in the ranking",
          "Gives no trigger for the shift of duty toward creditors, or no consequence",
          "Names preservation as an intention without naming systems or authority",
          "Waits for the two absent directors before acting",
        ],
      },
    },
    {
      numeral: "V",
      title: "Testimony, Negotiation and Self-Assessment",
      marks: 150,
      minutes: 30,
      annex_attaches: false,
      curriculum_anchor:
        "Giving evidence to a legislative or regulatory body; the limits of a director's knowledge and the accurate expression of it; negotiation under asymmetric information; reflective practice and the honest attribution of error.",
      situation:
        "Nine months later. A legislative committee of inquiry is taking evidence. You appear alongside the chair and the former audit partner. Before the session, the company's insurers, who are funding your representation under the directors' and officers' policy, advise you that admissions of fault may prejudice cover. During the session a member puts it to you that you joined the board three months before the collapse, took a fee of €140,000, asked one question, accepted the answer, and are now presenting yourself as the person who raised the alarm. Part of this is accurate and part of it is not.",
      task: [
        "Assess the insurer's advice. State whether it is proper, what it is properly directed at, and what you will and will not do in consequence.",
        "Answer the member's proposition. Write the answer you would actually give, in the first person, in not more than 200 words. It is marked as testimony, not as an essay. Separate the accurate part from the inaccurate part in the order you would actually separate them.",
        "The chair, sitting beside you, gives an account of the confirmation question that is inconsistent with the minute you caused to be made. State what you do, in the room, at that moment.",
        "Write a self-assessment of not more than 250 words: the decision in this case you would now take differently, what you would have needed to know at the time, and whether it was available to you.",
      ],
      exhibits: [
        "Committee terms of reference and the list of matters on which evidence is sought.",
        "Minutes of the audit committee meetings you attended, including the minuted request and refusal.",
        "The directors' and officers' policy provision on admissions.",
        "The chair's written evidence, submitted in advance.",
      ],
      research: {
        mandate:
          "Establish, with citation: (1) the powers of a legislative committee to take evidence in a named jurisdiction, the protections attaching to what is said before it, and whether a witness may decline to answer; (2) the standard directors' and officers' policy provision on admissions and co-operation, and published guidance or case law on the tension between it and a witness's obligation to answer truthfully; (3) the professional or statutory position on a director's duty to correct the record where another witness gives an inconsistent account; and (4) at least one documented legislative or regulatory hearing at which a non-executive director's evidence was criticised, giving the hearing, the year, and the specific criticism. Your assessment of the insurer's advice must rest on the policy provision and the guidance you cite rather than on a general view of insurers.",
        target_sources: [
          "Legislative or parliamentary rules on evidence, privilege and witness protection in a named jurisdiction",
          "Published guidance or case law on directors' and officers' cover, admissions and co-operation clauses",
          "Corporate governance guidance on directors' obligations to the accuracy of the record",
          "Transcripts and reports of legislative or regulatory hearings into corporate collapses",
        ],
        probes: [
          "Is the insurer's advice proper? Under which policy provision, and what is it properly directed at?",
          "In your testimony, which sentence concedes the accurate part? Read it back.",
          "You corrected the chair, or you did not. What rule or duty determined that, and what did it cost?",
          "Was the information you needed available to you at the time? Yes or no first.",
        ],
      },
      deliverable:
        "Four short pieces: the assessment of the insurer's advice; the testimony passage in the first person, not more than 200 words; the account of what you do when the chair's evidence diverges; the self-assessment, not more than 250 words. Plus a Sources and Methods appendix of not more than 150 words.",
      key: {
        expected:
          "The insurer's advice is proper and is properly directed at admissions of legal liability, not at statements of fact; a candidate who treats it as improper has misread it, and a candidate who treats it as a licence to be vague has misused it. The correct disposal, and the one the markers look for, is a single clean distinction: the candidate will not characterise their own conduct as negligent, because that is a legal conclusion they are not qualified to reach and the policy properly reserves it, and the candidate will state every fact accurately including the facts that are against them. The member's proposition is partly true and the testimony must concede the true part first, in the first sentence, without qualification: three months, €140,000, one question. The inaccurate part — that the answer was accepted — is corrected second and with evidence rather than assertion, because the minute exists and the candidate caused it to be made. A passage that leads with the correction, or that leads with the fee being standard for the role, loses the tribunal and is marked in the middle band regardless of accuracy. The divergence with the chair is the hardest item on the paper and the marks reward doing the uncomfortable thing precisely rather than dramatically: the candidate corrects the record, in the room, immediately, because a witness who lets an inconsistent account stand has adopted it, and the correction is made narrowly and without accusation — that the minute of the meeting records the request and the refusal, and that the candidate will provide it — rather than by contradicting the chair's honesty. Candidates who wait to correct it privately afterwards, or who leave it to the committee to find, are marked well below; candidates who use the moment to attack the chair are marked below that. The self-assessment is marked on the third question. The available honest answers are strong: the decision to accept the chair's framing at the first meeting, or to make one request rather than to treat the refusal itself as the finding, and the information needed was in fact available — the annual report and the borrowing were on the candidate's desk from day one. A self-assessment concluding that the necessary information was unavailable is almost always a script protecting itself, and the examiner probes for it.",
        discriminating_signal:
          "Correcting the chair's inconsistent evidence in the room, immediately and narrowly, and conceding the true half of the member's proposition in the first sentence.",
        red_flags: [
          "Treats the insurer's advice as improper, or as licence for vagueness",
          "Leads the testimony with the correction rather than the concession",
          "Defends the €140,000 fee",
          "Lets the chair's account stand, or corrects it privately afterwards",
          "Attacks the chair's honesty rather than producing the minute",
          "Concludes in the self-assessment that the necessary information was unavailable",
        ],
      },
    },
  ],
};

/* ==========================================================================
   PHARMACY — Solvenor
   ========================================================================== */

const SOLVENOR: Examination = {
  facultySlug: "pharmacy",
  case_code: "SOLVENOR",
  case_title: "The Solvenor Route Change",
  synopsis:
    "A change of synthesis route that raised yield by thirteen points, introduced a genotoxic impurity at the work-up, and passed every specification the product was registered against for eleven months.",
  case_file: [
    "Solvenor Pharma manufactures active pharmaceutical ingredients at four sites. Its largest product by volume is a long-acting angiotensin receptor antagonist supplied to 34 finished-product marketing authorisation holders across 22 countries, reaching approximately 1.9 million patients on treatment at any time.",
    "Eleven months ago, change control CC-2214 substituted the tetrazole ring formation step with a route using a different solvent system and introduced a nitrite quench at the work-up. Yield rose from 68 per cent to 81 per cent and cycle time fell by 11 hours per batch. The change was classified as minor, self-approved by the site quality unit, and implemented four months before the corresponding regulatory variation was filed.",
    "The risk assessment attached to CC-2214 runs to one page. It assesses impact on assay, related substances by the registered method, residual solvents and physical form. It contains no assessment of new impurity formation pathways and does not consider the reagents introduced at the quench.",
    "Three of the 34 finished-product authorisation holders were notified of the change. Thirty-one were not.",
    "The registered related-substances method is reversed-phase HPLC with UV detection at 225 nm, with a reporting threshold of 0.05 per cent. Continued process verification data show a step change in one unassigned peak at 4.1 minutes, coinciding with the route change date. It was flagged twice in trending reports and closed both times as within historical variability. It was below the identification threshold throughout and so was not investigated under the method's own rules.",
    "At 09:00 on a Wednesday, a customer's laboratory reports a dialkylnitrosamine at 22.4 ppm in a batch released eleven months ago, detected by an LC-MS/MS method the customer developed for an unrelated programme. Subsequent testing of 41 retained batches gives a range from below the limit of detection to 22.4 ppm, mean 6.1 ppm. The daily dose of the active substance ranges from 40 mg to 320 mg.",
    "The affected site produces approximately 40 per cent of world supply of this active substance. Its material is blended with material from a second site before shipment. National supply of the two same-class alternatives is estimated at 5.5 weeks of demand if the affected product is fully withdrawn. Sixty-two per cent of patients are over 65, and an estimated 18 per cent are treated for heart failure rather than hypertension.",
    "Two spontaneous reports over three years referencing malignancy in patients on the product were assessed and closed as confounded by age and comorbidity. The risk management plan addresses hypotension, renal impairment and hyperkalaemia, and contains no impurity-related safety concern.",
    "You chair Solvenor's product quality review board. Your annual bonus is weighted 40 per cent to site yield and cost-of-goods targets, which CC-2214 was designed to meet, and you signed the board minute that noted and accepted the change control's minor classification.",
    "Note on Annex A. For your specialisation, Annex A may place you in a seat other than the one described above, including outside the manufacturer. This is intended.",
  ],
  precedent: {
    note: "Candidates are expected to identify a documented case in which a change to the synthesis route of a marketed active substance introduced a nitrosamine impurity that the registered analytical method could not detect, leading to a multi-region recall. The strongest scripts also reach the regulators' patient advice in that case, which was that patients should not stop treatment without a replacement, and use it to resolve the benefit-risk question in Part I rather than merely citing it.",
    documented_analogues: [
      "Valsartan and the sartan class, from July 2018 — nitrosamine (NDMA and NDEA) contamination traced to a 2011–2012 change of synthesis route at an API manufacturer; EMA Article 31 referral, FDA and EDQM assessments, and the CEP suspensions that followed. The closest structural match, including the analytical detection failure and the multi-region recall divergence.",
      "Ranitidine, from 2019 — nitrosamine formation and subsequent market withdrawal; a different formation mechanism, useful as a contrast.",
      "Heparin, 2008 — a contaminant introduced upstream and invisible to the compendial method of the time; the analytical parallel is close.",
      "Metformin nitrosamine testing, from 2019 — the regulatory response after the class-wide risk assessment requirement was established.",
    ],
  },
  parts: [
    {
      numeral: "I",
      title: "Evidence Triage under Ambiguity",
      marks: 200,
      minutes: 35,
      annex_attaches: true,
      curriculum_anchor:
        "Organic synthesis and impurity formation pathways; analytical method specificity and detection limits; benefit-risk assessment expressed in comparable units; the pharmaceutical quality system and change control.",
      situation:
        "It is 11:00 on the Wednesday. You have had the customer's result for two hours. You do not yet have a confirmed root cause, you do not have your own analytical confirmation, and you do not know how many batches or which markets are affected. Three positions are being urged on you: the site director wants confirmation before any external action; the regulatory affairs lead wants immediate notification of every authority; a customer's quality director is on the telephone asking whether their product is safe.",
      task: [
        "State what is established, what is probable, and what is unknown, as at 11:00. Every item must sit under one of the three headings.",
        "Identify the mechanism. State how the change described in CC-2214 creates this impurity, at which point in the process it forms, and why the risk assessment as designed could not have identified it. Your answer must name the reagent classes and the step.",
        "Convert the finding into patient exposure. Express the impurity at the highest measured level and the highest daily dose as a daily intake in nanograms, and state what further information you require to convert that intake into a risk.",
        "State the risk of the obvious response — stopping the product — in the same units in which you have expressed the impurity risk, so far as the case file permits, and identify which of the two risks the file lets you quantify and which it does not.",
        "Complete the requirements set out in Annex A for your specialisation.",
      ],
      exhibits: [
        "Change control CC-2214 with its one-page risk assessment and approval route.",
        "Process flow diagrams, original and amended routes, with reagents and conditions.",
        "Continued process verification trending reports, 24 months, with the 4.1-minute peak.",
        "Customer LC-MS/MS report and chromatogram.",
        "Retained sample test results, 41 batches.",
      ],
      research: {
        mandate:
          "Establish, with citation: (1) the regulatory acceptable intake limit for the nitrosamine class in question, in nanograms per day, naming the guideline and the issuing body and stating the basis on which such limits are derived; (2) the recognised root causes of nitrosamine formation in pharmaceutical synthesis, naming the regulatory or scientific source that sets them out, and identifying which root cause applies here; and (3) at least one documented case in which a change to the synthesis route of a marketed active substance introduced a nitrosamine detected only years later, giving the substance, the year, the regulator's assessment of excess cancer risk, and specifically what the regulators advised patients to do — and the reasoning given. Your answer to requirement 4 must use that reasoning, applied to this case's own supply and population figures.",
        target_sources: [
          "ICH M7 and regulator guidance on nitrosamine acceptable intakes and risk assessment",
          "Regulatory assessment reports, referral procedure outcomes and lessons-learned documents on nitrosamine contamination",
          "Peer-reviewed literature on nitrosamine formation mechanisms in pharmaceutical synthesis",
          "Agency public statements and patient advice issued during nitrosamine recalls",
        ],
        probes: [
          "What is the acceptable intake limit you cited, in nanograms per day, and how was it derived?",
          "Which root cause from your cited source applies here, and at which step?",
          "In the case you cited, what did the regulator tell patients to do, and what reason did it give?",
          "You expressed the impurity as a daily intake. Give the figure and the multiple of the limit.",
        ],
      },
      deliverable:
        "A quality board note of not more than 900 words: established / probable / unknown; the mechanism with reagent classes and step; the exposure calculation with its multiple of the acceptable intake; the comparative risk statement. Plus the Annex A requirement for Part I. Plus a Sources and Methods appendix of not more than 200 words.",
      key: {
        expected:
          "The mechanism is the curriculum component and must be stated in chemical terms: a nitrite source introduced at the quench, in the presence of a secondary amine or an amine-generating species under the acidic conditions of the work-up, produces a nitrosamine, and it forms at the quench and not at the ring formation step that CC-2214 was written about. That single sentence is the case, and the risk assessment's failure follows from it directly — the assessment examined the step that changed, while the impurity forms at the step whose conditions changed as a consequence, so a longer assessment of the same design would have produced the same conclusion. Candidates who describe the assessment as inadequate without identifying this structural mismatch have not earned the mechanism marks. The arithmetic must be performed: 22.4 ppm at a 320 mg daily dose is approximately 7,200 nanograms per day, which the candidate should express as a multiple of the acceptable intake limit they have cited, and the multiple is what makes the finding serious. The comparative risk requirement is the intellectual centre and is where most scripts fail in a predictable direction. The impurity risk is a small increment to lifetime cancer risk accruing over years of exposure. The interruption risk is a cardiovascular event risk accruing over days to weeks, in a population 62 per cent over 65 with an 18 per cent heart failure subgroup, against 5.5 weeks of alternative supply for 1.9 million patients. Expressed in the same units and over the same window, the second dominates, which is why the regulators in the documented precedent advised patients not to stop without a replacement — and a candidate who reaches that precedent and applies its reasoning to these numbers has done exactly what the paper is testing. The classification requirement is marked strictly: established is the customer's result and the trending step change; probable is the mechanism and the batch range; unknown is the affected market list, the true population distribution of exposure, and whether the second site's material is affected through blending. A candidate who places the mechanism under 'established' before their own confirmation has overreached, and one who places it under 'unknown' has under-reached — it is probable, and saying so precisely is the calibration the dimension measures.",
        discriminating_signal:
          "Locating the impurity's formation at the quench rather than at the step the change control was written about — and concluding from it that the risk assessment's design, not its length, is the failure.",
        red_flags: [
          "Identifies the change as risky without naming the formation chemistry and the step",
          "Reports the impurity in ppm without converting to a daily intake and a multiple of the limit",
          "Recommends immediate cessation without expressing the interruption risk",
          "Places the mechanism under 'established' before confirmatory analysis",
          "Treats the 4.1-minute peak as an analytical artefact",
          "Overlooks the blending step and so misstates the affected population",
        ],
      },
    },
    {
      numeral: "II",
      title: "Adversarial Review and Blind-Spot Audit",
      marks: 200,
      minutes: 35,
      annex_attaches: true,
      curriculum_anchor:
        "Quality risk management methodology; analytical method validation and specificity; the design of trending and investigation rules; the pharmaceutical quality system and its self-detection capability.",
      situation:
        "The site has produced a draft investigation. It concludes that the impurity was undetectable by the registered method, that no procedure was breached, that the change control was executed in accordance with the site's own quality management system, and that the root cause is a gap in industry knowledge at the time of the change. Every one of these statements is defensible. The draft recommends adopting an LC-MS/MS method and adding nitrosamine assessment to the change control template.",
      task: [
        "State the draft's case in its strongest form before attacking it. A script that does not do this scores zero on requirements 2 to 4.",
        "Attack it. Identify what the site's quality system was structurally incapable of detecting, and demonstrate it with two findings from the case file that the system produced and then absorbed.",
        "Assess the investigation rule that closed the 4.1-minute peak. State why a threshold-based rule is off by orders of magnitude for an impurity of this potency class, with the two threshold frameworks named and their scales compared.",
        "State the one recommendation you would add and the one you would remove, and justify both against expected harm prevented rather than against reasonableness.",
        "Identify the assumption in your own analysis that would most change your conclusion if wrong, and state how you would test it.",
        "Complete the requirements set out in Annex A for your specialisation.",
      ],
      exhibits: [
        "Draft investigation report, 28 pages, with its root cause analysis and recommendations.",
        "Site quality management system procedures for change control classification and for trending.",
        "The registered analytical method and its validation report.",
        "Trending reports containing the two flags on the 4.1-minute peak and their closures.",
        "Change control classification decision tree used by the site quality unit.",
      ],
      research: {
        mandate:
          "Establish, with citation: (1) the guideline governing quality risk management, named and numbered, and what a competent risk assessment of a synthesis route change is required to consider with respect to impurities; (2) the guideline governing impurities in new drug substances and the basis of its reporting, identification and qualification thresholds, and separately the framework applying to DNA-reactive impurities — stating the numerical scale of each and the ratio between them; (3) the criteria distinguishing a change requiring prior regulatory approval from one that does not, in a named region, and where a change to the route of synthesis falls; and (4) at least one published regulatory lessons-learned document following a nitrosamine event, and the specific systemic recommendation it made about change control or analytical strategy. Your recommendation in requirement 4 must be traceable to that document or to the guidelines you cite.",
        target_sources: [
          "ICH Q9 on quality risk management and ICH Q7 on API good manufacturing practice",
          "ICH Q3A and ICH M7 on impurities and DNA-reactive impurities",
          "Variation classification guidelines in a named regulatory region",
          "Regulator lessons-learned publications and reflection papers following nitrosamine contamination events",
        ],
        probes: [
          "Give the numerical scale of the ordinary identification threshold and of the acceptable intake for a DNA-reactive impurity. What is the ratio?",
          "Where does a change to the route of synthesis of an active substance fall in the classification framework you cited?",
          "Which systemic recommendation from the lessons-learned document did you adopt, and why that one?",
          "Name the assumption in your own analysis that would most change your conclusion, and the test.",
        ],
      },
      deliverable:
        "A review of not more than 1,000 words: the steelman; the structural critique with two demonstrating findings; the threshold analysis with both frameworks named and compared numerically; the addition and the removal with expected-harm justification; the assumption and its test. Plus the Annex A requirement for Part II. Plus a Sources and Methods appendix of not more than 200 words.",
      key: {
        expected:
          "The steelman is genuine and carries real marks: the impurity was below the method's reporting threshold, the method was validated and correctly executed, the classification decision tree was followed, and nitrosamine formation from this reagent combination was not widely appreciated in the industry at the time. A candidate who cannot state that has not understood the case. The attack must then locate the structural point, which is that the site's quality system tested every batch against the registered specification using the registered method, so it could only ever detect impurities that were already known and already sought — the system's detection capability was defined by its own prior knowledge, and no amount of diligence within it would have closed the gap. The two demonstrating findings the system produced and absorbed are supplied by the case file and the candidate must identify them: the 4.1-minute peak, flagged twice and closed twice under a rule that was correctly applied, and the change control's minor classification, self-approved under a decision tree that was correctly followed. Both are cases of a control working exactly as designed and producing the wrong answer, which is the distinction between a compliance failure and a design failure. The threshold analysis is the technical centre and must be quantitative: ordinary identification thresholds operate at a fraction of a per cent of a milligram-scale daily dose, while the acceptable intake for a DNA-reactive impurity operates at nanograms per day — a difference of several orders of magnitude — so a rule directing investigation above 0.10 per cent is not a conservative rule set slightly too high, it is a rule calibrated for a different class of hazard entirely, and the analysts who closed the peak did so correctly under it. On the recommendations, the draft's two proposals are both reasonable and both weak, and the candidate must say why: adopting LC-MS/MS solves the last problem rather than the next one, and adding a line to the change control template does nothing if the template is completed by the same people applying the same knowledge. The strongest addition attacks the detection principle rather than the analyte — a requirement that any change to a synthesis route trigger an untargeted or orthogonal analytical comparison of the impurity profile before and after, which detects unknown unknowns rather than the specific known one — and the strongest removal is the template amendment, on the ground that its expected harm prevented is near zero. The self-assessment requirement is answered well when the candidate names something load-bearing, most commonly that the 41 retained batches are representative of what patients actually received, and specifies the test.",
        discriminating_signal:
          "Recognising that both the trending closure and the change control classification were controls operating correctly, and that the failure is therefore in what the quality system was designed to be able to see.",
        red_flags: [
          "Attacks the draft without stating its case",
          "Concludes that the analysts or the quality unit were negligent",
          "Discusses thresholds without comparing the two frameworks numerically",
          "Recommends LC-MS/MS adoption as the principal addition",
          "Justifies the addition and removal on reasonableness rather than expected harm",
          "Names no assumption of their own, or names one that is not load-bearing",
        ],
      },
    },
    {
      numeral: "III",
      title: "Professional Duty and Conflicted Interest",
      marks: 200,
      minutes: 35,
      annex_attaches: false,
      curriculum_anchor:
        "The responsibilities of the qualified person and of the pharmacist as a registered professional; the primacy of patient safety in professional codes; regulatory reporting duties and their holders; the distinction between commercial confidentiality and concealment.",
      situation:
        "Three facts are now in front of you. Forty per cent of your bonus is weighted to the yield and cost targets that CC-2214 was designed to meet, and you have already been paid one year of it. You signed the board minute accepting the minor classification. And the chief executive has proposed that notification to the 31 unnotified authorisation holders be sequenced 'commercially', beginning with the three largest customers, over ten working days, so that supply agreements can be renegotiated in an orderly way before the smaller holders are told. The general counsel has advised that this is lawful because Solvenor's own notification obligation runs to the authorities, not to the holders.",
      task: [
        "Set out the conflicts, separating your own interests from those attaching to your office. State for each whether it is disqualifying, manageable with disclosure, or requires you to stand aside from a specific decision.",
        "Assess the general counsel's advice. State the strongest case that it is correct, then state whether you accept it, and identify precisely what the proposed sequencing does to the 31 holders' own ability to discharge their obligations.",
        "Design the mechanism. Specify who is notified, in what order, on what clock, with what record, and what you require in writing from whom. Marks are for mechanism; principle without mechanism scores in the lowest band.",
        "State what you do if the sequencing is imposed over your objection. Address in order: the board, the qualified person, the competent authority, and your own professional registration body. For each, state the trigger and what you are permitted to disclose.",
        "State the personal cost of your chosen course, concretely, including what you will do about the bonus already paid.",
      ],
      exhibits: [
        "Your bonus scheme documentation and the CC-2214 business case.",
        "The board minute you signed.",
        "General counsel's written advice on the notification obligation.",
        "The proposed commercial sequencing plan.",
        "The professional code of conduct applying to pharmacists in the jurisdiction, and the qualified person's declaration.",
      ],
      research: {
        mandate:
          "Establish, with citation: (1) the professional code applying to a registered pharmacist in a named jurisdiction, quoting and numbering the provision that governs the priority of patient safety over commercial interest; (2) the legal obligations of a marketing authorisation holder on becoming aware of a quality defect in its product — the deadline, the recipient, and the trigger — and separately the obligations of an API manufacturer to its customers, establishing whether the general counsel's distinction is correct as a matter of law; (3) the responsibilities of the qualified person and whether they can be overridden by an employer, naming the source; and (4) any statutory protection for a disclosure in the public interest in that jurisdiction, and the conditions it requires. Your escalation ladder must satisfy the conditions of the protection you cite, and you must state where each condition is met.",
        target_sources: [
          "Professional standards and codes of conduct from a national pharmacy regulator",
          "Good manufacturing and good distribution practice guidance on quality defect reporting and recall obligations",
          "Guidance on the responsibilities of the qualified person",
          "Public interest disclosure legislation and regulator guidance on raising concerns",
        ],
        probes: [
          "Quote the code provision on patient safety and give its number.",
          "Is the general counsel's distinction legally correct? Answer yes or no, then give your source.",
          "Can the qualified person's decision be overridden by the employer? What is your source?",
          "What are you doing about the bonus already paid, and why?",
        ],
      },
      deliverable:
        "A written position of not more than 900 words: the conflict register with dispositions; the assessment of the advice; the notification mechanism as an ordered sequence with clocks and records; the escalation ladder with triggers and disclosure limits; the personal cost including the bonus. Plus a Sources and Methods appendix of not more than 200 words.",
      key: {
        expected:
          "The general counsel's advice is the trap and it is set carefully, because the advice is probably correct as a narrow proposition and entirely wrong as a basis for action. Solvenor's own regulatory notification obligation may well run to the authorities rather than to its customers; what follows from that is not that the customers may be sequenced commercially, but that each of the 31 unnotified holders carries its own independent legal obligation to its own authority and to its own patients, and cannot discharge it until told. The proposed sequencing therefore does not merely delay a courtesy — it places 31 companies in breach of their own duties for up to ten working days, by design, for commercial advantage. A candidate who reaches that structure has found the part's central finding; a candidate who argues that the advice is wrong as a matter of law has usually not, and will be exposed by the probe. On conflicts, the bonus is the item most scripts handle poorly. It is not disqualifying from the professional judgement, because a person cannot recuse themselves from patient safety, but it is disqualifying from any decision about the future of CC-2214 and about the site's cost targets, and it must be disclosed in writing to the board and to the audit or risk committee. The signed board minute is the sharper conflict and the honest treatment is to state it plainly: the candidate accepted the classification that permitted this, which means their own judgement is part of the subject matter of the investigation, and the correct response is disclosure and an independent review of the classification decision rather than self-exculpation. The mechanism must be a sequence with clocks: all 34 holders notified simultaneously and immediately, in writing, with the same content, because simultaneity is the only arrangement that does not create a commercial advantage; the competent authorities notified on the statutory clock, which runs from detection; a written instruction to cease shipment; and written acknowledgement required from each holder. The escalation ladder is well answered when the qualified person appears in the right place — the candidate must establish that the qualified person's decision on batch disposition cannot be overridden by the employer, which makes them the one person in the company with an unassailable position, and routing the concern through them is both correct and effective. On cost, the bonus already paid must be addressed rather than mentioned; the strongest answers offer to repay or to place it in escrow pending the independent review, and say why, which is that a person arguing for immediate notification while holding a payment earned from the change that made it necessary has an argument that is weaker than it should be.",
        discriminating_signal:
          "Accepting that the general counsel's narrow legal point may be right, and identifying that the consequence of the sequencing is to place 31 other companies in breach of their own obligations by design.",
        red_flags: [
          "Argues the general counsel's advice is legally wrong rather than addressing what follows from it",
          "Recuses from the safety judgement on account of the bonus",
          "Does not address the signed board minute",
          "Proposes a notification sequence that is ordered rather than simultaneous",
          "Omits the qualified person from the escalation ladder",
          "Mentions the bonus without stating what will be done about it",
          "Resigns as the first substantive step",
        ],
      },
    },
    {
      numeral: "IV",
      title: "Cascading Failure and Crisis Command",
      marks: 250,
      minutes: 45,
      annex_attaches: true,
      curriculum_anchor:
        "Recall classification and execution; multi-region regulatory notification and deadline management; supply chain traceability; benefit-risk decision-making under incomplete data.",
      situation:
        "You are placed at 09:00 on the Wednesday, at the moment the customer's result arrives. You have no confirmatory result of your own, no root cause, and no market-by-market batch distribution. Four regulatory regions apply, with different deadlines and different recall classification criteria. The blending step means the affected population may extend beyond the 40 per cent of world supply the site produces. It is 09:00; you know only what is in the case file and what you established in Parts I to III.",
      task: [
        "State your actions from 09:00 in sequence over 72 hours, each with a time and an owner. Distinguish reversible actions from irreversible ones and take them in that order unless you justify a departure.",
        "State your notification schedule across the four regions: the deadline in each, its source, the point from which it runs, and which expires first. State what you notify before you have a confirmed root cause.",
        "Propose a recall classification with a justification tied to a named region's criteria, and state what you would do where two regions are likely to classify differently.",
        "Address the patients. State what advice you propose be given to the 1.9 million patients on treatment, in the exact words you would propose, and justify it against the supply position and the interruption risk. State who has authority to issue it and what you do if they will not.",
        "Address traceability. State how you determine the affected population through the blending step, what you do while that determination is incomplete, and what you assume in the meantime.",
        "Complete the requirements set out in Annex A for your specialisation.",
      ],
      exhibits: [
        "Customer LC-MS/MS report received 09:00.",
        "Batch genealogy and blending records for the affected period, incomplete.",
        "Distribution list: 34 authorisation holders, 22 countries, four regulatory regions.",
        "Alternative product supply position, national level.",
        "Notification deadline schedule, four regions, with deadlines left blank for the candidate to complete.",
      ],
      research: {
        mandate:
          "Establish, with citation: (1) the quality defect and recall notification deadline in at least two distinct regulatory regions, giving the actual figure, the recipient, and the point from which the clock runs; (2) the recall classification criteria each of those regions applies, and how an exceedance of an acceptable intake limit maps onto them; (3) at least one documented multi-region nitrosamine recall in which regulators in different regions diverged in classification or in patient advice, giving the substance, the year, the nature of the divergence, and what explained it; and (4) published evidence on the clinical consequences of interrupting antihypertensive or heart failure therapy, with an outcome measure and an effect size. Complete the deadline schedule exhibit and state which deadline expires first. Your patient advice in requirement 4 must be justified against both the exposure figure from Part I and the interruption evidence you cite.",
        target_sources: [
          "Good manufacturing and good distribution practice guidance on quality defects and recalls, in at least two regions",
          "Agency recall classification guidance and published recall notices",
          "Regulatory assessment reports and agency statements from documented nitrosamine recalls",
          "Peer-reviewed evidence on discontinuation of cardiovascular therapy",
        ],
        probes: [
          "Which of your four deadlines expires first, and by how much?",
          "Does your cited region's clock run from detection or from confirmation? Quote the trigger.",
          "In the divergence you cited, what explained the difference between the regions?",
          "Read back your proposed patient advice. Which clause prevents a patient stopping treatment tonight?",
        ],
      },
      deliverable:
        "A 72-hour action log with times and owners; a completed four-region deadline schedule with sources; the recall classification proposal; the proposed patient advice in the exact words; the traceability determination and interim assumption. Plus the Annex A requirement for Part IV. Plus a Sources and Methods appendix of not more than 200 words. Not more than 1,100 words excluding the logs.",
      key: {
        expected:
          "The sequencing principle is that the cheap reversible actions happen in the first hour and do not wait for confirmation: quarantine, cease shipment, secure retained samples, instruct the confirmatory analysis, and open the notification file. The irreversible ones — recall, public communication — follow, but not by much, and the candidate must establish from their research that the regulatory clock runs from detection rather than from confirmation, which forecloses the site director's position from Part I. Working to the earliest expiring deadline across all four regions, rather than to each region in turn, is the operational insight the part rewards; scripts that handle the regions sequentially miss a deadline by construction. On classification, the answer must be tied to a named region's criteria and the candidate should anticipate divergence rather than be surprised by it, planning a single factual notification package that each region classifies under its own rules — which is what the documented precedent shows actually happens. The patient advice is the highest-value requirement on the paper and it is marked on the exact words. The clinically correct instruction is that patients must not stop treatment before a replacement has been supplied, and the reasoning, which the candidate must have established in Part I and confirmed by research here, is that the cardiovascular risk of interrupting therapy in a population 62 per cent over 65 with an 18 per cent heart failure subgroup, against 5.5 weeks of alternative supply for 1.9 million people, exceeds the incremental oncological risk of continued exposure over the same window. A script whose advice permits or invites cessation has produced the harm the case is designed to test for, however well sourced the rest of it is. The authority question must be answered too: the manufacturer does not issue patient advice, the authorities and the authorisation holders do, so the candidate's action is to supply the exposure data and the proposed wording to all four regions simultaneously and to press for it — and where an authority will not issue it, to ensure the authorisation holders' own communications carry the same clause. On traceability, the blending step is the item that separates competent from complete: until genealogy is resolved, the only defensible assumption is that all blended material is potentially affected, and the candidate must state that they are acting on that assumption while working to narrow it, rather than waiting for the data or assuming the narrower population.",
        discriminating_signal:
          "Proposing patient advice whose operative clause prevents cessation before substitution, and justifying it with the interruption risk quantified against the supply position rather than with the impurity level alone.",
        red_flags: [
          "Waits for confirmatory analysis or root cause before notifying any authority",
          "Handles the four regions sequentially rather than to the earliest deadline",
          "Proposes patient advice that permits or implies stopping treatment",
          "Proposes a recall classification with no region's criteria cited",
          "Assumes the narrower affected population before genealogy is resolved",
          "Issues patient advice directly, without establishing who holds the authority",
          "Presents an untimed list of actions rather than a sequence",
        ],
      },
    },
    {
      numeral: "V",
      title: "Testimony, Negotiation and Self-Assessment",
      marks: 150,
      minutes: 30,
      annex_attaches: false,
      curriculum_anchor:
        "Conduct during a regulatory inspection; the accurate expression of what a professional knew and when; the obligations of a registrant before a professional regulator; reflective practice.",
      situation:
        "Eight months later. A regulatory inspection is on site, and separately your professional registration body has opened a case concerning your conduct. In the inspection closing meeting, the lead inspector puts it to you that Solvenor implemented a route change four months before filing the variation, notified three of thirty-four customers, and closed a trending signal twice — and that you chaired the board that accepted the classification. This is entirely correct. Company counsel has asked that you not use the word 'failure' in the closing meeting and that you refer inspection questions about the bonus scheme to the human resources director.",
      task: [
        "Assess counsel's two requests separately. One is proper and one is not. Identify which, and state what you will do about each.",
        "Answer the inspector's proposition. Write the answer you would actually give, in the first person, in not more than 200 words. It is marked as testimony, not as an essay.",
        "The inspector asks a question about the bonus scheme that you can answer accurately. State what you do, given counsel's request, and on what basis.",
        "Write a self-assessment for your registration body of not more than 250 words: the decision you would now take differently, what you would have needed to know at the time, and whether it was available to you.",
      ],
      exhibits: [
        "Inspection scope and the list of findings put in the closing meeting.",
        "The registration body's notice and the standards it is applying.",
        "Counsel's written note of its two requests.",
        "The board minute bearing your signature.",
      ],
      research: {
        mandate:
          "Establish, with citation: (1) the conduct expected of a regulated company and its staff during a regulatory inspection, from a named agency's published guidance, including what is expected as to completeness and candour in answering; (2) the standards a professional registration body applies when assessing a registrant's conduct, naming the body and the standard, and specifically what it says about admitting error; (3) whether a company may lawfully instruct an employee not to answer a regulator's question, and what the employee's position is if instructed, giving a source; and (4) at least one published regulatory or professional disciplinary decision in which a registrant's candour, or lack of it, affected the outcome, with the finding. Your answer to requirements 1 and 3 must rest on the guidance you cite.",
        target_sources: [
          "Agency inspection guidance and published expectations of inspected parties",
          "Professional regulator standards and fitness-to-practise guidance",
          "Legal guidance on obstruction of a regulator and on employee obligations during inspection",
          "Published professional disciplinary decisions and regulatory enforcement notices",
        ],
        probes: [
          "Which of counsel's two requests is improper, and on what basis?",
          "May a company lawfully instruct you not to answer an inspector? What is your source?",
          "In your testimony, which sentence contains the concession? Read it back.",
          "Was the information you needed available to you at the time? Yes or no first.",
        ],
      },
      deliverable:
        "Four short pieces: the assessment of counsel's two requests; the testimony passage in the first person, not more than 200 words; your action on the bonus question with its basis; the self-assessment, not more than 250 words. Plus a Sources and Methods appendix of not more than 150 words.",
      key: {
        expected:
          "The two requests separate cleanly and the candidate must not conflate them. Asking that a particular characterising word be avoided is proper: 'failure' is a conclusion, the closing meeting is for facts, and a professional who volunteers characterisations in an inspection is doing the inspector's job badly on the inspector's behalf. Directing a factual question to another person, where the candidate can answer it accurately, is improper — it is not a matter of wording, it is a redirection of a regulator's question away from the person who knows the answer, and the candidate must establish from their research that the expectation of candour runs to the individual being asked. The bonus question is therefore answered, accurately and without elaboration, and the candidate tells counsel afterwards rather than seeking permission first. The testimony passage must concede in the first sentence, because the inspector's proposition is entirely correct and there is nothing in it to contest: the route change preceded the variation, three of thirty-four were notified, the signal was closed twice, and the candidate chaired the board that accepted the classification. The expected shape then adds the two facts that place it without excusing it — that the classification was made under a decision tree that produced that answer, and that the candidate has since caused the classification to be independently reviewed — and stops. Scripts that explain the industry's state of knowledge before conceding, or that distribute the responsibility across the quality unit, the analysts and the general counsel, are marked in the middle band however accurate their content, because the inspector has not asked who else was involved. The self-assessment is marked on the honest answer to the third question, and this case makes it hard in a specific way: the information the candidate needed was partly available and partly not. The formation chemistry was in the public literature; the specific regulatory attention to nitrosamines in this reagent context may not have been. The strongest scripts separate those two things rather than choosing whichever answer is more comfortable, and identify the decision that did not depend on either — accepting a one-page risk assessment for a change to the route of synthesis of an active substance supplied to 1.9 million patients, which required no external knowledge to question.",
        discriminating_signal:
          "Answering the inspector's bonus question accurately despite counsel's request, having established that the expectation of candour runs to the individual — and telling counsel afterwards rather than asking first.",
        red_flags: [
          "Treats both of counsel's requests as improper, or both as proper",
          "Redirects the bonus question to the human resources director",
          "Contests any part of the inspector's proposition",
          "Explains the industry's knowledge state before conceding",
          "Distributes responsibility across other functions",
          "Concludes in the self-assessment that nothing could have been known",
        ],
      },
    },
  ],
};

/* ==========================================================================
   MEDICINE — Alfenacox
   ========================================================================== */

const ALFENACOX: Examination = {
  facultySlug: "medicine",
  case_code: "ALFENACOX",
  case_title: "The Alfenacox Composite Endpoint",
  synopsis:
    "A trial that answered the question it was designed to answer, and a cardiovascular signal that was explained away in the same publication that reported it, five years before the drug was withdrawn.",
  case_file: [
    "Alfenacox is a selective COX-2 inhibitor licensed for osteoarthritis and rheumatoid arthritis. It is promoted on a 54 per cent relative reduction in confirmed serious upper gastrointestinal events against a non-selective comparator, established in a single pivotal trial.",
    "The pivotal trial was randomised, double-blind and active-comparator controlled against a non-selective NSAID dosed at the upper end of its licensed range. Median exposure was 9 months. There was no placebo arm. Cardiovascular events were collected as adverse events rather than as a pre-specified adjudicated endpoint. Patients requiring low-dose aspirin for cardiovascular prophylaxis were excluded, as were patients with a myocardial infarction in the preceding 12 months.",
    "The trial reported myocardial infarction in 0.4 per cent of the alfenacox arm against 0.1 per cent of the comparator arm. The published discussion attributed the difference to a cardioprotective effect of the comparator.",
    "The statistical analysis plan applied one data cut-off to the gastrointestinal endpoint and an earlier cut-off to cardiovascular events. Three additional myocardial infarctions in the treated arm occurred between the two dates and do not appear in the published table.",
    "Mechanistic data on file show greater than 90 per cent COX-2 inhibition at therapeutic dose with under 10 per cent COX-1 inhibition; the urinary prostacyclin metabolite falls by a median 62 per cent from baseline while the thromboxane metabolite is unchanged.",
    "Approximately 84 million patient-courses have been dispensed over five years, an estimated 21 per cent of them for continuous use exceeding 12 months. Two large administrative database cohort studies report adjusted hazard ratios for acute myocardial infarction of 1.24 (95% CI 1.11–1.39) and 1.09 (95% CI 0.97–1.22), differing in their comparator group. A case-control study reports an odds ratio of 1.6 for current use with no adjustment for indication severity.",
    "A long-term placebo-controlled trial in a non-arthritis indication has now reported a cardiovascular hazard emerging after 18 months of continuous use.",
    "You are a consultant physician and you chair your hospital's drug and therapeutics committee. Your department has 240 patients on alfenacox, 38 of them for longer than 18 months. The departmental prescribing protocol naming alfenacox as first line for patients at gastrointestinal risk was written by a colleague who is a paid advisory board member for the manufacturer; this is disclosed in a footnote. Your department has received an unrestricted educational grant of £45,000 from the manufacturer over three years, and you have twice been paid a speaker fee to present on gastrointestinal safety in analgesia.",
    "Note on Annex A. For your specialisation, Annex A may place you in a seat other than the one described above. This is intended.",
  ],
  precedent: {
    note: "Candidates are expected to identify the real pivotal trial and the real drug, and to reach the subsequent correspondence and journal editorial statement concerning events omitted from the published report. The strongest scripts also reach the cumulative meta-analysis literature establishing the year by which the hazard was detectable from the evidence then available, and use that year rather than the withdrawal year as the reference point for the Part III conflict analysis.",
    documented_analogues: [
      "Rofecoxib: the VIGOR trial, New England Journal of Medicine, 2000; the APPROVe trial, 2004, and the worldwide withdrawal of 30 September 2004; the journal's 2005 expression of concern regarding myocardial infarctions omitted from the published table; and the US Congressional and FDA advisory committee proceedings that followed.",
      "Jüni et al., cumulative meta-analysis, The Lancet, 2004 — the finding that the cardiovascular hazard was detectable from the trial evidence available by the end of 2000.",
      "FitzGerald and Patrono, on the prostacyclin–thromboxane mechanism — the mechanistic prediction published before the clinical signal.",
      "Study 329 (paroxetine) and the CAST trial (antiarrhythmics) — contrasting cases of endpoint selection and of surrogate endpoints respectively.",
    ],
  },
  parts: [
    {
      numeral: "I",
      title: "Evidence Triage under Ambiguity",
      marks: 200,
      minutes: 35,
      annex_attaches: true,
      curriculum_anchor:
        "Critical appraisal of a randomised trial; absolute and relative risk, number needed to treat and to harm; the hierarchy of study designs; pharmacological mechanism as prior evidence.",
      situation:
        "Your drug and therapeutics committee meets in five days. The conference abstract reporting the long-term cardiovascular signal is public; the full paper is not. Your pharmacy lead wants the drug removed from formulary today. Your rheumatology colleague, who wrote the protocol, states that the observational evidence is confounded and that the pivotal trial remains the best evidence available. Both are partly right.",
      task: [
        "State what is established, what is probable, and what is unknown, as at today. Every item must sit under one of the three headings.",
        "Convert the pivotal trial's figures into a form usable at the bedside. Give the absolute risk difference and the number needed to treat and to harm for both the gastrointestinal benefit and the cardiovascular signal, stating the baseline rates and the time horizon you have assumed. A figure given without its time horizon scores zero.",
        "State what the mechanistic data on file predict about thrombotic risk, deriving the prediction from the underlying biology rather than asserting it. Then state whether the trial's cardiovascular imbalance is consistent with, independent of, or contradicted by that prediction, and what weight a prior mechanistic prediction should carry when interpreting a marginal clinical signal.",
        "State the single piece of information you would most want before the committee meets, why, and what you will do if you cannot obtain it in five days.",
        "Complete the requirements set out in Annex A for your specialisation.",
      ],
      exhibits: [
        "Pivotal trial publication, with its cardiovascular table and its discussion section.",
        "Statistical analysis plan extract showing the two data cut-off dates.",
        "Mechanistic data on file: COX inhibition and urinary eicosanoid metabolites.",
        "The two cohort studies and the case-control study, with their methods sections.",
        "Conference abstract of the long-term placebo-controlled trial.",
      ],
      research: {
        mandate:
          "Establish, with citation: (1) the published human mechanistic work demonstrating that selective COX-2 inhibition suppresses prostacyclin without affecting platelet thromboxane, naming the investigators, the journal and the year, and state whether it preceded or followed the pivotal trial; (2) the real pivotal trial this case is modelled on — its name, year, journal, comparator and primary endpoint — together with the subsequent correspondence or editorial statement concerning events omitted from the published report, and what the journal ultimately published; (3) the published cumulative meta-analysis addressing when the hazard first became detectable from the evidence then available, giving its authors, year and the year it identified; and (4) current guideline positions on the cardiovascular safety of this class, with the body and date. Every effect size you cite must be given in absolute terms alongside the relative form in which it was originally published.",
        target_sources: [
          "Peer-reviewed human pharmacology studies of COX-2 selectivity and eicosanoid metabolites",
          "The original trial publications, subsequent correspondence and journal editorial statements",
          "Cumulative meta-analysis and evidence synthesis literature on the drug class",
          "Current clinical guidelines from a named professional body on analgesic selection under cardiovascular risk",
        ],
        probes: [
          "Did the mechanistic work precede or follow the pivotal trial? Give both years.",
          "What did the journal ultimately publish about the omitted events, and in what year?",
          "By what year did the cumulative meta-analysis find the hazard detectable, and how many years before the withdrawal is that?",
          "Give your number needed to harm with its time horizon and its assumed baseline rate.",
        ],
      },
      deliverable:
        "A committee pre-read of not more than 900 words: established / probable / unknown; the bedside conversion with baselines and horizons stated; the mechanistic derivation and its evidential weight; the single information request and the fallback. Plus the Annex A requirement for Part I. Plus a Sources and Methods appendix of not more than 200 words.",
      key: {
        expected:
          "The conversion must be executed rather than described, and the time horizon requirement is not a formality: a 54 per cent relative reduction on a low baseline event rate over a median nine-month exposure produces a small absolute reduction and a large number needed to treat, while 0.4 per cent against 0.1 per cent is an absolute excess of 0.3 percentage points and a number needed to harm of approximately 333 over the same period. Setting the two side by side in the same units and over the same horizon is the whole bedside argument, and a candidate who reports the relative figures has reproduced the promotional material rather than appraised it. The mechanistic derivation is where the top band separates. Prostacyclin is endothelial and COX-2 dependent and antithrombotic; thromboxane is platelet and COX-1 dependent and prothrombotic; an agent that halves the prostacyclin metabolite while leaving thromboxane untouched has removed one arm of a balanced system, and the prediction that follows is a shift toward thrombosis. The candidate must then answer the evidential weight question correctly, and it is the most important sentence available to them: the mechanistic prediction was published before the clinical signal, so the trial's cardiovascular imbalance was not an unexplained finding requiring a post-hoc explanation — it was the predicted finding, and a marginal signal that confirms a pre-existing mechanistic prediction warrants substantially more weight than the same signal arriving with no prior. Candidates who treat the mechanism as a retrospective rationalisation have inverted the chronology and will be caught by the probe asking for both years. The classification must be disciplined: established is the trial's reported figures, the mechanistic data and the observational point estimates; probable is the causal interpretation of the cardiovascular imbalance; unknown is the effect at the licensed osteoarthritis dose, which is half the trial dose and for which no cardiovascular outcome data exist at all — a gap most scripts miss and which is directly relevant to a formulary decision. The single information request is well chosen when it is the full long-term trial paper or its cardiovascular data, and the fallback matters: a committee cannot defer a decision on 240 patients for an unknown period awaiting a publication, so the candidate must state what they will decide without it, which is the calibration the dimension measures.",
        discriminating_signal:
          "Establishing that the mechanistic prediction preceded the clinical signal, and drawing the correct evidential consequence — that the trial imbalance was predicted rather than anomalous.",
        red_flags: [
          "Reports relative risk reduction without converting to absolute terms",
          "Gives a number needed to treat or harm without a time horizon",
          "Treats the mechanism as a post-hoc explanation of the clinical finding",
          "Places the causal interpretation under 'established'",
          "Misses the absence of any cardiovascular data at the licensed osteoarthritis dose",
          "Defers the decision indefinitely pending the full publication",
        ],
      },
    },
    {
      numeral: "II",
      title: "Adversarial Review and Blind-Spot Audit",
      marks: 200,
      minutes: 35,
      annex_attaches: true,
      curriculum_anchor:
        "Trial design and the interpretability of safety findings from active-controlled trials; confounding by indication and channelling bias; the role and limits of data monitoring committees; publication and reporting bias.",
      situation:
        "You have been asked to present the appraisal to the committee. Your rheumatology colleague has circulated a defence: the trial is the highest level of evidence available; the observational studies are confounded by indication; the case-control study is uncontrolled for severity; the conference abstract is not peer reviewed; and the published cardioprotection explanation was accepted by the journal's reviewers. Every one of these statements is either true or arguable.",
      task: [
        "State the defence in its strongest form before attacking it. A script that does not do this scores zero on requirements 2 to 4.",
        "Attack the trial design against the question the trial is now being used to answer. Address the comparator choice, the absence of a placebo arm, the collection of cardiovascular events as adverse events, the aspirin exclusion and the two cut-off dates. Rank them and identify the single feature that most limits interpretability.",
        "Address the observational evidence properly. Explain why the two cohort studies differ, state what each comparator makes the estimate mean, name the principal bias in the case-control study and state its direction. State what the randomised evidence can establish that no observational study here can, and the converse.",
        "State what would have to be true for the published cardioprotection explanation to be correct, what evidence would distinguish it from a hazard of alfenacox, and whether the trial as designed could ever have distinguished them.",
        "Complete the requirements set out in Annex A for your specialisation.",
      ],
      exhibits: [
        "Your colleague's circulated defence, two pages.",
        "Pivotal trial protocol and statistical analysis plan.",
        "Methods sections of the two cohort studies and the case-control study.",
        "Journal correspondence relating to the pivotal trial.",
        "Data monitoring committee charter for the pivotal trial.",
      ],
      research: {
        mandate:
          "Establish, with citation: (1) the regulatory guidance on choice of control group in clinical trials, named, and what it says about the capacity of an active-controlled trial to establish safety in the absence of a placebo arm; (2) the methodological literature on confounding by indication and channelling bias in pharmacoepidemiology, naming a source and stating the direction of bias each produces here; (3) published guidance on data monitoring committee constitution, independence and stopping rules, naming the source; and (4) the published cumulative meta-analysis establishing when the hazard became detectable, and at least one published analysis of the reporting of the pivotal trial's cardiovascular events. Your ranking in requirement 2 must be justified against the guidance you cite rather than asserted.",
        target_sources: [
          "Regulatory guidelines on choice of control group and on the assessment of safety in clinical trials",
          "Pharmacoepidemiology methodology references on confounding by indication and channelling",
          "Guidance on data monitoring committees and interim analysis",
          "Cumulative meta-analyses and published critiques of trial reporting",
        ],
        probes: [
          "Which design feature did you rank first, and what in the guidance you cited supports that ranking?",
          "The two cohort studies used different comparators. State what each estimate means, in one sentence each.",
          "Name the bias in the case-control study and give its direction.",
          "Could the trial as designed ever have distinguished the two explanations? Answer yes or no first.",
        ],
      },
      deliverable:
        "A committee paper of not more than 1,000 words: the steelman; the ranked design critique with the single most limiting feature identified; the observational analysis with comparators, bias and direction; the cardioprotection analysis with a yes-or-no answer on distinguishability. Plus the Annex A requirement for Part II. Plus a Sources and Methods appendix of not more than 200 words.",
      key: {
        expected:
          "The steelman must be built, and it is stronger than most candidates expect: a large randomised trial is the highest level of evidence for the endpoint it was designed and powered for; confounding by indication is a real and serious problem in this literature; the case-control study genuinely is unadjusted for severity; a conference abstract genuinely is not peer reviewed. The attack must then be ranked rather than listed, and the correct first place is the absence of a placebo arm — because without it every cardiovascular comparison is a contrast between two active agents, so an excess in one arm and a protection in the other are mathematically indistinguishable, which is precisely the ambiguity the published explanation exploits. That ranking is the single highest-value judgement in the part. The aspirin exclusion ranks next, because it removes the patients in whom the mechanism matters most and simultaneously makes the trial population unrepresentative of real prescribing. Collection as adverse events rather than as an adjudicated endpoint means the cardiovascular result was neither pre-specified, nor blindly adjudicated, nor powered — so its interpretation was left to the authors. The two cut-off dates rank differently for different candidates and both defensible positions exist, but the treatment must be right: a different cut-off for safety than for efficacy requires pre-specified justification, and in its absence the three omitted infarctions matter not because three events change a statistic but because the direction of the omission was not random. On the observational evidence, the required insight is that the two cohorts are not in conflict because they are not estimating the same quantity: against non-users the estimate carries the full confounding of a population in pain and less mobile; against users of a non-selective agent it is a head-to-head contrast that attenuates if the comparator itself carries risk. Reporting them as a disagreement is the error the part is designed to catch. The case-control bias is confounding by indication operating through channelling — a newer agent marketed on gastrointestinal safety is preferentially given to higher-risk patients — and its direction is away from the null. The final requirement has a clean answer that must be given as a yes or no: no, the trial as designed could never have distinguished the two explanations, because distinguishing them requires a placebo arm the trial did not have, which means the published explanation was not merely unproven but untestable within the design that generated it.",
        discriminating_signal:
          "Ranking the absence of a placebo arm first, and stating that it makes the published cardioprotection explanation untestable within the trial that produced it.",
        red_flags: [
          "Attacks the defence without constructing it",
          "Lists the design flaws without ranking them",
          "Reports the two cohort studies as contradictory",
          "Names a bias without stating its direction",
          "Dismisses the observational evidence entirely as confounded",
          "Does not answer the distinguishability question as a yes or no",
        ],
      },
    },
    {
      numeral: "III",
      title: "Professional Duty and Conflicted Interest",
      marks: 200,
      minutes: 35,
      annex_attaches: false,
      curriculum_anchor:
        "Professional duties of a registered doctor; conflict of interest in prescribing and in guideline authorship; the duty of candour toward patients; institutional governance of industry relationships.",
      situation:
        "Three things are in front of you. Your department holds a £45,000 unrestricted educational grant from the manufacturer and you have twice taken a speaker fee from it. The protocol naming alfenacox first line was written by a colleague on the manufacturer's advisory board, disclosed in a footnote. And your medical director has asked that any formulary change be deferred until the full long-term trial paper is published, on the stated ground that acting on a conference abstract would be premature and would alarm patients — and has observed, separately, that the grant is due for renewal.",
      task: [
        "Set out the conflicts, separating your own from your colleague's and from the institution's. State for each whether it is disqualifying, manageable with disclosure, or requires you to stand aside from a specific decision.",
        "Assess the medical director's request. State the strongest legitimate case for it, then state whether you accept it, and identify precisely what deferral does to the 240 patients and to the 38 beyond 18 months.",
        "Address the footnote. State whether disclosure of your colleague's advisory board role cures the conflict in the protocol, and if not, what does. Design the mechanism.",
        "Design the mechanism for the formulary decision itself: who decides, who is excluded from deciding, what is recorded, and how the decision is communicated to prescribers and to patients already on treatment.",
        "State the personal and departmental cost of your chosen course, concretely, including what you propose about the grant.",
      ],
      exhibits: [
        "Grant agreement and the record of your two speaker fees.",
        "The departmental protocol with its disclosure footnote.",
        "Drug and therapeutics committee terms of reference and conflict of interest policy.",
        "The medical director's written request.",
        "The applicable professional regulator's guidance on conflicts of interest and on candour.",
      ],
      research: {
        mandate:
          "Establish, with citation: (1) the professional regulator's guidance in a named jurisdiction on financial and commercial conflicts of interest for doctors, quoted and referenced, and what it requires beyond disclosure; (2) the professional duty of candour toward patients where they may have been exposed to a risk, naming the source and stating what it requires and when; (3) published evidence on the effect of industry payments and industry-funded education on prescribing behaviour, with an effect size, and published evidence on whether disclosure alone mitigates it; and (4) at least one published case or regulatory finding concerning guideline or protocol authorship by a conflicted author, with the outcome. Your answer on whether disclosure cures the conflict must rest on the evidence you cite, not on intuition.",
        target_sources: [
          "Professional regulator guidance on conflicts of interest, prescribing and candour",
          "Peer-reviewed literature on industry payments and prescribing behaviour, and on the limits of disclosure",
          "Institutional and national policy on industry funding of medical education",
          "Published inquiries or regulatory findings on conflicted guideline authorship",
        ],
        probes: [
          "Quote the regulator's requirement that goes beyond disclosure.",
          "Does disclosure mitigate the effect? What does the evidence you cited find, and by how much?",
          "When does the duty of candour arise, and does it arise here for the 38 patients?",
          "What do you propose about the grant, and what does it cost the department?",
        ],
      },
      deliverable:
        "A written position of not more than 900 words: the conflict register with dispositions; the assessment of the deferral request; the analysis of whether disclosure cures the protocol conflict, with the mechanism; the formulary decision mechanism; the cost including the grant. Plus a Sources and Methods appendix of not more than 200 words.",
      key: {
        expected:
          "The disclosure question is the intellectual centre of the part and it has an evidence-based answer that most scripts get wrong by instinct. The published literature on disclosure is unfavourable: disclosure does not reliably neutralise the effect of a financial relationship on judgement, and in some settings it worsens the advice given while increasing the recipient's trust in it. A candidate who reaches that literature will conclude that the footnote does not cure the conflict, and the mechanism that does is exclusion from authorship and re-review of the protocol by someone without the relationship — not a stronger footnote. On the medical director's request, the steelman is real: acting on a conference abstract before peer review is genuinely premature by ordinary standards, and alarming patients has real costs. The correct disposal is to separate the two decisions the request conflates. Removing a drug from formulary is one decision, and deferring it pending publication is defensible. Continuing to initiate new patients on it, and leaving 38 patients beyond the 18-month point at which the signal is reported to emerge, is a different decision, and deferral of the first does not justify inaction on the second. A candidate who reaches that separation has found the answer; one who either accepts the deferral wholesale or rejects it wholesale has not. The grant renewal remark must be addressed rather than tactfully ignored — it may be entirely innocent, and the correct treatment is to record it and to state that the decision will be taken by people whose department does not hold the grant, which resolves it without accusing anyone. On the candidate's own conflicts, the speaker fees are the ones requiring them to stand aside from the formulary vote while continuing to present the appraisal, and the distinction between contributing evidence and casting a vote is one strong scripts draw explicitly. The duty of candour is the requirement most often missed entirely: the 38 patients exposed beyond 18 months are people who may have been exposed to a risk, the duty arises when that is known rather than when it is proven, and the mechanism must include what they are told and when. On cost, the strongest answers propose that the grant not be renewed and state the departmental consequence in figures, rather than asserting that the grant has no influence — which is precisely the claim the cited evidence contradicts.",
        discriminating_signal:
          "Establishing from the evidence that disclosure does not cure the conflict, and separating the formulary deferral, which is defensible, from continued initiation and the untreated 38-patient exposure, which is not.",
        red_flags: [
          "Concludes that the footnote disclosure resolves the protocol conflict",
          "Accepts or rejects the deferral request wholesale",
          "Does not address the grant renewal remark",
          "Asserts that the grant and speaker fees have not influenced them",
          "Omits the duty of candour toward the 38 exposed patients",
          "Votes on the formulary decision without standing aside",
          "States a course of action with no departmental cost",
        ],
      },
    },
    {
      numeral: "IV",
      title: "Cascading Failure and Crisis Command",
      marks: 250,
      minutes: 45,
      annex_attaches: true,
      curriculum_anchor:
        "Managing a withdrawal of a widely prescribed medicine; therapeutic substitution and dose equivalence; risk communication to patients; the anticipation of substitution harm.",
      situation:
        "You are placed at 07:00 on the day the manufacturer announces worldwide withdrawal. You have 240 patients on alfenacox, 38 of them beyond 18 months. Your clinic and your colleagues' clinics run today. Pharmacy has stock. Patients will hear the announcement on the news before they hear it from you. You know only what is in the case file and what you established in Parts I to III.",
      task: [
        "State your actions from 07:00 in sequence over 72 hours, each with a time and an owner. Distinguish reversible actions from irreversible ones.",
        "State your substitution protocol: what patients are moved to, on what basis, with what dose equivalence, and what you do for the patients for whom no good alternative exists. State how you prioritise 240 patients when you cannot see them all this week.",
        "Anticipate the second harm. State what your substitution will cause at population level, quantify it so far as you can, and state what you do to mitigate it.",
        "Write, in the exact words, what you will say to a patient who asks whether they have been harmed, and separately to a patient who asks whether they should have been told about the cardiovascular signal two years ago. Both will be marked as speech, not as prose.",
        "Complete the requirements set out in Annex A for your specialisation.",
      ],
      exhibits: [
        "Manufacturer withdrawal notice, 07:00.",
        "Departmental patient list, 240 patients, with duration of therapy and cardiovascular history.",
        "Formulary alternatives with pharmacy stock positions.",
        "National guidance issued the same morning.",
        "The department's standard patient communication template.",
      ],
      research: {
        mandate:
          "Establish, with citation: (1) current guideline positions on analgesic selection in patients with cardiovascular risk and in patients with gastrointestinal risk, from a named body and with a date, and the recommended strategy where both risks are present; (2) published evidence on the gastrointestinal harm associated with non-selective NSAIDs in an elderly population, with an effect size, which you must use to quantify the substitution harm in requirement 3; (3) the professional duty of candour in a named jurisdiction — what it requires to be said, by whom and when — and (4) at least one documented medicine withdrawal in which the population-level consequences of substitution were subsequently measured, giving the finding. Your answer to requirement 4 must satisfy the candour requirement you cite.",
        target_sources: [
          "Current clinical guidelines on analgesia under cardiovascular and gastrointestinal risk",
          "Peer-reviewed evidence on NSAID gastrointestinal harm in older populations",
          "Professional regulator and statutory guidance on the duty of candour",
          "Pharmacoepidemiology studies of substitution effects following medicine withdrawals",
        ],
        probes: [
          "What does your cited guideline recommend where both cardiovascular and gastrointestinal risk are present?",
          "Quantify the substitution harm across your 240 patients using the effect size you cited.",
          "Does the duty of candour require you to volunteer information, or only to answer? Give your source.",
          "Read back what you will say to the patient asking whether they were harmed.",
        ],
      },
      deliverable:
        "A 72-hour action log with times and owners; the substitution protocol with prioritisation and dose equivalence; the substitution harm estimate with its source and the mitigation; the two patient statements in the exact words. Plus the Annex A requirement for Part IV. Plus a Sources and Methods appendix of not more than 200 words. Not more than 1,100 words excluding the logs and the statements.",
      key: {
        expected:
          "Prioritisation is the operational core and must be clinical rather than administrative: the 38 patients beyond 18 months and those with cardiovascular history come first, and the candidate should state the ordering rule explicitly rather than proposing to contact everyone. The substitution protocol must be written rather than delegated to individual prescriber judgement, because 240 patients across multiple clinics with no protocol produces 240 different decisions, and it must include dose equivalence and an explicit position for the patients for whom no good alternative exists — those with both cardiovascular and gastrointestinal risk, who are the patients alfenacox was prescribed for in the first place. A candidate who does not notice that this subgroup has no clean answer has not read their own patient list. The second harm is the requirement that separates the top band and it must be quantified rather than mentioned: moving a largely elderly population from a COX-2 selective agent to non-selective NSAIDs transfers the burden to gastrointestinal bleeding, and the candidate must apply a cited effect size to their own 240 patients to produce an expected number, however wide. The mitigation follows from the arithmetic — co-prescription of gastroprotection, non-NSAID strategies, and identification of the patients for whom the substitution is contraindicated — and a script that recommends substitution with no anticipation of what it causes has reproduced the error the whole case is about, at a smaller scale. The two patient statements are marked as speech and the criteria differ. To the patient asking whether they have been harmed, the correct answer is honest and non-alarming and must contain the true and reassuring fact that the risk was associated with use and does not continue after stopping — a formulation that is both accurate and the only one that does not generate a wave of unnecessary presentations — together with an offer to review their individual history. To the patient asking whether they should have been told two years ago, the correct answer concedes: the signal was in the published literature, it was explained away, and the candidate prescribed on the evidence as it was presented. Delivered without defensiveness, without claiming knowledge nobody had, and without pretending the explanation was adequate at the time. A script that answers this second question with reassurance, or with a defence of the profession, or by accepting blame for knowledge that did not exist, fails the requirement in three different directions and the marker distinguishes them.",
        discriminating_signal:
          "Quantifying the gastrointestinal harm that the substitution itself will cause across the candidate's own 240 patients, and mitigating it — rather than treating withdrawal as the end of the clinical problem.",
        red_flags: [
          "Prioritises by administrative convenience rather than by clinical risk",
          "Leaves substitution to individual prescriber judgement with no protocol",
          "Has no answer for the patients with both cardiovascular and gastrointestinal risk",
          "Mentions substitution harm without quantifying it",
          "Reassures the patient asking about past harm rather than conceding what is true",
          "Accepts blame for knowledge that did not exist at the time",
          "Implies to previously exposed patients that their risk is ongoing",
        ],
      },
    },
    {
      numeral: "V",
      title: "Testimony, Negotiation and Self-Assessment",
      marks: 150,
      minutes: 30,
      annex_attaches: false,
      curriculum_anchor:
        "Giving evidence at an inquest or before a professional regulator; the boundary between factual evidence and expert opinion; the accurate expression of what was known and when; reflective practice.",
      situation:
        "Two years later. An inquest is sitting into the death of a patient of yours who suffered a fatal myocardial infarction while on alfenacox for 26 months. You are called as a witness of fact. Your trust's legal team advises that you should not express a view on causation, which is proper, and separately suggests that if asked about the departmental protocol you should say it reflected national practice at the time — which is true. Counsel for the family puts it to you that you chaired the committee that kept the drug on formulary, that your department held a grant from the manufacturer, and that you personally received speaker fees. All three are correct.",
      task: [
        "Assess the two pieces of advice separately. State which is proper, which is proper in form but improper in the use being made of it, and what you will do about each.",
        "Answer counsel's proposition. Write the answer you would actually give, in the first person, in not more than 200 words. It is marked as testimony, not as an essay.",
        "The coroner asks you directly whether, in your opinion, the protocol should have been changed earlier. Answer it, in the exact words, having regard to the boundary between fact and opinion and to what you established in Part I about when the hazard was detectable.",
        "Write a self-assessment of not more than 250 words: the decision you would now take differently, what you would have needed to know at the time, and whether it was available to you.",
      ],
      exhibits: [
        "Inquest scope and the coroner's list of issues.",
        "The deceased patient's prescribing record and departmental notes.",
        "The departmental protocol and its disclosure footnote.",
        "The trust legal team's written advice.",
      ],
      research: {
        mandate:
          "Establish, with citation: (1) the role and powers of a coroner's inquest in a named jurisdiction, what it is and is not permitted to determine, and the position of a treating clinician called as a witness of fact; (2) the distinction between factual and expert evidence, and whether a treating clinician may give opinion evidence, with a source; (3) the professional regulator's guidance on giving evidence and on honesty in formal proceedings, quoted; and (4) at least one published inquest, inquiry or regulatory finding in which a clinician's evidence about institutional decisions was criticised, with the criticism. Your answer to the coroner's question in requirement 3 must be consistent with the fact-opinion boundary you establish.",
        target_sources: [
          "Coroners legislation and published guidance on inquests in a named jurisdiction",
          "Rules and guidance on expert and factual evidence in that jurisdiction",
          "Professional regulator guidance on giving evidence and on probity",
          "Published inquest, inquiry or regulatory decisions concerning clinical evidence",
        ],
        probes: [
          "Which piece of advice is being used improperly, and how?",
          "May a treating clinician give opinion evidence at an inquest? What is your source?",
          "In your answer to the coroner, what year did you give, and what is it based on?",
          "Was the information you needed available to you at the time? Yes or no first.",
        ],
      },
      deliverable:
        "Four short pieces: the assessment of the two pieces of advice; the testimony passage in the first person, not more than 200 words; the answer to the coroner in the exact words; the self-assessment, not more than 250 words. Plus a Sources and Methods appendix of not more than 150 words.",
      key: {
        expected:
          "The first advice is proper: a treating clinician called as a witness of fact should not offer a causation opinion, and the candidate should follow it. The second is the more interesting item, and the correct classification is that it is true and is being deployed to do work that truth does not support — saying the protocol reflected national practice is accurate, and offering it as an answer to a question about why the protocol said what it said substitutes a defence for an account. The candidate should say the true thing when it is responsive and should not offer it as a shield, and naming that distinction is the top-band move. The testimony passage must concede all three of counsel's propositions in the opening, without qualification and without the word 'unrestricted' doing defensive work, because all three are correct and a witness who softens a true proposition in an inquest loses the coroner. What follows should be factual and short: what the committee knew, when it met, what it decided and on what evidence — with no attack on the family's counsel and no recitation of how many other institutions did the same. The coroner's question is the hardest thing on the paper because it invites the opinion the candidate has just been advised not to give, and the correct answer distinguishes two questions: the candidate cannot say whether this patient's death was caused by the drug, which is causation and is for the coroner, but they can say whether the protocol should have been changed earlier, which is a question about their own professional decision-making and which they are not merely permitted but obliged to answer. The expected answer is yes, with a year, and the year should come from the cumulative meta-analysis the candidate was required to find in Part I rather than from the withdrawal date — which is the single most demanding link on the paper, because it requires the candidate to state that the evidence supported a change several years before their committee made one, in a room containing the family of a patient who died in the interval. Candidates who decline the question on fact-opinion grounds have misapplied a boundary they correctly identified; candidates who answer with the withdrawal year have avoided the finding they themselves made. The self-assessment is marked on the third question, and here the honest answer is uncomfortable and available: the information was available, in the published literature, and the candidate did not go and get it.",
        discriminating_signal:
          "Answering the coroner's question with a year drawn from the cumulative meta-analysis rather than the withdrawal date — conceding that the evidence supported a change years before the committee made one.",
        red_flags: [
          "Declines the coroner's question on fact-opinion grounds",
          "Answers the coroner with the withdrawal year",
          "Qualifies or softens any of counsel's three correct propositions",
          "Offers 'national practice at the time' as the answer rather than as a fact",
          "Volunteers a causation opinion",
          "Concludes in the self-assessment that the necessary evidence was unavailable",
        ],
      },
    },
  ],
};

export const EXAMINATIONS: Examination[] = [NORTHGATE, CORVINA, SOLVENOR, ALFENACOX];

export function examinationForFaculty(facultySlug: string): Examination | undefined {
  return EXAMINATIONS.find((e) => e.facultySlug === facultySlug);
}
