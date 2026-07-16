import { useEffect, useRef, useState } from "react";
import type { Food } from "../types/food";
import FoodItem from "./FoodItem";
import { BEST_BY_NOTICE, NO_RESULTS_TEXT } from "../constants/constant";

interface FoodListProps {
  foods: Food[];
  query: string;
  expandedFoodId: number | null;
  onToggleFood: (foodId: number) => void;
  activeCategory: string;
}

function ClockIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

const DATE_TERMS = [
  {
    term: "Best-By",
    definition:
      "A quality indicator, not a safety date. The food is at peak quality before this date but is often safe to eat after — this app tells you how much longer.",
  },
  {
    term: "Sell-By",
    definition:
      "Tells the store or pantry when to rotate stock. Not a consumer safety date. Food is usually good for days or weeks after.",
  },
  {
    term: "Use-By / Expiration",
    definition:
      "The only date that refers to safety. Do not consume food after this date, especially for meat, dairy, and prepared foods.",
  },
];

export default function FoodList({
  foods,
  query,
  expandedFoodId,
  onToggleFood,
  activeCategory,
}: FoodListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const [dateInfoOpen, setDateInfoOpen] = useState(false);

  useEffect(() => {
    listRef.current?.scrollTo({ top: 0 });
  }, [query, activeCategory]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Best-by notice — tap to expand date glossary */}
      <div className="shrink-0 mb-4 bg-amber-50 border border-amber-200 rounded-xl overflow-hidden">
        <button
          type="button"
          onClick={() => setDateInfoOpen((prev) => !prev)}
          className="w-full flex items-center gap-2.5 px-4 py-3 text-amber-700 text-sm text-left"
        >
          <ClockIcon />
          <span className="flex-1">{BEST_BY_NOTICE}</span>
          <ChevronIcon open={dateInfoOpen} />
        </button>

        {dateInfoOpen && (
          <div className="border-t border-amber-200 px-4 py-3 space-y-3">
            {DATE_TERMS.map(({ term, definition }) => (
              <div key={term}>
                <p className="text-xs font-bold text-amber-800 mb-0.5">
                  {term}
                </p>
                <p className="text-xs text-amber-700 leading-relaxed">
                  {definition}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {query.trim().length > 0 && query.trim().length < 3 && (
        <p className="shrink-0 text-center text-xs text-gray-400 mb-3">
          {3 - query.trim().length === 1
            ? "Type 1 more character to filter results"
            : `Type ${3 - query.trim().length} more characters to filter results`}
        </p>
      )}

      <div ref={listRef} className="flex-1 overflow-y-auto max-sm:pb-28">
        {foods.length === 0 ? (
          <p className="py-7 text-center text-gray-400 text-sm">
            {NO_RESULTS_TEXT}
          </p>
        ) : (
          foods.map((food) => (
            <FoodItem
              key={food.id}
              food={food}
              isExpanded={expandedFoodId === food.id}
              onToggle={() => onToggleFood(food.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
