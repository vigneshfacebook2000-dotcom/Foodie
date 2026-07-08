import React, { useState } from 'react';
import { Search, MapPin, ShoppingBag, Phone, Award, ShieldCheck, Menu, X, Clock } from 'lucide-react';
import { BANGALORE_LOCATIONS } from '../data';

interface HeaderProps {
  onSearchChange: (query: string) => void;
  onLocationSelect: (location: string) => void;
  selectedLocation: string;
  cartCount: number;
  onCartClick: () => void;
  onScrollToReviews: () => void;
  onScrollToAbout: () => void;
  onScrollToMenu: () => void;
}

export default function Header({
  onSearchChange,
  onLocationSelect,
  selectedLocation,
  cartCount,
  onCartClick,
  onScrollToReviews,
  onScrollToAbout,
  onScrollToMenu
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(searchVal);
    onScrollToMenu();
  };

  return (
    <header id="header-root" className="sticky top-0 z-40 bg-white border-b border-green-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onScrollToAbout}>
            <div className="bg-green-600 text-white p-2.5 rounded-2xl shadow-md shadow-green-200 flex items-center justify-center">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-gray-900 leading-none flex items-center">
                Foodie <span className="text-green-600 ml-1">In Bangalore</span>
              </h1>
              <div className="flex items-center mt-1 space-x-1.5">
                <span className="bg-green-50 text-green-700 text-[10px] font-bold px-1.5 py-0.5 rounded border border-green-200">
                  ESTD 2021
                </span>
                <span className="text-[11px] text-gray-500 font-medium">5+ Years of Trust</span>
              </div>
            </div>
          </div>

          {/* Search and Location Bars - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearchSubmit} className="flex w-full items-center bg-gray-50 border border-gray-200 rounded-xl overflow-visible hover:border-green-300 transition-colors focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100">
              
              {/* Location Selector */}
              <div className="relative flex items-center px-4 py-2 border-r border-gray-200 min-w-[190px]">
                <MapPin className="h-5 w-5 text-green-600 mr-2 shrink-0" />
                <button
                  type="button"
                  onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                  className="text-left text-sm font-semibold text-gray-700 truncate w-full pr-4 relative"
                >
                  {selectedLocation || 'Select Area'}
                </button>
                
                {showLocationDropdown && (
                  <div className="absolute top-12 left-0 w-64 bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-1.5 animate-in fade-in duration-100">
                    <p className="text-xs font-bold text-gray-400 px-4 py-1.5 uppercase tracking-wider">Our Delivery Hubs</p>
                    {BANGALORE_LOCATIONS.map((loc) => (
                      <button
                        key={loc.name}
                        type="button"
                        onClick={() => {
                          onLocationSelect(loc.name);
                          setShowLocationDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-green-50 hover:text-green-800 transition-colors flex items-center space-x-2"
                      >
                        <MapPin className="h-4 w-4 text-green-500 shrink-0" />
                        <div>
                          <p className="font-medium text-gray-800">{loc.name.split(' (')[0]}</p>
                          <p className="text-xs text-gray-500 truncate w-48">{loc.address}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Dish/Roll Search Input */}
              <div className="flex items-center flex-1 px-4 py-2">
                <Search className="h-5 w-5 text-gray-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search for dynamic meat rolls, seekhs, beverages..."
                  value={searchVal}
                  onChange={(e) => {
                    setSearchVal(e.target.value);
                    onSearchChange(e.target.value);
                  }}
                  className="bg-transparent border-0 text-sm focus:outline-none w-full text-gray-800 placeholder-gray-400"
                />
              </div>
            </form>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6">
            <button 
              onClick={onScrollToMenu}
              className="text-sm font-semibold text-gray-600 hover:text-green-600 transition-colors cursor-pointer"
            >
              Order Rolls
            </button>
            <button 
              onClick={onScrollToAbout}
              className="text-sm font-semibold text-gray-600 hover:text-green-600 transition-colors cursor-pointer"
            >
              Our Story
            </button>
            <button 
              onClick={onScrollToReviews}
              className="text-sm font-semibold text-gray-600 hover:text-green-600 transition-colors cursor-pointer"
            >
              Reviews
            </button>

            {/* Meat Freshness indicator */}
            <div className="flex items-center space-x-1.5 text-green-700 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
              <ShieldCheck className="h-4.5 w-4.5 text-green-600" />
              <span className="text-xs font-bold uppercase tracking-wide">100% Fresh Meat</span>
            </div>

            {/* Cart Trigger */}
            <button
              onClick={onCartClick}
              className="relative bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl shadow-md hover:shadow-lg hover:shadow-green-100 transition-all cursor-pointer flex items-center space-x-2.5 active:scale-95 group"
            >
              <ShoppingBag className="h-5 w-5 group-hover:rotate-6 transition-transform" />
              <span className="text-sm font-bold">Cart</span>
              {cartCount > 0 ? (
                <span className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-green-950 font-black text-xs h-6 w-6 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                  {cartCount}
                </span>
              ) : null}
            </button>
          </div>

          {/* Mobile Right Bar Actions (Cart + Hamburger) */}
          <div className="flex lg:hidden items-center space-x-3">
            <button
              onClick={onCartClick}
              className="relative bg-green-600 text-white p-2.5 rounded-xl flex items-center"
            >
              <ShoppingBag className="h-5.5 w-5.5" />
              {cartCount > 0 ? (
                <span className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-green-950 font-black text-[10px] h-5 w-5 rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              ) : null}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-green-600 p-2 border border-gray-200 rounded-xl"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-green-50 py-4 px-4 space-y-4 animate-in slide-in-from-top duration-200">
          
          {/* Quick search */}
          <div>
            <form onSubmit={handleSearchSubmit} className="flex w-full items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <Search className="h-5 w-5 text-gray-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search juicy rolls..."
                value={searchVal}
                onChange={(e) => {
                  setSearchVal(e.target.value);
                  onSearchChange(e.target.value);
                }}
                className="bg-transparent text-sm focus:outline-none w-full"
              />
            </form>
          </div>

          {/* Location hub */}
          <div className="bg-green-50/50 p-3 rounded-xl border border-green-100">
            <p className="text-xs font-bold text-green-800 mb-2 uppercase tracking-wide">Select Delivery Area</p>
            <div className="grid grid-cols-2 gap-2">
              {BANGALORE_LOCATIONS.map((loc) => (
                <button
                  key={loc.name}
                  onClick={() => {
                    onLocationSelect(loc.name);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-xs font-bold py-2 px-2.5 rounded-lg border transition-all text-left truncate ${
                    selectedLocation === loc.name
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-green-300'
                  }`}
                >
                  {loc.name.split(' (')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-3 pt-2">
            <button
              onClick={() => {
                onScrollToMenu();
                setIsMobileMenuOpen(false);
              }}
              className="text-left font-semibold text-gray-700 hover:text-green-600 py-2 border-b border-gray-100"
            >
              Order Premium Rolls
            </button>
            <button
              onClick={() => {
                onScrollToAbout();
                setIsMobileMenuOpen(false);
              }}
              className="text-left font-semibold text-gray-700 hover:text-green-600 py-2 border-b border-gray-100"
            >
              Our 5-Year Journey
            </button>
            <button
              onClick={() => {
                onScrollToReviews();
                setIsMobileMenuOpen(false);
              }}
              className="text-left font-semibold text-gray-700 hover:text-green-600 py-2"
            >
              Customer Reviews
            </button>
          </div>

          <div className="flex items-center justify-between text-green-800 bg-green-50 px-4 py-3 rounded-xl text-xs font-bold border border-green-100">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="h-5 w-5 text-green-600" />
              <span>100% Certified Fresh Meat Daily</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
