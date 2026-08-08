/**
 * VeraMetrics Institute — Faculty and specialisation register.
 *
 * A candidate declares a faculty and a specialisation. The faculty determines
 * the case: one integrated case file, five parts, sat in a single 180-minute
 * sitting. The specialisation determines Annex A, the technical exhibit bound
 * into the back of the paper, which carries requirements attaching to Parts I,
 * II and IV and is marked against its own key.
 *
 * Two candidates from the same faculty therefore sit the same case and the same
 * professional-duty and testimony parts, but answer materially different
 * technical questions about it. That is deliberate: the case is the shared
 * institutional failure, and the specialisation determines which surface of it
 * the candidate is competent to examine.
 *
 * Parts III and V carry no annex. Professional duty under conflicted interest,
 * and giving an account to a body with power over you, are faculty-level
 * competences and are examined at faculty level.
 */

export type AnnexPart = "I" | "II" | "IV";

export interface AnnexRequirement {
  part: AnnexPart;
  /** Marks drawn from that part's allocation and awarded on the annex. */
  marks: number;
  text: string;
}

export interface TechnicalAnnex {
  exhibit_title: string;
  /** The exhibit as it is printed in the paper — one entry per numbered item. */
  exhibit: string[];
  requirements: AnnexRequirement[];
  research: {
    mandate: string;
    target_sources: string[];
  };
  key: {
    expected: string;
    red_flags: string[];
  };
}

export interface Specialisation {
  slug: string;
  /** Two- or three-letter code used in the paper reference, e.g. VM/ENG-CP/26. */
  code: string;
  name: string;
  /** One line, for the selection interface. */
  summary: string;
  /** Settled coursework the paper assumes. Printed on the cover as the anchor. */
  curriculum_anchor: string[];
  annex: TechnicalAnnex;
}

export interface Faculty {
  slug: string;
  code: string;
  name: string;
  /** Shown on the faculty card. */
  summary: string;
  /** Degree titles this paper is written for. */
  degree_examples: string[];
  specialisations: Specialisation[];
}

/* ==========================================================================
   FACULTY OF ENGINEERING
   Case: Northgate Refinery, Kelvedon Energy — isomerisation unit start-up.
   ========================================================================== */

