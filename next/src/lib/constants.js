export const CONSTANTS = {
  DEFAULT_CURRENT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 8,
  LAT: "46.358379369388345",
  LON: "25.804667215998464",
};

export const NEWS_SORT_OPTIONS = {
  PUBLISHED_DESC: {
    value: "publishedDate:desc",
    label: "newest",
    icon: "down",
  },
  PUBLISHED_ASC: {
    value: "publishedDate:asc",
    label: "oldest",
    icon: "up",
  },
};

export const PROJECT_SORT_OPTIONS = [
  {
    value: "publishedDate:desc",
    label: "newest",
    direction: "desc",
  },
  {
    value: "publishedDate:asc",
    label: "oldest",
    direction: "asc",
  },
  {
    value: "isFeatured:desc",
    label: "featured",
    direction: "desc",
  },
];

export const defaultPalette = {
  white: "#ffffff",
  black: "#000000",
  ring: "#5b970f",
  codeBg: "#e5e7eb",
  link: "#0d5b97",
  gray50: "#f9fafb",
  gray200: "#e5e7eb",
  gray500: "#6b7280",
  gray700: "#374151",
  gray900: "#111827",
  neutral50: "#fafafa",
  neutral100: "#f5f5f5",
  neutral200: "#e5e5e5",
  neutral300: "#d4d4d4",
  neutral400: "#a3a3a3",
  neutral700: "#404040",
  neutral900: "#171717",
  neutral950: "#0a0a0a",
  primary50: "#f1f8fe",
  primary100: "#e2f0fc",
  primary700: "#0d5b97",
  primary900: "#124168",
  secondary: "#5b970f",
  green500: "#22c55e",
  red500: "#ef4444",
  red600: "#dc2626",
};

export const themeVariableMap = {
  black: "--black",
  white: "--white",
  ring: "--ring",
  codeBg: "--code-bg",
  gray50: "--gray-50",
  gray200: "--gray-200",
  gray500: "--gray-500",
  gray700: "--gray-700",
  gray900: "--gray-900",
  neutral50: "--neutral-50",
  neutral100: "--neutral-100",
  neutral200: "--neutral-200",
  neutral300: "--neutral-300",
  neutral400: "--neutral-400",
  neutral700: "--neutral-700",
  neutral900: "--neutral-900",
  neutral950: "--neutral-950",
  primary50: "--primary-50",
  primary100: "--primary-100",
  primary700: "--primary-700",
  primary900: "--primary-900",
  secondary: "--secondary",
  green500: "--green-500",
  red500: "--red-500",
  red600: "--red-600",
};
