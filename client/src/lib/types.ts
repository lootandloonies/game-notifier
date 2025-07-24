export interface FilterState {
  search: string;
  platforms: string[];
  genre: string;
  minRating: string;
  sortBy: string;
}

export interface ViewState {
  isGridView: boolean;
  currentPage: number;
  itemsPerPage: number;
}

export const PLATFORMS = [
  "Epic Games",
  "Steam", 
  "GOG",
  "Ubisoft Connect"
];

export const GENRES = [
  "All Genres",
  "Action",
  "Adventure",
  "RPG",
  "Strategy",
  "Indie",
  "Simulation",
  "FPS",
  "Survival",
  "Party"
];

export const RATING_OPTIONS = [
  { value: "all", label: "Any Rating" },
  { value: "7", label: "7.0+" },
  { value: "8", label: "8.0+" },
  { value: "9", label: "9.0+" },
];

export const SORT_OPTIONS = [
  { value: "latest", label: "Sort by: Latest" },
  { value: "rating", label: "Sort by: Rating" },
  { value: "name", label: "Sort by: Name" },
  { value: "endDate", label: "Sort by: End Date" },
];
