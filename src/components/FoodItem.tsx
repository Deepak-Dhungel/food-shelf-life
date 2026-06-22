import type { Food } from "../types/food";
import {
  SPOIL_SIGNS_LABEL,
  STORAGE_FALLBACK_TIPS,
  STORAGE_LABELS,
} from "../constants/constant";

interface FoodItemProps {
  food: Food;
  isExpanded: boolean;
  onToggle: () => void;
}

function ShelfIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function FridgeIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
    </svg>
  );
}

function FreezerIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    </svg>
  );
}

function WarnIcon() {
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
      className="shrink-0 mt-0.5 text-red-500"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

interface StorageCardProps {
  icon: React.ReactNode;
  label: string;
  duration: string | null;
  tip: string;
  fallbackTip: string;
}

function StorageCard({ icon, label, duration, tip, fallbackTip }: StorageCardProps) {
  return (
    <div className="bg-gray-100 rounded-xl p-3.5 flex flex-col">
      <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-2">
        {icon}
        <span>{label}</span>
      </div>
      {duration ? (
        <>
          <p className="font-bold text-gray-900 text-base leading-snug">
            {duration}
          </p>
          <p className="text-xs text-gray-400 mt-1">{tip}</p>
        </>
      ) : (
        <p className="text-sm text-gray-500 italic leading-snug">
          {fallbackTip}
        </p>
      )}
    </div>
  );
}

export default function FoodItem({
  food,
  isExpanded,
  onToggle,
}: FoodItemProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl mb-3 overflow-hidden">
      <button
        className="flex items-center w-full px-4 py-3.5 gap-3.5 bg-transparent border-none cursor-pointer text-left"
        onClick={onToggle}
      >
        <span className="w-11 h-11 rounded-xl bg-gray-100 shrink-0 flex items-center justify-center text-2xl">
          {food.icon}
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-base font-semibold font-heading text-gray-900 truncate">
            {food.name}
          </span>
          <span className="block text-xs text-gray-400 mt-0.5">
            {food.category}
          </span>
        </span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`shrink-0 text-gray-400 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isExpanded && (
        <div className="px-4 pb-5 border-t border-gray-100 pt-4">
          <div className="grid grid-cols-3 gap-2 mb-5 max-sm:grid-cols-1">
            <StorageCard
              icon={<ShelfIcon />}
              label={STORAGE_LABELS.SHELF}
              duration={food.pantry}
              tip={food.pantryTip}
              fallbackTip={STORAGE_FALLBACK_TIPS.SHELF}
            />
            <StorageCard
              icon={<FridgeIcon />}
              label={STORAGE_LABELS.FRIDGE}
              duration={food.refrigerated}
              tip={food.fridgeTip}
              fallbackTip={STORAGE_FALLBACK_TIPS.FRIDGE}
            />
            <StorageCard
              icon={<FreezerIcon />}
              label={STORAGE_LABELS.FREEZER}
              duration={food.frozen}
              tip={food.freezerTip}
              fallbackTip={STORAGE_FALLBACK_TIPS.FREEZER}
            />
          </div>

          {food.spoilSigns.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
                {SPOIL_SIGNS_LABEL}
              </p>
              <ul className="space-y-2">
                {food.spoilSigns.map((sign, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <WarnIcon />
                    {sign}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
