import React from 'react';
import { Sparkles, ShieldCheck, Flame, Compass, Truck, UtensilsCrossed } from 'lucide-react';

interface HeroProps {
  onScrollToMenu: () => void;
  selectedCategoryTab: string;
  setSelectedCategoryTab: (tab: string) => void;
}

export default function Hero({ onScrollToMenu, selectedCategoryTab, setSelectedCategoryTab }: HeroProps) {
  const tabs = [
    {
      id: 'delivery',
      title: 'Online Delivery',
      desc: 'Superfast delivery within 30 mins',
      icon: Truck,
      bgImage: 'https://images.unsplash.com/photo-1626700051175-6518c4793f4f?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 'dining',
      title: 'Dine Out Outlets',
      desc: 'Experience fresh, sizzling rolls live',
      icon: UtensilsCrossed,
      bgImage: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 'takeaway',
      title: 'Late Night Takeaway',
      desc: 'Beat the midnight cravings till 3 AM',
      icon: Flame,
      bgImage: 'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?auto=format&fit=crop&q=80&w=400',
    }
  ];

  return (
    <div id="hero-root" className="relative bg-slate-50 pt-6 pb-12 overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-green-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-green-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Container */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-green-950/10 mb-12 min-h-[420px] lg:min-h-[450px]">
          
          {/* Banner Image with rich green gradient overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1600" 
              alt="Premium Fresh Meat Rolls" 
              className="w-full h-full object-cover object-center scale-105 motion-safe:animate-pulse duration-[8000ms]"
              referrerPolicy="no-referrer"
            />
            {/* Green dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-950 via-green-900/90 to-black/60 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-transparent to-transparent" />
            
            {/* Texture/Pattern Overlay from Professional Polish theme */}
            <div className="absolute inset-0 opacity-15 pointer-events-none grid grid-cols-6 grid-rows-2 h-full">
              <div className="bg-green-700 m-1 rounded-lg"></div>
              <div className="bg-green-900 m-1 rounded-lg"></div>
              <div className="bg-green-700 m-1 rounded-lg"></div>
              <div className="bg-green-900 m-1 rounded-lg"></div>
              <div className="bg-green-700 m-1 rounded-lg"></div>
              <div className="bg-green-900 m-1 rounded-lg"></div>
            </div>
          </div>

          {/* Hero Content Grid (Left for Text, Right for the Custom Rotated Badge) */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center px-6 py-16 sm:px-12 sm:py-20 lg:py-24 lg:px-16 text-white">
            
            {/* Text details */}
            <div className="lg:col-span-8 space-y-6">
              {/* 5 years tag */}
              <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/25 backdrop-blur-md px-4 py-2 rounded-full">
                <Sparkles className="h-4 w-4 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} />
                <span className="text-xs sm:text-sm font-bold tracking-wide uppercase text-green-100">
                  5+ Years of Culinary Mastery in Bangalore
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                The Gold Standard for <br />
                <span className="text-green-400 underline decoration-yellow-400 decoration-3 underline-offset-4">Fresh Meat Rolls</span> in Bangalore
              </h1>

              {/* Sub-description */}
              <p className="text-sm sm:text-base lg:text-lg text-green-100/90 max-w-xl font-medium leading-relaxed">
                Crisp flaky parathas folded around charcoal-seared fresh premium chicken & slow-cooked mutton. Sourced daily, spiced traditionally, delivered blazing hot across Bengaluru.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-2">
                <button
                  onClick={onScrollToMenu}
                  className="bg-green-600 hover:bg-green-700 active:scale-95 text-white text-base font-extrabold px-8 py-4 rounded-xl shadow-lg shadow-green-900/30 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Explore Sizzling Menu</span>
                  <Flame className="h-5 w-5 text-yellow-300 animate-pulse" />
                </button>
                
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md border border-white/10 px-5 py-3 rounded-xl">
                  <ShieldCheck className="h-6 w-6 text-green-400 shrink-0" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-white uppercase tracking-wider">Freshness Guarantee</p>
                    <p className="text-[11px] text-green-200">Never frozen, zero preservatives</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Gold Standard Badge on Right */}
            <div className="hidden lg:col-span-4 lg:flex justify-center items-center">
              <div className="w-64 h-64 bg-white/10 rounded-full border-4 border-white/20 flex items-center justify-center rotate-12 transition-transform duration-500 hover:rotate-0">
                <div className="w-56 h-56 bg-green-600 rounded-full flex flex-col items-center justify-center font-black text-white text-center p-6 shadow-2xl">
                  <span className="text-3xl tracking-tight leading-tight uppercase">100%<br />Freshly<br />Sourced<br /><span className="text-yellow-300">Meat</span></span>
                </div>
              </div>
            </div>

          </div>

          {/* Trust Badges bottom panel */}
          <div className="relative z-10 bg-black/40 backdrop-blur-sm border-t border-white/10 px-8 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left text-white">
            <div>
              <p className="text-2xl sm:text-3xl font-black text-yellow-300">500k+</p>
              <p className="text-[10px] text-green-200 font-bold uppercase tracking-wider mt-0.5">Rolls Served</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-yellow-300">4.9 ★</p>
              <p className="text-[10px] text-green-200 font-bold uppercase tracking-wider mt-0.5">Zomato Rating</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-yellow-300">100%</p>
              <p className="text-[10px] text-green-200 font-bold uppercase tracking-wider mt-0.5">Antibiotic Free</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-yellow-300">30 Min</p>
              <p className="text-[10px] text-green-200 font-bold uppercase tracking-wider mt-0.5">Free Delivery Hubs</p>
            </div>
          </div>

        </div>

        {/* Zomato Style Feature Category Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = selectedCategoryTab === tab.id;
            return (
              <div 
                key={tab.id}
                onClick={() => {
                  setSelectedCategoryTab(tab.id);
                  onScrollToMenu();
                }}
                className={`group relative rounded-2xl overflow-hidden shadow-sm cursor-pointer border transition-all duration-300 hover:shadow-md hover:-translate-y-1.5 ${
                  isActive 
                    ? 'border-green-600 ring-2 ring-green-600/20 bg-green-50/20' 
                    : 'border-gray-100 bg-white'
                }`}
              >
                {/* Small thumbnail aspect ratio */}
                <div className="h-28 overflow-hidden relative">
                  <img 
                    src={tab.bgImage} 
                    alt={tab.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Category icon overlay */}
                  <div className="absolute top-4 left-4 bg-white text-green-800 p-2 rounded-xl shadow-md">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  
                  <div className="absolute bottom-3 left-4 text-white font-extrabold text-base">
                    {tab.title}
                  </div>
                </div>

                <div className="p-4 flex justify-between items-center bg-white">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Category Tab</p>
                    <p className="text-xs font-bold text-green-800 mt-0.5">{tab.desc}</p>
                  </div>
                  <div className={`p-1.5 rounded-lg transition-colors ${isActive ? 'bg-green-600 text-white' : 'bg-green-50 text-green-700 group-hover:bg-green-600 group-hover:text-white'}`}>
                    <Compass className="h-4 w-4" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

