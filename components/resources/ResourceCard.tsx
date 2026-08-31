import type { JSX } from "react";
import Link from "next/link";
import { CATEGORY_META, type Resource } from "@/data/resources";

export default function ResourceCard({ resource }: { resource: Resource }): JSX.Element {
  const meta = CATEGORY_META[resource.category];

  return (
    <Link
      href={`/resources/${resource.slug}`}
      className="group flex flex-col h-full bg-[#FBF9F4] border border-[#E5DECF] rounded-[14px] p-7 hover:border-[#CFC7B8] hover:shadow-[0_14px_34px_rgba(60,45,30,0.07)] transition-all duration-300"
    >
      {/* Category chip */}
      <span
        className={`self-start font-mono text-[11px] font-medium tracking-[0.06em] uppercase px-[11px] py-[5px] rounded-[6px] mb-5 ${meta.chipClass}`}
      >
        {meta.singular}
      </span>

      {/* Title */}
      <h3 className="text-[20px] font-semibold leading-[1.25] tracking-[-0.01em] text-[#34332C] mb-3">
        {resource.title}
      </h3>

      {/* Description */}
      <p className="text-[14px] leading-[1.6] text-[#6B665D] mb-6 flex-1">
        {resource.description}
      </p>

      {/* Read more */}
      <span className="font-mono text-[13px] text-[#34332C] no-underline group-hover:opacity-60 transition-opacity">
        Read More →
      </span>
    </Link>
  );
}
