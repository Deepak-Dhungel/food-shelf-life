import { useRef, useState } from "react";
import foodData from "./data/foods.json";
import type { Food } from "./types/food";
import DataSourceBanner from "./components/DataSourceBanner";
import Header from "./components/Header";
import FoodList from "./components/FoodList";
import SearchBar from "./components/SearchBar";
import BottomSheet from "./components/BottomSheet";
import MobileSearchOverlay, {
  type MobileSearchOverlayHandle,
} from "./components/MobileSearchOverlay";
import { ALL_CATEGORIES } from "./constants/constant";

const foods = foodData as Food[];

function App() {
  const [query, setQuery] = useState<string>("");
  const [expandedFoodId, setExpandedFoodId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORIES);
  const [searchPanelOpen, setSearchPanelOpen] = useState(true);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const overlayRef = useRef<MobileSearchOverlayHandle>(null);

  const openOverlay = () => {
    overlayRef.current?.focusInput();
    setOverlayOpen(true);
    setSearchPanelOpen(false);
  };

  const filteredFoods = foods.filter((food) => {
    const matchesQuery =
      query.trim().length < 3 ||
      food.name.toLowerCase().includes(query.toLowerCase()) ||
      food.category.toLowerCase().includes(query.toLowerCase());
    const matchesCategory =
      activeCategory === ALL_CATEGORIES || food.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

  const handleToggleFood = (foodId: number): void => {
    setExpandedFoodId((prev) => (prev === foodId ? null : foodId));
  };

  return (
    <div className="relative h-dvh overflow-hidden flex flex-col bg-gray-50">
      <DataSourceBanner />
      <Header query={query} onSearch={setQuery} />
      <main className="flex-1 flex flex-col overflow-hidden w-full max-w-4xl mx-auto px-10 pt-5 pb-10 max-sm:px-4 max-sm:pt-0 max-sm:pb-0">
        <FoodList
          foods={filteredFoods}
          query={query}
          expandedFoodId={expandedFoodId}
          onToggleFood={handleToggleFood}
          activeCategory={activeCategory}
        />
      </main>

      {/* Mobile Floating search bar */}
      <div
        className={`hidden max-sm:block absolute bottom-0 left-0 right-0 z-10 px-4 pt-6 pb-[calc(1rem+env(safe-area-inset-bottom))] bg-gray-50/60 transition-opacity duration-200 ${
          searchPanelOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex-1 drop-shadow-[0_-4px_20px_rgba(0,0,0,0.14)] cursor-pointer"
            onClick={openOverlay}
          >
            <div className="pointer-events-none">
              <SearchBar query={query} onSearch={setQuery} />
            </div>
          </div>
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setExpandedFoodId(null);
                setActiveCategory(ALL_CATEGORIES);
              }}
              className="shrink-0 text-sm font-medium text-primary"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Mobile Bottom Search Panel */}
      <BottomSheet
        isOpen={searchPanelOpen}
        onClose={() => setSearchPanelOpen(false)}
        className="hidden max-sm:block"
      >
        <div className="px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
          <p className="text-xl font-bold text-gray-900 text-center mt-2 mb-4 leading-snug">
            Find food safety info
            <span className="block text-sm font-normal text-gray-400 mt-1">
              Search a food or browse by category
            </span>
          </p>
          <div className="cursor-pointer" onClick={openOverlay}>
            <div className="pointer-events-none">
              <SearchBar query={query} onSearch={setQuery} />
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSearchPanelOpen(false)}
            className="block w-full text-sm underline text-gray-600 text-center mt-10"
          >
            Browse the list instead
          </button>
        </div>
      </BottomSheet>

      {/* Mobile full-screen search overlay */}
      <MobileSearchOverlay
        ref={overlayRef}
        isOpen={overlayOpen}
        foods={foods}
        onClose={() => setOverlayOpen(false)}
        onCategorySelect={(category) => {
          setQuery(category);
          setActiveCategory(ALL_CATEGORIES);
          setExpandedFoodId(null);
          setSearchPanelOpen(false);
        }}
        onSelectFood={(food) => {
          setQuery(food.name);
          setExpandedFoodId(food.id);
          setActiveCategory(ALL_CATEGORIES);
          setSearchPanelOpen(false);
        }}
      />
    </div>
  );
}

export default App;
