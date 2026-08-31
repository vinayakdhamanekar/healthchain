"use client";

import { useState, type JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORY_META, type Resource, type ResourceCategory } from "@/data/resources";
import ResourceCard from "@/components/resources/ResourceCard";

const PAGE_SIZE = 6;

interface ResourceCategorySectionProps {
  category: ResourceCategory;
  resources: Resource[];
  isFirst?: boolean;
}

export default function ResourceCategorySection({
  category,
  resources,
  isFirst = false,
}: ResourceCategorySectionProps): JSX.Element {
  const meta = CATEGORY_META[category];
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visible = resources.slice(0, visibleCount);
  const hasMore = visibleCount < resources.length;

  return (
    <section
      id={category}
      className={`scroll-mt-[100px] px-7 md:px-14 py-14 md:py-16 bg-[#F7F3EF] ${
        isFirst ? "" : "border-t border-[#E5DECF]"
      }`}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-10">
        <h2 className="text-[28px] md:text-[38px] font-semibold leading-[1.08] tracking-[-0.02em] text-[#34332C]">
          {meta.label}
        </h2>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
        <AnimatePresence initial={false}>
          {visible.map((resource) => (
            <motion.div
              key={resource.slug}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="h-full"
            >
              <ResourceCard resource={resource} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            type="button"
            onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
            className="inline-flex items-center bg-transparent border border-[#CFC7B8] text-[#34332C] text-[15px] py-[13px] px-6 rounded-[40px] hover:bg-black/5 transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
}
