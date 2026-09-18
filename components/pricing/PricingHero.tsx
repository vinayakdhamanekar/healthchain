import type { JSX } from "react";

interface Note {
  label: string;
  text: string;
}

const NOTES: Note[] = [
  {
    label: "APIs included",
    text: "All four APIs due 1 January 2027 - Patient Access, Provider Access, Payer-to-Payer, and Prior Authorization - plus Provider Directory.",
  },
  {
    label: "Onboarding",
    text: "We can onboard four plans before 1 January 2027. Proposals confirmed before 31 October begin within two weeks.",
  },
  {
    label: "Rate card status",
    text: "Draft rate card draft-2026-09-17. Bands above 10,000 members, add-on amounts, and connectivity billing basis are proposed, not approved.",
  },
];

export default function PricingHero(): JSX.Element {
  return (
    <section
      className="relative px-7 md:px-14 pt-[60px] pb-[72px] text-center"
      style={{
        backgroundImage: "url('/Patterns/pattern8.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Category breadcrumb */}
      <div className="mt-16 md:mt-16 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[13px] font-semibold tracking-[0.1em] uppercase text-white mb-6">
        <span>Pricing</span>
      </div>

      {/* Headline */}
      <h1 className="text-[38px] md:text-[54px] lg:text-[62px] font-semibold tracking-[-0.03em] leading-[1.06] text-white max-w-[760px] mx-auto">
        Estimate your interoperability cost.
      </h1>

      {/* Subtext */}
      <p className="mt-6 text-[16px] md:text-[18px] leading-[1.65] text-white max-w-[620px] mx-auto">
        For Medicare Advantage and Medicaid managed care plans with 1 
        to 50,000 covered members. No email required to see your estimate.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[980px] mx-auto text-left">
        {NOTES.map((note) => (
          <div
            key={note.label}
            className="rounded-[14px] border border-[#E5DECF] bg-white px-5 py-4"
          >
            <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#A8543C] mb-[6px]">
              {note.label}
            </div>
            <p className="text-[13.5px] leading-[1.55] text-[#57534C]">
              {note.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
