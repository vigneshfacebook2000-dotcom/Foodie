import React from 'react';
import { BANGALORE_LOCATIONS } from '../data';
import { ShoppingBag, Heart, ShieldCheck, Mail, Phone, MapPin, Award, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="footer-root" className="bg-green-950 text-white pt-16 pb-8 border-t border-green-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Branding Block */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 pb-12 border-b border-green-900">
          
          {/* Brand details */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2.5 rounded-2xl">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-extrabold tracking-tight">
                Foodie <span className="text-green-400">In Bangalore</span>
              </h3>
            </div>
            
            <p className="text-xs text-green-200/80 leading-relaxed font-medium">
              A premium local food brand specializing in traditional charcoal-grilled rolls wrapped with 100% farm-sourced fresh meat. Proudly feeding Bengaluru since 2021.
            </p>

            <div className="flex items-center space-x-2 text-yellow-300 text-xs font-bold bg-white/5 border border-white/5 p-2 rounded-xl">
              <Award className="h-4.5 w-4.5 text-yellow-400" />
              <span>5+ Years of Culinary Excellence</span>
            </div>
          </div>

          {/* Quick links: Our Bangalore Hubs */}
          <div className="space-y-4 lg:col-span-1">
            <h4 className="text-xs font-black uppercase tracking-widest text-green-400">Our Delivery Hubs</h4>
            <ul className="space-y-2.5 text-xs text-green-100/90 font-medium">
              {BANGALORE_LOCATIONS.map((loc) => (
                <li key={loc.name} className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-extrabold text-white">{loc.name.split(' (')[0]}</p>
                    <p className="text-[10px] text-green-300">{loc.phone}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Kitchen Timing and Standards */}
          <div className="space-y-4 lg:col-span-1">
            <h4 className="text-xs font-black uppercase tracking-widest text-green-400">Kitchen Operations</h4>
            <ul className="space-y-3 text-xs text-green-100/90 font-medium">
              <li className="flex items-center space-x-2.5">
                <Clock className="h-4 w-4 text-green-400" />
                <span>Open Daily: 11:00 AM – 3:00 AM</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <ShieldCheck className="h-4 w-4 text-green-400" />
                <span>100% Fresh Halal Meat Only</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Heart className="h-4 w-4 text-green-400" />
                <span>Hygienic Temperature Checked Staff</span>
              </li>
            </ul>
          </div>

          {/* Contact coordinates */}
          <div className="space-y-4 lg:col-span-1">
            <h4 className="text-xs font-black uppercase tracking-widest text-green-400">Support Desk</h4>
            <ul className="space-y-3 text-xs text-green-100/90 font-medium">
              <li className="flex items-center space-x-2.5">
                <Phone className="h-4 w-4 text-green-400" />
                <span>+91 98801 23456 (General Support)</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="h-4 w-4 text-green-400" />
                <span>chef@foodieinbangalore.com</span>
              </li>
            </ul>
            <div className="pt-2">
              <span className="bg-green-900 border border-green-800 text-green-300 text-[10px] font-bold px-3 py-1.5 rounded-lg">
                FSSAI No: 11221333000987
              </span>
            </div>
          </div>

        </div>

        {/* Bottom copyright block */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-green-300 font-medium space-y-4 md:space-y-0">
          <p>© 2026 Foodie In Bangalore. All rights reserved.</p>
          
          <div className="flex items-center space-x-1">
            <span>Crafted with love for Bengaluru roll lovers</span>
            <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" />
          </div>
        </div>

      </div>
    </footer>
  );
}
