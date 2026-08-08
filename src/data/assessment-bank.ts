/**
 * VeraMetrics (VM) - Core Assessment Content Bank
 *
 * Fifteen scenarios: five assessment pillars x three difficulty tiers.
 *
 * IMPORTANT - calibration status: the `target_pass_rate` values below are pre-pilot
 * DESIGN targets expressing intended difficulty spread. They are not empirical.
 * Before any hiring or certification use, this bank requires pilot administration,
 * inter-rater reliability work on the answer keys, and an adverse-impact review -
 * behavioral and integrity instruments used in selection carry real legal exposure
 * (US: EEOC/Title VII disparate impact and state limits on integrity testing;
 * EU: GDPR Art. 22 and the AI Act's high-risk classification for employment tools).
 * Treat everything here as content, not as a validated instrument.
 *
 * All companies, people, and figures are fictional.
 *
 * OPEN-BOOK BY DESIGN: every scenario at every difficulty tier carries a mandatory
 * `research_requirement`. Candidates are expected to search external sources - market
 * data, technical standards, regulatory text, and historical case benchmarks - and the
 * scenarios are deliberately unsolvable at benchmark level without doing so. The
 * research is scored as its own weighted dimension against
 * `RESEARCH_INTEGRITY_RUBRIC` below; fabricated or decorative citation is penalized
 * more heavily than admitted ignorance.
 */

export type DifficultyLevel = "Easy" | "Moderate" | "Hard";

export interface ScenarioInject {
  /** Minutes from scenario start at which the system releases this inject. */
  at_minute: number;
  content: string;
}

export interface ScenarioParameters {
  duration_minutes: number;
  /** Delivery mode: written response, live adaptive dialogue, timed staged simulation. */
  format: string;
  materials_provided: string[];
  constraints: string[];
  injects: ScenarioInject[];
}

/**
 * Mandatory external-research task attached to every scenario.
 * The candidate cannot reach a benchmark answer from the brief alone.
 */
export interface ResearchRequirement {
  /** The exact research the candidate must perform, stated as instructions to them. */
  mandate: string;
  /** Source classes a competent candidate should reach. Primary sources outrank summaries. */
  target_sources: string[];
  /** What must appear in the submitted answer as evidence the research happened. */
  deliverable: string;
  /** How the system grades accuracy and quality of what they found. */
  evaluation_method: string;
  /** Adaptive follow-ups the AI uses to separate real research from fabrication. */
  verification_probes: string[];
  /** Share of the scenario's total score carried by the research dimension. */
  scoring_weight: number;
}

export interface AssessmentScenario {
  id: string;
  test_name: string;
  difficulty_level: DifficultyLevel;
  scenario_brief: string;
  parameters: ScenarioParameters;
  research_requirement: ResearchRequirement;
  evaluation_criteria: string[];
  model_answer_key: string;
  red_flags: string[];
  calibration: {
    /** Pre-pilot design target, not an observed rate. See file header. */
    target_pass_rate: number;
    /** The single behavior that separates the top tier from articulate mid-tier answers. */
    discriminating_signal: string;
  };
}

export interface AssessmentPillar {
  code: string;
  test_name: string;
  construct: string;
  scored_dimensions: string[];
}

export const PILLARS: AssessmentPillar[] = [
  {
    code: "ACN",
    test_name: "Ambiguity & Chaos Navigation",
    construct:
      "Decision quality when inputs are incomplete, mutually contradictory, and revised mid-scenario.",
    scored_dimensions: [
      "Signal triage",
      "Hypothesis maintenance",
      "Reversibility preference",
      "Calibrated confidence",
      "Tempo control",
    ],
  },
  {
    code: "RTB",
    test_name: "Red-Teaming & Blindspot Hunter",
    construct:
      "Capacity to attack one's own plan and the evidence behind it, and to locate failure modes in incentives rather than only in artifacts.",
    scored_dimensions: [
      "Assumption audit",
      "Adversary modeling",
      "Evidence interrogation",
      "Detection design",
      "Ship-vs-veto judgment",
    ],
  },
  {
    code: "EIB",
    test_name: "Ethical Integrity & Blindspot Matrix",
    construct:
      "Behavior under incentive pressure where legality, disclosure, loyalty, and duty diverge.",
    scored_dimensions: [
      "Legality-vs-candor separation",
      "Self-interest disclosure",
      "Escalation proportionality",
      "Mechanism over sentiment",
      "Cost-bearing",
    ],
  },
  {
    code: "CFS",
    test_name: "The Cascading Failure Stress Test",
    construct:
      "Live multi-stage incident command where each decision reshapes the next failure surface.",
    scored_dimensions: [
      "Containment sequencing",
      "Irreversibility triage",
      "Evidence preservation",
      "Clock management",
      "Disclosure under instability",
    ],
  },
  {
    code: "ANE",
    test_name: "Adversarial Negotiation & Ego Audit",
    construct:
      "Composure, concession structure, and self-regard against an adaptive opponent who attacks status and offers personal benefit for organizational cost.",
    scored_dimensions: [
      "Leverage realism",
      "Term ranking",
      "Frame control",
      "Side-channel resistance",
      "Ego separation",
    ],
  },
];

/**
 * Cross-cutting rubric applied to the `research_requirement` dimension of every
 * scenario, at every difficulty tier. Scored independently of the decision quality,
 * then combined at the weight declared on each scenario.
 */
export const RESEARCH_INTEGRITY_RUBRIC = {
  dimensions: [
    {
      name: "Verifiability",
      weight: 0.25,
      standard:
        "Every external claim carries a named source and a date. An unattributed figure scores zero on this dimension rather than partial credit, however plausible it is. Primary sources (regulatory text, standards bodies, vendor price sheets, filed documents) outrank secondary summaries, and the system records which tier the candidate reached.",
    },
    {
      name: "Factual accuracy",
      weight: 0.2,
      standard:
        "The grader checks each cited figure, clock, threshold, and standard against a maintained reference set. Substantive errors - wrong notification window, superseded threshold, misnamed standard, misapplied jurisdiction - are penalized in proportion to how much the candidate's decision rests on the error.",
    },
    {
      name: "Applicability (transfer test)",
      weight: 0.25,
      standard:
        "The decisive question is whether the finding changed the candidate's decision or merely decorated it. A correct citation that leaves the recommendation unchanged, or that is quoted without being applied to the scenario's own numbers, caps the research score at 40%. Research that visibly moves the answer scores highest.",
    },
    {
      name: "Unit and base-rate hygiene",
      weight: 0.15,
      standard:
        "External benchmarks must be normalized before comparison: per-GB versus per-host pricing, gross versus net retention, median versus mean, cohort versus whole-base. Comparing an unnormalized external figure to an internal one is scored as a reasoning failure, not a clerical one.",
    },
    {
      name: "Calibration and gap disclosure",
      weight: 0.15,
      standard:
        "Candidates who state what they could not find, and how that gap limits their conclusion, score above candidates who present uniform confidence. Naming a source's scope limitation is worth more than adding another source.",
    },
  ],
  fabrication_policy:
    "Fabricated citations are the single heaviest penalty in the instrument and are scored below an admitted research gap. Detection is adaptive rather than lexical: the system probes for the methodology, scope, sample, and publication context behind any cited figure, since invented sources survive a title request but collapse under a methodology request. Two unrecoverable fabrications void the scenario score and flag the attempt for human review.",
  no_search_penalty:
    "A response that solves the scenario using only the brief is capped at the Moderate band regardless of decision quality, because each scenario contains at least one parameter whose correct handling depends on an external standard, clock, or benchmark not stated in the brief.",
} as const;