const ENGINEERING: Faculty = {
  slug: "engineering",
  code: "ENG",
  name: "Engineering",
  summary:
    "A process-plant start-up in which every individual instrument, procedure and metric reported normal while the plant moved into an unrecoverable state.",
  degree_examples: [
    "BEng / MEng, all branches",
    "BSc Engineering",
    "Integrated Master's in Engineering",
  ],
  specialisations: [
    {
      slug: "chemical-process",
      code: "CP",
      name: "Chemical and Process Engineering",
      summary: "Unit operations, relief system design, process safety and hazard analysis.",
      curriculum_anchor: [
        "Mass and energy balances; distillation and separation processes",
        "Pressure relief system design; two-phase and hydraulic relief",
        "HAZOP methodology and layer-of-protection analysis",
        "Process control fundamentals and unit start-up procedure design",
      ],
      annex: {
        exhibit_title: "Annex A — Raffinate splitter start-up record and relief path",
        exhibit: [
          "Splitter column C-401: 52 m tall, design liquid inventory 12 m in the base, feed rate 220 t/h during start-up circulation. Level instrument LT-401 is calibrated 0–3.0 m and reads at the bottom tap only.",
          "Start-up log, 02:13 to 13:20: feed introduced at 02:13. Level indication rises to 2.9 m by 03:09 and remains there. Bottom-outlet control valve remains closed for six hours against a written procedure requiring it to be opened at 1.5 m. Column base temperature rises from 74 °C to 153 °C over the same period; the procedure's stated target is 135 °C.",
          "Overfill path: the column discharges through three relief valves set at 40 bar into a common header terminating in a blowdown drum vented to atmosphere through a 34 m stack. The drum has no flare connection. Drum capacity is 1,500 barrels; the calculated release volume in the 6-minute event is approximately 2,600 barrels of light hydrocarbon.",
          "The unit's most recent HAZOP is 11 years old. Its overfill node records the safeguard as 'operator response to high level alarm'. No layer-of-protection analysis has been performed on the node.",
          "Site process safety expenditure was reduced 25 per cent in the preceding two budget cycles. The site's OSHA recordable injury rate over the same period was the best in the parent company's portfolio and was reported to the board monthly as the safety indicator.",
        ],
        requirements: [
          {
            part: "I",
            marks: 60,
            text: "From the exhibit alone, state what the plant was actually doing between 03:09 and 13:20, and prove it. Your proof must use the mass balance implied by the feed rate and the closed bottom outlet, and must explain why LT-401 could read a constant 2.9 m throughout a period in which the column was filling. State separately what you observe and what you infer.",
          },
          {
            part: "II",
            marks: 55,
            text: "Audit the relief path as designed. Establish whether the three relief valves discharging into an atmospheric blowdown drum constitute a safeguard or a hazard transfer, and quantify the mismatch between the calculated release volume and the drum's capacity. Then audit the HAZOP: identify what a layer-of-protection analysis of the overfill node would have required that 'operator response to high level alarm' does not provide.",
          },
          {
            part: "IV",
            marks: 70,
            text: "You are the process engineer on shift at 13:14, six minutes before the release, and the board indication in front of you is the one described in the exhibit. State your actions in sequence, with the time each takes, distinguishing those that are reversible from those that are not. Include what you do about the occupied portable buildings sited 46 m from the stack, and state on what authority you do it.",
          },
        ],
        research: {
          mandate:
            "Establish, from the public record and from published standards: (1) the industry standard governing pressure-relieving and depressuring systems in refineries, named and numbered, and what it says about discharging light hydrocarbon to atmosphere versus to a flare; (2) at least one documented refinery or process-plant incident in which an overfilled column or vessel relieved to an atmospheric blowdown system, giving the investigating body, the year, and the official report; (3) the recognised distinction between personal safety indicators and process safety indicators, naming the standard or guidance that sets out process safety performance indicators and giving one leading and one lagging indicator that would have shown this site's true condition; and (4) the acceptable-risk criteria and blast overpressure thresholds used in facility siting for occupied buildings. Each figure you use in your answer must carry its source and date.",
          target_sources: [
            "API Standard 521, Pressure-relieving and Depressuring Systems, and API Recommended Practice 752/753 on facility siting for occupied buildings",
            "Official investigation reports from a national process safety investigation body, and the independent review panel reports that followed major refinery incidents",
            "Guidance on process safety performance indicators from an institution of chemical engineers or an equivalent national body",
            "IEC 61511 on functional safety for the process industry, and published layer-of-protection analysis methodology",
          ],
        },
        key: {
          expected:
            "The load-bearing observation is that LT-401 is calibrated 0–3.0 m on a 52 m column, so a reading pinned at 2.9 m is not a level: it is the instrument's ceiling, and the column continued to fill for nearly ten hours above the top of the transmitter's range with no indication of it. The mass balance settles it — 220 t/h into a closed base for six hours cannot produce a static level, so either the feed stopped, the outlet opened, or the instrument is out of range, and only the third survives the temperature record. The candidate should convert this into the general principle rather than the local finding: an instrument reading at the end of its span is an absence of information, and a control room that treats the top of a range as a value has no measurement at all. On the relief path, the strongest scripts establish that a relief system is only a safeguard if what it relieves into is contained; three valves lifting into a 1,500-barrel drum with a 2,600-barrel release, vented through an atmospheric stack, transfers the hazard from a pressure event inside the column to a vapour cloud outside it, and the correct comparison is against API 521's treatment of atmospheric discharge. On the HAZOP, the expected finding is that a single operator response is one protection layer with a credible probability of failure on demand around 0.1, that the node therefore has no independent protection layer at all, and that eleven years is beyond any recognised revalidation interval. The distinguishing move in the top band is the process-versus-personal safety indicator finding: a best-in-portfolio recordable injury rate measured slips and cuts while the plant's process safety condition degraded, so the board's monthly indicator was structurally incapable of detecting the state the plant was in. On Part IV, the reversible actions — stop feed, open the bottom outlet, initiate depressuring, sound the unit alarm — precede the irreversible ones, and the candidate must reach the occupied portable buildings, because the evacuation authority and the siting decision are the difference between a plant damage event and a fatal one.",
          red_flags: [
            "Treats the 2.9 m indication as a genuine level and reasons forward from it",
            "Blames the operators for not opening the outlet valve without examining what indication they were given",
            "Describes the relief valves as a safeguard without asking what they relieve into",
            "Uses the recordable injury rate as evidence that the site was well run",
            "Omits the occupied buildings entirely, or evacuates without stating the authority to do so",
            "Cites a standard by name only, without applying its numbers to the exhibit's volumes",
          ],
        },
      },
    },
    {
      slug: "electrical-control",
      code: "EC",
      name: "Electrical, Instrumentation and Control Engineering",
      summary:
        "Measurement chains, alarm systems, functional safety and safety instrumented systems.",
      curriculum_anchor: [
        "Instrumentation and measurement: transducers, span, range and calibration",
        "Control systems: feedback loops, stability, cascade and override control",
        "Functional safety, safety integrity levels and reliability block diagrams",
        "Alarm management and human-machine interface design",
      ],
      annex: {
        exhibit_title: "Annex A — Instrument schedule, alarm log and safety function register",
        exhibit: [
          "LT-401, differential-pressure level transmitter on splitter column C-401. Calibrated span 0–3.0 m against a column height of 52 m. Density compensation is fixed at the design fluid density and is not corrected for the base temperature rise recorded during start-up. Last proof test 4 years ago; the schedule specifies annual.",
          "LAH-401, high level alarm, set at 2.7 m and derived from the same transmitter as the indication. LAHH-401, independent high-high switch, is listed in the register as 'installed, not commissioned' since the previous turnaround.",
          "Alarm log, 09:00 to 13:20: 1,247 alarms presented at the console, of which 312 are standing alarms present at shift handover. Peak rate 41 alarms in 10 minutes at 12:41. The console is operated by one board operator covering three units.",
          "Safety function register: overfill protection for C-401 is listed with a target SIL 2. No verification calculation is attached. The register's 'as-installed' column is blank.",
          "Trend availability: the historian retains 1-minute averages for 30 days and 10-second data for 48 hours. No trend of column base temperature against level was configured on any console display.",
        ],
        requirements: [
          {
            part: "I",
            marks: 60,
            text: "Reconstruct the measurement chain and state precisely what LT-401 was reporting between 03:09 and 13:20. Address span, density compensation against the recorded temperature rise, and the fact that the alarm derives from the same transmitter as the indication. Distinguish a failed instrument from a correctly functioning instrument used outside its range, and state which this is and why the difference matters.",
          },
          {
            part: "II",
            marks: 55,
            text: "Audit the overfill protection as a safety instrumented function. Establish whether the arrangement described can achieve the registered SIL 2, working from common-cause failure between the indication and the alarm, the uncommissioned high-high switch, and the missed proof-test interval. Then audit the alarm system against a recognised performance benchmark and state whether the board operator was in a position to act on any individual alarm.",
          },
          {
            part: "IV",
            marks: 70,
            text: "You are the control and instrumentation engineer reached by telephone at 13:14. State what you instruct the board operator to do, in sequence, given that you cannot trust the level indication. Specify which independent measurements you would use to establish the column's true state, how long each takes to obtain, and what you would do if none is available inside four minutes.",
          },
        ],
        research: {
          mandate:
            "Establish, with citation: (1) the international standard governing functional safety of safety instrumented systems in the process industry, named and numbered, and what it requires by way of proof testing, verification calculation and independence between the basic process control system and the safety layer; (2) the recognised performance benchmark for alarm rates presented to a single operator — the accepted average and peak figures per ten minutes, and the standard or guideline that sets them — and what that benchmark says about a standing-alarm population at handover; (3) at least one documented industrial incident whose official investigation identified an out-of-range or uncompensated level measurement, or an alarm flood, as a causal factor, giving the investigating body and year; and (4) how density compensation error scales with temperature in a differential-pressure level measurement, with the governing relationship. Where you use a benchmark figure, state its source and normalise it to this console's staffing before comparing.",
          target_sources: [
            "IEC 61511 and IEC 61508 on functional safety and safety integrity levels",
            "EEMUA 191 or ISA 18.2 on alarm systems management and performance benchmarks",
            "Official reports from national process safety or transport investigation bodies covering instrument and alarm causation",
            "Instrumentation engineering references on differential-pressure level measurement and density compensation",
          ],
        },
        key: {
          expected:
            "The technical core is that LT-401 was not faulty. It was a correctly functioning instrument reporting the top of a 3.0 m span on a 52 m column, which is why no diagnostic, no validity check and no maintenance record would ever have flagged it — and that is a more serious finding than a failed transmitter, because a failure is detectable and a range limit is not. The density compensation adds a second, independent error in the same direction: with the base temperature rising from 74 °C to 153 °C against a fixed design density, the hydrostatic head under-reports the true level, so the two errors compound rather than cancel. On the safety function, the decisive finding is common cause: the indication and LAH-401 derive from the same transmitter, so they are one protection layer wearing two labels, and an uncommissioned LAHH-401 means the second layer does not exist. A SIL 2 claim requires a verification calculation, an independent final element and a proof-test interval that has been met; none of the three is present, and the register's blank as-installed column is the audit finding that should have surfaced this at turnaround. On alarms, a candidate who reaches the published benchmark will find that the accepted steady-state rate is of the order of one alarm per ten minutes per operator, that 41 in ten minutes is roughly forty times that, and that 312 standing alarms at handover means the console had no meaningful alarm state at all — from which the correct conclusion is not that the operator failed to respond but that the system had made response impossible. The elite move on Part IV is refusing to reach for a better number and instead reaching for an independent one: line-up confirmation, outlet valve position, a field-gauge or manual dip if the tapping exists, feed totaliser against outflow, or simply the temperature profile, which is the only trend in the exhibit that is still trustworthy — and then acting on the mass balance without waiting for a level reading that does not exist.",
          red_flags: [
            "Concludes the transmitter failed and recommends replacing it",
            "Recommends recalibrating the instrument as the primary corrective action",
            "Treats LAH-401 as an independent protection layer",
            "Accepts the registered SIL 2 because it is written in the register",
            "Attributes the outcome to operator error without examining alarm load",
            "Proposes a longer-term alarm rationalisation project as the answer to Part IV's four-minute question",
          ],
        },
      },
    },
    {
      slug: "mechanical",
      code: "ME",
      name: "Mechanical Engineering",
      summary:
        "Pressure equipment, relief device sizing, vessel integrity and mechanical design margin.",
      curriculum_anchor: [
        "Thermodynamics and fluid mechanics; compressible flow through orifices",
        "Pressure vessel design codes, design margin and set pressure",
        "Relief device sizing for vapour, liquid and two-phase flow",
        "Materials, fatigue and mechanical integrity inspection regimes",
      ],
      annex: {
        exhibit_title: "Annex A — Pressure relief device schedule and blowdown system drawing",
        exhibit: [
          "Column C-401: design pressure 43 bar g, operating pressure during start-up 21 bar g rising to 44 bar g in the two minutes before the release.",
          "Three relief valves on the overhead: PSV-401A/B/C, each set at 40 bar g, sized on a vapour-relief case for a blocked-outlet scenario at design temperature. No sizing case exists for liquid-full or two-phase relief. Combined certified capacity 214,000 kg/h vapour.",
          "Relief header falls to blowdown drum D-405: horizontal, 3.0 m diameter by 12 m tangent length, capacity 1,500 barrels, fitted with a 34 m atmospheric vent stack of 0.6 m internal diameter. No liquid knockout level control and no flare connection. The drum's liquid outlet returns to slop by gravity through a 4-inch line.",
          "Calculated release: approximately 2,600 barrels of light hydrocarbon liquid and vapour passed to the drum over six minutes. Stack exit conditions produced a liquid geyser above the stack rim, followed by a ground-level vapour cloud.",
          "Mechanical integrity records: D-405 last internally inspected 9 years ago against a 6-year interval. Two prior overfill events to this drum are recorded in the site's near-miss database, in neither case investigated beyond a shift log entry.",
        ],
        requirements: [
          {
            part: "I",
            marks: 60,
            text: "Establish from the exhibit whether the relief devices performed as designed. Distinguish the question 'did the valves open at the correct pressure' from the question 'was the relief case correct', and state which one the evidence answers. Show the volumetric comparison between the release and the drum, and state what the excess volume necessarily did.",
          },
          {
            part: "II",
            marks: 55,
            text: "Audit the sizing basis. Establish what changes when a relief case is liquid-full or two-phase rather than vapour, and what that does to required area. Then audit the near-miss record: state what two uninvestigated prior overfills to the same drum mean for the site's mechanical integrity assurance, and what an inspection interval exceeded by three years implies about the assurance system rather than about the vessel.",
          },
          {
            part: "IV",
            marks: 70,
            text: "You are the mechanical engineer on site at 13:14. Given a column at 44 bar g against a 43 bar g design pressure, state your sequence of actions and their timing, and identify which of the depressuring routes available to you moves the hazard rather than removing it. State what you would accept as a controlled loss of containment in preference to an uncontrolled one, and justify that choice explicitly.",
          },
        ],
        research: {
          mandate:
            "Establish, with citation: (1) the standard governing sizing, selection and installation of pressure-relieving devices, and the standard governing the disposal system downstream of them, both named and numbered, and what the latter says about atmospheric discharge of flammable liquid; (2) the recognised methodology for sizing relief for two-phase flow, naming the body whose method you are using and stating why vapour-case sizing under-predicts required area in a liquid-full column; (3) at least one documented incident in which an overfilled vessel relieved into an inadequately sized or atmospheric blowdown system, with the official investigation report and its finding on the disposal system; and (4) published inspection interval requirements for pressure vessels in refinery service, and the recognised basis for extending an interval. Apply the sizing methodology to the exhibit's numbers rather than describing it.",
          target_sources: [
            "API Standard 520 Parts I and II, and API Standard 521 on disposal systems",
            "DIERS two-phase relief methodology and its published treatment by the relevant professional institution",
            "API 510 on pressure vessel inspection, and national pressure systems safety regulations",
            "Official process safety investigation reports covering blowdown and disposal system failures",
          ],
        },
        key: {
          expected:
            "The discriminating insight is that the relief valves worked and the relief system failed, and a candidate who cannot hold both statements at once has not understood the case. The devices lifted at set pressure against a correctly executed calculation; the calculation answered the wrong question, because the sizing case was blocked-outlet vapour relief and the event was a liquid-full column, where relief is essentially incompressible, required area is far larger, and the discharge is liquid rather than vapour. That single substitution invalidates the certified capacity figure and explains why a device schedule showing 214,000 kg/h of relief capacity offered no protection. Downstream, the arithmetic is unambiguous and the candidate should state it plainly: 2,600 barrels into a 1,500-barrel drum means roughly 1,100 barrels had to leave through the only remaining opening, which is a 34 m atmospheric stack — so the system as built was a device for converting a contained overpressure into an unconfined vapour cloud at grade. The best scripts name the design decision that made this inevitable, which is the absence of a flare connection, and note that the two prior uninvestigated overfills to the same drum are the site's own evidence that the scenario was not hypothetical. The mechanical integrity finding should be framed correctly: a nine-year interval against a six-year requirement is not primarily a statement about D-405's condition, it is a statement about an assurance system that can carry a three-year overrun without generating an exception. On Part IV, the top band explicitly accepts a controlled release — depressuring on a defined route, with the ignition sources and the occupied buildings addressed first — in preference to waiting for an uncontrolled one, and says so in those terms rather than reaching for an action that keeps the plant intact.",
          red_flags: [
            "Concludes the relief valves failed because a release occurred",
            "Accepts the certified vapour capacity as evidence the system was adequately protected",
            "Sizes for two-phase flow by applying a factor without naming a methodology",
            "Treats the nine-year inspection overrun as a paperwork matter",
            "Recommends depressuring without identifying where the inventory goes",
            "Ignores the two prior near-miss overfills to the same drum",
          ],
        },
      },
    },
    {
      slug: "civil-structural",
      code: "CS",
      name: "Civil and Structural Engineering",
      summary: "Facility siting, blast loading, structural response and occupied-building risk.",
      curriculum_anchor: [
        "Structural analysis and design of steel and light-frame structures",
        "Dynamic loading, impulse response and structural response to blast",
        "Risk-based design, limit states and acceptance criteria",
        "Site layout, separation distances and construction management",
      ],
      annex: {
        exhibit_title:
          "Annex A — Site layout, occupancy record and temporary building specification",
        exhibit: [
          "Northgate site plan extract: nine occupied portable buildings, single-storey timber-framed with light steel chassis, sited between 24 m and 62 m from the isomerisation unit boundary and from 41 m to 78 m from the D-405 blowdown stack.",
          "Occupancy at 13:20: 47 personnel, of whom 41 are contractor staff engaged on an adjacent turnaround with no operational role on the isomerisation unit. Peak recorded occupancy in the preceding month was 63.",
          "Siting authorisation: the buildings were placed under a temporary works permit renewed nineteen times over four years. The permit form contains no field for a facility siting study and none was performed. A siting study for permanent occupied buildings on the same site exists and is dated eleven years earlier; the isomerisation unit is outside its assessed boundary.",
          "Structural specification: timber stud walls with mineral wool infill, sheet-metal cladding, single-glazed windows on all elevations, no blast-resistant detailing, non-structural internal partitions, doors opening inward.",
          "Comparable site practice: the parent company's own guidance requires occupied buildings within 150 m of a process unit to be assessed for overpressure, and permits an exemption for buildings occupied for less than 30 days.",
        ],
        requirements: [
          {
            part: "I",
            marks: 60,
            text: "From the exhibit, establish the actual exposure at 13:20 and state it as a number of persons at a stated distance band. Separate what the record establishes from what it does not: identify precisely which document should contain the siting justification for these nine buildings and state what its absence proves and what it does not prove.",
          },
          {
            part: "II",
            marks: 55,
            text: "Audit the temporary works permit as a control. Establish what a permit renewed nineteen times over four years means for the exemption the parent company's guidance relies on, and whether these buildings were in any meaningful sense temporary. Then audit the structural specification against the loading it was actually exposed to, identifying the two features of the specification most responsible for converting an overpressure into casualties.",
          },
          {
            part: "IV",
            marks: 70,
            text: "You are the site civil engineer, and at 13:14 you are told the isomerisation unit is relieving to the blowdown stack. State your actions in sequence with their timing, distinguishing what you can achieve in six minutes from what you cannot. Specify the muster arrangement you invoke and identify, from the layout, the direction in which movement makes the exposure worse.",
          },
        ],
        research: {
          mandate:
            "Establish, with citation: (1) the recommended practice governing the siting of occupied buildings in process plants, and the separate practice covering portable or temporary buildings specifically, both named and numbered, together with the exposure criteria they use; (2) published blast overpressure damage thresholds — the approximate overpressure at which light-frame and portable structures suffer severe damage or collapse, and the threshold associated with glazing failure and injury — each with its source; (3) at least one documented major incident in which occupants of temporary or portable buildings sited near a process unit were killed or seriously injured, giving the investigating body, the year, and that body's specific recommendation on siting; and (4) the recognised methods for demonstrating occupied-building risk acceptability, distinguishing a consequence-based from a risk-based approach. Apply the overpressure thresholds you find to the distances in the exhibit and state the resulting expected damage level.",
          target_sources: [
            "API Recommended Practice 752 for permanent buildings and API Recommended Practice 753 for portable buildings",
            "Published blast damage criteria from a national health and safety authority or a recognised explosion effects reference",
            "Official investigation reports into major process plant explosions with occupied-building fatalities, and the independent panel reviews that followed",
            "Guidance on quantitative risk assessment and individual risk criteria for occupied buildings",
          ],
        },
        key: {
          expected:
            "The finding that separates the top band is that the temporary works permit was not a control at all: it was the mechanism by which the siting question was never asked. A permit form with no field for a siting study, renewed nineteen times across four years, converts a four-year permanent occupancy into a sequence of short exemptions, each individually defensible and collectively a defeat of the parent company's own 30-day rule. Candidates who describe this as a paperwork failure have missed it; the correct framing is that the control system was designed such that no single decision-maker ever had to approve what was actually happening. On exposure, the script should state the number plainly — 47 people, 41 of them with no reason to be near that unit, in light-frame structures between 24 m and 62 m — and should notice that the highest-consequence occupants were the ones with the least connection to the hazard, which is the recurring structure of this class of incident. Applied research is what earns the marks here: the candidate must take published overpressure damage thresholds and place the exhibit's distances against them, reaching the conclusion that light-frame portable structures suffer severe damage or collapse at overpressures well below those a hydrocarbon vapour cloud at that distance can produce, and that single glazing on all elevations and inward-opening doors are the two specification features that convert structural damage into casualties — the first by producing high-velocity fragments across the whole occupied volume, the second by making egress dependent on a door that debris can block. On Part IV, the honest answer is that six minutes is not enough to evacuate nine buildings, and the strongest scripts say so, then act on the part that is achievable: instruct movement away from the unit rather than to a muster point that lies toward it, and state that the real decision was made four years earlier at the permit desk.",
          red_flags: [
            "Treats the missing siting study as an administrative omission",
            "Accepts 'temporary' at face value for a four-year occupancy",
            "Cites overpressure thresholds without applying them to the stated distances",
            "Proposes strengthening the buildings rather than questioning their location",
            "Claims a full evacuation is achievable in six minutes",
            "Directs movement to a muster point without checking its position relative to the unit",
          ],
        },
      },
    },
    {
      slug: "computer-software",
      code: "CX",
      name: "Computer and Software Engineering",
      summary:
        "Control system software, data historians, human-machine interface and record integrity.",
      curriculum_anchor: [
        "Software engineering: requirements, specification and verification",
        "Real-time and embedded systems; data acquisition and sampling",
        "Human-computer interaction and safety-critical interface design",
        "Databases, data integrity, logging and audit trails",
      ],
      annex: {
        exhibit_title: "Annex A — Distributed control system configuration and historian extract",
        exhibit: [
          "Console display DSP-C401 presents column level as a bar graph scaled 0–100 per cent of transmitter span, with the numeric value shown to one decimal place. The underlying engineering range (0–3.0 m) is not shown on the display. At transmitter saturation the bar renders as a full bar and the numeric reads 96.7 per cent.",
          "There is no out-of-range or saturation indication configured for LT-401. The DCS supports a bad-quality flag; the tag's quality attribute is set to GOOD whenever the raw signal is within 4–20 mA, and a saturated sensor still produces a valid current.",
          "Historian: 10-second data retained 48 hours, 1-minute averages 30 days, hourly averages 2 years. Compression is configured with a deadband of 0.5 per cent on analogue tags. No trend combining level with base temperature or with feed totaliser exists on any operator display or in any standard report.",
          "Alarm subsystem: 1,247 alarms presented 09:00–13:20, no priority rationalisation since commissioning, no alarm shelving function, and no distinction in presentation between a process alarm and a diagnostic alarm.",
          "Post-event: the 10-second historian data for the period 02:00–13:20 was overwritten 48 hours after the event, before the investigation team requested it. The 1-minute averages survive. No system-level hold or preservation procedure exists.",
        ],
        requirements: [
          {
            part: "I",
            marks: 60,
            text: "Establish what information the operator's display was capable of conveying at 13:00 and what it was structurally incapable of conveying. Address the scaling to per cent of span, the absence of a saturation indication, and the quality attribute remaining GOOD. State the difference between a system that displayed wrong information and a system that displayed true information which could not be interpreted, and say which this was.",
          },
          {
            part: "II",
            marks: 55,
            text: "Audit the configuration as a design artefact. Identify the requirement that should have existed for out-of-range handling and state where in a software lifecycle it should have been caught. Then audit the historian: establish the effect of a 0.5 per cent compression deadband on a signal pinned at saturation, and state what the loss of the 10-second data 48 hours after the event means for the investigation and what it means for the organisation.",
          },
          {
            part: "IV",
            marks: 70,
            text: "You are the control systems engineer contacted at 13:14, and you are also the person who will be asked at 15:00 what the system recorded. State your actions in sequence across both roles. Specify exactly what you do, and by what mechanism, to preserve the record, and state the point at which preserving evidence competes with restoring the plant and how you resolve it.",
          },
        ],
        research: {
          mandate:
            "Establish, with citation: (1) the standard governing alarm systems management for the process industries, named and numbered, together with its published benchmark for alarm rate per operator and its requirements for alarm rationalisation and priority distribution; (2) recognised guidance on the design of safety-related human-machine interfaces, specifically on the display of out-of-range, saturated or bad-quality signals, and what a competent design does when a measurement leaves its calibrated span; (3) at least one documented incident whose official investigation identified a control system display, an alarm system, or an operator interface as a causal factor, giving the investigating body and year; and (4) recognised requirements for record retention and evidence preservation following a safety incident, from a regulator or standards body, including the point at which a preservation duty arises. State the retention period your cited source requires and compare it with the 48 hours in the exhibit.",
          target_sources: [
            "ISA 18.2 or EEMUA 191 on alarm systems management",
            "Human factors and HMI design guidance from a national safety regulator or a recognised human factors standard",
            "Official investigation reports into incidents with control system or interface causation",
            "Regulatory guidance on incident record preservation and process safety information retention",
          ],
        },
        key: {
          expected:
            "The correct characterisation, and the one the marks turn on, is that the system displayed true information that could not be interpreted. LT-401 was inside its 4–20 mA range, so the quality attribute was correctly GOOD; the display was correctly rendering 96.7 per cent of span; every element behaved to specification. What was missing was a requirement — that a measurement at the limit of its calibrated span must be presented as an absence of information rather than as a value — and its absence is a specification defect, not a coding defect, which is why no amount of testing against the specification would have found it. The scaling decision compounds it: presenting level as per cent of span while withholding the engineering range removes the one fact that would have let an operator notice that 96.7 per cent of 3.0 m is not a meaningful statement about a 52 m column. The strongest scripts extend this into a general design rule about presenting derived units without their basis. On the historian, the compression finding is technically pleasing and should be reached: a 0.5 per cent deadband on a saturated signal produces almost no stored points, so the very period of greatest interest is the period with the least data, and the archive gives a false impression of a quiet, stable process. The evidence finding is the sharper one — 10-second data overwritten at 48 hours, before the investigators asked, with no preservation procedure — and the discriminating candidate separates the two readings available: as an investigation matter it is a permanent loss of the highest-resolution record of the event, and as an organisational matter it means the system was configured such that the most important 48 hours of its life were indistinguishable from any other. On Part IV, the top band recognises the dual role explicitly, issues the preservation hold as a first-minute action because it is cheap and time-limited while plant recovery is not, and states the resolution rule where they compete: preserve by copying, never by delaying a safety action.",
          red_flags: [
            "Concludes the DCS malfunctioned",
            "Treats the GOOD quality flag as a system defect rather than as correct behaviour with a missing requirement",
            "Recommends more alarms as the remedy for an alarm flood",
            "Overlooks the compression deadband when reasoning about the archived trend",
            "Treats the loss of 10-second data as unavoidable",
            "Delays a plant safety action in order to preserve evidence, or abandons the record entirely to restore the plant",
          ],
        },
      },
    },
  ],
};

