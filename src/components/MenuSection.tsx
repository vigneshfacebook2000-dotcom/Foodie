import React, { useState, useMemo } from 'react';
import { FoodItem } from '../types';
import { FOOD_MENU } from '../data';
import { Search, Flame, Clock, Star, Filter, Heart, ArrowUpDown, ChevronDown } from 'lucide-react';

interface MenuSectionProps {
  onAddItem: (item: FoodItem, customization: { spicyLevel: 'mild' | 'medium' | 'hot', extraMeat: boolean, addEgg: boolean, specialInstructions: string }) => void;
  onRemoveItem: (itemId: string) => void;
  getItemQuantity: (itemId: string) => number;
  searchQuery: string;
}

export default function MenuSection({ onAddItem, onRemoveItem, getItemQuantity, searchQuery }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showSpicyFilter, setShowSpicyFilter] = useState<string>('all');
  const [showOnlyBestsellers, setShowOnlyBestsellers] = useState<boolean>(false);
  const [showVegNonVeg, setShowVegNonVeg] = useState<'all' | 'veg' | 'nonveg'>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'priceLowHigh' | 'priceHighLow' | 'none'>('none');

  // Customization modal state
  const [customizingItem, setCustomizingItem] = useState<FoodItem | null>(null);
  const [custSpicy, setCustSpicy] = useState<'mild' | 'medium' | 'hot'>('medium');
  const [custExtraMeat, setCustExtraMeat] = useState<boolean>(false);
  const [custAddEgg, setCustAddEgg] = useState<boolean>(false);
  const [custInstructions, setCustInstructions] = useState<string>('');

  // Categories list
  const categories = [
    { id: 'all', name: 'All Cuisines' },
    { id: 'chicken', name: 'Chicken Rolls' },
    { id: 'mutton', name: 'Fresh Mutton Rolls' },
    { id: 'egg', name: 'Egg Specialties' },
    { id: 'signature', name: 'Jumbo Combos' },
    { id: 'sides', name: 'Appetizers & Sides' },
    { id: 'beverage', name: 'Cold Beverages' }
  ];

  // Filtering & Sorting Logic
  const filteredItems = useMemo(() => {
    let items = [...FOOD_MENU];

    // Search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      items = items.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (activeCategory !== 'all') {
      items = items.filter(item => item.category === activeCategory);
    }

    // Spicy level filter
    if (showSpicyFilter !== 'all') {
      items = items.filter(item => item.spicyLevel === showSpicyFilter);
    }

    // Veg / Non Veg filter
    if (showVegNonVeg === 'veg') {
      items = items.filter(item => !item.isNonVeg);
    } else if (showVegNonVeg === 'nonveg') {
      items = items.filter(item => item.isNonVeg);
    }

    // Bestseller filter
    if (showOnlyBestsellers) {
      items = items.filter(item => item.isBestseller);
    }

    // Sorting
    if (sortBy === 'rating') {
      items.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'priceLowHigh') {
      items.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceHighLow') {
      items.sort((a, b) => b.price - a.price);
    }

    return items;
  }, [searchQuery, activeCategory, showSpicyFilter, showVegNonVeg, showOnlyBestsellers, sortBy]);

  // Open Customization dialog
  const handleOpenCustomizer = (item: FoodItem) => {
    setCustomizingItem(item);
    setCustSpicy(item.spicyLevel);
    setCustExtraMeat(false);
    setCustAddEgg(false);
    setCustInstructions('');
  };

  // Add customized item to cart
  const handleAddWithCustomization = () => {
    if (!customizingItem) return;
    onAddItem(customizingItem, {
      spicyLevel: custSpicy,
      extraMeat: custExtraMeat,
      addEgg: custAddEgg,
      specialInstructions: custInstructions
    });
    setCustomizingItem(null);
  };

  return (
    <div id="menu-section-root" className="bg-gray-50/50 py-12 border-t border-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center space-x-2">
              <span className="text-green-600">Freshly Made</span> <span>Rolls & Beverages</span>
            </h2>
            <p className="text-sm text-gray-500 font-medium mt-1.5">
              Prepared fresh in clean kitchens using 100% farm-sourced healthy chicken and mutton.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center space-x-4 mt-4 md:mt-0 text-xs font-bold text-gray-600">
            <span className="bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-100 flex items-center">
              <Star className="h-4.5 w-4.5 text-yellow-400 fill-yellow-400 mr-1.5" />
              4.9 Stars Average
            </span>
            <span className="bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-100 flex items-center">
              <Clock className="h-4.5 w-4.5 text-green-600 mr-1.5" />
              10-15 Min Avg Cook Time
            </span>
          </div>
        </div>

        {/* Zomato Style Category Filter Buttons */}
        <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-none snap-x touch-pan-x">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`snap-start shrink-0 px-5 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-green-600 text-white shadow-md shadow-green-600/25 border border-green-600'
                  : 'bg-white text-gray-700 border border-gray-200/80 hover:border-green-300 hover:text-green-700 shadow-sm'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Advanced Filters Bar */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm mb-8 flex flex-wrap gap-4 items-center justify-between">
          
          {/* Leftside: Toggle Veg, Bestseller */}
          <div className="flex flex-wrap gap-2.5 items-center">
            
            {/* Veg / Non-veg Filters */}
            <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200">
              <button
                onClick={() => setShowVegNonVeg('all')}
                className={`px-3 py-1.5 text-xs font-extrabold rounded-lg transition-colors cursor-pointer ${showVegNonVeg === 'all' ? 'bg-white text-green-800 shadow-xs' : 'text-gray-500 hover:text-gray-900'}`}
              >
                All Food
              </button>
              <button
                onClick={() => setShowVegNonVeg('veg')}
                className={`px-3 py-1.5 text-xs font-extrabold rounded-lg transition-colors flex items-center space-x-1 cursor-pointer ${showVegNonVeg === 'veg' ? 'bg-green-50 text-green-800 border border-green-200 shadow-xs' : 'text-gray-500 hover:text-gray-900'}`}
              >
                <span className="h-2 w-2 rounded-full bg-green-600 inline-block" />
                <span>Veg</span>
              </button>
              <button
                onClick={() => setShowVegNonVeg('nonveg')}
                className={`px-3 py-1.5 text-xs font-extrabold rounded-lg transition-colors flex items-center space-x-1 cursor-pointer ${showVegNonVeg === 'nonveg' ? 'bg-red-50 text-red-800 border border-red-200 shadow-xs' : 'text-gray-500 hover:text-gray-900'}`}
              >
                <span className="h-2 w-2 rounded-full bg-red-600 inline-block" />
                <span>Non-Veg</span>
              </button>
            </div>

            {/* Bestseller Checkbox */}
            <button
              onClick={() => setShowOnlyBestsellers(!showOnlyBestsellers)}
              className={`px-3.5 py-2 text-xs font-extrabold rounded-xl border transition-all flex items-center space-x-1.5 cursor-pointer ${
                showOnlyBestsellers
                  ? 'bg-yellow-50 text-yellow-800 border-yellow-300'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              <span>⭐ Bestsellers Only</span>
            </button>

            {/* Spicy Filter Dropdown */}
            <div className="relative">
              <select
                value={showSpicyFilter}
                onChange={(e) => setShowSpicyFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-200 text-xs font-extrabold text-gray-600 px-3.5 py-2 pr-8 rounded-xl focus:outline-none focus:border-green-500 hover:border-gray-300 transition-colors cursor-pointer"
              >
                <option value="all">🌶️ Spice: All</option>
                <option value="mild">🌶️ Mild</option>
                <option value="medium">🌶️🌶️ Medium</option>
                <option value="hot">🌶️🌶️🌶️ Spicy Hot</option>
              </select>
              <ChevronDown className="h-4 w-4 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>

          </div>

          {/* Rightside: Sorting Dropdown */}
          <div className="flex items-center space-x-2">
            <ArrowUpDown className="h-4 w-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none bg-white border border-gray-200 text-xs font-extrabold text-gray-700 px-4 py-2 pr-8 rounded-xl focus:outline-none focus:border-green-500 cursor-pointer"
            >
              <option value="none">Sort: Recommended</option>
              <option value="rating">Rating: High to Low</option>
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="priceHighLow">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Food Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => {
              const qty = getItemQuantity(item.id);
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-green-100 transition-all duration-300 flex flex-col group"
                >
                  
                  {/* Image section */}
                  <div className="relative h-56 overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark gradient base on image for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                    
                    {/* Bestseller or special badge */}
                    {item.isBestseller && (
                      <span className="absolute top-3 left-3 bg-yellow-400 text-green-950 font-black text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-md shadow-xs flex items-center">
                        <Flame className="h-3 w-3 fill-green-950 mr-1 animate-bounce" />
                        Bestseller
                      </span>
                    )}

                    {/* Spicy Level Tag */}
                    <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white font-bold text-[10px] tracking-wide px-2 py-1 rounded-md">
                      {item.spicyLevel === 'mild' && '🌶️ Mild'}
                      {item.spicyLevel === 'medium' && '🌶️🌶️ Medium'}
                      {item.spicyLevel === 'hot' && '🌶️🌶️🌶️ Spicy'}
                    </span>

                    {/* Fresh meat stamp */}
                    {item.isNonVeg && item.category !== 'egg' && (
                      <span className="absolute bottom-3 left-3 bg-green-600 text-white font-bold text-[9px] tracking-widest uppercase px-2 py-0.5 rounded border border-green-400">
                        Fresh Meat Certified
                      </span>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    
                    {/* Veg/Nonveg indicator & Rating */}
                    <div className="flex items-center justify-between mb-2">
                      
                      {/* Indian Veg / Non-veg indicator Box */}
                      <div className="flex items-center space-x-1.5">
                        <div className={`h-4.5 w-4.5 border-2 rounded p-0.5 flex items-center justify-center shrink-0 ${item.isNonVeg ? 'border-red-600' : 'border-green-600'}`}>
                          <div className={`h-2 w-2 rounded-full ${item.isNonVeg ? 'bg-red-600' : 'bg-green-600'}`} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                          {item.isNonVeg ? 'Non-Veg' : 'Veg'}
                        </span>
                      </div>

                      {/* Stars Rating badge */}
                      <div className="bg-green-50 text-green-800 border border-green-100 text-xs font-black px-2 py-0.5 rounded-lg flex items-center">
                        <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400 mr-1" />
                        {item.rating.toFixed(1)}
                        <span className="text-[10px] text-green-600 font-semibold ml-1">({item.reviewsCount}+)</span>
                      </div>
                    </div>

                    {/* Roll Name */}
                    <h3 className="text-lg font-extrabold text-gray-900 group-hover:text-green-700 transition-colors leading-snug">
                      {item.name}
                    </h3>

                    {/* Roll description */}
                    <p className="text-xs text-gray-500 font-medium mt-1.5 line-clamp-2 flex-1">
                      {item.description}
                    </p>

                    {/* Prep time & pricing footer */}
                    <div className="pt-4 mt-4 border-t border-gray-50 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-gray-400 block uppercase tracking-wider">Price</span>
                        <span className="text-xl font-black text-gray-900">₹{item.price}</span>
                      </div>

                      {/* Zomato-style Interactive "ADD" buttons or steppers */}
                      {qty > 0 ? (
                        <div className="flex items-center bg-green-50 text-green-800 border border-green-200 rounded-xl font-extrabold text-sm overflow-hidden h-10 shadow-inner">
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="px-3.5 hover:bg-green-100 text-green-700 h-full transition-colors font-black text-base cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-3 font-bold text-gray-800">{qty}</span>
                          <button
                            onClick={() => handleOpenCustomizer(item)}
                            className="px-3.5 hover:bg-green-100 text-green-700 h-full transition-colors font-black text-base cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleOpenCustomizer(item)}
                          className="bg-green-600 hover:bg-green-700 hover:shadow-md hover:shadow-green-200 text-white font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all cursor-pointer border border-green-600 active:scale-95 shrink-0"
                        >
                          Add +
                        </button>
                      )}
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200/60 max-w-lg mx-auto">
            <span className="text-4xl">🌯</span>
            <h3 className="text-lg font-extrabold text-gray-800 mt-3">No delicious items found</h3>
            <p className="text-sm text-gray-500 font-medium mt-1">Try resetting your active category or search query filters.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setShowVegNonVeg('all');
                setShowSpicyFilter('all');
                setShowOnlyBestsellers(false);
              }}
              className="mt-4 bg-green-600 text-white text-xs font-bold py-2.5 px-4 rounded-xl cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>

      {/* Zomato Customization Bottom Sheet / Modal Dialog */}
      {customizingItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-150">
            
            {/* Header */}
            <div className="relative bg-green-950 text-white p-5">
              <div className="flex items-center space-x-2">
                <div className={`h-4 w-4 border-2 p-0.5 rounded ${customizingItem.isNonVeg ? 'border-red-400' : 'border-green-400'}`}>
                  <div className={`h-1.5 w-1.5 rounded-full ${customizingItem.isNonVeg ? 'bg-red-400' : 'bg-green-400'}`} />
                </div>
                <h3 className="font-extrabold text-lg truncate pr-6">{customizingItem.name}</h3>
              </div>
              <p className="text-xs text-green-200/80 mt-1 line-clamp-1">{customizingItem.description}</p>
              
              <button 
                onClick={() => setCustomizingItem(null)}
                className="absolute top-4 right-4 text-green-200 hover:text-white p-1 rounded-full bg-white/10 hover:bg-white/20"
              >
                ✕
              </button>
            </div>

            {/* Customization Options */}
            <div className="p-6 space-y-5 max-h-[400px] overflow-y-auto">
              
              {/* Spice level adjustment */}
              <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2.5">Choose Spice Level</p>
                <div className="grid grid-cols-3 gap-2.5">
                  {(['mild', 'medium', 'hot'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setCustSpicy(lvl)}
                      className={`py-2 px-3 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                        custSpicy === lvl
                          ? 'bg-green-50 border-green-500 text-green-800 ring-2 ring-green-500/10'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {lvl === 'mild' && '🌶️ Mild'}
                      {lvl === 'medium' && '🌶️🌶️ Medium'}
                      {lvl === 'hot' && '🌶️🌶️🌶️ Hot'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Extra fresh meat addons */}
              {customizingItem.isNonVeg && customizingItem.category !== 'beverage' && customizingItem.category !== 'sides' && (
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2.5 font-sans">Addons (Fresh Meat Special)</p>
                  <label className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-green-200 bg-gray-50/50 cursor-pointer">
                    <div className="flex items-center space-x-2.5">
                      <input
                        type="checkbox"
                        checked={custExtraMeat}
                        onChange={(e) => setCustExtraMeat(e.target.checked)}
                        className="rounded text-green-600 focus:ring-green-500 h-4 w-4"
                      />
                      <span className="text-xs font-bold text-gray-700">Extra Juicy Charcoal Meat Portion</span>
                    </div>
                    <span className="text-xs font-black text-green-700">+₹50</span>
                  </label>
                </div>
              )}

              {/* Egg wash option */}
              {customizingItem.category !== 'beverage' && customizingItem.category !== 'sides' && (
                <div className="pt-1">
                  <label className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-green-200 bg-gray-50/50 cursor-pointer">
                    <div className="flex items-center space-x-2.5">
                      <input
                        type="checkbox"
                        checked={custAddEgg}
                        onChange={(e) => setCustAddEgg(e.target.checked)}
                        className="rounded text-green-600 focus:ring-green-500 h-4 w-4"
                      />
                      <span className="text-xs font-bold text-gray-700">Double Egg Wash Layer (Mughlai Style)</span>
                    </div>
                    <span className="text-xs font-black text-green-700">+₹20</span>
                  </label>
                </div>
              )}

              {/* Chef Notes / Special Instructions */}
              <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Instructions for Chef</p>
                <textarea
                  placeholder="E.g., No raw onions, make it crispy, add extra lime..."
                  value={custInstructions}
                  onChange={(e) => setCustInstructions(e.target.value)}
                  className="w-full text-xs font-medium p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-500 text-gray-800 placeholder-gray-400"
                  rows={2}
                />
              </div>

            </div>

            {/* Footer with checkout action button */}
            <div className="bg-gray-50 p-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Item Price</p>
                <p className="text-xl font-black text-gray-900">
                  ₹{customizingItem.price + (custExtraMeat ? 50 : 0) + (custAddEgg ? 20 : 0)}
                </p>
              </div>

              <button
                onClick={handleAddWithCustomization}
                className="bg-green-600 hover:bg-green-700 text-white text-xs font-extrabold uppercase tracking-widest px-6 py-3 rounded-xl transition-all cursor-pointer"
              >
                Add To Cart
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
