"use client";

import { useMemo, useState } from "react";
import type { JSX, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import {
  PAYER_TYPES,
  DATA_PREP_OPTIONS,
  PRICING,
  calculateEstimate,
  formatCurrency,
  type PayerType,
  type DataPrepSelection,
} from "@/lib/pricing";

const DEFAULT_MEMBERS = 10000;

const FIELD_CLASS =
  "w-full bg-white border border-[#E5DECF] rounded-[10px] px-4 py-[11px] text-[15px] text-[#1A1A1A] placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#A8543C] transition-colors";

function CheckIcon(): JSX.Element {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 8.5l3 3 7-7"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
  description,
  priceLabel,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  description: string;
  priceLabel: string;
}): JSX.Element {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={checked}
      className={`w-full flex items-start gap-3.5 text-left rounded-[12px] border px-4 py-4 transition-colors ${
        checked ? "border-[#A8543C] bg-[#FCEAE7]" : "border-[#E5DECF] bg-white hover:border-[#CFC7B8]"
      }`}
    >
      <span
        className={`mt-[2px] flex items-center justify-center w-[20px] h-[20px] rounded-[6px] border shrink-0 transition-colors ${
          checked ? "bg-[#A8543C] border-[#A8543C]" : "bg-white border-[#CFC7B8]"
        }`}
      >
        {checked && <CheckIcon />}
      </span>
      <span className="flex-1 min-w-0">
        <span className="flex items-center justify-between gap-3">
          <span className="text-[14.5px] font-medium text-[#1A1A1A] min-w-0">{label}</span>
          <span className="text-[12.5px] font-semibold text-[#A8543C] whitespace-nowrap shrink-0">{priceLabel}</span>
        </span>
        <span className="block mt-1 text-[13px] leading-[1.5] text-[#57534C]">{description}</span>
      </span>
    </button>
  );
}

interface EmailEstimateFormProps {
  members: number;
  payerType: PayerType;
  effectivePMPM: number;
  recurringAnnual: number;
  connectivityOneTime: number;
}

