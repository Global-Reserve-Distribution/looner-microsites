'use client';

import React from 'react';
import { ShoppingBag, User, MapPin } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Navigation */}
          <nav className="flex items-center space-x-8">
            <Link 
              href="/shop" 
              className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              Shop
            </Link>
            <Link 
              href="/learn" 
              className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              Learn
            </Link>
            <Link 
              href="/subscribe" 
              className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              Subscribe
            </Link>
          </nav>

          {/* Center Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img 
                src="/looner-logo.png"
                alt="LOONER Cannabis Co"
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            <button className="flex items-center text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">
              <MapPin className="w-4 h-4 mr-1" />
              Find In Store
            </button>
            <button className="text-gray-700 hover:text-gray-900 transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button className="relative text-gray-700 hover:text-gray-900 transition-colors">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}