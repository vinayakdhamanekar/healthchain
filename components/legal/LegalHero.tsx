import type { JSX } from "react";

interface LegalHeroProps {
  title: string;
  effectiveDate?: string;
}

export default function LegalHero({ title, effectiveDate }: LegalHeroProps): JSX.Element {
  return (
    <section className="relative bg-[#F7F3EF] px-7 md:px-14 pt-[100px] md:pt-[110px] pb-0">
      <div className="max-w-[760px]">
        <h1 className="text-[34px] md:text-[46px] font-semibold tracking-[-0.025em] leading-[1.08] text-[#34332C]">
          {title}
        </h1>

        {effectiveDate && (
          <p className="mt-5 text-[15px] leading-[1.5] text-[#6B665D]">
            Effective Date: {effectiveDate}
          </p>
        )}
      </div>
    </section>
  );
}
