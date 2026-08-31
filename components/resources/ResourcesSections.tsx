import type { JSX } from "react";
import { CATEGORY_ORDER, getResourcesByCategory } from "@/data/resources";
import ResourceCategorySection from "@/components/resources/ResourceCategorySection";

export default function ResourcesSections(): JSX.Element {
  return (
    <>
      {CATEGORY_ORDER.map((category, idx) => (
        <ResourceCategorySection
          key={category}
          category={category}
          resources={getResourcesByCategory(category)}
          isFirst={idx === 0}
        />
      ))}
    </>
  );
}
