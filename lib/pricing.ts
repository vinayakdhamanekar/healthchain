export type PayerType = "medicare-advantage" | "medicaid-managed-care";

export interface DataPrepSelection {
  mapStandardize: boolean;
  mergeRecords: boolean;
  matchIdentities: boolean;
}

export interface DataPrepOption {
  key: keyof DataPrepSelection;
  label: string;
  description: string;
}

export const PAYER_TYPES: { value: PayerType; label: string }[] = [
  { value: "medicare-advantage", label: "Medicare Advantage" },
  { value: "medicaid-managed-care", label: "Medicaid managed care" },
];

export const DATA_PREP_OPTIONS: DataPrepOption[] = [
  {
    key: "mapStandardize",
    label: "Map and standardise source data",
    description: "Transform agreed source fields and codes into the target format.",
  },
  {
    key: "mergeRecords",
    label: "Merge records across sources",
    description: "Assemble agreed records into a traceable member history.",
  },
  {
    key: "matchIdentities",
    label: "Match member identities with EMPI",
    description: "Apply the agreed identity matching workflow across sources.",
  },
];

export const CLINICAL_SOURCES = ["Athena", "eCW", "Epic", "Cerner"] as const;
export type ClinicalSource = (typeof CLINICAL_SOURCES)[number];

export type AdditionalInstances = Record<ClinicalSource, number>;

export const EMPTY_ADDITIONAL_INSTANCES: AdditionalInstances = {
  Athena: 0,
  eCW: 0,
  Epic: 0,
  Cerner: 0,
};

export interface ConnectivitySelection {
  enabled: boolean;
  additionalInstances: AdditionalInstances;
}

/**
 * Rate card draft-2026-09-17, mirrored from the reference calculator
 * (https://healthchain-com.vercel.app/pricing). Bands above 10,000 members,
 * add-on amounts and connectivity billing basis are proposed, not approved.
 */
export const PRICING = {
  memberRange: { min: 1, max: 50000 },
  baseAnnual: 99000,
  memberMinimum: 10000,
  // Marginal PMPM applied only to the slice of members inside each band.
  bands: [
    { above: 10000, upTo: 25000, marginalPmpm: 0.55 },
    { above: 25000, upTo: 50000, marginalPmpm: 0.33 },
  ],
  addOnPMPM: 0.275,
  connectivity: {
    baseSetup: 20000,
    additionalInstance: 10000,
  },
} as const;

export interface LineItem {
  label: string;
  detail: string;
  amount: number;
  cadence: "annual" | "one-time";
}

export interface PricingEstimate {
  eligible: boolean;
  invalidReason: string | null;
  overLimit: boolean;
  minimumApplied: boolean;
  members: number;
  effectivePMPM: number | null;
  packageAnnual: number;
  addOnAnnual: number;
  connectivityAnnual: number;
  recurringAnnual: number;
  totalFirstYear: number;
  lineItems: LineItem[];
}

export function selectedAddOnCount(dataPrep: DataPrepSelection): number {
  return Object.values(dataPrep).filter(Boolean).length;
}

export function totalAdditionalInstances(additionalInstances: AdditionalInstances): number {
  return Object.values(additionalInstances).reduce((sum, n) => sum + (Number(n) || 0), 0);
}

function ineligible(members: number, overrides: Partial<PricingEstimate>): PricingEstimate {
  return {
    eligible: false,
    invalidReason: null,
    overLimit: false,
    minimumApplied: false,
    members,
    effectivePMPM: null,
    packageAnnual: 0,
    addOnAnnual: 0,
    connectivityAnnual: 0,
    recurringAnnual: 0,
    totalFirstYear: 0,
    lineItems: [],
    ...overrides,
  };
}

export function calculateEstimate(
  rawMembers: number,
  dataPrep: DataPrepSelection,
  connectivity: ConnectivitySelection
): PricingEstimate {
  const members = Math.floor(rawMembers || 0);

  if (!Number.isFinite(members) || members < PRICING.memberRange.min) {
    return ineligible(members, { invalidReason: "Enter a whole number of covered members." });
  }

  // Above the supported limit: no normal estimate is calculated, same as the
  // reference page's "scoped enterprise discussion" state.
  if (members > PRICING.memberRange.max) {
    return ineligible(members, { overLimit: true });
  }

  const minimumApplied = members <= PRICING.memberMinimum;

  // Base package: fixed $99,000 through 10,000 members, then a marginal PMPM
  // applied only to the slice of members that falls inside each band.
  let packageAnnual: number = PRICING.baseAnnual;
  for (const band of PRICING.bands) {
    if (members > band.above) {
      packageAnnual += (Math.min(members, band.upTo) - band.above) * band.marginalPmpm * 12;
    }
  }
  packageAnnual = Math.round(packageAnnual);

  const lineItems: LineItem[] = [
    {
      label: "Standard interoperability package",
      detail: minimumApplied
        ? "Annual minimum through 10,000 members. Patient Access, Provider Access, Payer-to-Payer, Prior Authorization, and Provider Directory APIs."
        : "Patient Access, Provider Access, Payer-to-Payer, Prior Authorization, and Provider Directory APIs.",
      amount: packageAnnual,
      cadence: "annual",
    },
  ];

  let addOnAnnual = 0;
  DATA_PREP_OPTIONS.forEach((option) => {
    if (dataPrep[option.key]) {
      const amount = Math.round(PRICING.addOnPMPM * members * 12);
      addOnAnnual += amount;
      lineItems.push({ label: option.label, detail: option.description, amount, cadence: "annual" });
    }
  });

  let connectivityAnnual = 0;
  if (connectivity.enabled) {
    const additionalCount = totalAdditionalInstances(connectivity.additionalInstances);
    connectivityAnnual = PRICING.connectivity.baseSetup + additionalCount * PRICING.connectivity.additionalInstance;
    lineItems.push({
      label: "Direct connectivity",
      detail:
        "One claims source plus one clinical or EMR source" +
        (additionalCount > 0
          ? `, plus ${additionalCount} additional provider-specific clinical source instance${
              additionalCount > 1 ? "s" : ""
            }`
          : ""),
      amount: connectivityAnnual,
      cadence: "annual",
    });
  }

  const recurringAnnual = packageAnnual + addOnAnnual + connectivityAnnual;
  // Effective PMPM is a derived read-out of the annual recurring price, not
  // an independent driver of it - and it is meaningless for the flat-fee
  // 1-10,000 member tier, so it is not calculated there.
  const effectivePMPM = minimumApplied ? null : recurringAnnual / members / 12;

  return {
    eligible: true,
    invalidReason: null,
    overLimit: false,
    minimumApplied,
    members,
    effectivePMPM,
    packageAnnual,
    addOnAnnual,
    connectivityAnnual,
    recurringAnnual,
    totalFirstYear: recurringAnnual,
    lineItems,
  };
}

export function formatCurrency(value: number, fractionDigits = 0): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}
