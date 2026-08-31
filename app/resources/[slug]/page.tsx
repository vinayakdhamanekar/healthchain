import type { JSX } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReadyCTA from "@/components/ReadyCTA";
import ArticleHero from "@/components/resources/ArticleHero";
import ArticleBody from "@/components/resources/ArticleBody";
import RelatedResources from "@/components/resources/RelatedResources";
import { RESOURCES, getResourceBySlug } from "@/data/resources";
import { pageMetadata } from "@/lib/seo";

interface ResourcePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): { slug: string }[] {
  return RESOURCES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: ResourcePageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) return {};

  return pageMetadata({
    title: resource.title,
    description: resource.description,
    path: `/resources/${resource.slug}`,
    keywords: resource.keywords,
  });
}

export default async function ResourceDetailPage({ params }: ResourcePageProps): Promise<JSX.Element> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) notFound();

  return (
    <div className="min-h-screen bg-[#F7F3EF]">
      <div className="max-w-[1280px] mx-auto border-x border-[#E5DECF] overflow-hidden bg-[#F4EFE8]">
        <Navbar />
        <ArticleHero resource={resource} />
        <ArticleBody resource={resource} />
        <RelatedResources resource={resource} />
        <ReadyCTA />
        <Footer />
      </div>
    </div>
  );
}
