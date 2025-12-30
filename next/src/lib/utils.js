import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { themeVariableMap } from "./constants";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Utility function for formatting dates
export const formatDate = (date, localeString = "en-US") => {
  return new Intl.DateTimeFormat(localeString, {
    dateStyle: "short",
  }).format(new Date(date));
};

export const generatePagination = (currentPage, totalPages) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
};

export const getCssVarsFromPaletteResult = (paletteResult) => {
  const applyTheme = paletteResult?.data?.applyTheme === true;

  return applyTheme && paletteResult?.data
    ? Object.entries(paletteResult.data)
        .filter(([key, value]) => key !== "applyTheme" && value != null)
        .map(([key, value]) => {
          const cssVar = themeVariableMap[key];
          if (!cssVar) return "";

          try {
            return `${cssVar}: ${hexToRgb(value)};`;
          } catch {
            console.warn(`Invalid hex for ${key}: ${value}`);
            return "";
          }
        })
        .join("")
    : null;
};

export const normalizeUrl = (url) => {
  if (!url) return "#";

  let normalized = url.trim();

  if (!/^https?:\/\//i.test(normalized)) {
    normalized = `https://${normalized}`;
  }

  try {
    const parsed = new URL(normalized);

    if (!["http:", "https:"].includes(parsed.protocol)) {
      return "#";
    }

    return parsed.toString();
  } catch {
    return "#";
  }
};

const hexToRgb = (hex) => {
  let clean = hex.replace("#", "");

  if (clean.length === 3) {
    clean = clean
      .split("")
      .map((c) => c + c)
      .join("");
  }

  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);

  return `${r} ${g} ${b}`;
};
