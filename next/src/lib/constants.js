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
