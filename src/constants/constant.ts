export const APP_NAME = "Still Good";
export const APP_TAGLINE = "";

export const SEARCH_PLACEHOLDER = "Search by food or category...";

export const ALL_CATEGORIES = "All";

export const POPULAR_CATEGORIES_TITLE = "Popular categories";

export const POPULAR_CATEGORIES = [
  "Bakery",
  "Dairy",
  "Fruits",
  "Vegetables",
  "Beverages",
  "Grains",
] as const;

export const BEST_BY_NOTICE = "All durations are after the best-by date.";

export const NO_RESULTS_TEXT = "No food items found.";

export const SPOIL_SIGNS_LABEL = "Signs it's gone bad";

export const DATA_SOURCE_TEXT =
  "Data sourced from US Department of Agriculture (USDA)";
export const DATA_SOURCE_TEXT_SHORT = "Data sourced from";
export const DATA_SOURCE_LINK_LABEL = "fsis.usda.gov";
export const DATA_SOURCE_URL = "https://www.fsis.usda.gov";

export const APP_DESCRIPTION =
  "Still Good helps students and staff at CU Denver's Food Pantry quickly check how long food is safe to eat after its best-by date — reducing confusion and cutting down on unnecessary waste.";

export const APP_VERSION = "1.1.0";
export const FEEDBACK_EMAIL = "deepakdh555@gmail.com";
export const MADE_BY = "Made with ❤️ for CU Denver's Food Pantry";

export const STORAGE_LABELS = {
  SHELF: "Shelf",
  FRIDGE: "Fridge",
  FREEZER: "Freezer",
} as const;

export const STORAGE_FALLBACK_TIPS = {
  SHELF: "Not pantry-safe — always refrigerate or freeze",
  FRIDGE: "No refrigeration needed",
  FREEZER: "Freezing not recommended",
} as const;
