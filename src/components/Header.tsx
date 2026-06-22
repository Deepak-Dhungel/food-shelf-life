import { useState } from "react";
import SearchBar from "./SearchBar";
import InfoOverlay from "./InfoOverlay";
import { APP_NAME, APP_TAGLINE } from "../constants/constant";

interface HeaderProps {
  query: string;
  onSearch: (query: string) => void;
}

function InfoIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

export default function Header({ query, onSearch }: HeaderProps) {
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between gap-4 px-10 py-5 max-sm:px-4 max-sm:py-4">
        <div className="flex flex-col">
          <span className="text-xl font-bold font-heading text-primary leading-tight">
            {APP_NAME}
          </span>
          {APP_TAGLINE && (
            <span className="text-sm text-gray-500 mt-0.5">{APP_TAGLINE}</span>
          )}
        </div>

        {/* Desktop search bar */}
        <div className="flex-1 max-w-xl max-sm:hidden">
          <SearchBar query={query} onSearch={onSearch} />
        </div>

        {/* Info icon */}
        <button
          type="button"
          onClick={() => setInfoOpen(true)}
          aria-label="App info"
          className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <InfoIcon />
        </button>
      </header>

      <InfoOverlay isOpen={infoOpen} onClose={() => setInfoOpen(false)} />
    </>
  );
}
