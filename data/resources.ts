export type ResourceCategory = "regulatory-briefs" | "case-studies" | "whitepapers";

export interface CategoryMeta {
  slug: ResourceCategory;
  label: string;
  singular: string;
  chipClass: string;
}

export const CATEGORY_META: Record<ResourceCategory, CategoryMeta> = {
  "regulatory-briefs": {
    slug: "regulatory-briefs",
    label: "Regulatory Briefs",
    singular: "Regulatory Brief",
    chipClass: "bg-[#E9C5BC] text-[#9C4A37]",
  },
  "case-studies": {
    slug: "case-studies",
    label: "Case Studies",
    singular: "Case Study",
    chipClass: "bg-[#D2E3AC] text-[#51602F]",
  },
  whitepapers: {
    slug: "whitepapers",
    label: "Whitepapers",
    singular: "Whitepaper",
    chipClass: "bg-[#CBCDF1] text-[#3C3E8C]",
  },
};

export const CATEGORY_ORDER: ResourceCategory[] = [
  "regulatory-briefs",
  "case-studies",
  "whitepapers",
];

interface BulletItem {
  lead?: string;
  text: string;
}

type ContentBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: BulletItem[]; checklist?: boolean };

interface ResourceSection {
  heading: string;
  blocks: ContentBlock[];
}

export interface Resource {
  slug: string;
  category: ResourceCategory;
  title: string;
  description: string;
  keywords: string[];
  intro: string;
  sections: ResourceSection[];
}

