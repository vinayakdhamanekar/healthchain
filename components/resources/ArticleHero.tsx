import type { JSX } from "react";
import Link from "next/link";
import { CATEGORY_META, type Resource } from "@/data/resources";

export default function ArticleHero({ resource }: { resource: Resource }): JSX.Element {
  const meta = CATEGORY_META[resource.category];

  return (
    <section className="relative bg-[#F7F3EF] px-7 md:px-14 pt-[100px] md:pt-[110px] pb-0">
      <div className="max-w-[760px]">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] font-semibold tracking-[0.1em] uppercase text-[#A8543C] mb-6">
          <Link href="/resources" className="hover:opacity-70 transition-opacity">
            Resources
          </Link>
          <span className="opacity-50">→</span>
          <Link
            href={`/resources#${meta.slug}`}
            className="hover:opacity-70 transition-opacity"
          >
            {meta.label}
          </Link>
        </div>

        {/* Headline */}
        <h1 className="text-[34px] md:text-[46px] font-semibold tracking-[-0.025em] leading-[1.08] text-[#34332C]">
          {resource.title}
        </h1>

        {/* Subtext */}
        {/* <p className="mt-6 text-[17px] md:text-[19px] leading-[1.55] text-[#57534C] max-w-[680px]">
          {resource.description}
        </p> */}
      </div>
    </section>
  );
}
