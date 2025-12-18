"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { PROJECT_SORT_OPTIONS } from "@/lib/constants";

export function SortDropdown() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tInputs = useTranslations("inputs");

  const currentSort = searchParams.get("sort") ?? PROJECT_SORT_OPTIONS[2].value;

  const handleChange = (value) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={currentSort}
        onChange={(e) => handleChange(e.target.value)}
        className="
          rounded-lg border border-neutral-200
          px-3 py-2 text-sm
          bg-white
          hover:bg-neutral-50
          focus:outline-none focus:ring-2 focus:ring-primary-500
        ">
        {PROJECT_SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {tInputs(option.label)}
          </option>
        ))}
      </select>
    </div>
  );
}