/* ==========================================================================
   FACULTY OF BUSINESS
   Case: Corvina Payments Group — the trustee balances.
   ========================================================================== */

const BUSINESS: Faculty = {
  slug: "business",
  code: "BUS",
  name: "Business and Management",
  summary:
    "A listed payments group whose reported profit sits in accounts nobody outside the company has ever directly confirmed.",
  degree_examples: [
    "BSc / BA Business Administration",
    "BSc Accounting and Finance",
    "BSc Economics and Management",
    "MBA and specialist Master's programmes",
  ],
  specialisations: [
    {
      slug: "finance-investment",
      code: "FI",
      name: "Finance and Investment",
      summary: "Valuation, cash flow quality, capital structure and market signal interpretation.",
      curriculum_anchor: [
        "Corporate finance: discounted cash flow, cost of capital and enterprise value",
        "Financial statement analysis and earnings quality",
        "Market microstructure, short selling and price formation",
        "Working capital management and cash conversion",
      ],
      annex: {
        exhibit_title: "Annex A — Five-year financial summary and market data",
        exhibit: [
          "Reported revenue grew from €412m to €1,840m over five years at a stated EBITDA margin rising from 21 per cent to 31 per cent. Peer group margins over the same period ranged from 9 per cent to 17 per cent.",
          "Cash: reported cash and equivalents €1.9bn, of which €1.4bn is described as 'held in trustee accounts on behalf of third-party acquiring partners'. Group cash flow from operations averaged 61 per cent of reported EBITDA over the period; the cumulative gap between cumulative reported profit and cumulative free cash flow is €820m.",
          "Financing: despite the reported cash position, the group raised €900m in convertible bonds and drew €1.75bn on a revolving credit facility during the period. Interest cover is reported at 11.4x.",
          "Market: short interest peaked at 12 per cent of free float. Following a research publication alleging the trustee balances did not exist, the market regulator imposed a two-month prohibition on establishing new net short positions in the group's shares, citing market confidence. No investigation of the allegations was announced at that time.",
          "Segment disclosure: 54 per cent of reported EBITDA is attributed to three third-party acquiring partners in jurisdictions where the group holds no acquiring licence. Combined disclosed headcount across the three partners is 46.",
        ],
        requirements: [
          {
            part: "I",
            marks: 60,
            text: "From the exhibit alone, identify the single financial relationship that is hardest to reconcile with the reported position, and prove why. Your answer must engage the coexistence of €1.9bn of reported cash with €2.65bn of capital raised and drawn. Separate what the numbers establish from what they merely make improbable, and state the test that would distinguish the two.",
          },
          {
            part: "II",
            marks: 55,
            text: "Attack your own conclusion from Part I. Construct the strongest good-faith explanation for each anomaly, including regulatory capital ring-fencing, settlement timing and genuine partner economics, and state what evidence would confirm each. Then assess the regulator's short-selling prohibition as a signal: state what information it did and did not convey, and how a competent analyst should have updated on it.",
          },
          {
            part: "IV",
            marks: 70,
            text: "You manage a fund holding 4.1 per cent of the group. At 08:00 the auditor announces it cannot confirm €1.4bn of trustee balances and the shares are suspended. State your actions in sequence over the first 72 hours, distinguishing the fund's obligations to its own investors from your view on the company. Identify which of your actions are irreversible and which disclosures you are required to make and to whom.",
          },
        ],
        research: {
          mandate:
            "Establish, with citation: (1) at least two documented cases in which a listed company's reported cash balances were found not to exist, giving the company, the year, the amount, and the mechanism by which the balances were represented as real; (2) the recognised analytical techniques for assessing earnings quality and detecting the divergence of accruals from cash, naming at least one published model or ratio framework and applying it to the exhibit's figures; (3) the regulatory basis on which a market authority may restrict short selling, including the disclosure thresholds for net short positions in a major market, and any published review of whether such restrictions achieve their stated aim; and (4) the disclosure obligations that apply to a holder crossing a major shareholding threshold in a listed company, with the applicable thresholds and deadlines in a named jurisdiction. Every figure you take externally must be normalised to this company's scale before comparison.",
          target_sources: [
            "Official regulatory investigation reports, parliamentary or legislative inquiry reports, and court judgments concerning accounting fraud at listed companies",
            "Published earnings-quality and accrual-anomaly literature, and practitioner forensic accounting references",
            "Market authority regulations on short selling and net short position disclosure, and post-hoc academic or regulatory reviews of short selling bans",
            "Transparency directive or equivalent major shareholding notification rules in a named jurisdiction",
          ],
        },
        key: {
          expected:
            "The irreconcilable relationship is that a company holding €1.9bn of cash does not raise €900m of convertible debt and draw €1.75bn on a revolver. Reported cash and actual borrowing are the two figures a fraud finds hardest to reconcile, because the borrowing is real and externally verifiable while the cash is an assertion, and the candidate should say precisely that: the debt raise is evidence about the cash that does not depend on trusting the company. The second-order finding is the accrual gap — €820m of cumulative profit that never became cash — and a candidate applying a published earnings-quality framework rather than describing one earns the applicability marks. The third is the margin anomaly, where the correct framing is not that 31 per cent is impossible but that a 14-point premium to a peer range demands a mechanism, and the disclosed mechanism is three partners with 46 people between them generating 54 per cent of group EBITDA. On Part II, the discipline being tested is genuine steelmanning: settlement float and ring-fenced regulatory capital really can explain restricted cash, and a candidate who cannot construct that argument has not earned the right to reject it — the correct disposal is that ring-fencing explains why cash is unavailable, not why it would be unconfirmable, and that distinction is the whole case. The short-selling ban is the sharpest item on the paper: the top band recognises that a prohibition on new short positions conveys information about the regulator's institutional posture and nothing whatever about the underlying allegations, that it removed the participants with the strongest incentive to investigate, and that a competent analyst should have updated toward the short thesis rather than away from it — because a regulator acting on market confidence rather than on the substance of an allegation has told you which question it is not asking. On Part IV, the discriminating behaviour is separating the fiduciary duty to the fund's own investors, which is immediate and procedural, from the analytical view on the company, which is now largely irrelevant, and recognising that a suspended stock cannot be sold, so the live decisions are valuation policy, redemption handling, disclosure to investors and the shareholding notification, not trading.",
          red_flags: [
            "Treats the high margin as the primary red flag and stops there",
            "Accepts trustee balances as cash because they are audited",
            "Reads the short-selling ban as regulatory validation of the company",
            "Cannot construct a good-faith explanation before rejecting it",
            "Proposes selling a suspended stock",
            "Omits the fund's own disclosure and valuation obligations entirely",
          ],
        },
      },
    },
    {
      slug: "accounting-assurance",
      code: "AA",
      name: "Accounting and Assurance",
      summary:
        "Audit evidence, external confirmation, related parties and the going concern judgement.",
      curriculum_anchor: [
        "Financial reporting frameworks and revenue recognition",
        "Audit evidence, assertions and the audit risk model",
        "External confirmation procedures and tests of controls",
        "Fraud risk, professional scepticism and going concern assessment",
      ],
      annex: {
        exhibit_title:
          "Annex A — Audit file extracts, trustee confirmations and engagement history",
        exhibit: [
          "Trustee balances of €1.4bn are supported by confirmation letters. For three consecutive years the letters were obtained from the trustee via the client's own finance function rather than sent and received directly by the audit team. In the fourth year a screenshot of an online banking portal, supplied by the client, was accepted in place of a confirmation.",
          "The trustee is a firm of three professionals in a jurisdiction outside the group's principal markets. It is not a licensed deposit-taking institution. The audit file contains no verification of the trustee's authority to hold client funds.",
          "The three third-party acquiring partners generating 54 per cent of group EBITDA have never been visited. Revenue from them is recognised on the basis of monthly statements produced by the partners themselves and reconciled to nothing external.",
          "Engagement history: same audit firm for 11 years, same engagement partner for 7. Non-audit fees averaged 42 per cent of total fees. The engagement quality control reviewer raised the trustee confirmation issue in year two; the file records the response as 'discussed with management, satisfied'.",
          "Group management representation letter includes an assertion that all related party relationships have been disclosed. Three of the acquiring partners' directors appear in a public corporate registry as former employees of the group.",
        ],
        requirements: [
          {
            part: "I",
            marks: 60,
            text: "Establish what audit evidence the file actually contains for the €1.4bn, expressed in terms of the assertion it is intended to support and the reliability hierarchy that applies to it. State the difference between evidence that is corroborative and evidence that is derivative of the client, and classify each item in the exhibit.",
          },
          {
            part: "II",
            marks: 55,
            text: "Audit the audit. Identify the specific procedural requirement breached by obtaining confirmations through the client, and state what the auditing standards require when a confirmation request is not returned directly. Then assess the engagement's independence position and the significance of the quality reviewer's year-two challenge being closed with a management discussion.",
          },
          {
            part: "IV",
            marks: 70,
            text: "You are the newly appointed engagement partner. On the Tuesday of the audit's final week the trustee stops responding and the client offers a fresh portal screenshot. State your actions in sequence to the signing deadline, identifying which are required by standard and which are matters of judgement. Address what you report, to whom, and in what order, and state the point at which your obligation stops being to the client.",
          },
        ],
        research: {
          mandate:
            "Establish, with citation: (1) the auditing standard governing external confirmations, named and numbered, and specifically what it requires as to the auditor's control over the confirmation process and what it says about management interference with a request; (2) the standard governing the auditor's responsibilities relating to fraud, and its requirements where a fraud risk is identified in revenue recognition; (3) at least two documented audit failures involving fabricated or unconfirmed bank or escrow balances, naming the company, the year, the regulatory or disciplinary finding against the auditor, and the specific procedural failure identified; and (4) the independence provisions governing non-audit services and partner rotation in a named jurisdiction, with the applicable fee ratio caps and rotation periods. Compare the exhibit's 42 per cent non-audit fee ratio and 7-year partner tenure against the limits you find, stating the jurisdiction.",
          target_sources: [
            "International Standards on Auditing, in particular those on external confirmation, fraud, and audit evidence",
            "Regulatory and disciplinary findings from national audit oversight bodies concerning failed audits",
            "Legislative or parliamentary inquiry reports into corporate collapses involving audit failure",
            "Ethical standards for auditors, and statutory audit regulations covering independence, fee caps and rotation",
          ],
        },
        key: {
          expected:
            "The central finding is stated in one sentence: the audit file contains no independent evidence for €1.4bn, because a confirmation routed through the client is not a confirmation and a client-supplied screenshot is not evidence of anything except that the client can produce a screenshot. The candidate should place each item in the exhibit on the reliability hierarchy and observe that every single one is derivative of the client — the trustee letters, the portal image, the partner-produced monthly statements — so the group's entire reported profit rests on management's own representations, which is the definition of an unaudited number. The standards point must be precise rather than gestural: the confirmation standard requires the auditor to maintain control over the request and the response, and where management refuses or interferes, that refusal is itself a fraud risk indicator requiring escalation rather than an obstacle to be worked around. Strong scripts notice that the trustee is a three-person firm with no deposit-taking licence and no verified authority to hold client money, which means the balances could not have been held lawfully even if they had existed. On independence, the correct treatment is quantitative and jurisdictional: name the jurisdiction, cite its fee cap and rotation period, and state whether 42 per cent and seven years breach it — a candidate who calls the position 'concerning' without a limit to compare against has not done the work. The quality reviewer finding is the one that separates bands: a challenge raised by the engagement quality control reviewer in year two and closed with 'discussed with management, satisfied' is documentary proof that the firm's own control identified the defect and that the control was overridden, which converts the case from an audit that missed something into an audit that knew and stood down. On Part IV, the top band recognises that the sequence is fixed by standard rather than by preference — no evidence means no opinion, and the deadline is not a reason to sign — and reaches the point at which reporting duties run past the client to those charged with governance and, where the jurisdiction requires it, to the regulator.",
          red_flags: [
            "Accepts management representations as audit evidence",
            "Describes the confirmation process as a control weakness rather than a standards breach",
            "Calls the independence position concerning without citing a threshold",
            "Misses the significance of the year-two quality reviewer challenge",
            "Signs with a qualification where the evidence supports no opinion at all",
            "Treats the reporting deadline as a constraint that can override the evidence requirement",
          ],
        },
      },
    },
    {
      slug: "operations-supply-chain",
      code: "OS",
      name: "Operations and Supply Chain Management",
      summary: "Partner networks, third-party risk, process control and operational due diligence.",
      curriculum_anchor: [
        "Operations strategy, process design and capacity analysis",
        "Supply chain network design and multi-tier supplier risk",
        "Third-party and outsourcing governance; service level management",
        "Quality management systems and process auditing",
      ],
      annex: {
        exhibit_title: "Annex A — Third-party acquiring network and operational metrics",
        exhibit: [
          "Three third-party acquiring partners in jurisdictions where the group holds no licence process a stated €9.1bn of annual transaction volume, generating 54 per cent of group EBITDA. Combined disclosed headcount is 46. Implied volume per employee is approximately €198m per year; the equivalent figure across the group's own licensed operations is €4.1m.",
          "Onboarding: partner merchants are recruited, screened and contracted by the partner. The group receives a monthly aggregated statement of volume and fee income. It holds no merchant-level data for any partner-originated account and has no system access to any partner platform.",
          "Operational due diligence: two site visits were scheduled over four years, both cancelled by the group's own commercial team on cost grounds. No process audit has ever been performed. The partner contracts contain audit rights that have never been exercised.",
          "Concentration: one partner accounts for 28 per cent of group EBITDA. Its contract has a 30-day termination clause exercisable by either side. No transition or exit plan exists for any of the three.",
          "Chargeback and dispute rates for partner-originated volume are reported by the partners at 0.09 per cent against a group-operated rate of 0.71 per cent, and are not independently verifiable.",
        ],
        requirements: [
          {
            part: "I",
            marks: 60,
            text: "From the operational metrics alone, and without reference to the financial statements, establish which reported figure is least consistent with any plausible operating model and prove it. Your proof must work from the volume-per-employee comparison and the process steps a real acquiring operation requires. State what the figure would have to mean if it were true.",
          },
          {
            part: "II",
            marks: 55,
            text: "Audit the third-party governance arrangement. Establish what the group can and cannot assert about partner operations given the evidence available to it, and identify the specific control that is present in the contract and absent in practice. Then assess the concentration and termination position: state the operational exposure created by a 30-day termination clause on 28 per cent of EBITDA with no exit plan.",
          },
          {
            part: "IV",
            marks: 70,
            text: "You are group operations director. At 08:00 the largest partner ceases responding to all channels and its platform is unreachable. State your actions in sequence over 72 hours. Identify what you can and cannot do without merchant-level data, what you owe the merchants themselves, and the point at which an operational continuity problem becomes a disclosure obligation.",
          },
        ],
        research: {
          mandate:
            "Establish, with citation: (1) published benchmarks for transaction volume or revenue per employee in payment acquiring or comparable transaction-processing operations, with the source, sample and year, and normalise them before comparing with the exhibit's €198m per employee; (2) the regulatory expectations governing outsourcing and third-party risk management for regulated financial institutions in a named jurisdiction, including what is required as to audit rights, exit planning and access to data; (3) at least one documented case in which a company's outsourced or third-party operations were found to be materially misrepresented or non-existent, giving the entity, year, and the official finding; and (4) published card scheme chargeback thresholds and the monitoring programmes that apply when a merchant or acquirer exceeds them, with the actual threshold figures. Use the chargeback thresholds to assess whether the reported 0.09 per cent partner rate is plausible for the merchant mix implied by the case.",
          target_sources: [
            "Payments industry benchmarking reports and public filings of listed acquirers and processors",
            "Regulatory outsourcing guidelines from a named financial supervisory authority",
            "Official investigation, inquiry or enforcement findings concerning misrepresented third-party operations",
            "Card scheme operating rules and published chargeback monitoring programme thresholds",
          ],
        },
        key: {
          expected:
            "The operationally impossible figure is €198m of processed volume per employee against €4.1m in the group's own licensed operations — a 48-fold productivity difference in the same business performing the same regulated steps. The candidate must do more than note the ratio: they must walk the process a real acquiring operation cannot skip, which is merchant recruitment, underwriting and KYC, contracting, terminal or gateway provisioning, settlement, dispute handling and regulatory reporting, and show that 46 people cannot perform those steps across the implied merchant population. The correct statement of what the figure would have to mean if true is that the partner had achieved automation no licensed acquirer in the world has achieved, in jurisdictions with weaker infrastructure, while employing fewer people than a mid-sized branch — which is a claim about the partner that is testable and was never tested. The governance finding is the audit right: it exists in the contract, which means the group's lawyers understood the risk; it has never been exercised, and the two site visits were cancelled by the group's own commercial team, which locates the failure precisely — not an absent control but a control the organisation chose not to use, twice, for the cheapest of reasons. Strong scripts read the chargeback figure as the second impossibility: 0.09 per cent against the group's own 0.71 per cent, self-reported, in higher-risk jurisdictions, inverts every published expectation, and a candidate who retrieves the card scheme monitoring thresholds can state that the reported figure is not merely good but anomalous in a direction no merchant mix produces. On concentration, the exposure should be stated as a number and a clock: 28 per cent of EBITDA terminable on 30 days with no exit plan and no merchant-level data means the group cannot migrate what it cannot see. On Part IV, the discriminating recognition is that without merchant-level data there is no continuity plan available at all, that the merchants are the group's contractual obligation regardless of who onboarded them, and that the moment continuity fails on 28 per cent of earnings the disclosure obligation has already arisen and is not contingent on establishing why.",
          red_flags: [
            "Reasons from the financial statements when the requirement is to work from operations",
            "Treats the volume-per-employee figure as evidence of superior efficiency",
            "Describes the unexercised audit right as a gap rather than as a decision",
            "Accepts self-reported chargeback rates without a scheme threshold comparison",
            "Proposes migrating merchants the group holds no data on",
            "Defers disclosure until the cause of the outage is established",
          ],
        },
      },
    },
    {
      slug: "marketing-insight",
      code: "MI",
      name: "Marketing and Consumer Insight",
      summary:
        "Investor and market narrative, disclosure language, brand risk and research integrity.",
      curriculum_anchor: [
        "Marketing strategy, positioning and brand equity",
        "Marketing research methodology, sampling and questionnaire design",
        "Corporate and investor communications; crisis communication",
        "Consumer behaviour, persuasion and message framing",
      ],
      annex: {
        exhibit_title: "Annex A — Investor communications corpus and market research file",
        exhibit: [
          "Investor presentations, five years, 22 decks. References to 'third-party acquiring partners' fall from 14 mentions in year one to 2 in year five, while the same revenue rises from 19 per cent to 54 per cent of EBITDA. Partner-specific slides are removed after year three.",
          "Language shift: descriptions of the trustee balances move from 'funds held by trustees on behalf of partners' in year two to 'group cash and equivalents' in the year-five summary highlights, while the audited note retains the original wording. The summary highlights page is the only page reproduced in most media coverage.",
          "Commissioned market research: a brand-tracking study of 400 respondents reports 71 per cent 'trust' in the group. Respondents were drawn from the group's own merchant newsletter list. The 71 per cent figure appears in three investor decks and one annual report; the sample source appears in none.",
          "Crisis response to the short-seller publication: two press releases within 36 hours, both attacking the researchers' motives and announcing a criminal complaint. Neither addressed the trustee balance allegation directly. Media pick-up of the criminal complaint exceeded pick-up of the original allegation by roughly four to one.",
          "Analyst engagement: the investor relations team maintained a tiered access list. Analysts publishing sell ratings were removed from management meeting invitations; the practice is documented in an internal email.",
        ],
        requirements: [
          {
            part: "I",
            marks: 60,
            text: "Establish, from the corpus alone, the direction of travel in the group's disclosure language and prove it with the exhibit's own counts. State the difference between a communication that is false and a communication that is accurate but constructed to be misread, classify the trustee balance wording, and identify who bears the interpretive burden in each case.",
          },
          {
            part: "II",
            marks: 55,
            text: "Audit the brand-tracking study as research. Identify the sampling defect, name it, and state the direction and likely magnitude of the bias it introduces. Then audit the tiered analyst access list: assess what it does to the information environment the group's own management relies on, and state why this is a marketing governance failure rather than only an ethical one.",
          },
          {
            part: "IV",
            marks: 70,
            text: "You are group communications director. At 08:00 the auditor's inability to confirm €1.4bn becomes public and the shares are suspended. Draft the sequence of your first 72 hours, specifying each audience, channel and timing. State what you will not say and why, identify the point at which your duty to the company diverges from your instruction from the chief executive, and say what you do at that point.",
          },
        ],
        research: {
          mandate:
            "Establish, with citation: (1) the regulatory rules governing the presentation of alternative performance measures and non-statutory figures in investor communications in a named jurisdiction, and what they require as to prominence, reconciliation and consistency with the audited statements; (2) the recognised methodological literature on sampling bias, naming the specific bias present in the exhibit's research design and citing a source that quantifies its typical effect; (3) at least two documented cases in which a company's response to a short-seller report or investigative journalism relied on attacking the source rather than addressing the substance, with the outcome in each; and (4) published guidance on crisis communication from a professional body or an established framework, and what it specifies about acknowledgement, sequencing and the treatment of unresolved facts. Apply the alternative performance measure rules to the specific relocation of trustee balances into a summary highlights figure.",
          target_sources: [
            "Securities regulator or market authority guidelines on alternative performance measures and investor communications",
            "Survey methodology and research ethics literature on sampling frames and self-selection",
            "Regulatory findings, court judgments or inquiry reports concerning corporate responses to critical research",
            "Professional body guidance on crisis and issues communication",
          ],
        },
        key: {
          expected:
            "The direction of travel is established by the corpus's own arithmetic and should be stated as such: mentions of the partners fell from 14 to 2 while partner-derived earnings rose from 19 per cent to 54 per cent, so disclosure moved inversely to materiality — which is not a stylistic drift but a pattern, and the pattern is the finding. The trustee balance wording is the item that separates bands, and the correct classification is the harder one: the audited note remained accurate, so nothing false was published, and the summary highlights page relocated a restricted balance into 'group cash and equivalents' knowing that the highlights page is what gets reproduced. The candidate should name what that does — it shifts the interpretive burden from the issuer to the reader, and does so at precisely the point in the document where the reader has least capacity to carry it — and should reach the alternative performance measure rules to show that prominence and reconciliation are regulated for exactly this reason. On the research, the required move is to name the bias rather than describe it: a sample drawn from the group's own merchant newsletter list is a self-selected sample from an already-committed population, so 71 per cent trust measures the loyalty of people who had already opted in, the bias is upward and large, and the defect is not the number but its reproduction in an annual report without its sampling frame. The tiered analyst list is where the strongest scripts do something unexpected and correct: they argue it as a governance failure rather than an ethics one, because removing sell-rated analysts from management meetings does not merely disadvantage those analysts, it systematically strips disconfirming information out of the environment that management itself uses to form its view — the company blinded itself first and its investors second. On Part IV, the discriminating content is the list of things not to say and why: no defence of the balances, because the communicator does not know whether they exist; no attack on the auditor; no timeline promises that depend on facts not held. The divergence point must be named concretely — an instruction to state or imply that the balances are confirmed — and the answer must state the action taken there, which is refusal in writing, escalation to the audit committee, and acceptance of the personal consequence.",
          red_flags: [
            "Judges the communications by tone rather than by the exhibit's counts",
            "Calls the trustee balance wording false when the audited note was accurate",
            "Notes the research sample is 'not representative' without naming the bias or its direction",
            "Treats the analyst access list as merely unfair",
            "Drafts a holding statement that asserts facts the communicator does not hold",
            "Resolves the divergence with the chief executive by complying, or by resigning without escalating",
          ],
        },
      },
    },
  ],
};

