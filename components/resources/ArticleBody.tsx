import type { JSX } from "react";
import type { Resource } from "@/data/resources";

function CheckIcon(): JSX.Element {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#A8543C"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

/** Plain numbered/bullet marker used for non-checklist list items. */
function DotIcon(): JSX.Element {
  return (
    <span className="w-[18px] h-[18px] shrink-0 rounded-[6px] bg-[#EDE8E2] flex items-center justify-center">
      <span className="w-[5px] h-[5px] rounded-full bg-[#57534C]" />
    </span>
  );
}

function gridCellBorderClasses(idx: number, total: number): string {
  const cols = 2;
  const isLastCol = (idx + 1) % cols === 0;
  const isLastRow = idx >= total - cols;
 
  return [
    idx !== total - 1 && "",
    !isLastCol && "sm:border-r",
    !isLastRow && "sm:border-b",
    "border-[#928b86]",
  ]
    .filter(Boolean)
    .join(" ");
}

export default function ArticleBody({ resource }: { resource: Resource }): JSX.Element {
  return (
    <article className="bg-[#F7F3EF] px-7 md:px-14 pb-[66px] pt-[30px] border-[#E5DECF]">
      <div className="">
        {/* Intro */}
        <p className="text-[16px] leading-[1.65] text-[#57534C] mb-10">
          {resource.intro}
        </p>

        {/* Sections */}
        <div className="flex flex-col gap-10">
          {resource.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-[22px] md:text-[28px] font-semibold tracking-[-0.01em] text-[#34332C] mb-4">
                {section.heading}
              </h2>

              <div className="flex flex-col gap-5">
                {section.blocks.map((block, idx) => {
                  if (block.type === "p") {
                    return (
                      <p
                        key={idx}
                        className="text-[16px] leading-[1.65] text-[#57534C]"
                      >
                        {block.text}
                      </p>
                    );
                  }

                  return (
                    // <>
                    // <ul key={idx} className="flex flex-col gap-3">
                    //   {block.items.map((item) => (
                    //     <li
                    //       key={item.text}
                    //       className="flex items-start gap-3 text-[16px] leading-[1.65] text-[#57534C]"
                    //     >
                    //       {block.checklist ? (
                    //         <CheckIcon />
                    //       ) : (
                    //         <span className="mt-[10px] w-[4px] h-[4px] rounded-full bg-[#57534C] shrink-0" />
                    //       )}
                    //       <span>
                    //         {item.lead && (
                    //           <span className="font-semibold text-[#34332C]">{item.lead} </span>
                    //         )}
                    //         {item.text}
                    //       </span>
                    //     </li>
                    //   ))}
                    // </ul>
                     <div key={idx} className="border border-[#928b86] rounded-[0px] overflow-hidden">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 ">
                      {block.items.map((item, itemIdx) => (
                        <li
                          key={item.text}
                          className={`p-5 md:p-6 flex flex-col gap-3 ${gridCellBorderClasses(
                            itemIdx,
                            block.items.length
                          )}`}
                        >
                          
                          <span className="text-[15px] leading-[1.65] text-[#57534C]">
                            {item.lead && (
                              <span className="block font-semibold text-[#34332C] mb-1">
                                {item.lead}
                              </span>
                            )}
                            {item.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                 

                    
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
