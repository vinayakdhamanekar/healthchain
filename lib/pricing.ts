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

/**
 * Rate card draft-2026-09-17. Bands above MEMBER_MINIMUM, add-on amounts and
 * connectivity billing basis are proposed, not approved.
 */
export const PRICING = {
  basePMPM: 0.825,
  addOnPMPM: 0.275,
  memberMinimum: 10000,
  memberRange: { min: 1, max: 50000 },
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
  effectivePMPM: number;
  billableMembers: number;
  minimumApplied: boolean;
  recurringAnnual: number;
  connectivityOneTime: number;
  totalFirstYear: number;
  lineItems: LineItem[];
}

export function selectedAddOnCount(dataPrep: DataPrepSelection): number {
  return Object.values(dataPrep).filter(Boolean).length;
}

export function calculateEstimate(
  members: number,
  dataPrep: DataPrepSelection,
  directConnectivity: boolean,
  additionalConnectivityInstances: number
): PricingEstimate {
  const clampedMembers = Math.min(
    Math.max(members, PRICING.memberRange.min),
    PRICING.memberRange.max
  );

  const addOnCount = selectedAddOnCount(dataPrep);
  const effectivePMPM = PRICING.basePMPM + addOnCount * PRICING.addOnPMPM;

  const billableMembers = Math.max(clampedMembers, PRICING.memberMinimum);
  const minimumApplied = clampedMembers < PRICING.memberMinimum;
  const recurringAnnual = effectivePMPM * billableMembers * 12;

  const connectivityOneTime = directConnectivity
    ? PRICING.connectivity.baseSetup +
      Math.max(additionalConnectivityInstances, 0) * PRICING.connectivity.additionalInstance
    : 0;

  const lineItems: LineItem[] = [
    {
      label: "Standard interoperability package",
      detail: "Patient Access, Provider Access, Payer-to-Payer, Prior Authorization, and Provider Directory APIs",
      amount: PRICING.basePMPM * billableMembers * 12,
      cadence: "annual",
    },
  ];

  DATA_PREP_OPTIONS.forEach((option) => {
    if (dataPrep[option.key]) {
      lineItems.push({
        label: option.label,
        detail: option.description,
        amount: PRICING.addOnPMPM * billableMembers * 12,
        cadence: "annual",
      });
    }
  });

  if (directConnectivity) {
    lineItems.push({
      label: "Direct connectivity - base",
      detail: "One claims source plus one clinical or EMR source",
      amount: PRICING.connectivity.baseSetup,
      cadence: "one-time",
    });
    if (additionalConnectivityInstances > 0) {
      lineItems.push({
        label: "Direct connectivity - additional instances",
        detail: `${additionalConnectivityInstances} additional provider-specific clinical source instance${
          additionalConnectivityInstances > 1 ? "s" : ""
        }`,
        amount: PRICING.connectivity.additionalInstance * additionalConnectivityInstances,
        cadence: "one-time",
      });
    }
  }

  return {
    effectivePMPM,
    billableMembers,
    minimumApplied,
    recurringAnnual,
    connectivityOneTime,
    totalFirstYear: recurringAnnual + connectivityOneTime,
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