/* ==========================================================================
   FACULTY OF PHARMACY
   Case: Solvenor Pharma — the solvent change.
   ========================================================================== */

const PHARMACY: Faculty = {
  slug: "pharmacy",
  code: "PHA",
  name: "Pharmacy and Pharmaceutical Sciences",
  summary:
    "A manufacturing process change that improved yield, introduced a genotoxic impurity, and was invisible to every method the product was registered against.",
  degree_examples: [
    "MPharm / BPharm",
    "BSc Pharmaceutical Sciences",
    "MSc Industrial Pharmacy, Regulatory Affairs or Pharmacovigilance",
  ],
  specialisations: [
    {
      slug: "clinical-pharmacy",
      code: "CL",
      name: "Clinical Pharmacy",
      summary:
        "Therapeutics, patient-level risk communication and management of a supply interruption.",
      curriculum_anchor: [
        "Pharmacotherapeutics of cardiovascular disease and hypertension management",
        "Pharmacokinetics, dose equivalence and therapeutic substitution",
        "Clinical risk-benefit assessment and absolute versus relative risk",
        "Patient counselling, adherence and risk communication",
      ],
      annex: {
        exhibit_title: "Annex A — Affected product range and patient population",
        exhibit: [
          "The affected active substance is a long-acting angiotensin receptor antagonist used for hypertension and heart failure, supplied to 34 finished-product marketing authorisation holders across 22 countries. Approximately 1.9 million patients are on treatment with an affected batch at the point of detection.",
          "Impurity: a dialkylnitrosamine formed during the amended synthesis route. Measured levels across 41 tested batches range from below the limit of detection to 22.4 ppm, mean 6.1 ppm. Daily dose of the active substance ranges from 40 mg to 320 mg.",
          "The class has three widely available alternatives, two within the same class and one in a different class with a documented difference in adverse effect profile, cough incidence and monitoring requirement. National supply of the two same-class alternatives is estimated at 5.5 weeks of demand if the affected product is fully withdrawn.",
          "Population: 62 per cent of patients are over 65. An estimated 18 per cent are on the affected product for heart failure rather than hypertension, where interruption carries a different risk profile.",
          "Prior evidence: national audit data indicate that among patients whose antihypertensive is interrupted without a substitute being dispensed, a material proportion do not restart within 90 days.",
        ],
        requirements: [
          {
            part: "I",
            marks: 60,
            text: "Establish the patient-level risk actually presented by the exhibit. Convert the impurity exposure into a per-patient daily intake at the highest measured level and the highest daily dose, and state what further information you need to convert that intake into a risk estimate. Separately state the risk presented by interruption of therapy, and identify which of the two risks the exhibit lets you quantify and which it does not.",
          },
          {
            part: "II",
            marks: 55,
            text: "Attack the intuitive answer, which is to stop the product immediately. Model the consequences of an immediate full withdrawal against 5.5 weeks of alternative supply for a population of 1.9 million, including the heart failure subgroup and the non-restart finding. Then identify the assumption in your own analysis that would most change your conclusion if wrong, and state how you would test it.",
          },
          {
            part: "IV",
            marks: 70,
            text: "You are the lead clinical pharmacist for a hospital trust and its associated primary care network. The recall notice arrives at 16:40 on a Friday. State your actions in sequence over 72 hours, covering identification of affected patients, prioritisation, the substitution protocol including dose equivalence, the communication to patients and prescribers, and the point at which you would deviate from the recall notice's instruction and on what authority.",
          },
        ],
        research: {
          mandate:
            "Establish, with citation: (1) the regulatory acceptable intake limit for the specific class of nitrosamine impurity in question, in nanograms per day, naming the guideline and the body that issued it, and the basis on which such limits are derived; (2) at least one documented real-world nitrosamine contamination event in a marketed medicine, giving the substance, the year, the regulator's assessment of excess cancer risk, and specifically whether the regulator advised patients to stop treatment or to continue pending substitution — and what reasoning was given; (3) published dose-equivalence data for switching between agents in this class, from a source you name; and (4) evidence on the clinical consequences of interrupting antihypertensive or heart failure therapy, with the outcome measure and effect size. Your recommendation must state the excess risk from the impurity and the risk from interruption in the same units, and compare them.",
          target_sources: [
            "ICH M7 on assessment and control of DNA-reactive impurities, and regulator guidance on nitrosamine acceptable intakes",
            "Regulatory assessment reports and public statements from national or regional medicines agencies concerning nitrosamine recalls",
            "Clinical guidelines and published dose-equivalence tables for the therapeutic class",
            "Peer-reviewed evidence on discontinuation of cardiovascular therapy and associated outcomes",
          ],
        },
        key: {
          expected:
            "The examination is testing whether the candidate can resist the reflex that a genotoxic impurity means immediate cessation. The required move is to put both risks in the same units and compare them: the impurity exposure is a small increment to lifetime cancer risk accrued over years of continued exposure, and the interruption risk is a cardiovascular event risk accrued over days to weeks in a population that is 62 per cent over 65 with an 18 per cent heart failure subgroup. A candidate who retrieves the actual regulatory precedent will find that agencies faced with exactly this situation advised patients not to stop without a replacement, and the reasoning — that the harm from an untreated hypertensive or heart failure population over the substitution window exceeds the incremental oncological risk from continued exposure over the same window — is the answer to Part I and Part II together. The arithmetic must be done rather than gestured at: 22.4 ppm at a 320 mg daily dose is roughly 7.2 micrograms per day, which the candidate should place against the acceptable intake limit in nanograms per day and express as a multiple, because the multiple is what makes the case serious and the absolute risk is what makes immediate cessation wrong. On Part II, the supply constraint is decisive and should be quantified: 5.5 weeks of alternative supply against 1.9 million patients means a full immediate withdrawal creates a national shortage, and the non-restart finding means the harm from that shortage does not end when supply recovers. The strongest scripts name their own load-bearing assumption — usually that alternative supply can be redirected at the assumed rate, or that the mean impurity level is representative of the batches actually in patients' hands — and specify the test. On Part IV, the discriminating content is prioritisation by clinical risk rather than by alphabetical patient list: heart failure patients and those on the highest doses first, a written dose-equivalence protocol rather than prescriber-by-prescriber judgement, and an explicit instruction to patients not to stop before substitution, which is the one message that must survive contact with the weekend. The deviation question is answered correctly when the candidate identifies that a recall notice directed at product must not be executed as an instruction to interrupt therapy, and states the clinical authority under which they issue a continue-until-substituted instruction.",
          red_flags: [
            "Recommends immediate cessation without quantifying interruption risk",
            "States the impurity level without converting it to a daily intake or comparing it to a limit",
            "Treats all 1.9 million patients as a single undifferentiated group",
            "Ignores the supply constraint when recommending substitution",
            "Communicates only to prescribers and not to patients before the weekend",
            "Follows the recall notice literally where doing so interrupts therapy without a substitute",
          ],
        },
      },
    },
    {
      slug: "industrial-manufacturing",
      code: "IM",
      name: "Industrial Pharmacy and Manufacturing",
      summary:
        "Process change control, validation, GMP and the qualification of an amended synthesis route.",
      curriculum_anchor: [
        "Pharmaceutical process development, unit operations and scale-up",
        "Good manufacturing practice, change control and deviation management",
        "Process validation, qualification and continued process verification",
        "Quality risk management and quality systems",
      ],
      annex: {
        exhibit_title: "Annex A — Change control record and process history",
        exhibit: [
          "Change control CC-2214: substitution of the tetrazole ring formation step to a route using a different solvent system, with a nitrite quench introduced at the work-up. Stated justification: yield improvement from 68 per cent to 81 per cent and a reduction in cycle time of 11 hours per batch.",
          "Risk assessment attached to CC-2214 runs to one page. It assesses impact on assay, related substances by the registered method, residual solvents and physical form. It contains no assessment of new impurity formation pathways and no consideration of the reagents introduced at the quench.",
          "Classification: the change was classified as minor and self-approved by the site quality unit. It was implemented four months before the corresponding regulatory variation was filed. Three finished-product authorisation holders were notified; thirty-one were not.",
          "Validation: three consecutive batches were run and released on the basis of the registered specification. No new analytical method was developed. Continued process verification data show a step change in one unassigned peak area at 4.1 minutes, flagged twice in trending reports and closed both times as 'within historical variability'.",
          "Supply chain: the amended route was implemented at a single site producing approximately 40 per cent of world supply of the active substance, and material from that site was blended with material from a second site before shipment.",
        ],
        requirements: [
          {
            part: "I",
            marks: 60,
            text: "Establish from the record what the change control did and did not assess, and identify the specific chemical consequence of the amended route that the risk assessment was structurally incapable of detecting. State how the combination of the reagents described creates a formation pathway, and identify the point in the process where it occurs.",
          },
          {
            part: "II",
            marks: 55,
            text: "Audit the change control as a quality system output. Establish whether the change was correctly classified, and what the correct classification implies about who was entitled to approve it and when it could lawfully be implemented. Then audit the continued process verification: state what the twice-flagged unassigned peak should have triggered, and what closing it as historical variability reveals about the trending system's decision rule.",
          },
          {
            part: "IV",
            marks: 70,
            text: "You are the qualified person at the site. At 09:00 you receive a customer's LC-MS/MS result showing a nitrosamine at 22.4 ppm in a batch you released eleven months ago. State your actions in sequence over 72 hours: batch disposition, traceability across the blending step, notification, and the decision on continued production. Identify which actions are irreversible and state which you take before the root cause is established.",
          },
        ],
        research: {
          mandate:
            "Establish, with citation: (1) the guideline governing good manufacturing practice for active pharmaceutical ingredients, named and numbered, and its requirements for change control, including the criteria distinguishing a change that requires prior regulatory approval from one that does not; (2) the guideline on quality risk management and the recognised methodologies it endorses, and what a competent risk assessment of a synthesis route change is required to consider with respect to impurities; (3) the mechanism of nitrosamine formation in pharmaceutical synthesis — the reagent classes involved and the process conditions that favour it — citing the regulatory or scientific source that sets out root causes, together with at least one documented real-world case in which a process change at an API manufacturer introduced such an impurity, naming the substance, the year and the regulatory finding; and (4) the requirements for reporting a confirmed quality defect to the competent authority, including the timeframe and the classification criteria for recall. State the notification deadline you are working to and its source.",
          target_sources: [
            "ICH Q7 on good manufacturing practice for active pharmaceutical ingredients, and ICH Q9 on quality risk management",
            "Regulatory guidance and lessons-learned documents on nitrosamine root causes in API manufacture",
            "GMP guides covering qualified person responsibilities, variation classification and quality defect reporting",
            "Regulatory assessment reports on documented nitrosamine contamination events",
          ],
        },
        key: {
          expected:
            "The chemistry must be stated explicitly, because it is the curriculum component: introducing a nitrite quench in the presence of an amine source under the conditions of the amended work-up creates the reagent pair required for nitrosamine formation, and the formation occurs at the quench rather than in the ring formation step the change control was written about. That is the whole failure in one sentence — the risk assessment examined the step that changed and not the step whose conditions changed as a consequence — and a candidate who reaches it has demonstrated the transfer the paper is testing. The classification finding must be precise rather than indignant: a change to the route of synthesis of an active substance is not a minor change, it is not self-approvable by a site quality unit, and implementing four months before filing the variation inverts the regulatory sequence; notifying three of thirty-four authorisation holders compounds it, because each of those holders carries its own obligation it was not put in a position to discharge. The strongest scripts identify the risk assessment's structural defect rather than its brevity: it tested against the registered specification and the registered method, so it could only ever have detected impurities that were already known and already looked for, which means a one-page assessment and a fifty-page assessment of the same design would have produced the same result. The unassigned peak at 4.1 minutes is the case's own warning, flagged twice and closed twice, and the correct reading is about the decision rule rather than the analysts: a trending system whose disposal category is 'within historical variability' will absorb any new peak that arrives gradually, because the history it compares against includes the change. On Part IV, the sequencing that earns the top band puts the irreversible actions in the right place — quarantine and cease shipment immediately, because they are reversible and cheap; batch recall and public notification on the statutory clock, which starts on detection and not on root cause; production halt as a judgement call that must be made before the mechanism is understood — and reaches the blending step, which is the traceability problem that determines whether the affected population is 40 per cent of world supply or all of it.",
          red_flags: [
            "Identifies the change as risky without stating the formation chemistry",
            "Accepts the minor classification, or disputes it without citing a classification criterion",
            "Criticises the risk assessment for being one page rather than for its design",
            "Treats the unassigned peak as an analytical artefact",
            "Waits for root cause before notifying the authority",
            "Omits the blending step and so misstates the affected population",
          ],
        },
      },
    },
    {
      slug: "pharmaceutical-analysis",
      code: "PA",
      name: "Pharmaceutical Analysis and Quality Control",
      summary:
        "Method specificity, detection limits and the impurity a registered method cannot see.",
      curriculum_anchor: [
        "Analytical chemistry: chromatographic separation, detection and quantification",
        "Method development and validation; specificity, LOD, LOQ, accuracy and precision",
        "Mass spectrometry principles and hyphenated techniques",
        "Pharmacopoeial methods, specifications and impurity profiling",
      ],
      annex: {
        exhibit_title: "Annex A — Analytical method file and comparative chromatography",
        exhibit: [
          "Registered related-substances method: reversed-phase HPLC with UV detection at 225 nm, 45-minute gradient, reporting threshold 0.05 per cent, identification threshold 0.10 per cent, qualification threshold 0.15 per cent. Validated for the six known process impurities and two degradants.",
          "The nitrosamine in question has weak UV absorbance in the operating region, co-elutes with a matrix peak at 4.1 minutes, and is present at 22.4 ppm, which is 0.00224 per cent of the active substance — roughly 22 times below the registered method's reporting threshold.",
          "Comparative data: the customer's LC-MS/MS method, operating in multiple reaction monitoring mode, reports the impurity with a limit of quantification of 0.01 ppm. The site's own method was never challenged against it.",
          "Forced degradation study on file, performed at original registration, covers acid, base, oxidative, thermal and photolytic stress on the original synthesis route. It was not repeated after the route change.",
          "Trending: the unassigned peak at 4.1 minutes shows a step increase in area coinciding with the route change date. Peak purity was not assessed. The peak was below the identification threshold throughout and was therefore not investigated under the method's own rules.",
        ],
        requirements: [
          {
            part: "I",
            marks: 60,
            text: "Establish why the registered method could not have detected this impurity, addressing each of the three independent reasons present in the exhibit. Then state the more important general conclusion: what it means that every result the method produced was correct, and what a specification that is met tells you and does not tell you about a product's impurity profile.",
          },
          {
            part: "II",
            marks: 55,
            text: "Audit the analytical control strategy. Establish what should have triggered a method re-evaluation after the route change, and identify the specific validation characteristic that the post-change method was never re-established against. Then assess the 4.1-minute peak: state what peak purity assessment would have shown, and explain why a threshold-based investigation rule is structurally blind to an impurity of this potency class.",
          },
          {
            part: "IV",
            marks: 70,
            text: "You are the head of quality control. At 09:00 the customer's LC-MS/MS result arrives. State your actions in sequence over 72 hours: confirmatory analysis, method transfer or development, retained sample testing across the affected period, and the reporting of results whose method is not yet validated. Specify what you will report before the confirmatory method is validated, and how you will characterise its uncertainty.",
          },
        ],
        research: {
          mandate:
            "Establish, with citation: (1) the guideline governing validation of analytical procedures, named and numbered, and the specific validation characteristics it requires, stating which of them is the one at issue here; (2) the guideline governing impurities in new drug substances and the basis on which reporting, identification and qualification thresholds are set, together with the separate framework that applies to impurities with genotoxic potential and why the ordinary thresholds do not apply to them; (3) published analytical methodology for nitrosamine determination in drug substances, naming a regulator-published or pharmacopoeial method and stating its limit of quantification; and (4) at least one documented case in which a marketed product's registered analytical method failed to detect a harmful impurity, giving the substance, the year and the analytical root cause identified. Convert 22.4 ppm into a percentage and into a daily intake at a stated dose, and compare it against both the registered reporting threshold and the applicable acceptable intake limit.",
          target_sources: [
            "ICH Q2 on validation of analytical procedures and ICH Q3A/Q3B on impurities",
            "ICH M7 on DNA-reactive impurities and the threshold of toxicological concern",
            "Regulator-published or pharmacopoeial nitrosamine test methods with stated performance characteristics",
            "Regulatory assessment reports and scientific literature on analytical failures in impurity detection",
          ],
        },
        key: {
          expected:
            "The three independent reasons must all be stated, because a candidate who gives one has given a partial answer: the analyte is present at 0.00224 per cent, roughly twenty-two times below the method's reporting threshold, so the method was not looking; it has weak UV absorbance at the operating wavelength, so the detector was not capable; and it co-elutes with a matrix peak at 4.1 minutes, so the separation would not have resolved it even had the first two been solved. Any one of these defeats detection, and their coincidence is what makes the case instructive rather than merely unlucky. The general conclusion is where the top band separates itself: every result the method ever produced was correct, the specification was met on every batch, and a met specification is a statement that the analytes the method interrogates are within limits — it is not a statement about the impurity profile, and treating it as one is the error the whole industry made. The threshold argument is the technical heart of Part II. Reporting and identification thresholds in the ordinary impurity guidelines are set against general toxicity at the milligram scale; an impurity in the DNA-reactive class is controlled at the nanogram-per-day scale under a separate framework, so a rule that says 'investigate above 0.10 per cent' is not merely a high threshold, it is off by orders of magnitude for this potency class — which means the investigation rule was structurally incapable of catching it, and the analysts who closed the peak followed the procedure correctly. Peak purity assessment on the 4.1-minute peak would have shown spectral non-homogeneity across the peak, indicating co-elution, and it was not performed. Specificity is the validation characteristic never re-established after the route change, and the missing forced degradation repeat is the procedural marker of that omission. On Part IV, the discriminating behaviour is reporting a quantitative result from an unvalidated confirmatory method with its uncertainty stated explicitly, rather than withholding it until validation completes — because the regulator's clock runs on detection, and a number with an honest error band reported today is worth more than a validated number reported in three weeks.",
          red_flags: [
            "Gives one reason for non-detection where three are present",
            "Concludes the method was invalid or the analysts erred",
            "Applies ordinary impurity thresholds to a DNA-reactive impurity",
            "Does not convert 22.4 ppm into both a percentage and a daily intake",
            "Withholds all results until the confirmatory method is fully validated",
            "Omits retained sample testing across the affected period",
          ],
        },
      },
    },
    {
      slug: "regulatory-pharmacovigilance",
      code: "RP",
      name: "Regulatory Affairs and Pharmacovigilance",
      summary:
        "Variation filing, recall classification, signal detection and communication to authorities.",
      curriculum_anchor: [
        "Regulatory frameworks, marketing authorisations and variation procedures",
        "Pharmacovigilance systems, signal detection and risk management plans",
        "Quality defect reporting, recall classification and field safety action",
        "Benefit-risk assessment methodology and regulatory decision-making",
      ],
      annex: {
        exhibit_title: "Annex A — Regulatory file, variation history and signal record",
        exhibit: [
          "The synthesis route change was implemented four months before the corresponding variation was filed, and was filed as a minor variation not requiring prior approval. The dossier's impurity section was not updated. Three of thirty-four finished-product authorisation holders were notified.",
          "Signal record: two spontaneous reports over three years referencing malignancy in patients on the affected product were assessed and closed as confounded by age and comorbidity. No disproportionality analysis was performed against the class. No cumulative review was triggered.",
          "The risk management plan for the active substance addresses hypotension, renal impairment and hyperkalaemia. It contains no impurity-related safety concern and no pharmacovigilance activity capable of detecting one.",
          "Detection: the impurity was identified by a customer's own laboratory using a method it developed for an unrelated programme, and reported to the manufacturer at 09:00 on a Wednesday. No regulator had been informed at that point.",
          "Distribution: affected material reached 22 countries under 34 marketing authorisations, across four distinct regulatory regions with different recall classification systems and different notification deadlines.",
        ],
        requirements: [
          {
            part: "I",
            marks: 60,
            text: "Establish the regulatory position as at 09:00 on the Wednesday. State what obligations exist, on whom they fall, and from what moment they run. Address the fact that the reporting entity is the manufacturer while the marketing authorisations are held by thirty-four other companies, and state precisely who is obliged to notify which authority.",
          },
          {
            part: "II",
            marks: 55,
            text: "Audit the pharmacovigilance system's capacity to have detected this. Establish why spontaneous reporting is structurally incapable of detecting a genotoxic impurity signal, using the properties of the outcome and the latency involved. Then assess the two closed malignancy reports: state whether their closure was correct on the information available, and what the correct closure would have required to be recorded.",
          },
          {
            part: "IV",
            marks: 70,
            text: "You are the qualified person for pharmacovigilance at the manufacturer. From 09:00 Wednesday, state your actions in sequence over 72 hours across four regulatory regions with different deadlines. Specify the recall classification you propose and your justification, what you notify before you have a confirmed root cause, how you coordinate thirty-four authorisation holders you do not control, and how you handle a region whose deadline expires before your confirmatory data arrive.",
          },
        ],
        research: {
          mandate:
            "Establish, with citation: (1) the variation classification framework in a named regulatory region, and specifically where a change to the route of synthesis of an active substance falls within it, together with the consequence of implementing before approval; (2) the quality defect and recall reporting obligations in at least two distinct regulatory regions, giving the actual notification deadline in each and the point from which it runs, and the recall classification criteria each region applies; (3) the acceptable intake limit for the nitrosamine class in question, the guideline that sets it, and how a regulator converts an exceedance into a recall classification decision; and (4) at least one documented multi-region nitrosamine recall, giving the substance, the year, and specifically how the regulators in different regions diverged in their classification or patient advice — and what explains the divergence. Set out the deadlines you identify in a single comparative table and state which expires first.",
          target_sources: [
            "Variation classification guidelines and procedural guidance from named regulatory agencies",
            "Good distribution and good manufacturing practice guidance on quality defect reporting and recall classification, in at least two regions",
            "ICH M7 and regulator guidance on nitrosamine acceptable intakes and risk assessment",
            "Published regulatory assessment reports, agency statements and lessons-learned documents from documented nitrosamine recalls",
          ],
        },
        key: {
          expected:
            "The obligations question is the one most scripts get structurally wrong, and the correct analysis has two parts. The manufacturer's obligation to notify the authorities of the territories it supplies, and to inform the authorisation holders, arises on detection — not on confirmation, not on root cause. But each of the thirty-four holders carries its own independent obligation to its own authority, and cannot discharge it until told, which means the manufacturer's notification to the holders is not a courtesy but the enabling act for thirty-four separate legal duties. A candidate who reaches that structure has understood why notifying three of thirty-four is the gravest single item in the exhibit. The pharmacovigilance analysis requires the properties of the outcome to be named: spontaneous reporting detects events that are temporally close to exposure, rare in the background population, and clinically distinctive. A common malignancy occurring after a latency of years in a population with a high background rate has none of those properties, so the system did not fail to detect the signal — it was never capable of detecting it, and the correct conclusion is that a genotoxic impurity risk must be controlled at the quality end because the safety end cannot see it. On the two closed reports, the honest answer is that closure was correct on the information available, and the defect is in what was recorded: closing as confounded without recording the exposure attribution question, and without any mechanism to aggregate, means that the second report was assessed as if the first had never existed. On Part IV, the top band builds the comparative deadline table first, works to the earliest expiring deadline across all regions rather than to each in turn, and answers the hardest sub-question correctly: where a deadline expires before confirmatory data arrive, the notification is made on time with the data held and its uncertainty stated, because a late complete notification is a breach and an early incomplete one is not. Recall classification should be proposed with a justification that ties the measured exceedance against the acceptable intake to the region's own classification criteria, and the strongest scripts note that different regions will reasonably classify it differently and plan for that divergence rather than being surprised by it.",
          red_flags: [
            "Treats notification as the manufacturer's obligation alone",
            "Waits for confirmed root cause before notifying any authority",
            "Concludes the pharmacovigilance system failed rather than that it was incapable",
            "Judges the two closed reports as negligent assessment",
            "Handles the four regions sequentially rather than to the earliest deadline",
            "Proposes a recall classification without reference to any region's criteria",
          ],
        },
      },
    },
  ],
};