export const RESOURCES: Resource[] = [
  // ── Regulatory Briefs ────────────────────────────────────────────────
  {
    slug: "cms-0057-f-payer-guide",
    category: "regulatory-briefs",
    title: "CMS - 0057 - F: What Payers Need to Know Before Jan 2027",
    description:
      "A practical breakdown of the CMS Interoperability and Prior Authorization Final Rule - what's required, what's already due, and how to build the data infrastructure to meet the January 2027 API deadline without a multi-year rebuild.",
    keywords: [
      "CMS interoperability compliance",
      "CMS-0057-F compliance",
      "prior authorization API",
      "FHIR-based APIs for payers",
      "payer compliance deadline 2027",
    ],
    intro:
      "CMS - 0057 - F is no longer a future problem - it's an active compliance timeline. Operational provisions took effect January 1, 2026. The remaining requirement - implementing and maintaining four FHIR-based APIs (Patient Access, Provider Access, Payer-to-Payer, and Prior Authorization) - is due January 1, 2027. For Medicare Advantage organizations, Medicaid and CHIP managed care plans, and QHP issuers on the federal exchange, that deadline is now inside most annual planning cycles. This brief breaks down what's required, what's already live, and where payers should focus engineering effort in the months remaining.",
    sections: [
      {
        heading: "What's Already in Effect (January 2026)",
        blocks: [
          {
            type: "p",
            text: "The operational half of the rule is live today. Impacted payers must issue prior authorization decisions within 72 hours for urgent requests and 7 calendar days for standard requests, provide specific denial reasons on every rejection, and retain five years of prior authorization history available on request. Public reporting of authorization metrics - volumes, approvals, denials, and turnaround times - begins in 2027. Plans that haven't operationalized these turnaround and documentation requirements are already exposed; this isn't a -get ready” phase, it's a “prove it” phase.",
          },
        ],
      },
      {
        heading: "What's Due by January 2027",
        blocks: [
          {
            type: "p",
            text: "The heavier lift is the API layer. Four FHIR-based APIs must be live and maintained:",
          },
          {
            type: "ul",
            items: [
              {
                lead: "Patient Access API",
                text: "expanded to include prior authorization status and decisions (excluding drugs), not just claims and encounters.",
              },
              {
                lead: "Provider Access API",
                text: "gives in-network providers with a treatment relationship access to member data for care coordination, with member opt-out support.",
              },
              {
                lead: "Payer-to-Payer API",
                text: "moves clinical and administrative history with the member when they switch plans, with member consent.",
              },
              {
                lead: "Prior Authorization API",
                text: "supports electronic submission, tracks status, and returns specific documentation requirements per item or service.",
              },
            ],
          },
          {
            type: "p",
            text: "Each API assumes something most payers don't have yet: a single, standardized, queryable view of member data that isn't locked inside claims adjudication systems, legacy eligibility platforms, or point solutions bolted on over a decade of M&A.",
          },
        ],
      },
      {
        heading: "Why This Is a Data Infrastructure Problem, Not Just an API Project",
        blocks: [
          {
            type: "p",
            text: "Most payers already have some FHIR exposure from the 2020 Patient Access rule. What trips teams up in 2026–2027 is scope: these four APIs pull from claims, eligibility, UM/prior auth systems, provider directories, and increasingly clinical data - often spread across a dozen or more source systems with inconsistent identifiers and no shared data model. Bolting an API on top of that fragmentation doesn't solve the underlying problem; it just exposes it faster, to more auditors, with public reporting attached.",
          },
          {
            type: "p",
            text: "The payers moving fastest aren't building four separate APIs. They're standing up one FHIR-native data layer that unifies claims, eligibility, UM, and provider data once, then exposes all four required APIs from that same foundation. That's the difference between a compliance project measured in 18-24 months and one measured in weeks.",
          },
        ],
      },
    ],
  },
  {
    slug: "beyond-cms-state-level-interoperability",
    category: "regulatory-briefs",
    title: "Beyond CMS: What State-Level Interoperability Rules Mean for Payers",
    description:
      "Federal mandates are only the floor. A look at how states are layering additional prior authorization, reporting, and data-exchange requirements on top of CMS - 0057 - F - and how payers should prepare for a patchwork compliance landscape.",
    keywords: [
      "state interoperability requirements",
      "Medicaid managed care compliance",
      "CMS interoperability compliance",
      "payer data integration",
      "prior authorization reform",
    ],
    intro:
      "CMS - 0057 - F sets a national floor - not a ceiling. States are increasingly building on top of it through Medicaid managed care contract terms, standalone prior authorization reform laws, and state-specific reporting requirements that exceed federal minimums. For multi-state payers, this means compliance isn't one deadline; it's a growing patchwork of overlapping, state-specific obligations layered on a federal base. This brief covers where states are going further and how payers should structure their data infrastructure to absorb that variability without rebuilding for every jurisdiction.",
    sections: [
      {
        heading: "Where States Are Extending Federal Requirements",
        blocks: [
          {
            type: "p",
            text: "State Medicaid agencies are writing CMS - 0057 - F provisions directly into MCO and MLTSS contracts - often with state-specific reporting cadences, additional data elements, and independent monitoring on top of the federal timeline. Several states have gone further still with their own prior authorization reform legislation: shorter decision turnaround times than the federal 72-hour/7-day standard, “gold-carding” laws that exempt high-performing providers from prior auth for certain services, and expanded public reporting requirements that apply to commercial lines CMS - 0057 - F doesn't touch. Some states are also pursuing their own all-payer claims database (APCD) submission mandates, which impose data standardization requirements independent of - and not always aligned with - federal FHIR/USCDI specifications.",
          },
        ],
      },
      {
        heading: "Why This Creates a Real Infrastructure Risk",
        blocks: [
          {
            type: "p",
            text: "The risk isn't any single state's rule - it's the combinatorics. A payer operating Medicaid, MA, and commercial lines across 8-10 states can face 8-10 different reporting formats, turnaround requirements, and data element sets layered on top of the federal APIs. Systems built to satisfy CMS - 0057 - F alone, with state-specific logic hardcoded state-by-state, become brittle fast: every new state contract or legislative session becomes its own integration project instead of a configuration change.",
          },
        ],
      },
      {
        heading: "How to Prepare: Build for Variability, Not for a Single Rule",
        blocks: [
          {
            type: "p",
            text: "The payers handling this well share one architectural decision: they built a single, standardized data layer that federal and state requirements both read from, with jurisdiction-specific rules (turnaround times, reporting formats, additional data elements) applied as configurable logic on top - not duplicated pipelines per state. Practically, that means:",
          },
          {
            type: "ul",
            items: [
              {
                text: "Centralizing prior authorization, claims, and eligibility data in one FHIR-ready model before layering state-specific business rules on top",
              },
              { text: "Treating state reporting formats as configuration, not custom integration work" },
              {
                text: "Building turnaround-time and denial-reason logic to the strictest applicable state standard by default, so federal minimums are a floor you clear automatically",
              },
              { text: "Tracking state legislative sessions as an ongoing compliance input, not a one-time assessment" },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "tefca-data-exchange-compliance-checklist",
    category: "regulatory-briefs",
    title: "TEFCA and the Data Exchange Framework: A Payer's Compliance Checklist",
    description:
      "What participating in TEFCA actually requires of a health plan - from QHIN connectivity to consent and identity matching - plus a practical checklist for evaluating readiness.",
    keywords: [
      "TEFCA compliance",
      "QHIN data exchange",
      "health information network compliance",
      "FHIR data exchange",
      "payer data integration",
    ],
    intro:
      "TEFCA participation is still voluntary - but “voluntary” is doing less work than it used to. As QHIN networks expand and CMS - 0057 - F pushes payers toward standardized, FHIR-based exchange, TEFCA connectivity is shifting from an experimental add-on to something increasingly assumed by provider and payer partners alike. This brief covers what TEFCA participation actually requires operationally, how it relates to (and doesn't replace) CMS - 0057 - F, and a checklist for assessing where your organization stands.",
    sections: [
      {
        heading: "What TEFCA Actually Requires",
        blocks: [
          {
            type: "p",
            text: "TEFCA operates through Qualified Health Information Networks (QHINs) that connect directly to one another. Payers typically join as Participants (or Subparticipants under a Participant, such as a regional HIE), connecting to a QHIN rather than building point-to-point interfaces with every provider and network. Joining requires:",
          },
          {
            type: "ul",
            items: [
              {
                text: "A signed Common Agreement relationship through your chosen QHIN, governing legal and operational responsibilities for exchange.",
              },
              {
                text: "Data conformance - as of January 1, 2026, all data created or exchanged must conform to USCDI v3 data classes and vocabulary, not older USCDI versions.",
              },
              {
                text: "Identity and consent infrastructure - TEFCA exchange is purpose-limited and audited. Every request must specify why data is being requested, and payers need reliable patient matching to avoid identity resolution errors at scale.",
              },
              {
                text: "Security posture aligned to QHIN Technical Framework requirements, including the shift toward FHIR-based query support alongside legacy document-based exchange.",
              },
            ],
          },
        ],
      },
      {
        heading: "How TEFCA Relates to CMS - 0057 - F",
        blocks: [
          {
            type: "p",
            text: "This is where plans get tripped up: TEFCA is not a substitute for CMS - 0057 - F's API requirements. CMS - 0057 - F is a payer-specific mandate requiring four defined FHIR APIs; TEFCA is a separate, broader nationwide exchange framework. Some payers use TEFCA connectivity to support parts of their Payer-to-Payer exchange strategy, but doing so doesn't waive the obligation to expose the required APIs directly. Treat TEFCA as complementary infrastructure - a way to extend reach and reduce one-off integrations - not a compliance shortcut.",
          },
        ],
      },
      {
        heading: "Payer Readiness Checklist",
        blocks: [
          {
            type: "ul",
            checklist: true,
            items: [
              { text: "Data conforms to USCDI v3 classes and vocabulary across all systems in scope for exchange" },
              {
                text: "A designated QHIN relationship is identified and evaluated against your exchange volume and partner network",
              },
              {
                text: "Identity resolution and patient matching logic is tested against cross-network scenarios, not just internal member ID matching",
              },
              {
                text: "Consent capture and purpose-of-request logging are built into the exchange workflow, not handled manually",
              },
              {
                text: "FHIR-based query support is roadmapped alongside existing document-based (IHE) exchange capabilities",
              },
              {
                text: "Governance owns TEFCA as a distinct workstream from CMS - 0057 - F API delivery, with clear points of overlap identified",
              },
            ],
          },
        ],
      },
    ],
  },

  // ── Case Studies ─────────────────────────────────────────────────────
  {
    slug: "midwestern-health-plan-provider-data",
    category: "case-studies",
    title: "Consolidating Provider Data for a Midwestern Health Plan",
    description:
      "A Midwestern health plan consolidated provider data scattered across dozens of source systems into a single, central FHIR-ready repository - improving accuracy and setting up compliant, scalable provider data exchange.",
    keywords: [
      "provider data management",
      "FHIR provider directory",
      "health plan data platform",
      "CMS interoperability compliance",
      "provider data integration",
    ],
    intro:
      "Provider data is deceptively hard to get right. Names, affiliations, credentialing status, and network participation live across credentialing systems, claims platforms, contracting databases, and directory tools that rarely agree with each other - a problem that shows up as directory inaccuracies, provider abrasion, and, increasingly, compliance risk under CMS - 0057 - F's Provider Access API requirements. This case study covers how one Midwestern health plan consolidated fragmented provider data into a single, central, FHIR-ready repository.",
    sections: [
      {
        heading: "The Problem: Provider Data Scattered by Design, Not Accident",
        blocks: [
          {
            type: "p",
            text: "The plan's provider data had accumulated across more than a dozen source systems over years of network growth, credentialing process changes, and departmental tools built to solve local problems. No single system held a complete, current view of any given provider - a credentialing update in one system routinely lagged behind a contracting change in another, and directory data reflected whichever system happened to sync most recently. The plan's teams were manually reconciling discrepancies as a matter of routine operations, not exception handling.",
          },
        ],
      },
      {
        heading: "The Approach: One Repository, FHIR-Ready by Design",
        blocks: [
          {
            type: "p",
            text: "Rather than attempting to force every source system into agreement directly with one another - a project with as many integration points as source systems - the plan consolidated provider data into a single central repository built on a FHIR-ready data model from the outset. Each source system continued feeding into that repository, but reconciliation, deduplication, and standardization happened once, centrally, rather than being re-solved between every pair of systems.",
          },
        ],
      },
      {
        heading: "The Result: Accuracy, Speed, and Compliance Readiness Together",
        blocks: [
          {
            type: "p",
            text: "Consolidation gave the plan a single, authoritative view of provider data for the first time - directly reducing the manual reconciliation work previously absorbed by operations teams and improving the accuracy of provider directories used by members and by CMS. Because the repository was FHIR-ready by design rather than adapted after the fact, it also positioned the plan well ahead of the Provider Access API requirements under CMS - 0057 - F: exposing provider data through a compliant API became a matter of connecting to an existing, standardized source, not a new data project layered on top of unresolved fragmentation.",
          },
        ],
      },
    ],
  },
  {
    slug: "regional-blue-plan-unified-member-data",
    category: "case-studies",
    title: "How a Regional Blue Plan Unified Member Data in Days",
    description:
      "A regional Blue plan went from 12-18 month integration timelines to production-ready data pipelines in days - without a rip-and-replace of existing systems.",
    keywords: [
      "payer data integration",
      "health plan data platform",
      "FHIR data infrastructure",
      "member data unification",
      "healthcare data interoperability",
    ],
    intro:
      "Integration timelines are one of the quietest budget killers in payer technology. For one regional Blue plan, every new data source - a new provider group, a new claims feed, a new state reporting requirement - meant restarting a 12-18 month integration cycle: requirements gathering, custom mapping, testing, and a go-live date measured in fiscal years, not sprints. This case study covers how the plan moved from that cycle to production-ready pipelines in days, without replacing the core systems already running its business.",
    sections: [
      {
        heading: "The Problem: Integration Debt Compounding Over Time",
        blocks: [
          {
            type: "p",
            text: "Like most regional plans with decades of operating history, this Blue plan's data sat across claims adjudication, eligibility, care management, and a growing set of provider and vendor feeds accumulated through partnerships and acquisitions. Every new source required custom point-to-point mapping work done largely by hand. The plan's own team estimated that a typical new integration - even a relatively simple one - took 12 to 18 months from kickoff to production, driven not by any single hard technical problem but by the cumulative overhead of mapping, validating, and re-testing against every downstream system that touched member data.",
          },
        ],
      },
      {
        heading: "The Approach: A Unified Data Layer, Not a Replacement",
        blocks: [
          {
            type: "p",
            text: "Rather than proposing a multi-year platform migration - the kind of project regional plans have good reason to be wary of - the plan adopted HealthChain's data unification layer as an addition to its existing systems, not a replacement for them. Claims, eligibility, and care management data continued flowing through the systems the plan already operated; HealthChain's platform sat alongside them, standardizing incoming data into a consistent, FHIR-ready model and automating the mapping work that previously consumed most of each integration timeline.",
          },
        ],
      },
      {
        heading: "The Result: 12-18 Months to Days",
        blocks: [
          {
            type: "p",
            text: "New data sources that previously took 12-18 months to integrate now move to production-ready pipelines in days. The shift wasn't the result of any single new source being “easier” - it came from eliminating the repeated, manual mapping and validation work that made every integration start from zero. Once the underlying data model was standardized, adding a new feed became a configuration exercise rather than a custom build.",
          },
          {
            type: "p",
            text: "That speed had immediate downstream effects. The plan's teams could respond to new provider partnerships, state reporting changes, and internal analytics requests on a timeline measured in sprints, not budget cycles - without touching the core systems already in production and without a disruptive cutover.",
          },
        ],
      },
    ],
  },
  {
    slug: "fhir-first-clinical-data-exchange",
    category: "case-studies",
    title: "A FHIR-First Approach to Clinical Data Exchange",
    description:
      "How one health plan used a FHIR-first strategy to move from fragmented clinical data to improved care coordination, greater data visibility, and stronger member engagement.",
    keywords: [
      "FHIR clinical data exchange",
      "healthcare data interoperability",
      "clinical data integration",
      "payer data platform",
      "care coordination data",
    ],
    intro:
      "Clinical data exchange has historically been the hardest problem for payers to solve well - clinical information lives with providers, arrives in inconsistent formats, and rarely reaches the systems that could use it for care coordination or risk adjustment in time to matter. This case study covers how one health plan restructured its approach around FHIR as the default standard, not an add-on for API compliance, and what changed as a result.",
    sections: [
      {
        heading: "Starting Point: FHIR as a Checkbox, Not a Strategy",
        blocks: [
          {
            type: "p",
            text: "Like many plans, this organization's early FHIR work was reactive - built to satisfy the 2020 Patient Access API requirement and little else. Clinical data exchange with providers still ran largely on older document-based methods and manual processes, disconnected from the plan's own claims and eligibility systems. The result was a familiar gap: the plan had some FHIR infrastructure, but no FHIR-first data strategy, and clinical visibility into member care remained fragmented and delayed.",
          },
        ],
      },
      {
        heading: "The Shift: Making FHIR the Foundation, Not the Interface",
        blocks: [
          {
            type: "p",
            text: "The plan restructured its approach so that FHIR wasn't just the format data left the building in - it became the internal data model clinical, claims, and eligibility information was standardized into from the start. That meant treating FHIR readiness as an infrastructure investment rather than an API-compliance task: building the capability to ingest, normalize, and store clinical data (lab results, care summaries, encounter data from providers) in FHIR-native form as it arrived, rather than translating it only at the point of external exchange.",
          },
        ],
      },
      {
        heading: "What Changed: Four Concrete Improvements",
        blocks: [
          {
            type: "ul",
            items: [
              {
                lead: "Improved care coordination.",
                text: "With clinical data normalized centrally rather than scattered across point solutions, care management teams gained a consistent, timely view of member encounters and results - reducing the lag between a clinical event and the plan's awareness of it.",
              },
              {
                lead: "Enhanced data visibility and control.",
                text: "Standardizing on FHIR gave the plan a single, queryable source of truth for clinical data instead of separate silos per data source, making it possible to see gaps in data completeness and govern access consistently.",
              },
              {
                lead: "Increased member engagement.",
                text: "Because member-facing tools could pull from the same FHIR-native data used internally, the plan was able to give members a more complete and current picture of their own care - closing a gap that previously existed between what the plan knew and what members could see.",
              },
              {
                lead: "Stronger position ahead of regulatory deadlines.",
                text: "Because clinical data was already flowing through a FHIR-native foundation, the plan's path to CMS - 0057 - F's expanded API requirements became an extension of existing infrastructure rather than a new build.",
              },
            ],
          },
        ],
      },
    ],
  },

  // ── Whitepapers ──────────────────────────────────────────────────────
  {
    slug: "payer-cto-guide-data-readiness",
    category: "whitepapers",
    title: "The Payer CTO's Guide to Data Readiness",
    description:
      "Why clean, longitudinal member data is the real foundation for AI, analytics, and value-based care - and a practical framework for assessing where your organization actually stands.",
    keywords: [
      "payer data readiness",
      "healthcare data platform for AI",
      "longitudinal member data",
      "health plan data strategy",
      "value-based care data",
    ],
    intro:
      "Every payer roadmap for AI, predictive analytics, or value-based care rests on the same unexamined assumption: that the underlying data is clean, complete, and connected enough to support it. For most organizations, that assumption doesn't hold. This whitepaper is a practical guide for payer CTOs and data leaders to assess data readiness honestly, understand why it's the actual bottleneck behind most stalled AI and analytics initiatives, and build a realistic path forward.",
    sections: [
      {
        heading: "Why Data Readiness Is the Real Constraint, Not Model Quality",
        blocks: [
          {
            type: "p",
            text: "When AI or analytics initiatives underperform at health plans, the postmortem usually points to the model, the vendor, or the use case. More often, the actual constraint was upstream: fragmented claims history across systems from past M&A, inconsistent member and provider identifiers preventing reliable longitudinal views, clinical data that never made it out of point-to-point provider feeds, and risk adjustment or HEDIS/Star measure calculations built on incomplete member records. A predictive model trained on fragmented, inconsistent data won't outperform a simpler model trained on clean, longitudinal data - no matter how sophisticated the model architecture.",
          },
        ],
      },
      {
        heading: "What “Data Readiness” Actually Means for a Payer",
        blocks: [
          {
            type: "p",
            text: "Data readiness isn't a single yes/no state. For payers, it breaks down into four concrete dimensions:",
          },
          {
            type: "ul",
            items: [
              {
                lead: "Longitudinality",
                text: "Can you see a member's full history across time and across the systems that touched their care, or only fragments per source system?",
              },
              {
                lead: "Standardization",
                text: "Is data normalized into a consistent model (ideally FHIR-native) as it enters your environment, or does every downstream use case re-solve mapping and normalization independently?",
              },
              {
                lead: "Identity resolution",
                text: "Do you have confidence that records referring to the same member or provider across systems are actually being matched, not just assumed to match?",
              },
              {
                lead: "Accessibility",
                text: "Can teams outside the original source system's owners actually query and use the data, or does every new use case require a new integration project?",
              },
            ],
          },
          {
            type: "p",
            text: "Most payers are strong on one or two of these and weak on the rest - which is usually enough to stall any AI or advanced analytics initiative regardless of which dimension is weakest.",
          },
        ],
      },
      {
        heading: "A Framework for Assessing Where You Stand",
        blocks: [
          {
            type: "p",
            text: "Rather than treating data readiness as an abstract maturity model, CTOs get more traction assessing it against specific, high-value use cases already on the roadmap: Can current infrastructure support real-time risk stratification for a specific population? Would current data support automated HEDIS/Star gap closure recommendations without manual chart review? Could a value-based care partner receive a complete, longitudinal member record today, or would that require a custom extract built for the occasion? Answering these concretely - rather than rating -data maturity” on an abstract scale - surfaces the actual gaps blocking specific initiatives, and makes the case for infrastructure investment in terms the rest of the organization can evaluate against real outcomes.",
          },
        ],
      },
    ],
  },
  {
    slug: "strategic-roadmap-clinical-data-integration",
    category: "whitepapers",
    title: "The Strategic Roadmap to Clinical Data Integration Success",
    description:
      "A framework for health plan leaders to unify fragmented data sources, navigate common integration pitfalls, and set measurable goals for clinical data integration success.",
    keywords: [
      "clinical data integration strategy",
      "healthcare data interoperability",
      "health plan data platform",
      "FHIR data model",
      "payer data integration",
    ],
    intro:
      "Clinical data integration initiatives at health plans tend to follow a familiar arc: strong initial momentum, a growing list of source systems that need to be included, timelines that stretch well past original estimates, and success criteria that were never clearly defined in the first place. This whitepaper offers a strategic framework for health plan leaders to unify fragmented data sources deliberately, avoid the integration pitfalls that derail most initiatives, and set concrete, measurable goals from the outset.",
    sections: [
      {
        heading: "Why Most Clinical Data Integration Efforts Stall",
        blocks: [
          {
            type: "p",
            text: "Three patterns show up repeatedly across stalled integration initiatives. First, scope creep by source system: what starts as -integrate our top clinical data feeds” expands one system at a time until the project resembles a full data platform rebuild, with no corresponding change in timeline or budget. Second, point-to-point architecture: each new source is integrated directly against existing systems rather than into a shared model, so complexity compounds with every addition instead of staying flat. Third, undefined success criteria: -better data” or -improved interoperability” as a goal gives leadership no way to know whether the initiative is on track or complete, which makes it easy to lose executive sponsorship midway through.",
          },
        ],
      },
      {
        heading: "A Framework for Unifying Fragmented Sources",
        blocks: [
          {
            type: "p",
            text: "The plans that execute integration successfully tend to follow a consistent structure, regardless of their starting architecture:",
          },
          {
            type: "ul",
            items: [
              {
                lead: "Inventory before integrating.",
                text: "Map every clinical, claims, and eligibility data source currently in use, along with its format, update frequency, and current consumers, before committing to an integration sequence.",
              },
              {
                lead: "Standardize once, centrally.",
                text: "Normalize incoming data into a single, FHIR-ready model as it enters the environment, rather than mapping each source independently to each downstream use case. This is the single highest-leverage architectural decision in the entire roadmap - it's what keeps integration complexity flat as sources are added, rather than compounding.",
              },
              {
                lead: "Sequence by value, not by ease.",
                text: "Prioritize sources that unlock the most immediate value - a top clinical data partner, a high-volume claims feed - rather than starting with whatever integration looks technically simplest, which often has the least organizational impact.",
              },
              {
                lead: "Govern access from day one.",
                text: "Define who can query the unified data and for what purpose before integration is complete, not after, to avoid a governance retrofit once data is already flowing.",
              },
            ],
          },
        ],
      },
      {
        heading: "Setting SMART Goals for Integration Success",
        blocks: [
          {
            type: "p",
            text: "Vague goals are the reason most clinical data integration initiatives can't demonstrate success even when they technically deliver. Concrete, measurable alternatives include: reducing the time to onboard a new clinical data source from months to a specified number of days; reducing manual data reconciliation work by a specific, trackable percentage; achieving a defined percentage of members with a complete longitudinal clinical record within a set timeframe; or reducing the number of point-to-point integrations maintained by IT by a specific count within a fiscal year. Each of these is measurable, time-bound, and tells leadership definitively whether the initiative succeeded.",
          },
        ],
      },
    ],
  },
];

export function getResourceBySlug(slug: string): Resource | undefined {
  return RESOURCES.find((r) => r.slug === slug);
}

export function getResourcesByCategory(category: ResourceCategory): Resource[] {
  return RESOURCES.filter((r) => r.category === category);
}

export function getRelatedResources(current: Resource, limit = 3): Resource[] {
  const sameCategory = RESOURCES.filter(
    (r) => r.category === current.category && r.slug !== current.slug
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const rest = RESOURCES.filter(
    (r) => r.category !== current.category && r.slug !== current.slug
  );
  return [...sameCategory, ...rest].slice(0, limit);
}
