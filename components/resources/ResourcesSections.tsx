import type { JSX } from "react";
import { CATEGORY_ORDER, getResourcesByCategory } from "@/data/resources";
import ResourceCategorySection from "@/components/resources/ResourceCategorySection";
import HyperionResourceSection from "@/components/resources/HyperionResourceSection";

export default function ResourcesSections(): JSX.Element {
  return (
    <>
      {/* Hyperion now leads the list, so every category section gets its top divider */}
      <HyperionResourceSection />
      {CATEGORY_ORDER.map((category) => (
        <ResourceCategorySection
          key={category}
          category={category}
          resources={getResourcesByCategory(category)}
        />
      ))}
    </>
  );
}
