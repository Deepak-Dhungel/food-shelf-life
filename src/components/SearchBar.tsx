import { SEARCH_PLACEHOLDER } from "../constants/constant";

interface SearchBarProps {
  query: string;
  onSearch: (query: string) => void;
}

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export default function SearchBar({ query, onSearch }: SearchBarProps) {
  return (
    <div className="relative w-[90%] mx-auto">
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <SearchIcon />
      </div>
      <input
        type="text"
        inputMode="search"
        enterKeyHint="search"
        className="w-full border rounded-3xl pl-10 pr-10 py-2.5 text-base sm:text-sm outline-none bg-white text-gray-900 placeholder-gray-400 border-primary ring-2 ring-primary/20 transition-colors"
        placeholder={SEARCH_PLACEHOLDER}
        value={query}
        onChange={(e) => onSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.currentTarget.blur();
        }}
      />
      {/* {query && (
        <button
          type="button"
          onClick={() => onSearch("")}
          onMouseDown={(e) => e.preventDefault()}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
        >
          <ClearIcon />
        </button>
      )} */}
    </div>
  );
}