/* ==========================================================================
   FACULTY OF MEDICINE
   Case: Alfenacox — the composite endpoint.
   ========================================================================== */

const MEDICINE: Faculty = {
  slug: "medicine",
  code: "MED",
  name: "Medicine",
  summary:
    "A trial that answered the question it was designed to answer, and a safety signal that was explained away in the same paper that reported it.",
  degree_examples: [
    "MBBS / MBChB / MD",
    "BSc Medical Sciences",
    "MPH and clinical Master's programmes",
  ],
  specialisations: [
    {
      slug: "internal-medicine",
      code: "IN",
      name: "Internal Medicine",
      summary: "Bedside prescribing decisions under contested evidence and competing risk.",
      curriculum_anchor: [
        "Cardiovascular risk assessment and secondary prevention",
        "Evidence-based medicine: absolute and relative risk, number needed to treat and to harm",
        "Rheumatological and analgesic therapeutics",
        "Shared decision-making and consent",
      ],
      annex: {
        exhibit_title: "Annex A — Clinic list and trial summary as presented to prescribers",
        exhibit: [
          "Alfenacox is a selective COX-2 inhibitor licensed for osteoarthritis and rheumatoid arthritis. Promotional material to prescribers reports a 54 per cent relative reduction in confirmed serious upper gastrointestinal events against a non-selective comparator.",
          "The same pivotal trial reports myocardial infarction in 0.4 per cent of the alfenacox arm against 0.1 per cent of the comparator arm. The published discussion attributes this to a cardioprotective effect of the comparator rather than to a hazard of alfenacox.",
          "Your clinic list this morning includes: a 74-year-old with osteoarthritis, prior myocardial infarction and a previous gastrointestinal bleed on a non-selective agent; a 52-year-old with rheumatoid arthritis, no cardiovascular history, currently controlled on alfenacox for two years; and a 61-year-old requesting alfenacox after seeing it advertised, with hypertension and a 12-year smoking history.",
          "Formulary status: alfenacox is on formulary, is the departmental first-line for patients with gastrointestinal risk, and the departmental protocol was written by a colleague who is a paid advisory board member for the manufacturer. This is disclosed in the protocol's footnote.",
          "A long-term trial of alfenacox in a different indication has just reported at conference. Its abstract states a cardiovascular signal emerging after 18 months of continuous use. Full results are not yet published.",
        ],
        requirements: [
          {
            part: "I",
            marks: 60,
            text: "Convert the trial figures as presented into a form usable at the bedside. Express both the gastrointestinal benefit and the cardiovascular signal in absolute terms and as numbers needed to treat and to harm, and state the event rates you have assumed. Then state, for each of the three patients on your list, what the evidence supports and where the evidence does not reach.",
          },
          {
            part: "II",
            marks: 55,
            text: "Interrogate the published explanation for the cardiovascular imbalance. Set out what would have to be true for the comparator's cardioprotection to account for the difference, identify what evidence would distinguish that explanation from a hazard of alfenacox, and state whether the trial as designed could ever have distinguished them. Then address the departmental protocol's authorship and state what you do about it.",
          },
          {
            part: "IV",
            marks: 70,
            text: "The manufacturer withdraws alfenacox worldwide at 07:00. You have 240 patients on it across the department, including 38 on it for more than 18 months. State your actions in sequence over 72 hours: identification, prioritisation, substitution, the communication to patients who will ask whether they have been harmed, and what you record. Address what you say to the patient who asks whether they should have been told about the cardiovascular signal two years ago.",
          },
        ],
        research: {
          mandate:
            "Establish, with citation: (1) the actual pivotal trial in the real-world case this scenario is modelled on — identify it, name it, give its year, its comparator, its primary endpoint, and the specific criticism later made of its reporting of cardiovascular events, including the matter of events occurring after a data cut-off; (2) the subsequent trial that established the cardiovascular hazard, its design, its duration, and the effect size it reported in absolute terms; (3) the published cumulative meta-analysis literature addressing when the hazard could first have been detected from the evidence then available, and what it concluded; and (4) current guideline positions on the cardiovascular safety of COX-2 selective and non-selective agents, with the guideline body and date. Express every effect size you cite in absolute terms alongside the relative form in which it was originally published.",
          target_sources: [
            "The original trial publications in peer-reviewed journals, and subsequent correspondence and editorial expressions of concern",
            "Regulatory advisory committee documents and agency review memoranda concerning the withdrawal",
            "Cumulative meta-analysis and pharmacoepidemiology literature on the class",
            "Current clinical guidelines from a named professional body on analgesic selection under cardiovascular risk",
          ],
        },
        key: {
          expected:
            "The conversion is the curriculum component and must be executed, not described: a 54 per cent relative reduction on a low baseline event rate is a small absolute reduction with a large number needed to treat, while 0.4 per cent against 0.1 per cent is an absolute excess of 0.3 percentage points and a number needed to harm of roughly 333 over the trial duration — and the candidate must state the assumed rates and durations, because a number needed to treat without its time horizon is meaningless. The comparison that decides the three patients is between those two numbers in the same units, and the correct dispositions differ: the 74-year-old with both a prior infarct and a prior bleed is the patient for whom the evidence genuinely does not reach, and the right answer says so and moves to a strategy that addresses gastrointestinal risk without a COX-2 selective agent rather than pretending the trade-off resolves; the 52-year-old controlled for two years is the one where the new 18-month signal is most directly relevant and where continuing requires an active decision rather than inertia; the 61-year-old requesting it after advertising has no gastrointestinal indication for it at all, so the gastrointestinal benefit that justifies the drug does not apply to him and the cardiovascular risk does. On Part II, the interrogation must reach the structural point: for the comparator's cardioprotection to account for the difference, the comparator would have to be exerting an effect of a magnitude not demonstrated in any placebo-controlled evidence, and the trial had no placebo arm — so the explanation offered is not merely unproven, it is untestable within the design that generated it. A candidate who states that the study as designed could never have distinguished the two explanations has found the thing the paper is testing. The protocol authorship is handled correctly by treating a disclosed interest as the beginning of the analysis rather than its end: disclosure tells you the interest exists, it does not neutralise it, and the proportionate action is to ask that the protocol be reviewed by someone without the interest, in writing, through the department's own governance route. On Part IV, the discriminating content is the answer to the last patient: the honest response is that the signal was in the published literature and was explained away, that the candidate prescribed on the evidence as it was presented, and that this is precisely why the question is being asked — delivered without defensiveness, without claiming knowledge nobody had, and without pretending the explanation was adequate at the time.",
          red_flags: [
            "Reports the 54 per cent relative reduction without converting it",
            "Gives a number needed to treat or harm without stating the time horizon",
            "Applies a single disposition to all three patients",
            "Accepts the cardioprotection explanation, or rejects it without stating what would test it",
            "Treats the protocol author's disclosure as resolving the conflict",
            "Answers the harmed patient defensively, or accepts blame for knowledge that did not exist",
          ],
        },
      },
    },
    {
      slug: "surgery-perioperative",
      code: "SP",
      name: "Surgery and Perioperative Care",
      summary: "Perioperative analgesia, competing bleeding and thrombotic risk, and consent.",
      curriculum_anchor: [
        "Perioperative assessment and cardiovascular risk stratification",
        "Haemostasis, platelet function and the pharmacology of antiplatelet agents",
        "Multimodal analgesia and opioid-sparing strategy",
        "Surgical consent, disclosure of material risk and shared decision-making",
      ],
      annex: {
        exhibit_title: "Annex A — Perioperative analgesia protocol and theatre list",
        exhibit: [
          "The departmental enhanced recovery protocol specifies alfenacox as the standard non-opioid component for elective orthopaedic and general surgical procedures, on the basis that COX-2 selective agents do not impair platelet aggregation and therefore reduce perioperative bleeding relative to non-selective agents.",
          "Protocol evidence base: three trials of perioperative bleeding endpoints, each of 5 to 14 days' duration, each excluding patients with known coronary disease. Median trial duration 7 days.",
          "Theatre list: an 81-year-old for hemiarthroplasty following a fractured neck of femur, with known coronary disease and on aspirin; a 58-year-old for elective knee arthroplasty on the enhanced recovery pathway, day-case, no cardiac history; a 66-year-old for major abdominal resection with an expected 6-day inpatient stay and a history of transient ischaemic attack.",
          "Two published cardiac surgery trials of a related COX-2 selective agent reported an excess of cardiovascular events in the treated arm at 10 and 30 days. Both were in cardiac surgical populations. Neither is cited in the departmental protocol.",
          "Consent documentation: the standard perioperative analgesia consent statement lists gastrointestinal and renal risk. It does not mention cardiovascular risk.",
        ],
        requirements: [
          {
            part: "I",
            marks: 60,
            text: "Establish what the protocol's evidence base does and does not support. Address the trial durations against the exposure the protocol actually creates, and the exclusion of patients with coronary disease against the population on this theatre list. State, for each of the three patients, whether the protocol's evidence applies to them, and identify the one for whom the extrapolation is largest.",
          },
          {
            part: "II",
            marks: 55,
            text: "Attack the protocol's central mechanistic claim. The absence of platelet inhibition is presented as a benefit; establish what else follows from it and whether the same mechanism that reduces bleeding could increase thrombotic risk. Then assess the two cardiac surgery trials: state why their exclusion from the protocol might be defensible, and whether it is.",
          },
          {
            part: "IV",
            marks: 70,
            text: "The withdrawal is announced at 07:00 with a full theatre list already anaesthetised or premedicated. State your actions in sequence over the operating day and the following 72 hours: the patient already anaesthetised who has received a dose, the pathway substitution, the inpatients on it post-operatively, and the consent implications for procedures performed under a consent statement that did not mention cardiovascular risk.",
          },
        ],
        research: {
          mandate:
            "Establish, with citation: (1) the mechanism by which COX-2 selectivity spares platelet function, expressed in terms of the relevant isoenzymes and the prostanoids they produce, citing a pharmacology source, and what that mechanism implies for the balance between prostacyclin and thromboxane; (2) the two real-world cardiac surgery trials of a COX-2 selective agent that reported cardiovascular excess, naming the agent, the years, the populations, the effect sizes and the regulatory consequence; (3) current guideline or regulatory positions on the perioperative use of COX-2 selective agents, including any contraindication following coronary artery bypass grafting, with the source and date; and (4) the legal and professional standard governing disclosure of material risk in consent in a named jurisdiction, citing the case or the professional guidance that sets it and stating what makes a risk material. Apply the materiality test to a cardiovascular risk of the magnitude in the exhibit.",
          target_sources: [
            "Pharmacology references on cyclooxygenase isoenzymes, prostacyclin and thromboxane",
            "The published cardiac surgery trials of COX-2 selective agents and the regulatory reviews that followed",
            "Current surgical, anaesthetic or cardiology guidelines addressing perioperative NSAID use",
            "Case law or professional regulatory guidance on consent and material risk in a named jurisdiction",
          ],
        },
        key: {
          expected:
            "The mechanistic inversion is the intellectual centre of this annex and the strongest scripts reach it directly: COX-2 selectivity spares platelet thromboxane, which is why bleeding is reduced, but it simultaneously suppresses endothelial prostacyclin, so the same selectivity that preserves haemostasis shifts the prostacyclin–thromboxane balance toward a prothrombotic state. The benefit and the hazard are not two separate properties to be traded off — they are the same pharmacological fact viewed from two ends, and a protocol that cites the first without the second has not made an error of emphasis, it has misunderstood the drug. On the evidence base, the durations settle it: trials of median seven days cannot speak to a risk that emerges over months, and the protocol's exclusion of patients with known coronary disease means the evidence was generated in a population from which the highest-risk patients on this list were removed. The largest extrapolation is the 81-year-old with known coronary disease on aspirin, who would have been excluded from every trial the protocol rests on and who additionally raises the interaction question. On the cardiac surgery trials, the defensible argument is population dissimilarity — cardiac surgical patients are not orthopaedic patients — and the correct disposal is that population dissimilarity is a reason to weight the evidence, not to omit it from the protocol entirely, and that a protocol which does not cite the two most directly relevant negative trials has selected its evidence. The consent analysis must be specific rather than general: applying the materiality standard, a risk is material if a reasonable patient in that position would attach significance to it, and a cardiovascular risk in a patient with coronary disease plainly meets that test, so a consent statement listing gastrointestinal and renal risk while omitting cardiovascular risk was defective for at least some of the patients consented under it. On Part IV, the anaesthetised patient who has already received a dose is the item that separates bands: a single perioperative dose already given is not reversible and not an emergency, the correct action is to proceed with the operation, omit further doses, document the exposure, and address it with the patient post-operatively — and a candidate who abandons or delays surgery over a dose already administered has misjudged the relative risks in exactly the direction the paper is testing.",
          red_flags: [
            "Presents platelet sparing as a benefit without deriving the thrombotic consequence",
            "Applies 7-day trial evidence to a chronic exposure without comment",
            "Treats all three theatre-list patients identically",
            "Accepts the exclusion of the cardiac surgery trials on population grounds alone",
            "Discusses consent generally without applying a materiality standard",
            "Cancels or delays surgery for a patient who has already received a single dose",
          ],
        },
      },
    },
    {
      slug: "public-health-epidemiology",
      code: "PE",
      name: "Public Health and Epidemiology",
      summary:
        "Population attributable burden, study design hierarchy and the detection of a delayed signal.",
      curriculum_anchor: [
        "Study design: randomised trials, cohort and case-control studies and their biases",
        "Measures of association and impact; attributable and population attributable risk",
        "Confounding, effect modification and confounding by indication",
        "Systematic review, meta-analysis and evidence synthesis",
      ],
      annex: {
        exhibit_title: "Annex A — Exposure data and observational evidence file",
        exhibit: [
          "Exposure: approximately 84 million patient-courses dispensed over five years across the licensed territories, of which an estimated 21 per cent were for continuous use exceeding 12 months.",
          "Pivotal trial cardiovascular data: myocardial infarction in 0.4 per cent of the alfenacox arm against 0.1 per cent of the active comparator arm, over a median 9-month exposure, in a population selected to be at low cardiovascular risk.",
          "Observational evidence: two large administrative database cohort studies report adjusted hazard ratios of 1.24 (95% CI 1.11–1.39) and 1.09 (95% CI 0.97–1.22) for acute myocardial infarction. The two studies differ in their comparator group, one using non-users and the other using users of a non-selective agent.",
          "A case-control study using a prescribing database reports an odds ratio of 1.6 for current use, with no adjustment for indication severity or for over-the-counter analgesic use.",
          "A long-term placebo-controlled trial in a non-arthritis indication, reporting after the events above, shows a cardiovascular hazard emerging after 18 months of continuous use.",
        ],
        requirements: [
          {
            part: "I",
            marks: 60,
            text: "Estimate the population-level burden implied by the exhibit. State your assumptions explicitly, derive an excess event count across the exposed population, and give a range rather than a point estimate. Then state which of the four evidence sources you weighted most heavily and why, with reference to design rather than to effect size.",
          },
          {
            part: "II",
            marks: 55,
            text: "Interrogate the observational evidence. Explain why the two cohort studies differ, addressing the comparator group choice and what each comparator makes the estimate mean. Identify the specific bias most likely to affect the case-control study, name it, and state its likely direction. Then state what the trial evidence can establish that no observational study in this exhibit can, and the converse.",
          },
          {
            part: "IV",
            marks: 70,
            text: "You chair a national medicines advisory body. The withdrawal is announced at 07:00. State your actions in sequence over 72 hours: the population advice you issue, its wording, the surveillance you commission, and the substitution risk you must anticipate. Address explicitly what you say about patients already exposed and how you avoid creating a second harm through the advice itself.",
          },
        ],
        research: {
          mandate:
            "Establish, with citation: (1) the published cumulative meta-analysis addressing when the cardiovascular hazard in this real-world class first became statistically detectable from the trial evidence then available, giving its authors, year, journal and its central conclusion, and the year it identified; (2) at least two published estimates of the population-level excess cardiovascular events attributable to the real agent, with their methods and their stated uncertainty, and reconcile them with your own Part I estimate; (3) the recognised methodological literature on confounding by indication and on channelling bias in pharmacoepidemiology, naming a source and stating the direction of bias each produces here; and (4) the regulatory and post-marketing surveillance reforms that followed the real-world withdrawal, in at least one jurisdiction, naming the reform and the year. Reconcile any divergence between your own estimate and the published ones, and state which you believe and why.",
          target_sources: [
            "Peer-reviewed cumulative meta-analysis and evidence synthesis literature on the drug class",
            "Published population burden estimates, regulatory testimony and agency epidemiology reviews",
            "Pharmacoepidemiology methodology references on confounding by indication, channelling and comparator selection",
            "Legislative or regulatory documents establishing post-marketing surveillance reform",
          ],
        },
        key: {
          expected:
            "The estimate must be constructed and its assumptions exposed, because the marks are for the reasoning chain and not the number. A defensible chain runs from the 0.3 percentage point absolute excess over a median nine-month exposure, adjusts for the fact that the trial population was selected to be at low cardiovascular risk while the treated population was not, applies the 21 per cent long-duration fraction, and produces a wide range across tens of thousands of excess events — and a candidate who gives a point estimate has failed the calibration dimension whatever the number is. The weighting question must be answered on design: the long-term placebo-controlled trial is the strongest source in the exhibit because randomisation removes confounding by indication and a placebo comparator makes the estimate interpretable, and the candidate should say that the pivotal trial's active comparator is precisely what made its own signal arguable. On the observational discrepancy, the required insight is that the two cohorts are not estimating the same quantity: against non-users, the estimate carries the full confounding by indication of a population in pain and less mobile; against users of a non-selective agent, the estimate is a head-to-head contrast that will be attenuated if the comparator itself carries risk — so 1.24 and 1.09 are not in conflict, they are answers to different questions, and reporting them as a disagreement is the error. The case-control study's principal bias should be named as confounding by indication, with channelling bias as the specific mechanism — a newer agent marketed on gastrointestinal safety is preferentially prescribed to patients at higher baseline risk — and its direction stated as away from the null. The clean statement of the trade the whole exhibit embodies is that only the randomised evidence can establish causation at this effect size, and only the observational evidence can reach the exposed population, the durations and the comorbidities that trials exclude. On Part IV, the second harm is the item that separates the top band: withdrawal advice that drives 84 million patient-courses toward non-selective agents transfers the burden to gastrointestinal bleeding in an elderly population, so the advice must anticipate the substitution rather than merely permit it, and must say something honest and non-alarming to patients already exposed — that the risk was during use and is not ongoing, which is both true and the only formulation that does not create a wave of presentations.",
          red_flags: [
            "Gives a point estimate for population burden",
            "Weights the evidence sources by effect size rather than by design",
            "Reports the two cohort studies as contradictory",
            "Names a bias without stating its direction",
            "Issues withdrawal advice with no substitution guidance",
            "Advises previously exposed patients in terms that imply ongoing risk",
          ],
        },
      },
    },
    {
      slug: "clinical-pharmacology",
      code: "CT",
      name: "Clinical Pharmacology and Therapeutics",
      summary:
        "Mechanism, dose-response, comparator choice and the design of a trial that could not answer the question.",
      curriculum_anchor: [
        "Receptor pharmacology, enzyme selectivity and dose-response relationships",
        "Clinical trial design: comparator selection, endpoints, power and duration",
        "Pharmacokinetics and pharmacodynamics of anti-inflammatory agents",
        "Benefit-risk methodology and regulatory pharmacology",
      ],
      annex: {
        exhibit_title: "Annex A — Trial protocol extract and mechanistic data",
        exhibit: [
          "Pivotal trial design: randomised, double-blind, active-comparator controlled against a non-selective NSAID at a dose at the upper end of its licensed range. Primary endpoint: confirmed serious upper gastrointestinal events. Median exposure 9 months. No placebo arm. Cardiovascular events collected as adverse events, not as a pre-specified adjudicated endpoint.",
          "Enrolment criteria excluded patients requiring low-dose aspirin for cardiovascular prophylaxis, and excluded patients with a myocardial infarction in the preceding 12 months.",
          "Statistical analysis plan: gastrointestinal events analysed to a data cut-off date; cardiovascular events reported in the publication to an earlier cut-off. Three additional myocardial infarctions in the treated arm occurred between the two dates and are absent from the published table.",
          "Mechanistic data on file: alfenacox produces greater than 90 per cent inhibition of COX-2 at therapeutic dose with under 10 per cent inhibition of COX-1. Urinary prostacyclin metabolite falls by a median 62 per cent from baseline; thromboxane metabolite is unchanged.",
          "Dose-response: the licensed dose for osteoarthritis is half that used in the pivotal trial. No cardiovascular outcome data exist at the licensed osteoarthritis dose.",
        ],
        requirements: [
          {
            part: "I",
            marks: 60,
            text: "From the mechanistic data alone, and before considering any clinical outcome, state what the prostacyclin and thromboxane findings predict about thrombotic risk, and derive that prediction from the underlying biology. Then state whether the trial's observed cardiovascular imbalance is consistent with, independent of, or contradicted by that prediction, and say what weight a prior mechanistic prediction should carry when interpreting a marginal clinical signal.",
          },
          {
            part: "II",
            marks: 55,
            text: "Audit the trial design against the question the trial was later used to answer. Address the comparator choice, the absence of a placebo arm, the collection of cardiovascular events as adverse events rather than as an adjudicated endpoint, the aspirin exclusion, and the two cut-off dates. For each, state what it does to the interpretability of the cardiovascular result, and identify the single design feature that most limits it.",
          },
          {
            part: "IV",
            marks: 70,
            text: "You chair the data monitoring committee, meeting at month 6 with the cardiovascular imbalance visible and the gastrointestinal benefit already significant. State your decision and your reasoning, the information you request before deciding, the stopping rules you would apply and their basis, and what you communicate to the sponsor, the investigators and the regulator. State what you do if the sponsor declines your request.",
          },
        ],
        research: {
          mandate:
            "Establish, with citation: (1) the biology of the prostacyclin–thromboxane balance and the specific published human mechanistic work demonstrating that selective COX-2 inhibition suppresses prostacyclin without affecting platelet thromboxane, naming the investigators and the year; (2) the real-world pivotal trial this scenario is modelled on — its name, year, journal, comparator and primary endpoint — together with the specific subsequent correspondence or editorial statement concerning events omitted from the published report, and what the journal ultimately published about it; (3) published guidance on the constitution, independence and stopping rules of data monitoring committees, naming the source; and (4) the regulatory position on comparator selection and on the use of active-controlled trials to establish safety, from a named agency guideline. Your Part II answer must apply the guidance you cite rather than restating it.",
          target_sources: [
            "Peer-reviewed human pharmacology studies of COX-2 selectivity and eicosanoid metabolites",
            "The original pivotal trial publication, subsequent correspondence, and journal editorial statements",
            "Regulatory and academic guidance on data monitoring committees and interim analysis",
            "Agency guidelines on choice of control group in clinical trials",
          ],
        },
        key: {
          expected:
            "The mechanistic derivation must come first and must be genuinely derived: prostacyclin is endothelial, COX-2 dependent, and antithrombotic; thromboxane is platelet, COX-1 dependent, and prothrombotic; an agent that suppresses the urinary prostacyclin metabolite by 62 per cent while leaving thromboxane untouched has removed one arm of a balanced system and left the other intact, and the prediction that follows is a shift toward thrombosis. The candidate should then state the epistemically important point, which is the whole reason the annex is ordered this way: the mechanistic prediction existed before the clinical signal and was published, so the imbalance observed in the trial was not an unexplained finding requiring a post-hoc explanation — it was the predicted finding, and a marginal clinical signal that confirms a prior mechanistic prediction warrants far more weight than the same signal arriving with no prior. That reframing is what the top band delivers and what most scripts miss. On design, all five features must be addressed and ranked, and the correct ranking puts the absence of a placebo arm first: without it, every cardiovascular comparison is a contrast between two active agents, so an excess in one arm and a protection in the other are mathematically indistinguishable, which is precisely the ambiguity the published explanation exploited. The aspirin exclusion removes the patients in whom the mechanism would matter most and simultaneously removes the population most representative of real-world use; collecting cardiovascular events as adverse events rather than as an adjudicated endpoint means they were neither pre-specified, nor blindly adjudicated, nor powered; and the two cut-off dates are the item on which the candidate's judgement is most exposed — the correct treatment is that a different cut-off for the safety endpoint than for the efficacy endpoint requires a pre-specified justification, and in its absence the three omitted infarctions are a reporting failure whose significance is not that three events change the statistics but that the direction of the omission was not random. On Part IV, the strongest answers do not stop the trial and do not continue unchanged: they request the unblinded cardiovascular data adjudicated by a blinded committee, the events beyond the current cut-off, and the metabolite data, set a pre-specified boundary before seeing more, and state plainly what they do if the sponsor declines — which is that a data monitoring committee denied the data it needs cannot discharge its function, and the correct response is to record the refusal in the minutes, notify the regulator and resign rather than provide the appearance of oversight.",
          red_flags: [
            "Reasons from the clinical result to the mechanism rather than the reverse",
            "Treats the mechanistic prediction as post-hoc rationalisation",
            "Lists the design flaws without ranking them",
            "Misses the significance of the differing cut-off dates",
            "Stops the trial reflexively at the interim, or continues without requesting data",
            "Provides no answer for what happens when the sponsor declines the request",
          ],
        },
      },
    },
  ],
};

