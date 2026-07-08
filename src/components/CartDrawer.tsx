import React, { useState, useEffect } from 'react';
import { CartItem, BangaloreLocation } from '../types';
import { BANGALORE_LOCATIONS } from '../data';
import { X, Trash2, MapPin, Phone, User, ShoppingBag, ShieldCheck, CheckCircle2, CookingPot, Truck, Heart } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (itemId: string, customizationKey?: string) => void;
  onUpdateQuantity: (index: number, delta: number) => void;
  selectedLocation: string;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  selectedLocation
}: CartDrawerProps) {
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryHub, setDeliveryHub] = useState(selectedLocation || BANGALORE_LOCATIONS[0].name);
  const [preciseAddress, setPreciseAddress] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<number>(0); // 0 = checkout form, 1 = Accept, 2 = Cooking, 3 = Out for Delivery

  // Reset checkout status when closing the drawer, only if not already completed/success
  useEffect(() => {
    if (!isOpen && checkoutStep === 3) {
      // Keep it or reset
    }
  }, [isOpen]);

  // Calculations
  const itemTotal = cartItems.reduce((acc, curr) => {
    const itemBasePrice = curr.item.price;
    const extraMeatCost = curr.customization.extraMeat ? 50 : 0;
    const addEggCost = curr.customization.addEgg ? 20 : 0;
    return acc + (itemBasePrice + extraMeatCost + addEggCost) * curr.quantity;
  }, 0);

  const deliveryFee = itemTotal > 300 ? 0 : 40;
  const gstAndPacking = Math.round(itemTotal * 0.18 + 15); // 18% GST + Rs 15 restaurant packaging
  const grandTotal = itemTotal > 0 ? itemTotal + deliveryFee + gstAndPacking : 0;

  // Run simulated tracking
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    setIsCheckingOut(true);
    setCheckoutStep(1); // Accepted

    // Step 2: Sizzling in Kitchen after 4 seconds
    setTimeout(() => {
      setCheckoutStep(2);
    }, 4500);

    // Step 3: Out for Delivery after 9 seconds
    setTimeout(() => {
      setCheckoutStep(3);
    }, 9000);
  };

  const handleResetCart = () => {
    setIsCheckingOut(false);
    setCheckoutStep(0);
    setUserName('');
    setPhone('');
    setPreciseAddress('');
    onClose();
    // clear items via reloading or state handler
    cartItems.forEach(item => onRemoveItem(item.item.id));
  };

  if (!isOpen) return null;

  return (
    <div id="cart-drawer-backdrop" className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      
      {/* Sliding Body */}
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl relative animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="bg-green-950 text-white p-6 flex justify-between items-center shrink-0">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6 text-green-400" />
            <div>
              <h2 className="font-extrabold text-lg">Your Green Cart</h2>
              <p className="text-[10px] text-green-300 font-bold uppercase tracking-wider">Foodie In Bangalore Special</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-green-100 hover:text-white p-2 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {checkoutStep === 0 ? (
            // NORMAL ORDER FLOW
            <>
              {/* Itemized List */}
              {cartItems.length > 0 ? (
                <div className="space-y-4">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-wider">Selected Specialties</p>
                  
                  {cartItems.map((cartItem, idx) => {
                    const singleItemCost = cartItem.item.price + 
                      (cartItem.customization.extraMeat ? 50 : 0) + 
                      (cartItem.customization.addEgg ? 20 : 0);
                    
                    return (
                      <div 
                        key={`${cartItem.item.id}-${idx}`}
                        className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100 flex items-start justify-between group"
                      >
                        <div className="flex-1 min-w-0 pr-3">
                          <div className="flex items-center space-x-1.5">
                            <span className={`h-3 w-3 rounded-full shrink-0 ${cartItem.item.isNonVeg ? 'bg-red-600' : 'bg-green-600'}`} />
                            <h4 className="font-extrabold text-sm text-gray-800 truncate">{cartItem.item.name}</h4>
                          </div>

                          {/* Customizations display */}
                          <div className="mt-1 flex flex-wrap gap-1 text-[10px] font-bold text-green-700">
                            <span className="bg-green-50 px-1.5 py-0.5 rounded border border-green-100">
                              🌶️ {cartItem.customization.spicyLevel.toUpperCase()}
                            </span>
                            {cartItem.customization.extraMeat && (
                              <span className="bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded border border-amber-200">
                                + Extra Fresh Meat
                              </span>
                            )}
                            {cartItem.customization.addEgg && (
                              <span className="bg-yellow-50 text-yellow-800 px-1.5 py-0.5 rounded border border-yellow-200">
                                + Double Egg Wash
                              </span>
                            )}
                            {cartItem.customization.specialInstructions && (
                              <p className="text-[10px] text-gray-400 font-medium italic block w-full mt-1">
                                "{cartItem.customization.specialInstructions}"
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Quantity Step & Price */}
                        <div className="text-right shrink-0">
                          <p className="text-sm font-black text-gray-900">₹{singleItemCost * cartItem.quantity}</p>
                          
                          <div className="flex items-center mt-2 bg-white border border-gray-200 rounded-lg h-7 font-extrabold text-xs overflow-hidden shadow-xs">
                            <button
                              onClick={() => onUpdateQuantity(idx, -1)}
                              className="px-2 hover:bg-gray-100 text-gray-600"
                            >
                              -
                            </button>
                            <span className="px-2 text-gray-800">{cartItem.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(idx, 1)}
                              className="px-2 hover:bg-gray-100 text-gray-600"
                            >
                              +
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <span className="text-5xl">🌯</span>
                  <h3 className="text-base font-extrabold text-gray-700 mt-4">Your Cart is Empty</h3>
                  <p className="text-xs text-gray-400 font-medium mt-1">Add some hot, freshly grilled meat rolls from our menu to satisfy your cravings!</p>
                  <button
                    onClick={onClose}
                    className="mt-5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2.5 px-5 rounded-xl cursor-pointer"
                  >
                    Browse Rolls Menu
                  </button>
                </div>
              )}

              {cartItems.length > 0 && (
                <>
                  {/* Delivery details form */}
                  <form onSubmit={handlePlaceOrder} className="space-y-4 pt-4 border-t border-gray-100">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-wider">Delivery Details</p>
                    
                    <div className="space-y-3.5">
                      {/* Name */}
                      <div className="relative">
                        <User className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          placeholder="Your Full Name"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          className="w-full text-xs font-bold pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 text-gray-800"
                        />
                      </div>

                      {/* Phone */}
                      <div className="relative">
                        <Phone className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="tel"
                          required
                          pattern="[0-9]{10}"
                          placeholder="10-Digit Mobile Number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full text-xs font-bold pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 text-gray-800"
                        />
                      </div>

                      {/* Outlet hub select */}
                      <div className="relative">
                        <MapPin className="h-5 w-5 text-green-600 absolute left-3 top-3" />
                        <select
                          value={deliveryHub}
                          onChange={(e) => setDeliveryHub(e.target.value)}
                          className="w-full text-xs font-bold pl-10 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 text-gray-800 appearance-none cursor-pointer"
                        >
                          {BANGALORE_LOCATIONS.map((loc) => (
                            <option key={loc.name} value={loc.name}>
                              {loc.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Precise Delivery address */}
                      <div>
                        <textarea
                          required
                          placeholder="Complete Address (Flat / House No, Street, Landmark in Bangalore)"
                          value={preciseAddress}
                          onChange={(e) => setPreciseAddress(e.target.value)}
                          rows={3}
                          className="w-full text-xs font-medium p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 text-gray-800 placeholder-gray-400"
                        />
                      </div>
                    </div>

                    {/* Fresh meat safety banner */}
                    <div className="bg-green-50 p-3.5 rounded-2xl border border-green-100 flex items-start space-x-2.5">
                      <ShieldCheck className="h-5.5 w-5.5 text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-extrabold text-green-800">Fresh Meat Guarantee Policy</p>
                        <p className="text-[10px] text-green-700 font-medium leading-relaxed mt-0.5">
                          Every roll is packaged in heavy insulated food-grade silver foil to lock in fresh moisture and keep the seared meat sizzling hot till arrival.
                        </p>
                      </div>
                    </div>

                    {/* Bill Details */}
                    <div className="pt-4 border-t border-gray-100 space-y-2">
                      <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-1">Billing Summary</p>
                      
                      <div className="flex justify-between text-xs font-semibold text-gray-600">
                        <span>Items Subtotal</span>
                        <span>₹{itemTotal}</span>
                      </div>
                      
                      <div className="flex justify-between text-xs font-semibold text-gray-600">
                        <span>Packaging & State GST</span>
                        <span>₹{gstAndPacking}</span>
                      </div>
                      
                      <div className="flex justify-between text-xs font-semibold text-gray-600">
                        <span>Delivery Partner Fee</span>
                        {deliveryFee === 0 ? (
                          <span className="text-green-600 font-black">FREE (On Orders &gt; ₹300)</span>
                        ) : (
                          <span>₹{deliveryFee}</span>
                        )}
                      </div>

                      <div className="flex justify-between text-base font-black text-gray-900 pt-2 border-t border-dashed border-gray-200">
                        <span>Grand Total</span>
                        <span className="text-green-700">₹{grandTotal}</span>
                      </div>
                    </div>

                    {/* Final CTA Confirm */}
                    <button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-extrabold uppercase tracking-widest py-4 rounded-xl shadow-lg shadow-green-600/25 transition-all cursor-pointer text-xs mt-6"
                    >
                      Confirm Order & Pay ₹{grandTotal}
                    </button>
                  </form>
                </>
              )}
            </>
          ) : (
            // SIMULATED TRACKING / SUCCESS VIEW
            <div className="py-6 flex flex-col items-center text-center space-y-6">
              
              {/* Spinning/pulsing graphic */}
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-green-50 border-4 border-dashed border-green-500 flex items-center justify-center animate-spin" style={{ animationDuration: '8s' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  {checkoutStep === 1 && <CheckCircle2 className="h-10 w-10 text-green-600" />}
                  {checkoutStep === 2 && <CookingPot className="h-10 w-10 text-green-600 animate-bounce" />}
                  {checkoutStep === 3 && <Truck className="h-10 w-10 text-green-600" />}
                </div>
              </div>

              {/* Status Header */}
              <div>
                <span className="bg-yellow-400 text-green-950 text-[10px] font-black px-2.5 py-1 rounded-md tracking-wider uppercase">
                  Order ID: #FIB-{Math.floor(Math.random() * 90000) + 10000}
                </span>
                <h3 className="text-xl font-black text-gray-900 mt-2">
                  {checkoutStep === 1 && 'Order Successfully Confirmed!'}
                  {checkoutStep === 2 && 'Sizzling On Charcoal Grill!'}
                  {checkoutStep === 3 && 'Out for Swift Delivery!'}
                </h3>
                <p className="text-xs text-gray-500 font-medium max-w-xs mx-auto mt-1">
                  Thank you, <span className="font-bold text-gray-800">{userName}</span>. Your fresh meat rolls are in premium preparation!
                </p>
              </div>

              {/* High end tracking milestones */}
              <div className="w-full bg-gray-50 p-5 rounded-2xl border border-gray-100 text-left space-y-5">
                <p className="text-xs font-black text-gray-400 uppercase tracking-wider">Live Status Tracker</p>
                
                {/* Milestone 1 */}
                <div className="flex items-center space-x-3">
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${checkoutStep >= 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    ✓
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">Order Accepted by Chef</p>
                    <p className="text-[10px] text-gray-400 font-medium">Flagship outlet: {deliveryHub.split(' (')[0]}</p>
                  </div>
                </div>

                {/* Milestone 2 */}
                <div className="flex items-center space-x-3">
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${checkoutStep >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {checkoutStep >= 2 ? '✓' : '2'}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">Fresh Meat Sizzling in Kitchen</p>
                    <p className="text-[10px] text-gray-400 font-medium">Browning your parathas, wrapping juicy tikkas</p>
                  </div>
                </div>

                {/* Milestone 3 */}
                <div className="flex items-center space-x-3">
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${checkoutStep >= 3 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {checkoutStep >= 3 ? '✓' : '3'}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">Rider Out for Delivery</p>
                    <p className="text-[10px] text-gray-400 font-medium">Fresh hot insulated foil bag on the move</p>
                  </div>
                </div>

              </div>

              {/* Delivery Details block */}
              <div className="w-full text-left text-xs bg-green-50/50 border border-green-100/80 p-4 rounded-xl space-y-2">
                <div className="flex justify-between">
                  <span className="font-bold text-green-800">Deliver To:</span>
                  <span className="font-bold text-gray-700">{preciseAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-green-800">Contact Phone:</span>
                  <span className="font-bold text-gray-700">+91 {phone}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-green-100">
                  <span className="font-extrabold text-green-800">Simulated Delivery Time:</span>
                  <span className="font-black text-green-600">30 Mins Guaranteed</span>
                </div>
              </div>

              {/* Close / Back to main menu */}
              <button
                onClick={handleResetCart}
                className="w-full bg-green-950 text-white text-xs font-extrabold uppercase tracking-widest py-3.5 rounded-xl transition-all cursor-pointer"
              >
                Order More / Done
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
