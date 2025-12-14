"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { generatePagination } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import { CONSTANTS } from "@/lib/constants";

export default function Pagination({ paginationData }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || CONSTANTS.DEFAULT_CURRENT_PAGE;
  const allPages = generatePagination(currentPage, paginationData?.pageCount ?? 0);

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="inline-flex">
      <PaginationArrow direction="left" href={createPageURL(currentPage - 1)} isDisabled={currentPage <= 1} />

      <div className="flex -space-x-px">
        {allPages.map((page, index) => {
          let position;

          if (index === 0) position = "first";
          if (index === allPages.length - 1) position = "last";
          if (allPages.length === 1) position = "single";
          if (page === "...") position = "middle";

          return (
            <PaginationNumber
              key={`${page}-${index}`}
              href={createPageURL(page)}
              page={page}
              position={position}
              isActive={currentPage === page}
            />
          );
        })}
      </div>

      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= (paginationData?.pageCount ?? 0)}
      />
    </div>
  );
}

function PaginationNumber({ page, href, isActive, position }) {
  const className = clsx(
    `
    inline-flex
    items-center
    justify-center
    h-11
    min-w-11
    px-3
    text-sm
    font-medium
    border
    transition
  `,
    {
      "rounded-l-md": position === "first" || position === "single",
      "rounded-r-md": position === "last" || position === "single",
      "bg-primary-700 text-white border-primary-700 z-10": isActive,
      "bg-transparent text-gray-500 border-neutral-300": !isActive,
      "hover:bg-primary-50": !isActive && position !== "middle",
      "cursor-default": position === "middle",
    }
  );

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({ href, direction, isDisabled }) {
  const className = clsx(
    `
    inline-flex
    items-center
    justify-center
    h-11
    w-11
    rounded-lg
    border
    text-gray-500
    transition
  `,
    {
      "bg-transparent text-gray-500 border-neutral-300 hover:bg-primary-50": !isDisabled,
      "pointer-events-none opacity-50": isDisabled,
      "mr-2 md:mr-4": direction === "left",
      "ml-2 md:ml-4": direction === "right",
    }
  );

  const icon = direction === "left" ? <ArrowLeftIcon className="w-4" /> : <ArrowRightIcon className="w-4" />;

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}
