import { FoodItem, Collection, Review, BangaloreLocation } from './types';

export const BANGALORE_LOCATIONS: BangaloreLocation[] = [
  {
    name: 'Indiranagar (Flagship Outlet)',
    address: '12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038',
    phone: '+91 98801 23456',
    coords: { lat: 12.971899, lng: 77.641151 }
  },
  {
    name: 'Koramangala',
    address: '80 Feet Rd, 4th Block, Koramangala, Bengaluru, Karnataka 560034',
    phone: '+91 98801 23457',
    coords: { lat: 12.934533, lng: 77.626579 }
  },
  {
    name: 'HSR Layout',
    address: '19th Main Rd, Sector 3, HSR Layout, Bengaluru, Karnataka 560102',
    phone: '+91 98801 23458',
    coords: { lat: 12.910547, lng: 77.645012 }
  },
  {
    name: 'Whitefield',
    address: 'ITPL Main Road, Brookefield, Bengaluru, Karnataka 560037',
    phone: '+91 98801 23459',
    coords: { lat: 12.969824, lng: 77.749911 }
  }
];

export const COLLECTIONS: Collection[] = [
  {
    id: 'c1',
    title: 'Legendary Meat Rolls',
    description: 'The juiciest, charcoal-grilled chicken & mutton wraps in town.',
    image: 'https://images.unsplash.com/photo-1626700051175-6518c4793f4f?auto=format&fit=crop&q=80&w=600',
    placesCount: 4
  },
  {
    id: 'c2',
    title: 'Bangalore Late Night Hubs',
    description: 'Serving hot, sizzling rolls until 3:00 AM to beat those midnight cravings.',
    image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=600',
    placesCount: 4
  },
  {
    id: 'c3',
    title: '100% Fresh Meat Certified',
    description: 'Sourced daily from premium local farms with strict hygiene guidelines.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
    placesCount: 4
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    userName: 'Ananya Hegde',
    userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    date: '2 days ago',
    comment: 'Literally the best chicken rolls in Bangalore! The meat is extremely fresh, soft, and juicy. The Indiranagar outlet is my absolute favorite spot for a quick bite after work. The double egg double chicken roll is a masterpiece!',
    helpfulCount: 42
  },
  {
    id: 'r2',
    userName: 'Rahul Krishnan',
    userImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    date: '1 week ago',
    comment: 'Foodie In Bangalore has been my go-to for rolls since 2021. Their mutton bhuna seekh roll is loaded with pure, tender meat and zero fillers. Highly appreciate their quick service even during peak hours.',
    helpfulCount: 29
  },
  {
    id: 'r3',
    userName: 'Deepika Rao',
    userImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    rating: 4.8,
    date: '2 weeks ago',
    comment: 'Highly hygienic prep and incredibly fresh meat. The paratha is perfectly flaky and not too oily. Try their Spicy Bangalore Pepper Chicken Roll if you love local south-indian flavors!',
    helpfulCount: 18
  },
  {
    id: 'r4',
    userName: 'Vikram Sen',
    userImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    date: '3 weeks ago',
    comment: 'I am extremely selective about meat quality, and Foodie in Bangalore never disappoints. You can taste the quality and freshness. They have run this place for over 5 years now, and the standard remains top-tier.',
    helpfulCount: 35
  }
];

