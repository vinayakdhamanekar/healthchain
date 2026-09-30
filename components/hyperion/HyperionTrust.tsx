import type { JSX } from "react";
import { GUTTER, TAG_PLAIN } from "./styles";

const TOOLS: string[] = ["Power BI", "Tableau", "dbt", "DBeaver", "Metabase", "Databricks", "JDBC / ODBC"];

export default function HyperionTrust(): JSX.Element {
  return (
    <section
      aria-label="Compatible tools"
      className={`bg-[#F7F3EF] border-y border-[#E5DECF] flex flex-col items-center justify-center flex-wrap gap-[14px] py-[22px] ${GUTTER} min-[1025px]:flex-row min-[1025px]:gap-x-7`}
    >
      <p className="text-[16px] font-medium text-[#3A352E] min-[1025px]:pr-7 min-[1025px]:border-r min-[1025px]:border-[#E5DECF]">
        Connect anything that speaks MySQL
      </p>
      <ul className="flex flex-wrap gap-2 justify-center">
        {TOOLS.map((tool) => (
          <li key={tool} className={TAG_PLAIN}>
            {tool}
          </li>
        ))}
      </ul>
    </section>
  );
}
