"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
import { NEWS_SORT_OPTIONS } from "@/lib/constants";
import { useTranslations } from "next-intl";

export function SortButton() {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const tInputs = useTranslations("inputs");

  const currentSort = searchParams.get("sort") ?? NEWS_SORT_OPTIONS.PUBLISHED_DESC.value;

  const options = Object.values(NEWS_SORT_OPTIONS);
  const currentIndex = options.findIndex((opt) => opt.value === currentSort);
  const currentOption = options[currentIndex] ?? NEWS_SORT_OPTIONS.PUBLISHED_DESC;
  const nextOption = options[(currentIndex + 1) % options.length];

  const toggleSort = () => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", nextOption.value);
    replace(`${pathname}?${params.toString()}`);
  };

  const Icon = currentOption.icon === "down" ? ArrowDownIcon : ArrowUpIcon;

  return (
    <button
      onClick={toggleSort}
      aria-label="Toggle sort"
      className="
        flex items-center gap-1
        rounded-lg border border-neutral-200
        px-3 py-2 text-sm
        hover:bg-neutral-100
        focus:ring-2 focus:ring-primary-500
        transition
      ">
      <Icon className="h-4 w-4" />
      <span className="hidden sm:inline">{tInputs(currentOption.label)}</span>
    </button>
  );
}
