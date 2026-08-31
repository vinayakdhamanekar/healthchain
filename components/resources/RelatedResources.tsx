import type { JSX } from "react";
import Link from "next/link";
import { getRelatedResources, type Resource } from "@/data/resources";
import ResourceCard from "@/components/resources/ResourceCard";

export default function RelatedResources({ resource }: { resource: Resource }): JSX.Element {
  const related = getRelatedResources(resource);
  if (related.length === 0) return <></>;

  return (
    <section className="px-7 pt-[66px] pb-[66px] md:px-14 pb-0 bg-[#F7F3EF] border-t border-[#E5DECF]">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-10">
        <h2 className="text-[32px] md:text-[42px] font-semibold leading-[1.08] tracking-[-0.02em] text-[#34332C]">
          More resources.
        </h2>
        <Link
          href="/resources"
          className="self-start md:self-auto whitespace-nowrap inline-flex items-center bg-transparent border border-[#CFC7B8] text-[#34332C] text-[15px] py-[13px] px-6 rounded-[40px] hover:bg-black/5 transition-colors"
        >
          View All Resources
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
        {related.map((r) => (
          <ResourceCard key={r.slug} resource={r} />
        ))}
      </div>
    </section>
  );
}