export const FOOD_MENU: FoodItem[] = [
  // CHICKEN ROLLS
  {
    id: 'roll_ch_01',
    name: 'Classic Double Chicken Tikka Roll',
    description: 'Our #1 bestseller for 5 years. Generous chunks of clay-oven cooked chicken tikka, spiced onions, green mint chutney, wrapped in a fresh handmade paratha.',
    price: 189,
    rating: 4.9,
    reviewsCount: 1450,
    image: 'https://images.unsplash.com/photo-1626700051175-6518c4793f4f?auto=format&fit=crop&q=80&w=600',
    category: 'chicken',
    isNonVeg: true,
    isBestseller: true,
    spicyLevel: 'medium',
    prepTimeMinutes: 12
  },
  {
    id: 'roll_ch_02',
    name: 'Spicy Bangalore Pepper Chicken Roll',
    description: 'Local-style hot pepper chicken dry seasoned with freshly crushed black pepper, aromatic curry leaves, and green chilies.',
    price: 199,
    rating: 4.8,
    reviewsCount: 890,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600',
    category: 'chicken',
    isNonVeg: true,
    spicyLevel: 'hot',
    prepTimeMinutes: 15
  },
  {
    id: 'roll_ch_03',
    name: 'Double Egg Chicken Seekh Kebab Roll',
    description: 'Double fried-egg washed crispy flatbread layered with hot minced chicken seekh kebabs directly off the hot charcoal grills.',
    price: 219,
    rating: 4.7,
    reviewsCount: 620,
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&q=80&w=600',
    category: 'chicken',
    isNonVeg: true,
    isBestseller: true,
    spicyLevel: 'medium',
    prepTimeMinutes: 10
  },
  {
    id: 'roll_ch_04',
    name: 'Butter Chicken Loaded Creamy Roll',
    description: 'Tender pulled chicken tikka simmered in premium rich, creamy butter tomato gravy, finished with a drizzle of heavy cream.',
    price: 209,
    rating: 4.6,
    reviewsCount: 740,
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=600',
    category: 'chicken',
    isNonVeg: true,
    spicyLevel: 'mild',
    prepTimeMinutes: 14
  },

  // MUTTON ROLLS (FRESH MEAT SPECIALS)
  {
    id: 'roll_mut_01',
    name: 'Signature Bhuna Gosht Mutton Roll',
    description: 'Slow-cooked fresh tender mutton chunks tossed in roasted hand-ground spices and caramelized onions. Rich, authentic, and satisfying.',
    price: 269,
    rating: 4.9,
    reviewsCount: 1120,
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=600',
    category: 'mutton',
    isNonVeg: true,
    isBestseller: true,
    spicyLevel: 'medium',
    prepTimeMinutes: 15
  },
  {
    id: 'roll_mut_02',
    name: 'Hyderabadi Mutton Keema Egg Roll',
    description: 'Spiced fresh minced mutton (keema) pan-roasted with fresh coriander, wrapped inside an egg-coated crisp laccha paratha with tang of freshly squeezed lemon.',
    price: 249,
    rating: 4.8,
    reviewsCount: 540,
    image: 'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?auto=format&fit=crop&q=80&w=600',
    category: 'mutton',
    isNonVeg: true,
    spicyLevel: 'medium',
    prepTimeMinutes: 12
  },
  {
    id: 'roll_mut_03',
    name: 'Royal Mutton Boti Shahi Roll',
    description: 'Boneless fresh mutton cubes marinated in rich cashew paste and Royal Awadhi spices, char-grilled and folded into fine roomali bread.',
    price: 289,
    rating: 4.9,
    reviewsCount: 430,
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&q=80&w=600',
    category: 'mutton',
    isNonVeg: true,
    spicyLevel: 'mild',
    prepTimeMinutes: 18
  },

  // EGG ROLLS
  {
    id: 'roll_egg_01',
    name: 'Double Egg Devil Spicy Roll',
    description: 'Double egg wash, fried till golden crisp, seasoned with special salt, fresh green chilies, lots of onions, and sharp tangy chili sauce.',
    price: 119,
    rating: 4.7,
    reviewsCount: 980,
    image: 'https://images.unsplash.com/photo-1598103442097-8b743e43a1c6?auto=format&fit=crop&q=80&w=600',
    category: 'egg',
    isNonVeg: true,
    spicyLevel: 'hot',
    prepTimeMinutes: 8
  },
  {
    id: 'roll_egg_02',
    name: 'Classic Egg Cheese Roll',
    description: 'Single egg-washed flaky paratha stuffed with processed cheddar cheese, creamy mayonnaise, and a pinch of black pepper.',
    price: 139,
    rating: 4.5,
    reviewsCount: 410,
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&q=80&w=600',
    category: 'egg',
    isNonVeg: true,
    spicyLevel: 'mild',
    prepTimeMinutes: 8
  },

  // SIGNATURE COMBOS
  {
    id: 'roll_sig_01',
    name: 'Foodie Special Jumbo Monster Roll',
    description: 'An absolute feast! Fresh chicken tikka, grilled mutton seekh, double egg wash, melting cheddar cheese, and signature fiery home-cooked Bangalore gravy.',
    price: 349,
    rating: 5.0,
    reviewsCount: 380,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=600',
    category: 'signature',
    isNonVeg: true,
    isBestseller: true,
    spicyLevel: 'hot',
    prepTimeMinutes: 20
  },

  // BEVERAGES
  {
    id: 'bev_01',
    name: 'Namma Bangalore Fresh Lime Soda',
    description: 'Perfect accompaniment to clear the palate. Squeezed fresh lime with sweet & salt soda water.',
    price: 69,
    rating: 4.8,
    reviewsCount: 1200,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600',
    category: 'beverage',
    isNonVeg: false,
    spicyLevel: 'mild',
    prepTimeMinutes: 4
  },
  {
    id: 'bev_02',
    name: 'Traditional Kokum Sherbet Cooler',
    description: 'A traditional sweet, sour, and refreshing coastal beverage made from natural Kokum skins and roasted cumin seeds.',
    price: 79,
    rating: 4.7,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=600',
    category: 'beverage',
    isNonVeg: false,
    spicyLevel: 'mild',
    prepTimeMinutes: 4
  },

  // SIDES
  {
    id: 'side_01',
    name: 'Spicy Gunpowder Potato Wedges',
    description: 'Thick, fresh potato wedges tossed in hot traditional South Indian gunpowder spice and melted ghee.',
    price: 129,
    rating: 4.7,
    reviewsCount: 650,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=600',
    category: 'sides',
    isNonVeg: false,
    spicyLevel: 'medium',
    prepTimeMinutes: 10
  }
];
