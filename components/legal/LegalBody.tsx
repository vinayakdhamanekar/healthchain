import type { JSX } from "react";
import type { LegalDocument } from "@/data/legal";

export default function LegalBody({ doc }: { doc: LegalDocument }): JSX.Element {
  return (
    <article className="bg-[#F7F3EF] px-7 md:px-14 pb-[66px] pt-[30px] ">
      <div className="">
        <div className="flex flex-col gap-10">
          {doc.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-[22px] md:text-[28px] font-semibold tracking-[-0.01em] text-[#34332C] mb-4">
                {section.heading}
              </h2>

              <div className="flex flex-col gap-5">
                {section.blocks.map((block, idx) => {
                  if (block.type === "p") {
                    return (
                      <p key={idx} className="text-[16px] leading-[1.65] text-[#5E594F]">
                        {block.text}
                      </p>
                    );
                  }

                  if (block.type === "label") {
                    return (
                      <p key={idx} className="text-[16px] leading-[1.65] font-semibold text-[#34332C]">
                        {block.text}
                      </p>
                    );
                  }

                  return (
                    <ul key={idx} className="flex flex-col gap-3">
                      {block.items.map((item) => (
                        <li key={item.text} className="flex flex-col gap-3">
                          <div className="flex items-start gap-3 text-[16px] leading-[1.65] text-[#5E594F]">
                            <span className="mt-[10px] w-[4px] h-[4px] rounded-full bg-[#5E594F] shrink-0" />
                            <span>{item.text}</span>
                          </div>

                          {item.sublist && (
                            <ul className="flex flex-col gap-3 pl-7">
                              {item.sublist.map((subText) => (
                                <li
                                  key={subText}
                                  className="flex items-start gap-3 text-[15px] leading-[1.65] text-[#5E594F]"
                                >
                                  <span className="mt-[9px] w-[4px] h-[4px] rounded-full bg-[#8A857A] shrink-0" />
                                  <span>{subText}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
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
