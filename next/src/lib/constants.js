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
