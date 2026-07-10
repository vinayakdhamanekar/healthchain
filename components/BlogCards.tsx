import type { JSX } from "react";

interface BlogCard {
  category: string;
  title: string;
  description: string;
}

const CARDS: BlogCard[] = [
  {
    category: "Regulatory Brief",
    title: "CMS-0057-F: What payers need to know before Jan 2027.",
    description:
      "A practical breakdown of the new interoperability mandate and how to prepare your data infrastructure.",
  },
  {
    category: "Case Study",
    title: "How a Regional Blue Plan unified member data in days.",
    description:
      "From 12-18 month integration timelines to production-ready pipelines—without rip-and-replace.",
  },
  {
    category: "Whitepaper",
    title: "The payer CTO's guide to data readiness",
    description:
      "Why clean longitudinal data is the foundation for AI, analytics, and value-based care.",
  },
];

function Card({ card, idx }: { card: BlogCard; idx: number }): JSX.Element {
  const isFirst = idx === 0;

  return (
    <div
      className={
        isFirst
          ? "pt-[30px] pb-[30px] md:pr-[30px]"
          : "pt-[30px] pb-[30px] px-0 md:px-[30px] border-t border-[#E5DECF] md:border-t-0 md:border-l md:border-[#E5DECF]"
      }
    >
      {/* Category */}
      <div className="font-mono text-[12px] tracking-[1px] text-[#8A857A] uppercase mb-4">
        {card.category}
      </div>

      {/* Title */}
      <h3 className="text-[23px] font-semibold leading-[1.18] tracking-[-0.01em] text-[#34332C] mb-[14px]">
        {card.title}
      </h3>

      {/* Description */}
      <p className="text-[14px] leading-[1.55] text-[#6B665D] mb-6">
        {card.description}
      </p>

      {/* Read more link */}
      <a
        href="#"
        className="font-mono text-[13px] text-[#34332C] no-underline hover:opacity-60 transition-opacity"
      >
        Read More →
      </a>
    </div>
  );
}

export default function BlogCards(): JSX.Element {
  return (
    <section className="px-7 md:px-14 pb-[0px] bg-[#f7f3EF]">

      {/* Label */}
      <div className="font-mono font-semibold text-[13px] tracking-[1.5px] text-[#A8543C] uppercase mb-[18px]">
        Resources
      </div>

      {/* Header row */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-10">
        <h2 className="text-[32px] md:text-[42px] font-semibold leading-[1.08] tracking-[-0.02em] text-[#34332C]">
          Latest thinking.
        </h2>
        <a
          href="#"
          className="self-start md:self-auto whitespace-nowrap inline-flex items-center bg-transparent border border-[#CFC7B8] text-[#34332C] text-[15px] py-[13px] px-6 rounded-[40px] hover:bg-black/5 transition-colors"
        >
          View All Resources
        </a>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-[#E5DECF]">
        {CARDS.map((card, idx) => (
          <Card key={card.category} card={card} idx={idx} />
        ))}
      </div>
    </section>
  );
}