function EmailEstimateForm({
  members,
  payerType,
  effectivePMPM,
  recurringAnnual,
  connectivityOneTime,
}: EmailEstimateFormProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/pricing-estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          payerType,
          members,
          effectivePMPM,
          recurringAnnual,
          connectivityOneTime,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group w-full inline-flex items-center justify-center gap-[14px] bg-[#A8543C] text-white text-[15px] font-medium py-[14px] pl-[24px] pr-[14px] rounded-[42px] transition-colors duration-300 hover:bg-[#97492F]"
      >
        Email my estimate
        <span className="w-[36px] h-[28px] rounded-full border border-white/40 inline-flex items-center justify-center text-[13px] shrink-0 transition-all duration-300 group-hover:bg-white group-hover:text-[#A8543C]">
          →
        </span>
      </button>
    );
  }

  if (status === "success") {
    return (
      <p className="text-[13.5px] font-medium text-green-700 text-center py-[14px]">
        Sent - check your inbox for a copy of this estimate.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="email"
        required
        placeholder="you@company.com"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        className={FIELD_CLASS}
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full inline-flex items-center justify-center gap-[10px] bg-[#A8543C] text-white text-[14.5px] font-medium py-[13px] rounded-[42px] transition-colors duration-300 hover:bg-[#97492F] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending..." : "Send my estimate"}
      </button>
      {status === "error" && (
        <p className="text-[12.5px] text-red-600 text-center">
          Something went wrong sending that. Please try again.
        </p>
      )}
    </form>
  );
}

export default function PricingCalculator(): JSX.Element {
  const [payerType, setPayerType] = useState<PayerType>("medicare-advantage");
  const [members, setMembers] = useState<number>(DEFAULT_MEMBERS);
  const [dataPrep, setDataPrep] = useState<DataPrepSelection>({
    mapStandardize: false,
    mergeRecords: false,
    matchIdentities: false,
  });
  const [directConnectivity, setDirectConnectivity] = useState(false);
  const [additionalInstances, setAdditionalInstances] = useState(0);

  const estimate = useMemo(
    () => calculateEstimate(members, dataPrep, directConnectivity, additionalInstances),
    [members, dataPrep, directConnectivity, additionalInstances]
  );

  const payerLabel = PAYER_TYPES.find((p) => p.value === payerType)?.label ?? "";

  const handleMembersInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (Number.isNaN(value)) return;
    setMembers(value);
  };

  const handleMembersBlur = () => {
    const clamped = Math.min(Math.max(members, PRICING.memberRange.min), PRICING.memberRange.max);
    setMembers(clamped);
  };

  const toggleDataPrep = (key: keyof DataPrepSelection) => {
    setDataPrep((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className="bg-[#F7F3EF] px-7 mt-10 md:px-14 pb-[72px]">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-8 items-start">
        {/* ── Inputs ─────────────────────────────────────────── */}
        <div className="min-w-0 rounded-[18px] border border-[#E5DECF] bg-white p-6 pt-8 md:p-8 md:pt-10">
          {/* Payer type */}
          <div className="mb-8">
            <label className="block text-[13px] font-semibold tracking-[0.06em] uppercase text-[#1A1A1A] mb-3">
              Payer type
            </label>
            <div className="flex flex-wrap gap-3">
              {PAYER_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setPayerType(type.value)}
                  aria-pressed={payerType === type.value}
                  className={`px-5 py-[10px] rounded-[42px] text-[14px] font-medium border transition-colors ${
                    payerType === type.value
                      ? "bg-[#A8543C] border-[#A8543C] text-white"
                      : "bg-white border-[#E5DECF] text-[#3A352E] hover:border-[#CFC7B8]"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-[13px] text-[#57534C]">
              Different payer type or scope?{" "}
              <Link href="/contact" className="text-[#A8543C] font-medium hover:underline">
                Discuss your scope →
              </Link>
            </p>
          </div>

          {/* Covered members */}
          <div className="mb-8">
            <label
              htmlFor="members"
              className="block text-[13px] font-semibold tracking-[0.06em] uppercase text-[#1A1A1A] mb-3"
            >
              How many covered members should we price?
            </label>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <input
                type="range"
                min={PRICING.memberRange.min}
                max={PRICING.memberRange.max}
                step={100}
                value={members}
                onChange={handleMembersInput}
                className="w-full sm:flex-1 min-w-0 accent-[#A8543C]"
                aria-label="Covered members slider"
              />
              <input
                id="members"
                type="number"
                min={PRICING.memberRange.min}
                max={PRICING.memberRange.max}
                value={members}
                onChange={handleMembersInput}
                onBlur={handleMembersBlur}
                className={`${FIELD_CLASS} w-full sm:w-[120px] shrink-0 text-right`}
              />
            </div>
            <p className="mt-3 text-[13px] text-[#57534C]">
              Whole number from {PRICING.memberRange.min.toLocaleString()} to{" "}
              {PRICING.memberRange.max.toLocaleString()}.
            </p>
          </div>

          {/* Data preparation */}
          <div className="mb-8">
            <label className="block text-[13px] font-semibold tracking-[0.06em] uppercase text-[#1A1A1A] mb-1">
              Optional data preparation
            </label>
            <p className="text-[13px] text-[#57534C] mb-3">
              All unchecked to start. Select only what you need Health Chain to perform
            </p>
            <div className="flex flex-col gap-3">
              {DATA_PREP_OPTIONS.map((option) => (
                <Checkbox
                  key={option.key}
                  checked={dataPrep[option.key]}
                  onChange={() => toggleDataPrep(option.key)}
                  label={option.label}
                  description={option.description}
                  priceLabel={`+${formatCurrency(PRICING.addOnPMPM, 3)} PMPM`}
                />
              ))}
            </div>
          </div>

          {/* Direct connectivity */}
          <div>
            <label className="block text-[13px] font-semibold tracking-[0.06em] uppercase text-[#1A1A1A] mb-1">
              Direct connectivity
            </label>
            <p className="text-[13px] text-[#57534C] mb-3">
              One-time. One claims source plus one clinical or EMR source.
            </p>
            <Checkbox
              checked={directConnectivity}
              onChange={() => setDirectConnectivity((prev) => !prev)}
              label="Add direct connectivity"
              description="Additional provider-specific clinical source instances $10,000 each."
              priceLabel={formatCurrency(PRICING.connectivity.baseSetup)}
            />

            {directConnectivity && (
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-[12px] border border-[#E5DECF] bg-[#FBF9F4] px-4 py-3.5">
                <span className="text-[14px] text-[#3A352E] min-w-0">
                  Additional provider-specific clinical source instances
                </span>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setAdditionalInstances((n) => Math.max(0, n - 1))}
                    aria-label="Decrease additional instances"
                    className="w-8 h-8 rounded-full border border-[#CFC7B8] flex items-center justify-center text-[16px] text-[#3A352E] hover:border-[#A8543C] transition-colors"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-[15px] font-medium text-[#1A1A1A]">
                    {additionalInstances}
                  </span>
                  <button
                    type="button"
                    onClick={() => setAdditionalInstances((n) => Math.min(20, n + 1))}
                    aria-label="Increase additional instances"
                    className="w-8 h-8 rounded-full border border-[#CFC7B8] flex items-center justify-center text-[16px] text-[#3A352E] hover:border-[#A8543C] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Estimate summary ───────────────────────────────── */}
        <div className="min-w-0 lg:sticky lg:top-[110px] rounded-[18px] border border-[#E5DECF] bg-white p-6 md:p-8">
          <p className="text-[13px] text-[#57534C] mb-1">
            {members.toLocaleString()} covered members · {payerLabel}
          </p>

          <div className="flex items-baseline gap-2 mb-1 flex-wrap">
            <span className="text-[32px] md:text-[38px] font-semibold tracking-[-0.02em] text-[#1A1A1A]">
              {formatCurrency(estimate.effectivePMPM, 3)}
            </span>
            <span className="text-[14px] text-[#57534C]">effective PMPM</span>
          </div>

          <p className="text-[15px] text-[#3A352E] mb-6">
            {formatCurrency(estimate.recurringAnnual)}{" "}
            <span className="text-[#57534C]">annual recurring</span>
          </p>

          {estimate.minimumApplied && (
            <p className="text-[12.5px] text-[#A8543C] bg-[#FCEAE7] rounded-[8px] px-3 py-2 mb-6">
              Annual minimum through 10,000 members applied.
            </p>
          )}

          <div className="flex flex-col gap-3 pb-6 mb-6 border-b border-[#E5DECF]">
            {estimate.lineItems.map((item) => (
              <div key={item.label} className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[13.5px] font-medium text-[#1A1A1A]">{item.label}</p>
                  <p className="text-[12px] text-[#57534C] mt-[2px]">{item.detail}</p>
                </div>
                <p className="text-[13.5px] font-semibold text-[#1A1A1A] whitespace-nowrap shrink-0">
                  {formatCurrency(item.amount)}
                  <span className="block text-[11px] font-normal text-[#57534C] text-right">
                    {item.cadence === "annual" ? "/ year" : "one-time"}
                  </span>
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 mb-8">
            <span className="text-[14px] font-medium text-[#1A1A1A]">Total first-year investment</span>
            <span className="text-[20px] font-semibold text-[#1A1A1A] whitespace-nowrap shrink-0">
              {formatCurrency(estimate.totalFirstYear)}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <EmailEstimateForm
              members={members}
              payerType={payerType}
              effectivePMPM={estimate.effectivePMPM}
              recurringAnnual={estimate.recurringAnnual}
              connectivityOneTime={estimate.connectivityOneTime}
            />
            <Link
              href="/contact"
              className="w-full inline-flex items-center justify-center bg-transparent border border-[#CFC7B8] text-[#3A352E] text-[14.5px] py-[13px] rounded-[42px] hover:border-[#A8543C] hover:text-[#A8543C] transition-colors duration-300"
            >
              Request a scoped proposal
            </Link>
          </div>

          <p className="mt-6 text-[11.5px] leading-[1.55] text-[#928b86]">
            This estimate reflects the selected scope and stated pricing
            assumptions. Final scope, source readiness, service limits and
            contract terms are confirmed in your proposal. Additional work is
            identified before agreement. Customer-prepared data required
            unless data preparation is selected above.
          </p>
        </div>
      </div>
    </section>
  );
}
