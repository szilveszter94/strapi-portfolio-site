"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useTranslations } from "next-intl";

export function SearchInput() {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const tInputs = useTranslations("inputs");

  const getPathValue = () => {
    const v = searchParams.get("q");
    return v && v.trim() !== "" ? v : null;
  };

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <input
      type="search"
      defaultValue={getPathValue()?.toString()}
      onChange={(e) => handleSearch(e.target.value)}
      placeholder={tInputs("search")}
      className="border rounded px-3 py-2"
    />
  );
}