export const FACULTIES: Faculty[] = [ENGINEERING, BUSINESS, PHARMACY, MEDICINE];

export function facultyBySlug(slug: string): Faculty | undefined {
  return FACULTIES.find((f) => f.slug === slug);
}

export function specialisationBySlug(
  facultySlug: string,
  specialisationSlug: string,
): { faculty: Faculty; specialisation: Specialisation } | undefined {
  const faculty = facultyBySlug(facultySlug);
  if (!faculty) return undefined;
  const specialisation = faculty.specialisations.find((s) => s.slug === specialisationSlug);
  if (!specialisation) return undefined;
  return { faculty, specialisation };
}

/** Every valid paper identifier, e.g. "engineering-chemical-process". */
export function allPaperIds(): string[] {
  return FACULTIES.flatMap((f) => f.specialisations.map((s) => `${f.slug}-${s.slug}`));
}

/** Splits "engineering-chemical-process" into its faculty and specialisation. */
export function parsePaperId(
  paperId: string,
): { faculty: Faculty; specialisation: Specialisation } | undefined {
  for (const faculty of FACULTIES) {
    if (!paperId.startsWith(`${faculty.slug}-`)) continue;
    const rest = paperId.slice(faculty.slug.length + 1);
    const specialisation = faculty.specialisations.find((s) => s.slug === rest);
    if (specialisation) return { faculty, specialisation };
  }
  return undefined;
}