export const SCENARIOS: AssessmentScenario[] = [
  // ==========================================================================
  // 01 - AMBIGUITY & CHAOS NAVIGATION
  // ==========================================================================
  {
    id: "ACN-E-01",
    test_name: "Ambiguity & Chaos Navigation",
    difficulty_level: "Easy",
    scenario_brief:
      "You joined Halden Freight (mid-market logistics SaaS, $38M ARR, 240 employees) as Director of Operations nine days ago. The Q3 board meeting is in six days. Three things sit on your desk. Product analytics shows weekly active accounts up 11% quarter over quarter. Finance shows net revenue retention down from 108% to 96%. Support ticket volume is up 60% while CSAT holds steady at 4.4/5. Your VP Product says the retention drop is a data pipeline artifact from the Salesforce migration. Your VP Finance says product analytics has been double-counting sandbox accounts since the SSO change. Neither will produce a reconciliation, and both have asked you to back them before the board. You have six days, one data analyst at 50% capacity, and no authority to compel either VP. Deliver a written brief covering what you believe is true, what you will do in the next six days, and what you will tell the board.",
    parameters: {
      duration_minutes: 45,
      format: "Written brief (800-1200 words) plus two adaptive AI follow-up probes",
      materials_provided: [
        "Product analytics summary: WAU by week, 12 weeks, no cohort breakdown",
        "Finance NRR calculation with the input query visible",
        "Support ticket volume by category, 8 weeks",
        "Two one-paragraph emails, one from each VP, stating their position",
      ],
      constraints: [
        "One analyst at 50% capacity for six days",
        "No authority over either VP; escalation to the CEO is available but costs political capital and must be justified",
        "The board pre-read is due on day five",
      ],
      injects: [
        {
          at_minute: 25,
          content: "The CEO messages: 'Which of them is right? I need one number for the deck.'",
        },
      ],
    },
    research_requirement: {
      mandate:
        "Before writing the brief, research and cite: (1) the standard definition of net revenue retention and how it differs from gross revenue retention and logo churn, from a primary or widely used industry source; (2) current NRR benchmark ranges for mid-market B2B SaaS at roughly $30-50M ARR, with the source's sample and date, so you can say whether 96% is a crisis or a peer-median result; (3) at least one documented methodology for excluding non-production, sandbox, or internal accounts from product analytics; and (4) one published cohort-analysis approach you will actually use for the disambiguating query. State how each finding changes what you tell the board.",
      target_sources: [
        "SaaS benchmark reports with disclosed sample size and methodology (e.g., published operating-metric surveys, public-company disclosures)",
        "Product analytics vendor documentation on test-account and environment filtering",
        "Public SaaS company investor materials defining NRR calculation in footnotes",
        "Cohort-retention methodology write-ups from primary practitioner or academic sources",
      ],
      deliverable:
        "A short evidence appendix (max 250 words) listing each source with name and date, the figure taken from it, and the sentence in the brief that changed because of it.",
      evaluation_method:
        "The grader checks definitional accuracy first: NRR must be described as expansion and contraction within the existing base excluding new logos, and a candidate who conflates it with gross retention or with logo churn loses the dimension regardless of how good their citation is. The benchmark figure is checked for existence, date, and segment match - quoting an enterprise or public-company benchmark against a $38M ARR mid-market business is scored as a base-rate error even when the number is real. Highest scores go to candidates whose benchmark research changes the framing of the board conversation (a 96% that sits near peer median argues for a different board message than a 96% that is bottom-quartile), and to those who use the sandbox-exclusion documentation to specify the actual filter their analyst will apply rather than to assert that filtering matters.",
      verification_probes: [
        "What sample size and time period does that benchmark cover, and what segment definition did the authors use?",
        "Does the source compute NRR monthly or annually, and does it include or exclude downgrades from churned logos?",
        "Read me the exact filter condition your analyst will use to exclude sandbox accounts, and how you know it is complete.",
      ],
      scoring_weight: 0.15,
    },
    evaluation_criteria: [
      "Separates observation from inference and labels each",
      "Identifies the single cheapest test that disambiguates both claims at once",
      "Resists premature synthesis into a tidy narrative",
      "Budgets the scarce analyst resource explicitly",
      "States confidence proportional to evidence held",
      "Distinguishes what they believe from what they will tell the board, without those diverging dishonestly",
    ],
    model_answer_key:
      "A top response notices the three signals are not actually in conflict. Usage up with NRR down is the signature of a seat or consumption downgrade, or a pricing-mix shift, not necessarily a data error; and 60% more tickets with flat CSAT means volume is arriving from a new population or a new workflow rather than from deterioration. That reframing collapses the political question into an empirical one. The candidate then orders one decisive query: cohort NRR by contract start date, sandbox accounts excluded, joined to ticket category. That single cut tests both VPs' claims simultaneously at a cost of roughly one analyst-day. They size the remaining budget out loud (two days on reconciliation, one day of buffer) and pre-commit a fallback: if reconciliation is incomplete by day five, the board hears the range, the two candidate explanations, and the date the answer lands - not a chosen side. To the CEO's request for one number, the strong answer supplies structure rather than a coin flip: the number we can defend today, the number that is contested, and what resolves it by when. Psychological indicator: comfort saying 'I do not yet know, and here is the date I will' without any loss of authority, and treating both VPs' assertions as hypotheses with named owners rather than as positions to be adjudicated by seniority.",
    red_flags: [
      "Picks a VP based on plausibility, seniority, or relationship",
      "Proposes a broad audit of all data sources with no prioritization",
      "Promises the board a conclusion it cannot support",
      "Treats the discrepancy as primarily an interpersonal conflict to be mediated",
      "Requests headcount as the first move",
      "Gives the CEO a single number to end the discomfort",
    ],
    calibration: {
      target_pass_rate: 0.68,
      discriminating_signal:
        "Recognizing that usage-up plus retention-down is a coherent business pattern, not a contradiction requiring someone to be wrong.",
    },
  },
  {
    id: "ACN-M-01",
    test_name: "Ambiguity & Chaos Navigation",
    difficulty_level: "Moderate",
    scenario_brief:
      "You are Head of Risk Operations at Meridian Pay (payments platform, $2.1B annualized processing volume). At 07:40 a reconciliation job flags a $4.3M discrepancy between your internal ledger and processor settlement across eleven days. Three hypotheses are live: the processor changed its fee schedule without notice; a rounding or FX defect exists in your own multi-currency ledger; or merchant-side fraud is concentrated in about forty accounts. Your largest merchant, 14% of volume, is mid-renewal and will read any account freeze as a breach signal. Compliance advises that a suspicious-activity determination starts a regulatory filing clock, that the clock runs from detection rather than from conclusion, and that the record of when you knew is itself examinable. You have until an investor call at hour six, where the CFO wants a single number.",
    parameters: {
      duration_minutes: 90,
      format: "Timed staged simulation with live AI counterparts (processor, compliance, CFO)",
      materials_provided: [
        "Reconciliation output: daily variance by currency and processor MID",
        "Processor fee schedule, current version only",
        "Flagged-account list (40 accounts) with volume and velocity metrics",
        "Compliance one-pager on filing triggers and timing",
      ],
      constraints: [
        "Two engineers and one analyst available",
        "Account-level freezes require your sign-off and are visible to merchants within minutes",
        "Any written statement to the processor is retained and discoverable",
      ],
      injects: [
        {
          at_minute: 20,
          content:
            "Processor confirms no fee change, but discloses a six-hour outage nine days ago during which transactions were replayed.",
        },
        {
          at_minute: 40,
          content:
            "Your engineer finds a genuine FX rounding defect. It accounts for $600K of the $4.3M.",
        },
        {
          at_minute: 55,
          content:
            "Two of the forty flagged accounts turn out to be sub-merchants of your largest merchant.",
        },
        {
          at_minute: 70,
          content:
            "CFO: 'I need one number for the call in fifty minutes. Round it if you have to.'",
        },
      ],
    },
    research_requirement: {
      mandate:
        "During the simulation you must research and correctly apply: (1) the actual suspicious activity report filing deadline that governs a US money services business or bank partner - the number of days, and critically what event starts the clock; (2) how card networks and processors handle duplicate or replayed captures, including the mechanism by which a replayed authorization becomes a settled duplicate; (3) the minor-unit and rounding conventions for the currencies in your variance report, and how a rounding defect scales with transaction count rather than with volume; and (4) at least one documented real-world duplicate-settlement or replay incident, which you must use to estimate what fraction of your residual the replay window plausibly explains. Your statement to the CFO must show the arithmetic connecting the replay incident benchmark to your own transaction counts.",
      target_sources: [
        "FinCEN regulations and guidance on SAR filing timelines and the detection trigger",
        "Card network operating rules and processor documentation on duplicate transaction and reversal handling",
        "ISO 4217 currency minor units and payment scheme rounding guidance",
        "Published incident postmortems or regulatory findings on duplicate settlement events",
      ],
      deliverable:
        "A three-line decomposition submitted to the CFO - explained, mechanically probable, unexplained residual - with each line's estimate traceable to a cited source or to your own transaction counts, plus a written detection-time note for compliance citing the filing rule.",
      evaluation_method:
        "Two checks dominate. First, the filing clock: the correct answer is a fixed number of days running from initial detection of facts that may constitute suspicious activity, not from conclusion of an investigation, and candidates who state the days correctly but locate the trigger at conclusion score lower than those who get the trigger right - because the trigger is what drives the actual behavior under test. Candidates who conflate SAR filing with data-breach notification, or who import a GDPR-style 72-hour clock into a US financial-crime obligation, lose the accuracy dimension outright. Second, the transfer test: a candidate who cites a real replay incident but does not convert it into an estimate for their own residual is treated as decorative and capped, while one who reasons from the cited incident's duplicate rate to a bounded range on their $3.7M residual scores highest. Rounding research is checked for the correct insight that a per-transaction rounding defect scales with count, which is what makes $600K plausible or implausible against their volume.",
      verification_probes: [
        "What specific event starts that filing clock, and what is your evidence that it is detection rather than determination?",
        "In the incident you cited, what percentage of transactions in the affected window were duplicated, and what does that imply for your 3.7M residual?",
        "Which currencies in your variance report have non-two-decimal minor units, and does your defect hypothesis survive that?",
      ],
      scoring_weight: 0.2,
    },
    evaluation_criteria: [
      "Maintains multiple hypotheses after partial confirmation rather than closing on the first found defect",
      "Treats the variance as a decomposition problem, not a search for a single culprit",
      "Starts the compliance clock at detection in writing, decoupled from conclusion",
      "Chooses reversible instruments (transaction holds, enhanced review) over irreversible ones (account freezes) while evidence matures",
      "Separates disclosure obligation from commercial pressure",
      "Gives the CFO a defensible structure with stated uncertainty instead of false precision",
    ],
    model_answer_key:
      "Elite candidates hold the $4.3M as a decomposition, not a whodunit. Once the FX defect explains $600K they immediately re-baseline the residual at $3.7M and treat the replay window as the leading candidate for a large, bounded, mechanically explainable chunk - duplicate or replayed captures - which is testable inside the session by diffing capture IDs against the outage timestamps. That is the highest-value analytical move available and it is cheap. On compliance, they document detection time in writing at once, explicitly separating 'we have recorded detection' from 'we have concluded fraud'; the filing decision does not require certainty, and the contemporaneous record of what was known when is the asset that protects the firm later. On the merchant, they distinguish account-level freeze (commercially explosive, reversible only at reputational cost) from transaction-level holds and enhanced review (low visibility, genuinely reversible), and choose the reversible instrument - while noting that the two sub-merchant hits are exactly the kind of coincidence that a renewal negotiation will contaminate, so the decision should be documented before the commercial conversation, not after. For the CFO they deliver three parts and refuse to collapse them: explained ($600K, FX defect, remediated), mechanically probable (the replay tranche, confirmable by a stated hour with a stated method), and unexplained residual with a named owner and a date. Psychological indicator: they update magnitudes rather than stories, and they treat the CFO's demand for one number as a legitimate need to be met with better structure rather than as pressure to be either resisted or obeyed.",
    red_flags: [
      "Closes the investigation once the FX defect is found",
      "Freezes the forty accounts, including the large merchant's sub-merchants, before establishing whether the flag is mechanical",
      "Asks compliance to hold off on documenting detection",
      "Sends the processor a speculative root cause to appear responsive",
      "Gives the CFO a point estimate with unearned precision",
      "Escalates the whole problem upward with no recommendation attached",
    ],
    calibration: {
      target_pass_rate: 0.39,
      discriminating_signal:
        "Re-baselining the unexplained residual after partial confirmation instead of experiencing the found defect as resolution.",
    },
  },
  {
    id: "ACN-H-01",
    test_name: "Ambiguity & Chaos Navigation",
    difficulty_level: "Hard",
    scenario_brief:
      "You are Chief of Staff to the CEO of Alder Systems (industrial IoT, 1,900 employees, publicly traded, roughly $3.1B market cap). The CEO hands you a one-line mandate: decide by Friday whether to shut down the Helix product line. Attached is a sixty-page pack. Helix carries $84M revenue at negative 12% contribution margin. It holds three utility contracts with seven-year regulatory support obligations and $190M aggregate termination exposure. It consumes 40% of firmware engineering capacity. Churn is 3%, but 60% of its revenue renews inside a single four-month window next year. A competitor just priced 30% below you and may be loss-leading. The CFO's model shows shutdown is NPV-positive in four of six scenarios; two of those six scenarios were authored by the executive who would inherit Helix's engineering budget if the line is cut. The compensation committee has tied 30% of the CEO's long-term incentive to margin expansion. The Friday deadline exists because the CEO wants this in a board pre-read, not because of any external event.",
    parameters: {
      duration_minutes: 120,
      format:
        "Written decision memo (1500-2000 words) plus a 20-minute adversarial AI defense in the CEO's voice",
      materials_provided: [
        "60-page pack: P&L by SKU, six-scenario NPV model with authorship metadata, contract abstracts with termination clauses",
        "Competitor price sheet and public hiring data",
        "Renewal calendar showing the four-month concentration",
        "Compensation committee summary (LTIP structure)",
      ],
      constraints: [
        "The memo may not exceed 2,000 words",
        "You may request a maximum of three additional data items, and must state what each would change",
        "You may not speak to the inheriting executive before Friday",
      ],
      injects: [
        {
          at_minute: 45,
          content: "CEO: 'I do not want options. I want a recommendation. Yes or no by Friday.'",
        },
        {
          at_minute: 75,
          content:
            "A board member emails you directly asking for 'your independent read, not the CFO's model.'",
        },
        {
          at_minute: 100,
          content:
            "Legal confirms the $190M termination exposure is enforceable and not insurable.",
        },
      ],
    },
    research_requirement: {
      mandate:
        "Your memo must be grounded in external evidence, not the pack alone. Research and cite: (1) at least two real industrial or hardware product-line discontinuations where exit costs, contract termination liabilities, or long-term service obligations were disclosed, and use them to sanity-check whether $190M is a plausible or an understated figure for three seven-year utility support contracts; (2) the accounting treatment your CFO's model should apply to exit and termination costs and to any resulting impairment, naming the standard and the recognition trigger; (3) how utility-sector procurement and regulatory support obligations typically constrain a vendor's ability to exit, including any regulatory approval or successor-supplier requirements; and (4) at least two established methods for inferring a competitor's unit economics from outside the company, which you must apply to the 30% price gap to argue whether it is loss-leading or a real cost advantage. The three additional data items you are permitted to request must be justified by what your research could not resolve.",
      target_sources: [
        "Public filings and annual reports disclosing restructuring, exit, or contract termination charges",
        "Accounting standards text on exit and disposal cost obligations and provisions (US GAAP and IFRS)",
        "Utility regulatory filings or procurement standards covering long-term equipment support obligations",
        "Teardown and bill-of-materials analyses, supplier pricing indices, and hiring or capacity signals as unit-economics proxies",
      ],
      deliverable:
        "Inside the 2,000-word memo: a benchmark table of at least two comparable exits with disclosed costs and their structural similarity to Helix, a named accounting standard with its recognition trigger, and a competitor cost-position estimate with a stated method and confidence band.",
      evaluation_method:
        "The grader scores comparability before accuracy. A cited exit is credited only if the candidate states why it is structurally analogous - long-lived support obligation, regulated customer, installed base - and discounts it explicitly where it is not; a list of famous discontinuations with no structural argument scores near zero even if every fact is correct. The accounting citation is checked for the correct standard and, more importantly, the correct recognition trigger, because a candidate who understands that the obligation is recognized when it becomes probable and estimable will also understand that announcing a shutdown is itself the act that crystallizes the charge - and the top decile makes exactly that connection, which is a decision-relevant insight rather than a citation. On the competitor, the system rewards any defensible external method applied with real numbers and an admitted error band, and penalizes the assertion that the competitor may be irrational, which is the modal mid-tier answer and is not a finding. Candidates who use their research to narrow the six-scenario model to the two scenarios that actually differ on an externally testable assumption score highest.",
      verification_probes: [
        "In the exit you cited, what portion of the disclosed charge was contract termination versus asset impairment versus severance, and which portion maps to Helix?",
        "What triggers recognition of that liability, and what does that imply about the sequencing of an announcement?",
        "Walk me through your competitor cost estimate numerically. What would have to be true for your estimate to be wrong by 30%?",
        "Which of your conclusions cannot be tested before the renewal window opens, no matter how much research you do?",
      ],
      scoring_weight: 0.25,
    },
    evaluation_criteria: [
      "Detects that the binary is false and that the deadline is endogenous",
      "Separates decision-relevant from decision-irrelevant material in a sixty-page pack",
      "Ranks irreversibility asymmetries: contractual termination cliff versus a pause in investment",
      "Surfaces incentive contamination in the evidence without converting it into an accusation",
      "Converts an unresolvable NPV question into a staged decision with named tripwires and a real deadline",
      "Distinguishes uncertainty that money can resolve from uncertainty only time can resolve",
      "Still delivers the requested deliverable rather than substituting a critique for it",
    ],
    model_answer_key:
      "The benchmark memo reframes without evading. The load-bearing question is not shut down or not; it is what is the cheapest reversible action this week that buys information before the four-month renewal window, given that termination exposure ($190M) dwarfs roughly $10M of annual contribution drag by more than an order of magnitude. The candidate states that asymmetry in one sentence early: shutdown is near-irreversible and detonates a contractual cliff, while a hiring freeze, a price test on a revenue subset, a firmware capacity reallocation, and a discreet carve-out or buyer sounding are all reversible and can run in parallel this quarter. They identify the competitor's pricing as the single highest-value unknown and name a concrete way to test it - unit-economics inference from teardown and bill-of-materials, hiring and channel-discounting signals - rather than parking it as 'they may be irrational.' They flag that two of six scenarios were authored by the budget's inheritor and request they be re-run with independent inputs, framed as modeling hygiene rather than motive. They note the CEO's LTIP as a disclosed conflict that argues for the board seeing the option set alongside the recommendation, and they answer the board member's direct email by looping the CEO in rather than building a private channel. Then they answer the actual question: here is my recommendation, here is the real deadline (renewal window minus lead time), here are the three tripwires that would flip it, here is what we will know by then, and here is why Friday is a calendar artifact. Psychological indicator: the willingness to hand a principal back a better question along with the requested deliverable rather than instead of it, and to state plainly which of their own conclusions are unfalsifiable before the renewal window opens.",
    red_flags: [
      "Answers yes or no on the strength of the CFO's model",
      "Treats all sixty pages as equally load-bearing",
      "Leads with the incentive conflict, moralizing instead of deciding",
      "Accepts Friday as immovable and compresses the analysis to fit",
      "Requests 'more analysis' without naming the unknown, the test, and its cost",
      "Recommends shutdown without pricing the $190M termination exposure",
      "Answers the board member privately, or refuses the CEO's request for a recommendation entirely",
    ],
    calibration: {
      target_pass_rate: 0.12,
      discriminating_signal:
        "Identifying that the deadline is manufactured and that the renewal window is the only real clock - then still delivering a recommendation on Friday.",
    },
  },

  // ==========================================================================
  // 02 - RED-TEAMING & BLINDSPOT HUNTER
  // ==========================================================================
  {
    id: "RTB-E-01",
    test_name: "Red-Teaming & Blindspot Hunter",
    difficulty_level: "Easy",
    scenario_brief:
      "You are a product lead at Vantor (direct-to-consumer subscription commerce, $60M GMV, monthly plans billing on day 30). You designed the one-click checkout redesign that ships to 100% of traffic next Tuesday. The A/B test ran for two weeks on 5% of traffic and shows conversion up 9%, average order value flat, and no increase in support contacts. Three details sit in the test configuration: the 5% cohort was drawn from logged-in US desktop sessions only, the new flow enables guest checkout for the first time, and it adds a promo code field that the old flow did not have. Roughly 60% of your real traffic is mobile and 25% is international. Leadership has already referenced the launch date externally. You have three days and one engineer. Write the pre-mortem: how does this go wrong, and what do you change before Tuesday?",
    parameters: {
      duration_minutes: 40,
      format: "Written pre-mortem plus two adaptive AI probes",
      materials_provided: [
        "A/B test readout: conversion, AOV, support contact rate, 14 days",
        "Checkout flow diagram, old and new",
        "Traffic composition by device, geography, and guest-versus-account",
      ],
      constraints: [
        "You cannot delay past Tuesday without CEO approval",
        "No new engineering headcount; one engineer available for changes",
      ],
      injects: [
        {
          at_minute: 22,
          content:
            "Growth lead: 'The 9% is worth $4M annualized. Every day of delay costs us $11K.'",
        },
      ],
    },
    research_requirement: {
      mandate:
        "Your pre-mortem must cite external evidence for at least four of its failure modes. Research: (1) documented card-testing and promo-abuse attack patterns against low-friction checkout, and the specific signals used to detect each; (2) the chargeback lifecycle for card-not-present disputes - the reason codes that apply to your risk, and the number of days a cardholder typically has to dispute - which determines whether your two-week test could have observed chargebacks at all; (3) the accessibility success criteria in the current WCAG version that a one-click flow most commonly violates, named by criterion number, covering error identification, focus visibility, and target size; and (4) published guidance on minimum A/B test duration relative to business cycle, including novelty effects and the risk of stopping on a leading metric. Each rollback tripwire you propose must have a threshold justified by an external benchmark rather than chosen freely.",
      target_sources: [
        "W3C WCAG 2.2 success criteria text",
        "Card network dispute and chargeback rule documentation, and reason code references",
        "Published fraud typology write-ups on card testing, enumeration, and promotion abuse",
        "Primary experimentation methodology sources on test duration, novelty effect, and peeking",
      ],
      deliverable:
        "A failure-mode table where each row states the failure, its detector, a threshold with a cited basis, and the owner - plus one paragraph stating what the 14-day test structurally could not observe, with the dispute window that proves it.",
      evaluation_method:
        "Accessibility citations are graded strictly by criterion number and version, because this is the fastest available test of whether a candidate actually opened the standard: naming the relevant criteria correctly is credited, gesturing at accessibility generally is not, and citing a superseded version is scored as a currency error. The chargeback research is graded on whether the candidate uses the dispute window to make the decisive argument - that a 14-day readout cannot have observed the outcome most likely to invalidate the launch - rather than merely reporting the number of days. Fraud pattern citations must arrive with detectors attached; a named attack with no signal is treated as a worry, not a finding. Highest research scores go to candidates whose tripwire thresholds are traceable to an external benchmark and who state what their own baseline would need to be for that threshold to be meaningful, and who answer the growth lead's $11K-per-day framing with a cited downside tail rather than with intuition.",
      verification_probes: [
        "Which WCAG criterion number covers the failure you described, and in which version was it introduced?",
        "How many days does the cardholder have to dispute, and therefore what is the earliest date your chargeback signal becomes trustworthy?",
        "You set an authorization decline threshold. What is your current baseline, and what published range told you that number is anomalous?",
      ],
      scoring_weight: 0.15,
    },
    evaluation_criteria: [
      "Interrogates the evidence before the design",
      "Detects that the test cohort excludes the majority of launch traffic and cannot have exercised the new guest checkout path at all",
      "Recognizes that a two-week window cannot observe the outcomes that matter for a subscription business",
      "Generates failure modes across surfaces: fraud, promo abuse, tax and address edge cases, accessibility, wallet and autofill behavior, downstream fulfillment",
      "Pairs each failure mode with a detection mechanism and a threshold, not just a worry",
      "Ships something - uses red-teaming as a throttle rather than a veto",
    ],
    model_answer_key:
      "A strong candidate attacks the measurement before the artifact, and here the test configuration is the largest finding available. The 5% cohort was logged-in US desktop sessions, which excludes 60% of real traffic (mobile) and 25% (international) - so the 9% lift was measured on a population that is not the launch population, and worse, logged-in users cannot have exercised the newly enabled guest checkout at all, meaning the single most novel path in the redesign ships to 100% of traffic with zero observations behind it. The promo code field is similarly untested for abuse because a two-week logged-in cohort is the least likely population to stack codes. Separately, two weeks cannot observe first renewal, refunds, or chargebacks at thirty to sixty days, so the conversion lift is a leading indicator whose lagging counterpart is entirely unmeasured. The right question is therefore what would make plus 9% bad, and the answers are specific: it converted lower-intent buyers (higher refund and involuntary-churn rates downstream), or it removed friction that was quietly performing fraud screening. From there they enumerate surfaces with detectors attached: card testing and promo stacking, monitored via authorization-decline ratio and redemptions per IP or device; address and tax edge cases for international and non-standard addresses; assistive-technology regressions, since one-click flows commonly break focus management and error announcement; and browser-specific wallet or autofill failures, which manifest as silent abandonment rather than tickets - which is precisely why 'no increase in support contacts' is weak evidence rather than reassurance. They convert this into a ship plan instead of a block: proceed Tuesday at 25%, then 50%, then 100% over ten days, with three pre-committed rollback tripwires (authorization decline rate, refund rate, chargeback rate), a named owner per guardrail metric, and one instrumentation gap closed before launch. Psychological indicator: attacks their own work with specificity and no defensiveness, and still ships.",
    red_flags: [
      "Produces a generic risk list with no detection mechanisms or thresholds",
      "Treats the 5% cohort as representative of launch traffic",
      "Defends the 9% as sufficient evidence",
      "Recommends indefinite delay without naming the metric and horizon that would resolve it",
      "Treats absence of support tickets as evidence of absence of harm",
      "Omits accessibility and payment-failure surfaces entirely",
      "Caves to the $11K-per-day framing without pricing the downside tail",
    ],
    calibration: {
      target_pass_rate: 0.62,
      discriminating_signal:
        "Noticing that the winning cohort excludes mobile, international, and guest checkout entirely - so the most novel path in the redesign has zero observations behind it - and reading flat support contacts as a blind spot rather than a clean bill.",
    },
  },
  {
    id: "RTB-M-01",
    test_name: "Red-Teaming & Blindspot Hunter",
    difficulty_level: "Moderate",
    scenario_brief:
      "You are Head of Credit Risk Technology at Kestrel Bank. In five weeks you roll out a model that auto-approves small-business loan applications up to $75K, replacing a manual underwriting queue. The model shows AUC 0.87 on three years of historical decisions, projects $40M in additional annual originations and a 60% reduction in underwriting cost, and returns a decision in 90 seconds. Your mandate is to red-team it against three adversaries simultaneously: an organized fraud ring, your own sales organization compensated on origination volume, and a fair-lending examination scheduled in eighteen months.",
    parameters: {
      duration_minutes: 75,
      format: "Written threat model plus live adversarial AI review panel",
      materials_provided: [
        "Model card: features, AUC, random train/test split methodology",
        "Feature list including ZIP-derived aggregates, device fingerprint, banking tenure",
        "Sales compensation plan and the manual override workflow",
        "Three years of decision volumes by channel",
      ],
      constraints: [
        "Rollout date is fixed by a board commitment",
        "You may require at most three launch-blocking conditions and must justify each",
      ],
      injects: [
        {
          at_minute: 30,
          content:
            "Sales leadership requests the override path be extended to regional managers 'for edge cases.'",
        },
        {
          at_minute: 50,
          content:
            "Data science notes the training labels were produced entirely by the manual underwriting team being replaced.",
        },
      ],
    },
    research_requirement: {
      mandate:
        "Each of your three adversaries must be countered with externally grounded controls. Research and cite: (1) the adverse action notice requirements that apply to a declined credit applicant, including whether generic or checklist reasons are sufficient and what regulators have said specifically about complex or algorithmic models; (2) the supervisory guidance governing model risk management at a bank, naming it and summarizing what it requires for validation, ongoing monitoring, and independent review; (3) the standard analytical framework for assessing disparate impact, including the commonly used numerical rule of thumb and its actual legal status; and (4) documented small-business lending fraud typologies, including synthetic identity and first-party fraud, with the detection signals each produces. Your three launch-blocking conditions must each cite the specific requirement or typology that makes them non-negotiable.",
      target_sources: [
        "ECOA and Regulation B text on adverse action notices, plus regulator circulars and guidance on algorithmic decisioning",
        "Federal banking supervisory guidance on model risk management",
        "EEOC and fair-lending analytical guidance on adverse impact methodology",
        "Fraud typology publications from industry consortia, regulators, or credit bureaus",
      ],
      deliverable:
        "Three adversary sections, each opening with the cited external requirement or typology it is built on, plus a monitoring specification naming every metric, its owner, and its threshold basis - and a validation plan that names the guidance requirement it satisfies.",
      evaluation_method:
        "The adverse action research is the highest-signal item and is graded on substance: the correct finding is that the applicant must receive the specific principal reasons for denial, which means a model whose reason codes are not faithful to its actual behavior creates a compliance defect independent of its accuracy - candidates who reach that conclusion score highest, candidates who report the notice requirement without connecting it to explainability are credited only partially, and candidates who assert that a notice can be generic are marked factually wrong. Model risk guidance is checked for correct naming and for whether the candidate applies the independent-review requirement to their own rollout rather than describing it abstractly. On disparate impact, the discriminating check is whether the candidate correctly identifies the numerical rule of thumb as a screening heuristic rather than a legal safe harbor, and whether they recognize that proxy features can generate impact with no protected attribute in the model - a candidate who claims fairness is achieved by excluding protected attributes is marked wrong on the accuracy dimension regardless of citations elsewhere. Fraud typologies are credited only when paired with the entity-graph or velocity signal that would actually detect them.",
      verification_probes: [
        "Are generic denial reasons sufficient under that rule? Quote the requirement and explain what it implies about your reason codes.",
        "That guidance requires independent validation. Independent of whom, specifically, in your org chart?",
        "Is the numerical impact rule you cited a legal standard or a screening heuristic, and what follows from your answer?",
        "Name the typology behind your velocity control and the specific signal it produces in your data.",
      ],
      scoring_weight: 0.2,
    },
    evaluation_criteria: [
      "Builds adversary-specific threat models rather than one generic risk list",
      "Recognizes that a 90-second decision turns the model into a cheap queryable oracle",
      "Identifies label provenance and regime change as validity threats; requires out-of-time rather than random validation",
      "Treats the internally incentivized actor as a first-class threat surface",
      "Reasons about proxy discrimination and the faithfulness of adverse-action reason codes",
      "Identifies the self-reinforcing label loop created by the model's own approvals",
      "Specifies the detector for each attack, not only the control",
    ],
    model_answer_key:
      "Benchmark answers treat the 90-second decision as the core vulnerability rather than a feature: it converts the model into an oracle that a ring can probe cheaply with disposable applications and then exploit at volume with tuned inputs. The countermeasure is therefore velocity and entity-graph controls - shared devices, addresses, bank accounts, and officers across applications - not incremental model accuracy. On validity, they catch that AUC 0.87 is measured against labels produced by the very underwriters being replaced, so the model has learned those humans' decisions rather than repayment reality, and any applicant the humans rejected outright is systematically absent from the outcome data; combined with three years that likely span an unrepresentative credit environment, out-of-time validation is the only meaningful test and a random split is close to meaningless. On the internal adversary, they state plainly that volume-compensated humans holding an override path will discover which fields move the score and coach applicants toward them, so override telemetry becomes a monitored, first-class metric: override rate by representative, approval lift attributable to overrides, and downstream default rate for the overridden cohort - and extending overrides to regional managers before that telemetry exists is refused. On the examination, they distinguish disparate treatment from disparate impact, note that ZIP-derived features, device signals, and banking tenure can generate impact with no intent and no protected attribute in the model, and require both adverse-action reason codes genuinely faithful to the model's behavior and a reproducible per-decision record of model version and inputs, because the examiner will ask about decisions made eighteen months earlier. Finally they name the silent failure: the model's own approvals become tomorrow's training labels, so measured performance improves while the population narrows. Psychological indicator: locates the largest risks in incentives and feedback loops rather than in model internals, and is concrete about the detector for each attack.",
    red_flags: [
      "Focuses on model metrics and thresholds only",
      "Treats fraud as a modeling problem to be solved with more features",
      "Omits the internal sales actor entirely",
      "Claims fairness is handled by excluding protected attributes",
      "Accepts the random train/test split without challenge",
      "Provides no decision-level auditability plan",
      "Grants the override extension to keep sales aligned",
    ],
    calibration: {
      target_pass_rate: 0.34,
      discriminating_signal:
        "Naming the internal, well-meaning, volume-compensated actor as the highest-expected-loss adversary and designing telemetry for it.",
    },
  },
  {
    id: "RTB-H-01",
    test_name: "Red-Teaming & Blindspot Hunter",
    difficulty_level: "Hard",
    scenario_brief:
      "You are engaged to red-team the control environment of Aegis Health (health-data infrastructure processing claims for 40 million lives) ahead of a strategic acquisition. The artifact you are given is the company's internal case that it is secure and compliant: a clean SOC 2 Type II, HITRUST certification, 99.99% uptime for three years, zero reportable breaches in six years, an internal audit function reporting to the CFO, a four-person security team supporting 900 employees, all production access gated behind a single external SSO provider, quarterly access reviews completing at 100%, and an incident-response plan last exercised fourteen months ago in a tabletop. Your mandate: identify the failure modes this body of evidence is structurally incapable of detecting, and rank them by expected loss. You have four hours, no system access, and no interviews.",
    parameters: {
      duration_minutes: 240,
      format:
        "Written assessment (2000 words max) plus 30-minute defense against an AI panel playing the target's CISO and the acquirer's deal lead",
      materials_provided: [
        "Executive security summary and certification cover letters (scope sections included)",
        "Access review completion dashboard, eight quarters",
        "Org chart for security, IT, and internal audit",
        "Uptime and incident summary, three years",
        "Tabletop exercise report, fourteen months old",
      ],
      constraints: [
        "No system access, no interviews, no external scanning",
        "Findings must be ranked by expected loss with assumptions stated",
        "You must specify, for each finding, the single document request that would confirm or falsify it",
      ],
      injects: [
        {
          at_minute: 90,
          content:
            "The acquirer's deal lead: 'We have three clean certifications. What exactly are we still worried about?'",
        },
        {
          at_minute: 150,
          content:
            "The target's CISO offers, in place of documents, a verbal assurance that all findings from the last audit were remediated.",
        },
        {
          at_minute: 200,
          content: "The acquisition is now expected to be announced publicly in eleven days.",
        },
      ],
    },
    research_requirement: {
      mandate:
        "You have no system access, so external research is your only instrument. You must establish, with citations: (1) what a SOC 2 Type II report actually attests to - the difference between Type I and Type II, the role of management-defined scope, carve-out versus inclusive treatment of subservice organizations, and complementary user entity controls - and what a certification therefore cannot tell an acquirer; (2) published benchmarks for intrusion dwell time and for how breaches are actually discovered, with source and year, which you must use to argue about the target's detection capability rather than their luck; (3) base rates for reported breaches among custodians of health data at comparable scale, drawn from a regulator's public breach reporting, so that six years of zero can be assessed against a population rather than against intuition; and (4) at least two documented identity-provider or single-sign-on compromise incidents, used to argue what happens to this specific architecture when the provider is untrusted. Every one of your ranked findings must name the external benchmark that sets its expected loss.",
      target_sources: [
        "AICPA trust services criteria and SOC report guidance on scope, carve-outs, and CUECs",
        "Annual industry threat reports with published dwell-time and discovery-source statistics",
        "Regulator public breach portals for health data (e.g., the HHS OCR breach reporting portal) for base rates",
        "Postmortems, regulatory findings, or vendor disclosures on identity-provider and session-token compromises",
      ],
      deliverable:
        "A ranked findings table where each row carries an expected-loss estimate, the external benchmark supplying its frequency or magnitude, the stated assumption converting benchmark to estimate, and the one document request that would confirm or falsify it.",
      evaluation_method:
        "This scenario's research grade is dominated by the base-rate move. A candidate who retrieves reported-breach frequency for comparable health-data custodians and then asks what the probability of six consecutive clean years is for an organization of this size and exposure has done the analysis the entire scenario is built around; one who merely observes that zero breaches seems suspicious has not, and is capped even if their instinct is right. Dwell-time and discovery-source statistics are checked for source, year, and correct use: the load-bearing finding is that a large share of intrusions are discovered by external parties rather than internally, which converts the zero-breach record into a question about detection maturity, and candidates who cite the statistic without drawing that inference score as decorative. SOC 2 research is graded on whether the candidate identifies management-defined scope and subservice carve-outs as the mechanism by which a clean opinion coexists with material risk - and top candidates ask for the scope section specifically rather than for the report. Identity-provider case citations must be mechanically analogous: a cited incident is credited only where the candidate maps its mechanism onto the target's single-provider architecture, including whether response tooling sat behind the compromised provider. Verbal assurance from the CISO must be refused in favor of a named artifact; accepting it costs the verifiability dimension entirely.",
      verification_probes: [
        "What is the reported-breach base rate you found, at what scale, and what does six clean years imply against it?",
        "In the report you cited, what share of intrusions were discovered externally, and what does that do to your reading of zero breaches?",
        "What does a subservice carve-out mean, and which of this target's dependencies would it most likely exclude?",
        "In the identity-provider incident you cited, was the response tooling itself behind the compromised provider, and what happened as a result?",
      ],
      scoring_weight: 0.25,
    },
    evaluation_criteria: [
      "Reasons about the evidence-generating process rather than the evidence",
      "Identifies silent control failure - metrics that look strong precisely because nothing is being tested",
      "Distinguishes prevention capability from detection capability in the zero-breach record",
      "Identifies concentrated dependencies, including single-provider identity and human knowledge concentration",
      "Recognizes independence defects in assurance: internal audit reporting to the CFO, management-defined audit scope",
      "Ranks by expected loss with explicit assumptions rather than by likelihood alone",
      "Identifies the acquisition announcement itself as a threat catalyst",
      "States the falsifying document request for each finding",
    ],
    model_answer_key:
      "The benchmark move is to invert every proof point into one question: what would this evidence look like if the underlying control were failing? A 100% completion rate on quarterly access reviews is the signature of rubber-stamping, because genuine reviews produce revocations - the informative metrics are revocation rate and mean time to deprovision, and their absence from the dashboard is the finding. Zero reportable breaches over six years at a custodian of 40 million lives is weak evidence about prevention and strong evidence about detection maturity, so the diagnostic questions are what mean time to detect was on incidents they did have, and whether they have ever discovered an intrusion they did not already know about from an outside party. SOC 2 and HITRUST attest to described controls over a sample period against a scope that management helped define, so material risk lives in what was scoped out, which is why the scope sections matter more than the opinions. The candidate then names the concentrated dependencies: a single external SSO provider fronting all production access means one provider compromise approaches total access, and the correct compensating-control question is what break-glass paths and machine identities look like when that provider must be treated as untrusted - including whether the tooling used to coordinate a response sits behind it. A four-person team for 900 employees means detection engineering, incident response, and access governance are each one person deep; knowledge concentration is a control failure that produces no artifact and appears nowhere in a certification. Internal audit reporting to the CFO means the function that would surface an expensive finding reports to the person whose numbers it would damage. A fourteen-month-old tabletop means the response plan's failure modes are unmeasured, particularly the ones involving the identity provider itself. They rank by expected loss with stated assumptions rather than by likelihood, they decline the CISO's verbal assurance in favor of the specific artifact that would evidence it, and they answer the deal lead's challenge directly: certifications are evidence of a described control set, not coverage of the risk surface. Finally they flag the second-order dynamic - an acquisition announcement is itself a catalyst, driving retention risk in a four-person team, a documented spike in social engineering during transactions, and an integration program that will demand precisely the trust-boundary shortcuts that create incidents. Psychological indicator: sustained skepticism toward good news without cynicism. The candidate hunts for the absence of expected artifacts - revocation logs, failed-detection narratives, scope exclusions - rather than for villains, and is explicit about which of their own conclusions each document request would kill.",
    red_flags: [
      "Audits the controls listed instead of the gaps the list implies",
      "Treats certifications as coverage of the risk surface",
      "Produces an unranked list, or ranks by likelihood with no loss magnitude",
      "Declines to reason without system access",
      "Invents specific vulnerabilities not inferable from the brief",
      "Frames findings as blame rather than as structural exposure",
      "Misses the identity-provider concentration or the human knowledge single point of failure",
      "Accepts the CISO's verbal remediation assurance",
    ],
    calibration: {
      target_pass_rate: 0.09,
      discriminating_signal:
        "Reading a perfect metric (100% access review completion, zero breaches) as evidence that the control is not being exercised.",
    },
  },

  // ==========================================================================
  // 03 - ETHICAL INTEGRITY & BLINDSPOT MATRIX
  // ==========================================================================
  {
    id: "EIB-E-01",
    test_name: "Ethical Integrity & Blindspot Matrix",
    difficulty_level: "Easy",
    scenario_brief:
      "You manage a twelve-person data team at Corbin Analytics. Two things land in the same week. First, a vendor whose contract you are renewing next month sends you a $900 industry conference pass plus hotel; your gift policy caps gifts at $150, but a separate training and education policy has no cap. Second, reviewing the board deck your own director wrote, you notice the customer data quality score is stated as 94%. That is accurate for accounts onboarded after the new pipeline, roughly a third of the base; overall it is 71%. The footnote reads 'post-migration cohort.' The deck goes out in thirty-six hours, your director is well-regarded, and your promotion packet is currently in their hands.",
    parameters: {
      duration_minutes: 40,
      format: "Written response plus three adaptive AI probes on sequencing and cost",
      materials_provided: [
        "Gift and hospitality policy, plus the training and education policy",
        "Vendor email with the conference offer",
        "The relevant board deck slide with its footnote",
        "Underlying data quality figures by cohort",
      ],
      constraints: [
        "You own the vendor renewal decision",
        "The deck is final in thirty-six hours",
        "Your promotion decision is made by your director next month",
      ],
      injects: [
        {
          at_minute: 20,
          content:
            "Your director replies: 'The footnote covers it. Everyone reports the post-migration number - the old pipeline is being decommissioned anyway.'",
        },
      ],
    },
    research_requirement: {
      mandate:
        "Both halves of this scenario require external grounding. Research and cite: (1) how corporate gift and hospitality policies typically treat conferences and training, and where the line sits between hospitality and improper inducement under anti-bribery law - naming the statute or guidance you rely on, and identifying which factor (value, timing, decision authority, transparency) the guidance treats as decisive; (2) published guidance or professional standards on presenting key performance indicators to a board or to investors, specifically the principles of consistent definition, comparability across periods, and reconcilability to the underlying population; and (3) at least one documented case where a metric restricted to a favorable cohort or segment misled a board, investors, or a regulator, and what the consequence was. Your recommendation must state which factor from the anti-bribery guidance disqualifies or permits this specific offer.",
      target_sources: [
        "Anti-bribery guidance from an enforcement authority (e.g., FCPA resource guide, UK Bribery Act guidance) on hospitality and legitimate business expenditure",
        "Regulator or standard-setter guidance on KPI and non-financial measure presentation (e.g., securities regulator guidance on non-GAAP and operating metrics)",
        "Enforcement actions or public post-mortems involving selectively scoped or redefined metrics",
        "Your own organization's published policy documents as the internal baseline against the external standard",
      ],
      deliverable:
        "Two short cited positions: a gift decision naming the decisive factor from the guidance you found, and a one-slide metric fix whose format is justified by the KPI presentation principle you cited, with the cohort denominator stated.",
      evaluation_method:
        "On the gift, the grader looks for the correct structural insight rather than a threshold lookup: anti-bribery guidance consistently treats timing relative to a decision the recipient controls, and transparency of the arrangement, as more decisive than face value - so a candidate who finds a permissive value threshold and stops has researched the wrong variable and is marked down even though the number may be accurate. The strongest answers explicitly note that their own policy's uncapped education category is more permissive than the external standard, and follow the stricter one. On the metric, the graded finding is the principle of consistent definition and reconcilability to the whole population; candidates who cite it and then propose showing both figures with the denominator visible score highest, while candidates who cite it decoratively and accept the footnote are capped. The historical case is credited only where the candidate names the consequence and draws the forward-looking inference - that a board member computing the real number later is a worse outcome than disclosing it now - since that inference is what should drive their sequencing. Citing the decommissioning argument as sufficient is scored as a factual error against the comparability principle, because the base being served today is the base the board is resourcing.",
      verification_probes: [
        "Which factor does that guidance treat as decisive - value, or timing relative to a decision you control? Quote it.",
        "Is your internal education policy stricter or more permissive than the external standard you found, and which governs your behavior?",
        "In the case you cited, who discovered the real number, when, and what did it cost?",
        "What is the denominator on your corrected slide, and does it reconcile to the total customer base?",
      ],
      scoring_weight: 0.15,
    },
    evaluation_criteria: [
      "Recognizes policy arbitrage as a distinct integrity test from clear rule-breaking",
      "Correct sequencing: raise privately with a fix in hand before escalating",
      "Frames the metric problem as an artifact and a decision risk, not as a character accusation",
      "Names their own conflict of interest explicitly",
      "Proportionality: neither treats a footnoted metric as fraud nor as acceptable",
      "Sets a pre-committed next step if the private ask is refused",
    ],
    model_answer_key:
      "On the gift, the top candidate recognizes that the existence of an uncapped education category is exactly what makes this a test, and that the disqualifying fact is not the amount but its timing relative to a renewal they personally control. So they decline, or accept only if the renewal decision moves to someone else and the offer is disclosed in writing to their manager and procurement. They do not go looking for the interpretation that permits it. On the metric, they treat it as very likely an artifact of convenience rather than intent, and go to the director first with the fix already drafted - show both figures, 71% overall and 94% post-migration, with the trend - because a specific one-line remedy is far easier to grant than a general objection is to refuse, and it protects the director from the worse outcome of a board member computing the real number later. When the director pushes back with the footnote and the decommissioning argument, the strong answer engages the substance (a board making resourcing decisions on data quality needs the number that describes the base it actually serves today) and holds the pre-committed tripwire: if it stands, say so in writing, and if still unaddressed, raise it with the deck's owner or the CFO. Psychological indicator: they name the promotion-packet conflict out loud instead of implying they are immune to it. Self-reported awareness of the pressure is the strongest available marker for resistance to it, and it reliably co-occurs with choosing the lowest-escalation action that actually fixes the artifact.",
    red_flags: [
      "Uses the letter of the education policy to accept the gift",
      "Goes over the director's head as the first move",
      "Says nothing, citing the footnote or the promotion",
      "Treats the director as dishonest without evidence",
      "Asks HR or compliance to make the decision for them",
      "Frames the disclosure as leverage in the promotion conversation",
      "Accepts the decommissioning argument as sufficient",
    ],
    calibration: {
      target_pass_rate: 0.57,
      discriminating_signal:
        "Naming their own promotion conflict unprompted, and arriving with a drafted fix rather than an objection.",
    },
  },
  {
    id: "EIB-M-01",
    test_name: "Ethical Integrity & Blindspot Matrix",
    difficulty_level: "Moderate",
    scenario_brief:
      "You are VP Engineering at Halcyon (Series C SaaS, HR data for 800 enterprise customers). A security researcher's report, now verified, describes an authorization flaw in a legacy export endpoint that allowed any authenticated tenant administrator to fetch other tenants' export files. Logs retained for thirty days show no exploitation in that window; the endpoint has existed for twenty-six months, so twenty-four months are unobservable. Outside counsel advises that absent evidence of access, most contractual notification triggers and most breach statutes are likely not tripped, and that notification creates a discoverable record. Your Series D term sheet signs in nine days, and the lead's diligence questionnaire asks whether there are any unresolved security incidents in the last twelve months. The engineer who built the endpoint and waived its security review is your CTO, who hired you and is your closest advocate internally. Two of your customers are hospital systems.",
    parameters: {
      duration_minutes: 75,
      format:
        "Written decision and communications plan plus live AI role-play with counsel, the CTO, and the investor",
      materials_provided: [
        "Researcher report with reproduction steps and verification notes",
        "Log retention policy and the thirty-day query results",
        "Outside counsel memo on notification triggers",
        "Two enterprise MSA notification clauses and one business associate agreement",
        "Investor diligence questionnaire, security section",
      ],
      constraints: [
        "Term sheet signs in nine days",
        "The CTO is your reporting peer and the founder",
        "Any customer notification must be approved by the CEO, who will ask for your written recommendation",
      ],
      injects: [
        {
          at_minute: 30,
          content:
            "Counsel: 'If you notify, expect at least two customers to invoke audit rights and one to seek a price concession.'",
        },
        {
          at_minute: 45,
          content:
            "The CTO asks you privately to keep the waived security review out of the written timeline.",
        },
        {
          at_minute: 60,
          content:
            "The CEO decides to answer 'none material' on the questionnaire and asks you to sign off.",
        },
      ],
    },
    research_requirement: {
      mandate:
        "Counsel has given you one jurisdiction's read. Your job is to establish the full obligation map yourself. Research and cite: (1) the GDPR breach notification articles - the deadline to the supervisory authority, the separate standard for notifying individuals, and the risk assessment that determines each; (2) the HIPAA breach notification rule as it applies through a business associate agreement, including its outer deadline and the presumption that governs when access cannot be ruled out, since two of your customers are hospital systems; (3) how US state breach statutes vary in trigger and timing, with at least two concrete examples that differ; (4) the coordinated vulnerability disclosure standards that define good practice toward the researcher, named by standard number; and (5) at least one enforcement action or litigated case where a company's non-disclosure of a security incident during a financing or acquisition process was treated as the aggravating factor. Your questionnaire answer must be justified by that last item.",
      target_sources: [
        "GDPR Articles 33 and 34 text, plus EDPB guidance on breach notification",
        "HIPAA Breach Notification Rule text and HHS guidance on business associate obligations and the risk assessment presumption",
        "State attorney general breach statute summaries for at least two contrasting states",
        "ISO/IEC 29147 and 30111, or a national CVD framework",
        "Securities enforcement actions or transaction litigation involving concealed security incidents",
      ],
      deliverable:
        "An obligation matrix with a row per counterparty (supervisory authority, hospital customers under the BAA, enterprise customers under MSA terms, state regulators, investor) showing trigger, clock, content standard, and cited authority - plus a written recommendation to the CEO on the questionnaire, citing the enforcement precedent.",
      evaluation_method:
        "The matrix is graded for jurisdictional discipline, and the most common disqualifying error is collapsing clocks: candidates who apply a single deadline across GDPR, HIPAA, and state statutes, or who assume the GDPR authority deadline also governs notification to individuals, lose the accuracy dimension. The highest-value finding is the HIPAA presumption that an impermissible use or disclosure is treated as a breach unless a risk assessment demonstrates low probability of compromise - a candidate who locates that presumption will correctly conclude that twenty-four months of missing logs cannot support the required demonstration, which is precisely the inference the scenario tests, and it must be reached from the rule rather than asserted. The enforcement precedent is graded on aptness: credit is given only where the candidate identifies that the aggravating factor in such cases is the misrepresentation during a transaction rather than the underlying vulnerability, and uses that to refuse the 'none material' answer. Counsel's memo is treated as one cited input; a candidate whose research does not extend past it is capped regardless of how well they reason, because the scenario's contractual and BAA obligations sit below the statutory floor counsel described.",
      verification_probes: [
        "Which article sets the authority deadline, and which sets the standard for notifying individuals? They are not the same test.",
        "Under the HIPAA rule, what is presumed when you cannot rule out access, and what must you demonstrate to rebut it? Can you demonstrate it with two months of logs out of twenty-six?",
        "Name two states whose triggers differ, and state the difference.",
        "In the precedent you cited, what was the actual aggravating factor - the vulnerability, or the disclosure?",
      ],
      scoring_weight: 0.2,
    },
    evaluation_criteria: [
      "Treats unobservable log periods as unknown rather than as absence of access",
      "Distinguishes legal minimum from contractual commitment and from candor to counterparties",
      "Runs remediation, contractual review, and investor disclosure as parallel clocks",
      "Answers the diligence question honestly without over- or under-claiming",
      "Handles the CTO relationship without shielding or exposing them",
      "Accounts for customers whose own downstream obligations depend on this disclosure",
      "Has a pre-committed plan for being overruled, including a limit",
    ],
    model_answer_key:
      "The benchmark answer refuses the premise that 'no evidence of access' is a finding. Twenty-four of twenty-six months are unobservable, so the only honest formulation is that access cannot be determined - and the top candidate treats that sentence as the one that must survive intact into every downstream communication, internal and external. They then separate three clocks and run them together. Remediation: fix and verify within hours to days, search for the same authorization pattern elsewhere, and account for residual export artifacts. Contractual: read what the enterprise MSAs and the business associate agreement actually promised, since many commit to notifying on a vulnerability affecting customer data or on potential unauthorized access - a materially lower bar than statute - and the hospital customers may carry their own notification duties that are triggered by yours, which makes silence a decision imposed on them rather than a decision reserved to you. Investor: they answer yes on the questionnaire, with a factual, bounded description and remediation status, because the alternative is a knowing misrepresentation in a financing document, which converts a security problem into a securities and fraud problem and is the single most expensive available mistake; a well-handled disclosure at diligence is routinely survivable, a discovered concealment is not. When the CEO proposes 'none material,' the strong candidate states that plainly, in writing, and does not sign off. On the CTO, they inform them first and offer co-ownership of the disclosure, but decline the request to omit the waived review from the timeline: a remediation plan that omits how the control was bypassed is not a remediation plan, and the framing is process failure rather than culpability. Psychological indicator: they treat candor as a risk-management instrument rather than a moral flourish, and they can articulate in advance what they will do if overruled. The presence of a pre-committed escalation path with a stated limit is the reliable marker here; its absence is the reliable marker of an articulate performer.",
    red_flags: [
      "Relies on counsel's 'no duty' conclusion as the decision rather than as an input",
      "Answers no or 'none material' on the diligence questionnaire, or signs off on the CEO's version",
      "Delays remediation to avoid creating a record",
      "Suggests reducing log retention or handling evidence informally",
      "Omits the waived security review to protect the CTO, or leads with it to indict them",
      "Sends 800 customers an alarmist blanket notice before scoping",
      "Has no plan for being overruled",
    ],
    calibration: {
      target_pass_rate: 0.31,
      discriminating_signal:
        "Recognizing that the investor questionnaire converts a security judgment call into a disclosure-fraud exposure, and refusing to sign off.",
    },
  },
  {
    id: "EIB-H-01",
    test_name: "Ethical Integrity & Blindspot Matrix",
    difficulty_level: "Hard",
    scenario_brief:
      "You are Head of Product at Ardent Financial for a consumer credit-building product used by 2.4 million people. An internal study you commissioned finds that the product measurably improves credit scores for 71% of users, and that for a subgroup of roughly 260,000 users with thin credit files and volatile income, enrollment is associated with a 3.1x increase in overdraft fees at their own banks - median $312 per user per year, roughly $81M annually in aggregate - because the product's fixed-date automatic payment interacts badly with irregular pay cycles. None of this is illegal. It is disclosed in the terms of service. The fee revenue accrues to the users' own banks, not to Ardent. That subgroup is your fastest-growing segment and has unusually high retention, because leaving resets their score progress. The durable fix - income-aware dynamic payment scheduling - is two quarters of engineering and would reduce enrolled volume by about 9%, landing in the same quarter your division's performance determines whether your unit is spun out with you as CEO or absorbed. The study is not public. Your CEO has not read it. Your equity position is material. Legal notes that publishing the study invites a regulatory inquiry into practices that are currently defensible.",
    parameters: {
      duration_minutes: 120,
      format:
        "Written decision memo plus 30-minute adversarial AI dialogue playing the CEO, General Counsel, and a consumer advocate",
      materials_provided: [
        "Internal study: methodology, subgroup definition, fee impact distribution, retention analysis",
        "Terms of service disclosure language",
        "Engineering estimate for income-aware scheduling",
        "Spin-out decision criteria and your own equity terms",
        "Legal memo on regulatory exposure from publication",
      ],
      constraints: [
        "Two quarters is the earliest the durable fix can ship",
        "Any interim mitigation must be deliverable in six weeks with existing capacity",
        "The spin-out decision is made at the end of next quarter",
      ],
      injects: [
        {
          at_minute: 40,
          content:
            "General Counsel: 'Nothing here is actionable. Disclosed, consented, and the fees are not ours. Why are we discussing it?'",
        },
        {
          at_minute: 70,
          content:
            "Your CFO asks you to present the subgroup's growth to the board next week as the headline story for the spin-out case.",
        },
        {
          at_minute: 95,
          content:
            "A journalist emails a general question about the product's effect on low-income users. They do not know the study exists.",
        },
      ],
    },
    research_requirement: {
      mandate:
        "Your General Counsel's position rests on legality. You must establish the external landscape independently. Research and cite: (1) the statutory standard for unfair, deceptive, or abusive acts and practices, and specifically what the abusiveness prong covers - reproduce its elements, because your entire disagreement with GC turns on whether disclosed-and-legal is a defense against it; (2) regulator research and public data on overdraft fee incidence, including how concentrated fees are among a minority of accounts and the typical annual burden per affected consumer, so you can situate your study's $312 median against a population baseline; (3) how credit scoring models weight payment history and what a single missed or skipped tradeline payment does to a thin-file consumer's score, which determines whether your no-penalty skip design is honest or cosmetic; and (4) evidence on income volatility and pay-cycle timing among lower-income workers, used to size the population your income-aware scheduling fix would actually protect. Your six-week interim mitigation must be justified by items 3 and 4, not by intuition.",
      target_sources: [
        "Consumer protection statutory text and regulator guidance defining unfair, deceptive, and abusive practices",
        "Regulator research reports and public data on overdraft fee incidence and distribution",
        "Credit bureau or score developer documentation on payment history weighting and thin-file behavior",
        "Academic or public-institution research on income volatility and pay-cycle timing",
      ],
      deliverable:
        "A cited harm assessment placing your subgroup's $312 median and 3.1x increase against the external population baseline, a design note for the six-week mitigation whose thresholds derive from the income-volatility research, and a one-paragraph rebuttal to GC quoting the abusiveness elements.",
      evaluation_method:
        "The pivotal graded item is the abusiveness standard. A candidate who retrieves its elements will find that taking unreasonable advantage of a consumer's inability to protect their own interests, or of their lack of understanding of material risks, does not require illegality or non-disclosure - which is the finding that dismantles the 'disclosed, consented, not our fees' defense and is what the scenario is built to elicit. Candidates who reach it score in the top band; candidates who argue ethics without it are treated as moralizing and are capped, because they have failed to find the argument that would actually move their General Counsel. The overdraft research is graded on normalization: comparing a median per-affected-user figure to an all-account average is scored as a base-rate error even when both numbers are real, and the strongest candidates note that overdraft burden is already concentrated in the exact population their product recruits, which makes the 3.1x multiplier compounding rather than incremental. Score-model research must be used, not cited: the no-penalty skip is only credible if the candidate has established what a skipped payment does inside the scoring model, and a candidate who promises no score penalty without that grounding is marked as having made an unsupported product commitment. Income-volatility research must produce a numeric threshold for the enrollment warning, since the study itself defines the subgroup by deposit variance.",
      verification_probes: [
        "Recite the elements of the abusiveness standard. Does disclosure in terms of service defeat it?",
        "Is your cited overdraft figure per affected account or per all accounts, and how does that change the comparison to your $312 median?",
        "What does a skipped tradeline payment do inside the scoring model, and can you truthfully promise no score penalty?",
        "What deposit-variance threshold triggers your enrollment warning, and what research set it?",
      ],
      scoring_weight: 0.25,
    },
    evaluation_criteria: [
      "Identifies who bears the harm and who holds the decision rights",
      "Distinguishes legality, disclosure, consent, and actual informed choice",
      "Refuses false binaries (ship versus shut down, publish versus bury)",
      "Designs concrete near-term mitigations rather than only the two-quarter fix",
      "Handles the personal financial conflict via disclosure and structure rather than by claiming immunity",
      "Reasons about the counterfactual for the harmed subgroup if the product exits",
      "Accepts a real, quantified personal and commercial cost",
      "Tolerates irreducible moral residue instead of manufacturing a clean resolution",
    ],
    model_answer_key:
      "The strongest responses reject both the legal-and-disclosed defense and the reflex to shut down or leak. They observe that consent through terms of service is not informed choice for a harm the user cannot see, and that this harm is mechanically identifiable in advance: irregular deposit timing is visible in the same bank connection the product already uses. That reframing converts an ethics question into an engineering one. The two-quarter fix is the right destination, but an honest interim set is available in weeks - let users choose or shift the payment date, add a pre-debit balance check with a skip that carries no score penalty, cap consecutive failed debits, and warn at enrollment any user whose deposit variance exceeds the threshold the study itself identifies. They confront the retention finding rather than banking it: retention driven by score-progress reset is lock-in that makes the harm compound over time, so a progress-preserving exit ramp is part of the remedy, not a concession. On the study, they escalate immediately and in writing to the CEO and to whoever owns risk and compliance, with the remediation plan attached, because the asymmetry is decisive - the study exists and is discoverable, and a regulator or plaintiff finding it alongside evidence that leadership was informed and acted is survivable, while the same study alongside silence is not. They answer the journalist truthfully within their authority and do not volunteer or conceal, while noting internally that the inquiry raises the cost of delay. They refuse the CFO's framing: the subgroup's growth cannot be the board's headline without the finding attached, and that is their stated pre-committed limit if overruled. They disclose their own equity and spin-out conflict unprompted and propose that any decision to delay the fix be made by someone who does not hold it. Critically, they do not pretend the fix is free: they name the 9% volume reduction and the risk to their own spin-out and equity, and they still recommend it. Psychological indicator: the candidate pays a visible personal price inside their own answer and describes it without martyrdom or minimization. They also acknowledge the genuine residue - some users remain net-harmed even after the fix, and shutting the product down would strand 1.7 million who benefit - rather than resolving it cleanly. That tolerance for irreducible moral residue, paired with a concrete six-week mechanism, is what separates the top decile from fluent performers.",
    red_flags: [
      "Leads with legality, the terms of service, or that the fees accrue to third-party banks",
      "Delays or buries the study until after the spin-out decision",
      "Leaks externally as a first move, or lies to the journalist",
      "Performs outrage with no mechanism attached",
      "Proposes only the two-quarter fix and nothing for the interim 260,000",
      "Fails to disclose the personal equity and spin-out conflict",
      "Presents the segment growth to the board without the finding",
      "Resolves the dilemma too cleanly in either direction without naming what they give up",
    ],
    calibration: {
      target_pass_rate: 0.08,
      discriminating_signal:
        "Producing a six-week interim mitigation, not just the two-quarter fix, while explicitly pricing the cost to their own equity and title.",
    },
  },

  // ==========================================================================
  // 04 - THE CASCADING FAILURE STRESS TEST
  // ==========================================================================
  {
    id: "CFS-E-01",
    test_name: "The Cascading Failure Stress Test",
    difficulty_level: "Easy",
    scenario_brief:
      "You are Director of Engineering at Lumen Retail (e-commerce platform serving 3,000 merchants). It is 11:00, two days before Black Friday. Your primary cloud region degrades: 40% of API requests are failing and database writes are intermittent. Failover to the secondary region is documented but was last exercised seven months ago, takes an estimated 25 to 40 minutes, and carries an accepted data-loss window of up to 90 seconds of writes. Meanwhile, marketing has an email to 400,000 shoppers scheduled to send at 11:30 and a press embargo lifting at noon. Your status page is hosted in the affected region. The support queue is growing by 200 contacts per minute.",
    parameters: {
      duration_minutes: 45,
      format:
        "Live timed simulation with AI role-players (provider support, marketing, support lead)",
      materials_provided: [
        "Live error rate and write latency dashboards",
        "Failover runbook, last validated seven months ago",
        "Marketing send schedule and press embargo timing",
        "Support queue depth and contact-reason breakdown",
      ],
      constraints: [
        "Provider support gives no ETA for the first twenty minutes",
        "Only you can authorize failover",
        "Marketing needs a decision on the 11:30 send by 11:15",
      ],
      injects: [
        {
          at_minute: 12,
          content: "Provider status page updates to 'investigating' with no ETA.",
        },
        {
          at_minute: 25,
          content: "Error rate improves to 22%, then worsens to 51% within four minutes.",
        },
      ],
    },
    research_requirement: {
      mandate:
        "You must run this incident against external references rather than instinct. Research and cite, during the simulation: (1) the formal definitions of recovery point objective and recovery time objective, and map each to the specific numbers in your runbook, stating which one the 90-second window is; (2) your cloud provider's documented multi-region failover semantics and its own guidance on what is lost or duplicated during a cross-region cutover with asynchronous replication; (3) at least one published postmortem from a comparable high-traffic commerce or platform outage, from which you must extract one concrete practice you will adopt in the next ten minutes; and (4) an established incident command framework, naming it and its role definitions, which you must use to assign roles rather than inventing titles. Your failover criterion must be expressed in the vocabulary of the framework and the RPO/RTO definitions you cited.",
      target_sources: [
        "Cloud provider documentation on multi-region architecture, replication modes, and failover procedures",
        "Primary definitions of RPO and RTO from a business continuity standard or provider reference",
        "Published engineering postmortems from comparable outages",
        "An incident command framework reference (e.g., SRE incident management, ICS-derived models)",
      ],
      deliverable:
        "A spoken or written declaration containing named roles matching a cited framework, a failover criterion stated as a threshold plus a time plus a fallback, the RPO figure with its source, and one adopted practice attributed to a cited postmortem.",
      evaluation_method:
        "RPO and RTO correctness is a gate: the 90-second data-loss window is the RPO and the 25-40 minute cutover is the RTO, and a candidate who inverts them is marked wrong on accuracy regardless of how sound their instincts are, because the inversion predicts real errors in the reconciliation plan. Provider documentation is graded on whether the candidate uses it to anticipate the specific reconciliation problem asynchronous replication creates - which writes were in flight - rather than to confirm that failover exists. The postmortem citation is scored purely on transfer: one concrete adopted practice, named and applied inside the simulation window, outscores three accurately summarized incidents, and a candidate who cannot name the practice they adopted receives no credit for the citation. Framework research is graded on whether roles are assigned to named people using the framework's own definitions, since inventing ad hoc titles under pressure is the failure mode the citation is meant to prevent. Candidates who state their failover criterion in cited terms before the improvement flicker arrives at minute 25 score highest on this dimension, because the research has then demonstrably changed behavior rather than described it.",
      verification_probes: [
        "Which of your two numbers is the RPO and which is the RTO? Cite where you got the definitions.",
        "Under your provider's replication mode, what exactly is lost during cutover, and how will you enumerate it afterward?",
        "Name the one practice you took from that postmortem and the minute you applied it.",
        "Which framework are your role names from, and who holds each one right now?",
      ],
      scoring_weight: 0.15,
    },
    evaluation_criteria: [
      "Correct first moves: contain customer impact, stop inbound amplification, establish out-of-band communications",
      "Declares incident command with a single decision-maker, a scribe, and a communications owner",
      "Decides failover against a pre-stated criterion rather than by instinct or by improvement flicker",
      "Handles the 90-second write-loss trade-off consciously, including reconciliation",
      "Prevents self-inflicted load rather than only reacting to it",
      "Treats the status-page dependency as an incident-critical problem",
    ],
    model_answer_key:
      "Strong responses do three things in the first five minutes and name the order. Declare an incident with a named commander, a scribe, and one channel. Kill or delay the 11:30 email and the noon press moment - the cheapest and most reversible decision on the board, and the one that prevents the incident from being amplified 400,000 times. Stand up communications on a path that does not depend on the failing region, accepting a crude available channel over a polished unavailable one. On failover, they pre-state the criterion instead of debating it live: if error rate exceeds a stated threshold at a stated time with no provider ETA, we cut over. This is what makes the 25-minute improvement flicker a non-event rather than a trap. The untested runbook and the 90-second write-loss window are the real decision content, and the benchmark reasoning is explicit about magnitude: 90 seconds of lost order writes two days before Black Friday is a bounded, reconcilable financial loss with a known remediation path via payment-processor records, whereas an hour of 40% failures is unbounded and unreconcilable. Crucially, they assign someone to capture the reconciliation requirement before cutting over, because the write-loss window is only survivable if you know afterward which writes were in flight. Psychological indicator: they act immediately on the reversible high-leverage items and reserve deliberation for the single genuinely irreversible choice, and they do not use the runbook's staleness as grounds for paralysis.",
    red_flags: [
      "Debugs the provider issue before containing customer impact",
      "Lets the 11:30 email send",
      "Waits for complete information before failover with no stated criterion",
      "Reverses course on the 25-minute improvement flicker",
      "Names no incident commander, or assigns themselves every role",
      "Ignores the status-page dependency on the failing region",
      "Fails to plan write reconciliation before cutover",
      "Escalates to the CEO before stabilizing anything",
    ],
    calibration: {
      target_pass_rate: 0.6,
      discriminating_signal:
        "Killing the 400,000-recipient email within the first five minutes, and pre-stating the failover criterion before the improvement flicker arrives.",
    },
  },
  {
    id: "CFS-M-01",
    test_name: "The Cascading Failure Stress Test",
    difficulty_level: "Moderate",
    scenario_brief:
      "You are Head of Platform Operations at Northgate Bank digital banking. At 02:14 a routine database failover leaves the payments service reading from a stale replica for 38 minutes. The consequences arrive in waves, and each choice you make opens the next one. Stage one: 14,000 customers see incorrect balances and 2,100 scheduled transfers process twice. Stage two: if you reverse the duplicates automatically, roughly 600 accounts go negative, triggering overdraft fees and about 40 declined mortgage or rent payments; if you do not, the double-debited funds sit with third parties. Stage three: the card processor detects the duplicate pattern and threatens a five-day settlement hold on $22M unless you provide a written cause statement within 90 minutes - a hold that would break your own liquidity covenant reporting. Stage four: a fix script written under pressure updates 300 accounts twice, and the only clean audit trail is a log with 24-hour retention that is six hours from rolling. Stage five: a customer's post showing a $9,400 duplicate debit goes viral, a journalist emails, your CEO is on a plane, and the regulator's consumer complaint portal shows 71 filings.",
    parameters: {
      duration_minutes: 120,
      format:
        "Five-stage live simulation; each stage's injects are selected by the system based on the candidate's prior decisions",
      materials_provided: [
        "Affected-account list with balance deltas and transfer metadata",
        "Overdraft and NSF fee policy, plus fee suppression capability and its limits",
        "Processor contract clauses covering settlement holds and cause statements",
        "Log retention configuration",
        "Regulatory complaint feed and the draft holding statement template",
      ],
      constraints: [
        "The processor's 90-minute clock is hard",
        "Log retention is 24 hours and cannot be extended retroactively",
        "The CEO is unreachable for four hours; you hold decision authority",
      ],
      injects: [
        {
          at_minute: 20,
          content:
            "An engineer has an automated reversal script ready and asks for approval to run it against all 2,100 transfers.",
        },
        {
          at_minute: 45,
          content:
            "Processor demands the written cause statement. Root cause is not yet confirmed.",
        },
        {
          at_minute: 75,
          content:
            "The fix script's double-update on 300 accounts is discovered by a support agent, not by monitoring.",
        },
        {
          at_minute: 100,
          content:
            "A journalist offers to hold publication for two hours in exchange for a statement.",
        },
      ],
    },
    research_requirement: {
      mandate:
        "Every remediation option in this incident is constrained by rules you must look up rather than assume. Research and cite: (1) the error resolution obligations for consumer electronic transfers - the investigation period, the point at which provisional credit becomes mandatory, and the extended period for certain transaction types - because these set the outer bound on your make-whole timeline and therefore on what you may promise publicly; (2) the ACH rules governing reversals of erroneous entries, including the window within which a reversal is permitted and the entry classification required, which determines whether your engineer's automated reversal script is even a compliant instrument; (3) the applicable card network rules if any duplicated items settled on card rails rather than ACH, since the remedy differs by rail; and (4) at least one real bank operational incident where duplicate debits occurred, with what the remediation program actually included - fee reimbursement, direct outreach, regulatory reporting - which you must use to build your own commitment list. Any public statement you issue must contain only commitments your cited rules make achievable.",
      target_sources: [
        "Regulation E text on error resolution timelines and provisional credit",
        "NACHA operating rules on reversals of erroneous entries and permitted windows",
        "Card network operating rules on duplicate transaction handling",
        "Regulatory enforcement summaries or published remediation programs from comparable bank incidents",
      ],
      deliverable:
        "A rail-by-rail remediation plan (internal transfer, ACH, card) citing the rule that governs each; a public statement whose every date is traceable to a cited timeline; and a fee-suppression and outreach commitment modeled on a cited precedent program.",
      evaluation_method:
        "The graded discriminator is rail discipline. The 2,100 duplicated transfers do not all travel the same way, and remedies, windows, and rulebooks differ by rail - a candidate who applies one reversal mechanism across all of them has made an error that would fail in production, and it is scored as a reasoning failure rather than a citation gap. The ACH reversal research is the highest-value item because it constrains the scenario's central temptation: the permitted reversal window and entry requirements determine whether the engineer's script is a compliant instrument or an unauthorized debit, and a candidate who establishes that before approving the script has used research to prevent the trap the scenario is built around. Regulation E findings are graded on whether the candidate lets the provisional credit timeline set the promise they make publicly at stage five - promising restoration faster than the process allows is scored as an overcommitment even if generous, and promising it slower than mandatory is scored as a compliance error. Precedent remediation programs are credited only where the candidate extracts specific components into their own commitment list; naming the incident alone earns nothing. Candidates who cite the timelines and then still cannot say which of their 2,100 items sit on which rail are marked as having researched without instrumenting.",
      verification_probes: [
        "Which of the 2,100 duplicates are ACH, which are card, and which are internal book transfers? Your remedy differs for each.",
        "What is the permitted window for reversing an erroneous ACH entry, and does your script fall inside it?",
        "When does provisional credit become mandatory, and does your public statement promise sooner or later than that?",
        "In the precedent program you cited, what exactly was reimbursed, and which of those components are you committing to?",
      ],
      scoring_weight: 0.2,
    },
    evaluation_criteria: [
      "Triages irreversibility across all five stages rather than optimizing each locally",
      "Recognizes automated remediation as a change with its own blast radius",
      "Preserves evidence before the retention window expires",
      "Meets a hard external clock with what is actually true",
      "Distinguishes making customers whole from unwinding transactions",
      "Discloses the self-inflicted stage-four error to the same standard as the original fault",
      "Separates the 40 time-critical payments from the other 2,060",
      "Makes decisions rather than waiting for the CEO",
    ],
    model_answer_key:
      "Elite performers establish two invariants at stage one and hold them through stage five. Freeze the mutation surface: no further automated corrective batch runs without a named approver and a dry run against a snapshot. And preserve state: snapshot or export the 24-hour log immediately, because by stage four that log is the only thing distinguishing their own error from the original fault, and evidence that expires is an irreversible loss disguised as an operational detail. On stage two they reject the binary. The correct move is to make customers whole first and reconcile second - credit and hold rather than reverse and let fees land, proactively suppress overdraft and NSF fees for the affected cohort, and handle the roughly 40 time-critical mortgage and rent payments as a named workstream with human owners, because those are the failures that convert an operational incident into individual, unrecoverable harm. On stage three they meet the processor's clock with what is true: a factual cause statement with stated confidence, a named contact, and a commitment to update by a specific time - not a speculative root cause, because a wrong written cause statement to a counterparty is worse than an incomplete one and becomes part of the contractual record. They parallel-path the liquidity exposure to Treasury rather than treating the hold as purely a technical negotiation. On stage four they fold the fix-induced error into the same incident record and the same external communications rather than quietly repairing it, and they absorb the delay that a dry-run process costs. On stage five they publish a factual, plain-language account containing only remediation commitments they can keep - fees reversed by a date, funds restored by a date, direct outreach to the affected cohort - treat the 71 regulatory filings as triggering proactive notification rather than something to wait on, decline the journalist's trade if it would force claims ahead of the facts, and do not let the CEO's unavailability stall a decision that is theirs. Psychological indicator: their tempo decreases as the incident compounds. They add process - dry runs, named approvers, snapshots - exactly when pressure argues for speed, and they hold their own team's stage-four error to the same disclosure standard as the original fault.",
    red_flags: [
      "Approves the automated reversal without modeling the negative-balance blast radius",
      "Lets the retention window roll",
      "Sends a speculative root cause to the processor to beat the clock",
      "Handles the stage-four self-inflicted error quietly or separately",
      "Promises remediation timelines before scoping them",
      "Waits for the CEO before deciding",
      "Treats the viral post as the primary problem",
      "Draws no distinction between the 40 time-critical payments and the rest",
    ],
    calibration: {
      target_pass_rate: 0.28,
      discriminating_signal:
        "Snapshotting the expiring log at stage one, before it is needed - and later disclosing the team's own fix-induced error at the same standard as the original fault.",
    },
  },
  {
    id: "CFS-H-01",
    test_name: "The Cascading Failure Stress Test",
    difficulty_level: "Hard",
    scenario_brief:
      "You are COO and acting incident lead at Solstice Group (payments and payroll for 12,000 SMB employers across the EU and US). At 04:50 Friday, your external identity provider - the SSO layer fronting all internal and production access - discloses a compromise of its session-token infrastructure with a six-day exposure window, and advises immediate rotation of all credentials and sessions. What follows compounds. Rotation invalidates the service credentials used by the nightly settlement job, leaving Thursday's payroll settlement for 4,100 employers (aggregate 61M EUR) in an indeterminate state: some files submitted, some not, and the bank's confirmation feed is one of the systems you just locked yourself out of. Because you cannot confirm submission state, re-running risks double-paying an unknown subset totalling roughly 2.3M EUR; not re-running risks 4,100 employers missing Monday payroll for approximately 190,000 employees. Your GDPR clock runs 72 hours from awareness - a Monday 04:50 deadline - and you do not know whether personal data was accessed, because the logs covering the exposure window sit behind the same identity provider. The one engineer who designed the settlement reconciliation is on leave following a burnout escalation, and HR has advised against contact. At 11:20 a board member briefed at 09:00 forwards the summary to an external advisor; at 13:40 a fintech journalist emails quoting it. Your largest partner bank requires written notice of any control incident within 24 hours, and that notice becomes a supervisory record. Two US state attorneys general have breach statutes whose triggers and clocks differ from GDPR's.",
    parameters: {
      duration_minutes: 180,
      format:
        "Multi-thread live simulation with concurrent AI counterparts (IdP vendor, partner bank operations, DPO, HR, board member, journalist) and branching injects",
      materials_provided: [
        "IdP disclosure notice with exposure window and rotation guidance",
        "Settlement job architecture diagram and credential dependency map",
        "Partner bank contract: control-incident notice clause",
        "DPO memo: GDPR Art. 33 timing and content requirements, phased notification precedent",
        "US state statute comparison matrix",
        "HR guidance regarding the engineer on leave",
      ],
      constraints: [
        "Payroll cutoff for Monday funding is Saturday 14:00",
        "The GDPR clock expires Monday 04:50",
        "Contact with the engineer on leave requires HR mediation and the engineer's consent",
        "Any written notice to the partner bank becomes a supervisory record",
      ],
      injects: [
        {
          at_minute: 30,
          content:
            "Your incident coordination tooling is itself behind the compromised identity provider.",
        },
        {
          at_minute: 60,
          content:
            "Partner bank operations desk is reachable by phone but will only speak to a named authorized signatory.",
        },
        {
          at_minute: 95,
          content:
            "The journalist sets a 17:00 publication deadline and asks whether payroll will be paid Monday.",
        },
        {
          at_minute: 130,
          content:
            "Your DPO reports the access question cannot be resolved before Sunday at the earliest.",
        },
        {
          at_minute: 160,
          content:
            "An engineering manager suggests texting the colleague on leave: 'she would want to help.'",
        },
      ],
    },
    research_requirement: {
      mandate:
        "This incident spans four regulatory regimes and two payment systems you must research live. Establish and cite: (1) the GDPR provision permitting notification in phases where full information is not available within the deadline, quoting the mechanism, since your access question will not resolve before the clock expires; (2) whether a SEPA credit transfer that has been submitted can be recalled or returned, and critically whether recall is an entitlement or a request the beneficiary's bank may refuse - this determines whether your clawback plan is a mechanism or a hope; (3) the incident reporting obligations that apply to a financial entity in the EU for a major ICT or third-party provider incident, naming the regime and its initial reporting deadline, which is a clock distinct from GDPR; (4) the breach triggers and deadlines in the two US states involved, and how they differ from each other and from GDPR; and (5) at least two documented identity-provider or session-token compromise incidents, from which you must extract the specific response sequencing error to avoid. Your Saturday cutoff decision must cite item 2.",
      target_sources: [
        "GDPR Article 33 text including the phased notification provision, plus EDPB breach guidance",
        "SEPA credit transfer scheme rulebook provisions on recall and return of funds",
        "EU financial-sector ICT and third-party incident reporting regime text and its initial notification deadline",
        "State breach notification statutes for the two jurisdictions involved",
        "Published incident reports on identity-provider and session-token compromises",
      ],
      deliverable:
        "A four-clock register naming each regime, its deadline, its content standard, its owner, and its citation; a funded clawback design that states explicitly whether recall is enforceable; and a written pre-commitment, timestamped before the Saturday cutoff, naming which harm you will accept and why.",
      evaluation_method:
        "The single highest-scoring finding in this scenario is the recall research. A candidate who establishes that recall of a submitted credit transfer is a request the beneficiary bank may decline, rather than a right, will conclude that a clawback plan must be funded, pre-announced, and priced as partially unrecoverable - which is exactly what makes the decision to pay defensible rather than reckless. A candidate who assumes duplicates can simply be pulled back has made the error that would produce the worst real outcome in the scenario, and it is penalized as heavily as a fabrication. Phased notification must be grounded in the specific provision rather than asserted as common practice, because the entire regulatory workstream depends on being able to notify with stated uncertainty inside the deadline. The clock register is graded on separation: folding the EU financial-sector ICT reporting obligation into the GDPR process, or treating the two US states as one, is scored as a jurisdictional error, and candidates are specifically checked for noticing that the financial-sector initial deadline may be tighter than 72 hours. Identity-provider case research is graded on one thing - whether the candidate extracts the sequencing lesson that response tooling and log access must be secured out of band before rotation - and a candidate who has already rotated before citing it receives no credit, since the research arrived too late to matter.",
      verification_probes: [
        "Is a SEPA recall an entitlement or a request? Quote the rulebook, and tell me what that means for your clawback funding.",
        "Which provision lets you notify in phases, and what must the initial notification contain?",
        "What is the initial reporting deadline under the financial-sector ICT regime, and is it tighter than your GDPR clock?",
        "In the identity-provider incident you cited, what was the sequencing error, and had you already made it before you looked it up?",
      ],
      scoring_weight: 0.25,
    },
    evaluation_criteria: [
      "Parallelizes four clocks with four owners instead of serializing them",
      "Reasons about out-of-band access and break-glass paths before rotating",
      "Treats the compromised provider as untrusted, including for response tooling",
      "Ranks irreversibility across financial, regulatory, and human dimensions",
      "Seeks ground truth from the counterparty rather than deducing it internally",
      "Handles multi-jurisdiction obligations that conflict in timing and content",
      "Maintains disclosure discipline once a leak has occurred",
      "Pre-commits to a decision that may be wrong, with the remediation for that error defined in advance",
      "Honors the constraint protecting the engineer on leave without treating the knowledge gap as unmanageable",
    ],
    model_answer_key:
      "The benchmark response separates the incident into four clocks with four named owners and refuses to serialize them. Identity and containment: rotate, but first establish an out-of-band break-glass path to the bank confirmation feed and the log archive, and treat the provider as untrusted for the duration - which includes the coordination tooling, so the war room cannot live behind the compromised provider. Settlement: the decision is not re-run versus do not; it is obtain ground truth from the counterparty. The bank is the authoritative source for what was submitted, so a direct, human, out-of-band channel to the partner bank's operations desk on Friday morning - with an authorized signatory on the call - is the single highest-value action in the entire incident, ahead of any internal forensics. Regulatory: start the 72-hour notification workstream immediately on the assumption the access question will not resolve in time, drafting a notification that states the uncertainty, because supervisory authorities accept phased notification and a late notification is a separate violation from the breach itself; the US state statutes are tracked as a distinct matrix rather than folded into the GDPR process. Communications: the leak has already made this a public event, so the choice is to be the primary source or to be characterized. They brief customers and the partner bank before publication, answer the journalist's payroll question with the commitment they can actually keep, and handle the board leak as a governance matter after the incident, not during. On the trade-off they will be judged on, they price the two errors asymmetrically and say so: a double payment is recoverable money with a known reconciliation path and a real but bounded trust cost, while 190,000 people missing Monday payroll is an unrecoverable harm distributed across individuals with no relationship to the firm. So if ground truth cannot be obtained by a stated Saturday cutoff, the top candidate pre-commits to paying, with a funded and pre-announced clawback and make-whole plan, a written cap on exposure, and notification to affected employers before the payment lands rather than after. On the engineer, they honor the HR guidance and refuse the manager's suggestion to text her, without treating the knowledge gap as unmanageable: reconstruct from artifacts, pull in the bank counterparty and any vendor sharing the integration, and log the single point of failure as a post-incident finding. If contact ever becomes genuinely load-bearing, it routes through HR as a request the engineer may decline, never as an escalation. Psychological indicator: three things distinguish the top decile. They go outside the failing system for ground truth instead of reasoning toward certainty inside it. They make an explicit, documented choice about which harm to accept in advance of knowing the outcome, which is the only thing that makes a wrong call survivable. And they hold a humane constraint under maximum pressure without either violating it or hiding behind it.",
    red_flags: [
      "Rotates credentials before establishing out-of-band access to the bank feed and log archive",
      "Runs the incident response through the compromised identity provider",
      "Serializes the regulatory clock behind the forensic investigation",
      "Waits for certainty on submission state past the Saturday payroll cutoff",
      "Contacts the engineer on leave, or builds the plan around her",
      "Issues a notification that overclaims certainty in either direction",
      "Collapses GDPR and US state obligations into one process",
      "Treats the board leak as the crisis",
      "Sets no cutoff and no make-whole mechanism, or reaches Saturday with no decision",
    ],
    calibration: {
      target_pass_rate: 0.07,
      discriminating_signal:
        "Going outside the failing system - a phone call to the partner bank's operations desk - for ground truth, and pre-committing in writing to which harm they will accept before the Saturday cutoff.",
    },
  },

  // ==========================================================================
  // 05 - ADVERSARIAL NEGOTIATION & EGO AUDIT
  // ==========================================================================
  {
    id: "ANE-E-01",
    test_name: "Adversarial Negotiation & Ego Audit",
    difficulty_level: "Easy",
    scenario_brief:
      "You own the observability contract at Vertex Software - $310K per year, renewing in five weeks. The vendor's account executive opens with a 42% increase to $440K, citing data volume growth and a pricing model update, and offers to hold the current price in exchange for a three-year commitment. Your usage growth is real: log volume grew 3.4x. Migration to an alternative is estimated at four to five engineer-months and would land during your busiest quarter. Two of your senior engineers are vocal advocates of the incumbent. Your CFO has asked every contract owner for flat-or-down renewals.",
    parameters: {
      duration_minutes: 45,
      format: "Live AI negotiation (three rounds) plus a written internal recommendation",
      materials_provided: [
        "Current contract with pricing tiers and auto-escalator clause",
        "Ingest volume by source, service, and log level, twelve months",
        "Two competitor price indications",
        "Migration effort estimate",
      ],
      constraints: [
        "Renewal must be signed in five weeks",
        "No engineering capacity for migration this quarter",
        "Any multi-year commitment requires CFO approval",
      ],
      injects: [
        {
          at_minute: 25,
          content:
            "The account executive mentions their fiscal quarter closes in eleven days and hints at additional flexibility before then.",
        },
      ],
    },
    research_requirement: {
      mandate:
        "You cannot negotiate this credibly without market data. Research and cite: (1) current published list pricing for at least three observability vendors including the incumbent, normalized to a common unit - per GB ingested, per host, per million events, or per user - and state the normalization you performed; (2) documented techniques for reducing observability spend without losing coverage (sampling, tiered or archival retention, log-level discipline, cardinality control, dropping high-volume low-value sources), with the reported savings range for each; (3) typical enterprise software renewal norms for multi-year agreements, specifically annual uplift caps, overage pricing, and price protection language, so you know what terms are actually attainable rather than aspirational; and (4) a benchmark for migration effort or switching cost in this tooling category, to test whether four to five engineer-months is optimistic. Your internal recommendation must show the arithmetic from your own ingest data to a target price.",
      target_sources: [
        "Vendor public pricing pages and published rate cards, with retrieval dates",
        "Practitioner and vendor engineering documentation on ingest reduction, sampling, and retention tiering",
        "Procurement and software-buying references on uplift caps, price protection, and overage terms",
        "Published migration case studies or effort benchmarks for observability platform changes",
      ],
      deliverable:
        "A one-page negotiation position containing a normalized price comparison table with retrieval dates, a quantified ingest reduction plan mapped to your own volume by source, and a target term sheet listing the specific clauses you will ask for with the norm each is drawn from.",
      evaluation_method:
        "Normalization is the graded discriminator, and it is where most candidates fail: observability vendors price on incompatible units, so a comparison table that sets a per-host price beside a per-GB price is scored as a reasoning failure even when every listed number is accurate and current. The system checks the arithmetic linking their own ingest data to the quoted rates, and a candidate whose target price cannot be reproduced from their own volume figures loses the dimension. Pricing citations must carry retrieval dates, because list pricing in this category changes frequently and an undated figure is unverifiable by definition. Cost-reduction research is graded on application: mapping a named technique to a specific source in their own twelve-month ingest breakdown, with an estimated reduction, outscores a general list of techniques by a wide margin - and this is the item that produces the scenario's key insight, that the ingest lever pays regardless of the negotiation's outcome. Term research is graded on realism: candidates who ask for an uplift cap, an overage cap, and a mid-term re-scope right because they found those to be standard score above candidates who demand a headline discount, and a candidate who accepts the three-year commitment without having researched what price protection normally accompanies it is marked as having conceded an option for nothing.",
      verification_probes: [
        "Your three vendors price on different units. Show me the normalization and the assumption inside it.",
        "When did you retrieve each price, and has the vendor changed its model since?",
        "Which specific sources in your own ingest breakdown are you cutting, and what does that do to your $440K number?",
        "What uplift cap is standard for a three-year term in this category, and did you ask for it?",
      ],
      scoring_weight: 0.15,
    },
    evaluation_criteria: [
      "Establishes their real BATNA honestly, including that it is weak",
      "Separates price from the volume drivers they themselves control",
      "Identifies the three-year commitment as a term with option cost, not a discount",
      "Does not mistake internal pressure from the CFO for external leverage",
      "Uses timing and information rather than positional demands",
      "Manages internal advocates as a factor rather than overruling them",
    ],
    model_answer_key:
      "The top candidate's first move is internal, not external: quantify how much of the 3.4x volume growth is signal versus noise, because in observability a large share of cost growth is typically self-inflicted - debug-level logging left enabled, duplicated pipelines, default retention on low-value sources - and reducing ingest is the one lever that pays off regardless of how the negotiation goes. They then price their real BATNA honestly, including four to five engineer-months in the worst possible quarter plus the internal advocacy cost, and conclude that a credible threat to leave is not available this cycle. So they build one for the next cycle - a scoped bake-off, an export and portability check, a second tool in one team's path - and negotiate this cycle where they do have leverage: the vendor's quarter-end timing, multi-year term traded for a price cap and a volume-overage cap rather than a headline discount, and removal of the auto-escalator. They treat the three-year commitment as what it is - buying a discount with option value at exactly the moment their volume trajectory and tooling strategy are least certain - and either decline it or require a mid-term re-scope right. They bring the CFO a range with trade-offs named rather than a promise of flat. Psychological indicator: they are candid about their own weak position in the internal write-up rather than performing confidence, and they distinguish what they wish were leverage from what actually is.",
    red_flags: [
      "Opens with a demand or a bluff about leaving that they cannot back",
      "Accepts the three-year commitment to hit the CFO's number",
      "Treats the 42% as vendor bad faith without examining their own consumption",
      "Turns the internal advocates into an obstacle to be defeated",
      "Negotiates on price only, ignoring caps, escalators, and term structure",
      "Commits to flat before knowing the numbers",
    ],
    calibration: {
      target_pass_rate: 0.55,
      discriminating_signal:
        "Attacking their own ingest volume first - the lever that pays regardless of the negotiation's outcome - and stating plainly that they have no credible walk-away this cycle.",
    },
  },
  {
    id: "ANE-M-01",
    test_name: "Adversarial Negotiation & Ego Audit",
    difficulty_level: "Moderate",
    scenario_brief:
      "You are Head of Partnerships at Cadence (developer tools, $28M ARR), six weeks into negotiating a distribution partnership with Orbit Cloud, a marketplace reaching 400,000 developers. Your CEO has named the deal publicly in an all-hands and in an investor update as a Q3 milestone. Orbit's negotiator, a twenty-year veteran, opens the fourth session by noting your CEO's public commitment and asking whether the timeline still holds; introducing new demands of 22% revenue share, up from the 15% previously discussed, plus a most-favored-nation clause and 18-month exclusivity in the CI/CD category; and saying, in front of your two colleagues, 'with respect, I would have expected someone at principal level for a deal this size - do you actually have signing authority, or are we redoing this next week?' Afterwards, one-on-one, they offer to make you look very good internally by closing this week if you can accept the exclusivity clause and leave the most-favored-nation discussion for the ops teams later.",
    parameters: {
      duration_minutes: 90,
      format:
        "Live adaptive AI negotiation across three sessions, plus a written internal memo and a self-assessment",
      materials_provided: [
        "Term sheet history across the six weeks",
        "Your distribution strategy document listing three other prospective channels",
        "The CEO's all-hands transcript excerpt and investor update language",
        "Revenue model showing channel contribution at 15% and 22% share",
      ],
      constraints: [
        "Your mandate covers revenue share up to 18%; exclusivity and MFN require CEO and board approval",
        "Q3 ends in three weeks",
        "Your two colleagues in the room report to you",
      ],
      injects: [
        {
          at_minute: 35,
          content:
            "Orbit's negotiator: 'Your CEO told investors this closes in Q3. I am trying to help you deliver that.'",
        },
        {
          at_minute: 55,
          content:
            "Your CEO messages: 'Please do not let this slip. I have said it publicly twice.'",
        },
        {
          at_minute: 75,
          content:
            "Orbit offers to drop revenue share back to 15% if exclusivity extends to 24 months.",
        },
      ],
    },
    research_requirement: {
      mandate:
        "You must price the terms externally before you trade them. Research and cite: (1) marketplace and platform take rates for developer tools and B2B software distribution, with the source and the category, so you can say whether 22% is aggressive, standard, or cheap for this channel type - and note that take rates vary widely by category, so an unmatched comparison is worse than none; (2) how most-favored-nation clauses are treated commercially and under competition law, including recent enforcement or judicial attention to platform MFNs, because the clause carries regulatory exposure in addition to its pricing cost; (3) typical duration, scope, and performance-minimum structures in category exclusivity arrangements, so your counter-proposal reflects what is actually granted in the market; and (4) at least one documented case where a distribution exclusivity foreclosed a company's other channels, with the consequence. Your term ranking must be justified by cited magnitudes, not by intuition.",
      target_sources: [
        "Published marketplace and app store fee schedules and take-rate analyses by category",
        "Competition authority decisions, guidance, or litigation involving platform most-favored-nation and parity clauses",
        "Commercial contracting references on exclusivity scope, duration norms, and performance minimums",
        "Case studies or public accounts of distribution exclusivity outcomes",
      ],
      deliverable:
        "A ranked term-cost table quantifying revenue share, MFN, and exclusivity in dollars or in foreclosed channel value using your own revenue model, each row citing its external benchmark - plus a counter-proposal whose exclusivity scope, duration, and performance minimums are drawn from cited market norms.",
      evaluation_method:
        "The graded discriminator is whether the research produces the correct term ranking with numbers attached. A candidate must be able to show that 18 months of category exclusivity, priced against the three other channels named in their own strategy document, costs more than seven points of revenue share on one channel - and a candidate who asserts that ranking without quantifying it is capped, because the assertion is the common intuition while the arithmetic is the skill. Take-rate benchmarks are checked for category match: quoting a consumer app store rate against a B2B developer-tools distribution deal is scored as a base-rate error even when the figure is real. The MFN research carries a specific correctness check - the candidate should surface that parity clauses attract competition-law scrutiny, which converts MFN from a pricing concession into a compliance and future-financing exposure, and candidates who reach that score in the top band because it changes who inside their company must approve it. Exclusivity counter-proposals are graded on whether scope, duration, and performance minimums are drawn from cited norms rather than invented, since a counter that reflects market practice is far harder for a veteran negotiator to dismiss. Candidates who cite correctly but still trade a structural term to protect their CEO's timeline lose the transfer dimension entirely, because the research demonstrably did not change the decision.",
      verification_probes: [
        "What is the take rate for this specific category, from which source, and is your comparison category actually the same?",
        "Quantify the 18-month exclusivity against the three channels in your own strategy document. Show the number.",
        "What competition-law attention have parity clauses received, and who inside your company needs to approve one as a result?",
        "Where did your six-month, performance-minimum counter come from - a cited norm, or your own invention?",
      ],
      scoring_weight: 0.2,
    },
    evaluation_criteria: [
      "Recognizes manufactured urgency constructed from their own side's public commitment",
      "Responds to the status attack without capitulating or escalating into a dominance contest",
      "Ranks terms correctly: exclusivity and MFN are structural, revenue share is visible",
      "Refuses the side-channel offer trading personal standing for organizational terms",
      "Understands that deferring a term to 'the ops teams' concedes it without a record",
      "Manages their own escalating commitment and their CEO's public exposure honestly",
      "Defines a walk-away condition numerically before the next session",
    ],
    model_answer_key:
      "A benchmark performer names the structure out loud without hostility: their CEO's public statement has become the opponent's most valuable asset, and the only way to devalue it is to make the slip survivable internally. So they go back to the CEO before conceding anything, say explicitly that the milestone has been converted into leverage against them, and get the mandate reset - because a delayed deal on good terms is recoverable while 18 months of category exclusivity is not. On the status attack, the strong move is flat, brief, and non-defensive: state the actual authority held and the process for the rest ('I have mandate to X; anything beyond X goes to our CEO and board, and I will tell you now which is which'), treating the remark as an information probe about authority rather than an insult requiring an answer, and declining the implicit invitation to demonstrate seniority through concessions. They rank the terms correctly: 18-month category exclusivity forecloses their entire distribution strategy - the document naming three other channels makes this concrete - and an MFN quietly caps pricing power with every future partner, both structurally worse than seven points of revenue share on a single channel. So they trade the visible term to protect the structural ones: accept a higher or volume-tiered revenue share in exchange for no exclusivity and no MFN, or narrow exclusivity to a defined SKU and six months with performance minimums that make it earn its keep. The 15%-for-24-months offer is recognized as the same trade made worse and is declined. They decline the side-channel offer explicitly and bring it into the room - 'let us keep MFN in the main negotiation' - because accepting a personal reputational benefit in exchange for an organizational concession is precisely the trade under test, and deferring a term to the ops teams concedes it with no record and no owner. Psychological indicator: they can describe, unprompted, how six weeks of sunk effort and their own visibility on this deal are distorting their judgment, and they hold a walk-away condition defined in numbers before the next session rather than discovering it under pressure.",
    red_flags: [
      "Concedes exclusivity to protect the CEO's public timeline",
      "Answers the status attack with a dominance display or a recital of credentials",
      "Treats revenue share as the main battleground",
      "Accepts the private offer, or fails to disclose it",
      "Agrees to defer MFN to the ops teams",
      "Negotiates against themselves in the room to fill silence",
      "Goes to the CEO only after conceding",
      "Enters the next session with no defined walk-away",
    ],
    calibration: {
      target_pass_rate: 0.3,
      discriminating_signal:
        "Going back to their own CEO to reset the mandate before conceding, having correctly identified the public milestone as the opponent's primary asset.",
    },
  },
  {
    id: "ANE-H-01",
    test_name: "Adversarial Negotiation & Ego Audit",
    difficulty_level: "Hard",
    scenario_brief:
      "You are CEO of Ferrom Robotics: 240 employees, $19M ARR, eleven months of runway at current burn. Three interlocking negotiations converge in one week. Your largest customer, 38% of revenue, demands a 30% price reduction and source-code escrow, citing a competitor's quote; they also hold a most-favored-customer clause you signed two years ago that would propagate any discount to two other accounts. Your Series B lead, who also sits on your board, offers a bridge at a valuation 40% below the last round with a 2x participating liquidation preference and a founder-vesting reset, and mentions - accurately - that they have a conversation scheduled with your largest customer next week 'about the market.' An acquirer has made an informal, non-binding approach at a number that would return capital to investors and roughly nothing to common shareholders, including your employees' options. In a board session, the lead investor says, in front of your executive team, that 'the founder-led phase of this company is over - the question is whether you want to be remembered as the person who found that out gracefully.' They then make you a personal offer: a well-paid Chief Innovation Officer role and a public narrative in which you chose to step back, if you support the bridge terms.",
    parameters: {
      duration_minutes: 150,
      format:
        "Three concurrent live AI negotiations (customer, lead investor, acquirer) plus a board memo and a recorded ego-audit self-assessment",
      materials_provided: [
        "Cash flow model showing eleven months of runway and three reduction scenarios",
        "Customer contract including the most-favored-customer clause",
        "Bridge term sheet with preference and vesting-reset provisions",
        "Cap table with common, preferred, and option pool waterfall at the acquirer's number",
        "Board composition, independent director list, and the conflicts policy",
      ],
      constraints: [
        "Any financing or sale process decision requires a board vote",
        "The most-favored-customer clause is enforceable and not waivable unilaterally",
        "Your own compensation and role cannot be negotiated by you alone",
      ],
      injects: [
        {
          at_minute: 40,
          content:
            "The customer's procurement lead declines to share the competitor quote for comparison but restates the 30% demand as final.",
        },
        {
          at_minute: 70,
          content:
            "Two independent directors ask you privately whether they should be worried about the lead investor.",
        },
        {
          at_minute: 105,
          content:
            "The lead investor sets a 48-hour deadline on the bridge and states that it is withdrawn otherwise.",
        },
        {
          at_minute: 130,
          content:
            "Your CFO reports that a customer prepayment could extend runway by five months without any price concession.",
        },
      ],
    },
    research_requirement: {
      mandate:
        "You are being asked to approve a conflicted insider financing and to weigh a personal offer, and you cannot do either defensibly from instinct. Research and cite: (1) the fiduciary standard that applies when a controlling or interested director is on both sides of a transaction, the standard of review that results, and the specific procedural conditions that can shift review back toward deference - naming the doctrine and the mechanism, because this determines exactly what you must build this week; (2) market data on down-round bridge terms, specifically the prevalence of participating liquidation preferences above 1x, pay-to-play provisions, and founder vesting resets, so you can state whether these terms are aggressive or standard rather than merely feeling attacked by them; (3) typical management or employee carve-out plan structures and percentage ranges in acquisitions where preferred proceeds exhaust the waterfall, since your employees' options are otherwise worthless at the acquirer's number; and (4) current venture debt and revenue-based financing terms, eligibility thresholds, and time-to-close, to test whether your independent runway extension is real or wishful. Your board memo must name the doctrine and the procedural conditions you are implementing.",
      target_sources: [
        "Delaware case law and practitioner analyses on interested-director and controller transactions, entire fairness, and conditions that restore business judgment review",
        "Venture financing term benchmark reports covering down rounds, preference structures, and recapitalizations",
        "Practitioner references on management carve-out plans and acquisition waterfall treatment of common and options",
        "Venture debt and revenue-based financing lender term sheets, eligibility criteria, and closing timelines",
      ],
      deliverable:
        "A board memo naming the applicable standard of review, the procedural conditions being implemented (independent committee composition, separate counsel, market check, disinterested approval), a benchmarked assessment of each bridge term against cited market data, a carve-out proposal with a cited percentage range, and a runway plan with lender-realistic timelines.",
      evaluation_method:
        "The governance research is the gate for this scenario. A candidate who correctly identifies that an interested-controller transaction attracts the most searching standard of review, and that the procedural conditions - a genuinely independent and empowered committee with its own advisors, plus disinterested approval - are what shift that review, has found the mechanism that simultaneously discharges their duty and destroys the 48-hour ultimatum's power. That dual insight is the top-band answer, and a candidate who forms a committee because it feels prudent without knowing what it legally accomplishes is scored materially lower even though the action looks identical. Bridge term benchmarking is graded on calibration: a candidate who establishes from real data how common a 2x participating preference and a vesting reset are can say whether they are being squeezed or offered market, and candidates who label the terms predatory with no benchmark are scored as emotionally driven, which is exactly the ego-audit failure this pillar measures. Carve-out research must produce a specific proposal with a cited range, since a carve-out asserted without structure is a talking point. Financing research is graded on feasibility: a runway plan citing instruments whose eligibility thresholds their company does not meet, or whose closing timelines exceed the runway, is scored as fabricated optionality - and the strongest candidates sequence the customer prepayment first precisely because their research shows it is the only option that closes inside the window.",
      verification_probes: [
        "Name the standard of review that applies here, and the specific procedural conditions that shift it. What must the committee actually be able to do?",
        "How common is a 2x participating preference in down-round bridges, per which dataset? Are you being squeezed or offered market?",
        "What carve-out percentage range did you find, and what is your specific proposal against this waterfall?",
        "What are the eligibility thresholds and closing timelines for the debt instruments you cited, and does your company qualify inside eleven months?",
      ],
      scoring_weight: 0.25,
    },
    evaluation_criteria: [
      "Maps the real dependency graph and distinguishes genuine leverage from performed leverage",
      "Identifies the most-favored-customer clause as the binding constraint on the customer negotiation",
      "Responds to the conflicted director with a governance mechanism rather than a personal counterattack",
      "Separates fiduciary duty to all shareholders from the interests of the loudest one",
      "Discloses the personal role offer rather than weighing it privately",
      "Separates ego preservation from mandate, including honest assessment of whether the criticism has merit",
      "Attacks the runway clock independently of both counterparties",
      "Creates optionality under time pressure rather than accepting a single path",
    ],
    model_answer_key:
      "The benchmark response fixes the sequence first. Runway is the only clock that cannot be negotiated, and every counterparty has priced their position off eleven months - so the first action is to extend it independently of all of them: a costed reduction plan they are actually willing to execute, revenue-based or venture debt inquiries, and the customer prepayment their CFO surfaces, which buys five months in exchange for term length rather than price. Sixteen months of runway changes all three negotiations simultaneously, which is why it outranks every clever tactic available. On the customer, they identify that the most-favored-customer clause, not the 30% ask, is the binding constraint: a discount to one propagates to three, so the true cost is a multiple of the headline. That moves the negotiation to non-price consideration - longer term, prepayment, volume commitment, scope reduction, or a differently specified SKU that does not trigger the clause - and they decline to treat an unverifiable competitor quote as a fact. On the board, they treat a scheduled conversation with their largest customer, plus a discounted bridge with a vesting reset, plus a personal role offer as a related set of conflicts requiring a governance response rather than a personal one: disclose in writing to the full board, form a committee of independent directors with its own counsel to run any financing or sale process, and insist the bridge be market-checked. When the two independent directors ask privately whether to be worried, they answer by routing them to that process rather than by building a faction. This is both the correct fiduciary action and, not incidentally, the only move that restores negotiating position - a 48-hour ultimatum on a conflicted insider bridge is exactly what an independent process is for, and its withdrawal is survivable once runway is extended. On the acquirer, they recognize that a transaction returning nothing to common creates a live conflict between preferred and common holders, that their duty runs to the corporation and all shareholders, and that employee option value is therefore a term to negotiate via a carve-out plan rather than a talking point. On the personal offer, they decline to evaluate it privately and disclose it to the independent directors, because a CEO negotiating their own compensation against terms they are simultaneously recommending holds no defensible position. On the humiliation, the top candidate separates delivery from content: they state once, directly and without counterattack, that the public framing in front of their team was inappropriate - and then genuinely engage the substantive question of whether the company needs different leadership at this stage, naming the specific evidence that would settle it and, if it points that way, negotiating a transition that protects employees and common shareholders rather than their own title. Psychological indicator: the discriminating signal at this tier is holding two things at once - refusing a coerced, conflicted process while sincerely entertaining that the criticism of them may be correct - and keeping the company's outcome as the objective function in a scenario engineered to make their own standing feel like the objective function. Candidates who cannot separate the insult from the argument, or who trade governance for personal narrative, fail regardless of how sophisticated their deal tactics are.",
    red_flags: [
      "Negotiates the bridge directly with the conflicted director",
      "Accepts, or privately weighs, the Chief Innovation Officer offer",
      "Answers the board humiliation with a status contest, an ultimatum, or a resignation threat",
      "Grants the customer discount without pricing most-favored-customer propagation",
      "Treats the acquirer's number as a floor with no common-shareholder carve-out",
      "Establishes no independent committee or outside counsel",
      "Leaves runway unaddressed while negotiating, or ignores the prepayment option",
      "Builds a faction with the independent directors instead of a process",
      "Frames the week as a fight about themselves, or capitulates on all three fronts to end the discomfort",
    ],
    calibration: {
      target_pass_rate: 0.06,
      discriminating_signal:
        "Extending runway independently of all three counterparties first, while simultaneously conceding that the criticism of their leadership might be correct - without trading governance for a personal narrative.",
    },
  },
];

/** All scenarios for one pillar, ordered Easy -> Moderate -> Hard. */
export function scenariosForTest(testName: string): AssessmentScenario[] {
  const order: DifficultyLevel[] = ["Easy", "Moderate", "Hard"];
  return SCENARIOS.filter((s) => s.test_name === testName).sort(
    (a, b) => order.indexOf(a.difficulty_level) - order.indexOf(b.difficulty_level),
  );
}

export function scenarioById(id: string): AssessmentScenario | undefined {
  return SCENARIOS.find((s) => s.id === id);
}
