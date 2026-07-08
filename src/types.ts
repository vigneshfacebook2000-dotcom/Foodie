export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  category: 'chicken' | 'mutton' | 'egg' | 'signature' | 'sides' | 'beverage';
  isNonVeg: boolean;
  isBestseller?: boolean;
  spicyLevel: 'mild' | 'medium' | 'hot';
  prepTimeMinutes: number;
}

export interface CartItem {
  item: FoodItem;
  quantity: number;
  customization: {
    spicyLevel: 'mild' | 'medium' | 'hot';
    extraMeat: boolean;
    addEgg: boolean;
    specialInstructions: string;
  };
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  image: string;
  placesCount: number;
}

export interface Review {
  id: string;
  userName: string;
  userImage: string;
  rating: number;
  date: string;
  comment: string;
  helpfulCount: number;
}

export interface BangaloreLocation {
  name: string;
  address: string;
  phone: string;
  coords: { lat: number; lng: number };
}
