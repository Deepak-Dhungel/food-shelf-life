import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import SearchBar from "./SearchBar";
import { POPULAR_CATEGORIES } from "../constants/constant";
import type { Food } from "../types/food";

interface MobileSearchOverlayProps {
  isOpen: boolean;
  foods: Food[];
  onClose: () => void;
  onCategorySelect: (category: string) => void;
  onSelectFood: (food: Food) => void;
}

export interface MobileSearchOverlayHandle {
  focusInput: () => void;
}

const MobileSearchOverlay = forwardRef<
  MobileSearchOverlayHandle,
  MobileSearchOverlayProps
>(function MobileSearchOverlay(
  { isOpen, foods, onClose, onCategorySelect, onSelectFood },
  ref
) {
  const [overlayQuery, setOverlayQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    focusInput: () => {
      containerRef.current
        ?.querySelector("input")
        ?.focus({ preventScroll: true });
    },
  }));

  useEffect(() => {
    if (!isOpen) {
      setOverlayQuery("");
    }
  }, [isOpen]);

  const results = overlayQuery.trim()
    ? foods.filter(
        (f) =>
          f.name.toLowerCase().includes(overlayQuery.toLowerCase()) ||
          f.category.toLowerCase().includes(overlayQuery.toLowerCase())
      )
    : [];

  const showResults = overlayQuery.trim().length > 0;

  return (
    <div
      ref={containerRef}
      className={`sm:hidden fixed inset-0 z-50 bg-white flex flex-col transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {/* Search bar + Cancel */}
      <div
        className="flex items-center gap-3 px-4 pb-3 border-b border-gray-100"
        style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 1rem)" }}
      >
        <div className="flex-1">
          <SearchBar query={overlayQuery} onSearch={setOverlayQuery} />
        </div>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 text-sm font-medium text-primary"
        >
          Cancel
        </button>
      </div>

      {/* Results or Popular Categories */}
      <div className="flex-1 overflow-y-auto px-4 pt-5">
        {showResults ? (
          <>
            <p className="font-bold text-gray-900 text-base mb-1">
              Results
            </p>
            {results.length === 0 ? (
              <p className="py-6 text-center text-gray-400 text-sm">
                No food items found.
              </p>
            ) : (
              <ul>
                {results.map((food) => (
                  <li key={food.id}>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectFood(food);
                        onClose();
                      }}
                      className="w-full flex items-center gap-3 py-3 border-b border-gray-100 last:border-0"
                    >
                      <span className="w-9 h-9 rounded-xl bg-gray-100 shrink-0 flex items-center justify-center text-xl">
                        {food.icon}
                      </span>
                      <span className="flex-1 min-w-0 text-left">
                        <span className="block text-sm font-semibold text-gray-900 truncate">
                          {food.name}
                        </span>
                        <span className="block text-xs text-gray-400">
                          {food.category}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <>
            <p className="font-bold text-gray-900 text-base mb-1">
              Popular Categories
            </p>
            <ul>
              {POPULAR_CATEGORIES.map((category) => (
                <li key={category}>
                  <button
                    type="button"
                    onClick={() => {
                      onCategorySelect(category);
                      onClose();
                    }}
                    className="w-full text-left py-3.5 text-gray-500 text-base border-b border-gray-100 last:border-0"
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
});

export default MobileSearchOverlay;
