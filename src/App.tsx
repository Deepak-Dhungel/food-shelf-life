import { useState } from "react";
import foodData from "./data/foods.json";
import type { Food } from "./types/food";
import DataSourceBanner from "./components/DataSourceBanner";
import Header from "./components/Header";
import FoodList from "./components/FoodList";
import SearchBar from "./components/SearchBar";
import MobileSearchOverlay from "./components/MobileSearchOverlay";
import { ALL_CATEGORIES } from "./constants/constant";

const foods = foodData as Food[];

function App() {
  const [query, setQuery] = useState<string>("");
  const [expandedFoodId, setExpandedFoodId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORIES);
  const [searchPanelOpen, setSearchPanelOpen] = useState(true);
  const [overlayOpen, setOverlayOpen] = useState(false);

  const filteredFoods = foods.filter((food) => {
    const matchesQuery =
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

      {/* Floating search bar — visible only when panel is closed */}
      <div
        className={`hidden max-sm:block absolute bottom-0 left-0 right-0 z-10 px-4 pt-6 pb-[calc(1rem+env(safe-area-inset-bottom))] bg-gray-50/60 transition-opacity duration-200 ${
          searchPanelOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex-1 drop-shadow-[0_-4px_20px_rgba(0,0,0,0.14)] cursor-pointer"
            onClick={() => setOverlayOpen(true)}
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

      {/* Backdrop — closes panel when tapping outside */}
      {searchPanelOpen && (
        <div
          className="hidden max-sm:block fixed inset-0 z-40"
          onClick={() => setSearchPanelOpen(false)}
        />
      )}

      {/* Mobile Search Panel */}
      <div
        className={`hidden max-sm:block absolute bottom-0 left-0 right-0 z-30 bg-white rounded-t-3xl px-6 pt-3 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-[0_-8px_32px_rgba(0,0,0,0.18)] transition-transform duration-300 ease-in-out ${
          searchPanelOpen ? "translate-y-0" : "translate-y-[calc(100%+4rem)]"
        }`}
      >
        {/* Drag handle */}
        <div className="flex justify-center mb-3">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* Close button */}
        {/* <button
          type="button"
          onClick={() => setSearchPanelOpen(false)}
          aria-label="Close"
          className="absolute top-4 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button> */}

        <p className="text-xl font-bold text-gray-900 text-center mt-6 mb-4 leading-snug">
          Find food safety info
          <span className="block text-sm font-normal text-gray-400 mt-1">
            Search a food or browse by category
          </span>
        </p>
        <div className="cursor-pointer" onClick={() => setOverlayOpen(true)}>
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

      {/* Mobile full-screen search overlay */}
      <MobileSearchOverlay
        isOpen={overlayOpen}
        foods={foods}
        onClose={() => setOverlayOpen(false)}
        onCategorySelect={(category) => {
          setQuery(category);
          setActiveCategory(ALL_CATEGORIES);
          setExpandedFoodId(null);
        }}
        onSelectFood={(food) => {
          setQuery(food.name);
          setExpandedFoodId(food.id);
          setActiveCategory(ALL_CATEGORIES);
        }}
      />
    </div>
  );
}

export default App;
