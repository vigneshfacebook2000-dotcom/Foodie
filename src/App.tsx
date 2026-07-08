import React, { useState } from 'react';
import { FoodItem, CartItem } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import ReviewSection from './components/ReviewSection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { ShoppingBag, ChevronRight, Award, MapPin, CheckCircle } from 'lucide-react';
import { BANGALORE_LOCATIONS } from './data';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(BANGALORE_LOCATIONS[0].name);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategoryTab, setSelectedCategoryTab] = useState('delivery');

  // Add Item to Cart with full custom support
  const handleAddItem = (
    item: FoodItem,
    customization: { spicyLevel: 'mild' | 'medium' | 'hot'; extraMeat: boolean; addEgg: boolean; specialInstructions: string }
  ) => {
    setCartItems(prev => {
      // Check if item with EXACT same customization already exists
      const existingIdx = prev.findIndex(
        cartItem =>
          cartItem.item.id === item.id &&
          cartItem.customization.spicyLevel === customization.spicyLevel &&
          cartItem.customization.extraMeat === customization.extraMeat &&
          cartItem.customization.addEgg === customization.addEgg &&
          cartItem.customization.specialInstructions === customization.specialInstructions
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [...prev, { item, quantity: 1, customization }];
      }
    });

    // Automatically open cart when first item is added for nice UI feel
    setIsCartOpen(true);
  };

  // Quick remove / decrement
  const handleRemoveItem = (itemId: string) => {
    setCartItems(prev => {
      const idx = prev.findIndex(ci => ci.item.id === itemId);
      if (idx === -1) return prev;

      const updated = [...prev];
      if (updated[idx].quantity > 1) {
        updated[idx].quantity -= 1;
      } else {
        updated.splice(idx, 1);
      }
      return updated;
    });
  };

  // Update item quantity directly inside Cart drawer
  const handleUpdateQuantity = (index: number, delta: number) => {
    setCartItems(prev => {
      if (index < 0 || index >= prev.length) return prev;
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      
      if (newQty <= 0) {
        updated.splice(index, 1);
      } else {
        updated[index].quantity = newQty;
      }
      return updated;
    });
  };

  // Get total quantity for single item ID (bestseller cards)
  const getItemQuantity = (itemId: string): number => {
    return cartItems
      .filter(ci => ci.item.id === itemId)
      .reduce((sum, ci) => sum + ci.quantity, 0);
  };

  // Total items in cart
  const totalCartCount = cartItems.reduce((sum, ci) => sum + ci.quantity, 0);

  // Smooth Scroll Handlers
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans antialiased text-gray-900 selection:bg-green-200 selection:text-green-900">
      
      {/* Upper Top Promotion Ribbon (5-year celebration) */}
      <div className="bg-green-900 text-white py-2 px-4 text-center text-xs font-bold tracking-wide uppercase flex items-center justify-center space-x-2">
        <span className="bg-green-600 text-[10px] px-2 py-0.5 rounded mr-1">OFFER</span>
        <span>Get FREE Delivery on all orders above ₹300! Celebrating 5 Years in Bangalore 🌯</span>
      </div>

      {/* Header component */}
      <Header
        onSearchChange={setSearchQuery}
        onLocationSelect={setSelectedLocation}
        selectedLocation={selectedLocation}
        cartCount={totalCartCount}
        onCartClick={() => setIsCartOpen(true)}
        onScrollToReviews={() => scrollToId('reviews-section')}
        onScrollToAbout={() => scrollToId('about-company-section')}
        onScrollToMenu={() => scrollToId('menu-section-root')}
      />

      {/* Hero section */}
      <Hero
        onScrollToMenu={() => scrollToId('menu-section-root')}
        selectedCategoryTab={selectedCategoryTab}
        setSelectedCategoryTab={setSelectedCategoryTab}
      />

      {/* About Company / 5 Years story segment (Explicit Zomato look about-card) */}
      <section id="about-company-section" className="bg-white py-12 border-t border-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-green-50/50 rounded-3xl p-8 sm:p-12 border border-green-100 flex flex-col lg:flex-row items-center gap-8 shadow-xs">
            
            {/* Visual Column */}
            <div className="w-full lg:w-1/2 relative">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&q=80&w=800"
                  alt="Foodie In Bangalore Kitchen"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Badge Overlay */}
              <div className="absolute -bottom-4 -right-4 bg-green-600 text-white p-4 rounded-2xl shadow-xl flex items-center space-x-2.5">
                <span className="text-3xl font-black">5+</span>
                <span className="text-xs font-bold leading-tight block">
                  Years of <br /> Fresh Rolls
                </span>
              </div>
            </div>

            {/* Description Column */}
            <div className="w-full lg:w-1/2 space-y-4">
              <span className="text-green-700 text-xs font-black uppercase tracking-widest block">
                Our Bengaluru Roots
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
                Crafting Bangalore's Finest Charcoal-Grilled Rolls Since 2021
              </h3>
              
              <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                For over 5 years, Foodie In Bangalore has remained dedicated to one single goal: delivering the juiciest, highest-quality meat wraps in the city. We prepare our flatbread wraps fresh on order, layered with tender charcoal-cooked proteins and zero additives.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
                  <span className="text-xs font-bold text-gray-700">100% Certified Fresh Meat</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
                  <span className="text-xs font-bold text-gray-700">Daily Farm Sourced</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
                  <span className="text-xs font-bold text-gray-700">Super flaked parathas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
                  <span className="text-xs font-bold text-gray-700">No preservatives / coloring</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Main menu grid section */}
      <MenuSection
        onAddItem={handleAddItem}
        onRemoveItem={handleRemoveItem}
        getItemQuantity={getItemQuantity}
        searchQuery={searchQuery}
      />

      {/* Customer reviews block */}
      <ReviewSection />

      {/* Footer corporate block */}
      <Footer />

      {/* Interactive Cart drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
        selectedLocation={selectedLocation}
      />

      {/* Floating Cart Badge for fast checkout trigger on mobile */}
      {totalCartCount > 0 && !isCartOpen && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-green-600 text-white font-extrabold px-5 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 cursor-pointer hover:bg-green-700 active:scale-95 animate-bounce"
        >
          <ShoppingBag className="h-5.5 w-5.5" />
          <span className="text-sm font-bold">{totalCartCount} Item(s)</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      )}

    </div>
  );
}
