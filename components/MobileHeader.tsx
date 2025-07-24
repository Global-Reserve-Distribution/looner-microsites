'use client';

import React, { useState } from 'react';
import { Menu, X, ShoppingCart, User, MapPin } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import Image from 'next/image';

interface MobileHeaderProps {
  backgroundColor?: string;
}

export function MobileHeader({ backgroundColor = 'white' }: MobileHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const cartItemCount = cart?.totalQuantity || 0;

  return (
    <>
      {/* Mobile Header */}
      <div className={`md:hidden sticky top-0 z-50 bg-${backgroundColor} border-b border-gray-200`}>
        <div className="flex items-center justify-between px-4 py-3">
          {/* Hamburger Menu */}
          <button
            onClick={toggleMenu}
            className="p-2 text-gray-700 hover:text-gray-900 transition-colors"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Image 
              src="/logo.png" 
              alt="LOONER Cannabis Co" 
              width={32} 
              height={32} 
              className="w-8 h-8 object-contain"
            />
            <span className="text-xl font-bold text-gray-900">LOONER</span>
          </div>

          {/* Cart Icon */}
          <div className="relative">
            <button className="p-2 text-gray-700 hover:text-gray-900 transition-colors">
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={closeMenu}
          />
          
          {/* Drawer */}
          <div className="fixed top-0 left-0 w-80 h-full bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Image 
                  src="/logo.png" 
                  alt="LOONER Cannabis Co" 
                  width={32} 
                  height={32} 
                  className="w-8 h-8 object-contain"
                />
                <span className="text-xl font-bold text-gray-900">LOONER</span>
              </div>
              <button
                onClick={closeMenu}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="p-4">
              <ul className="space-y-4">
                <li>
                  <a
                    href="/shop"
                    className="flex items-center py-3 px-4 text-gray-700 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                    onClick={closeMenu}
                  >
                    <ShoppingCart size={20} className="mr-3" />
                    Shop
                  </a>
                </li>
                <li>
                  <a
                    href="/learn"
                    className="flex items-center py-3 px-4 text-gray-700 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                    onClick={closeMenu}
                  >
                    <span className="mr-3 text-lg">📚</span>
                    Learn
                  </a>
                </li>
                <li>
                  <a
                    href="/subscribe"
                    className="flex items-center py-3 px-4 text-gray-700 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                    onClick={closeMenu}
                  >
                    <span className="mr-3 text-lg">📦</span>
                    Subscribe
                  </a>
                </li>
                <li>
                  <a
                    href="/find-in-store"
                    className="flex items-center py-3 px-4 text-gray-700 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                    onClick={closeMenu}
                  >
                    <MapPin size={20} className="mr-3" />
                    Find In Store
                  </a>
                </li>
              </ul>

              {/* Divider */}
              <div className="border-t border-gray-200 my-6" />

              {/* Account Section */}
              <div className="space-y-4">
                <a
                  href="/account"
                  className="flex items-center py-3 px-4 text-gray-700 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                  onClick={closeMenu}
                >
                  <User size={20} className="mr-3" />
                  Account
                </a>
                
                {/* Cart Summary */}
                {cart && cartItemCount > 0 && (
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-green-800">Cart</span>
                      <span className="text-green-700">{cartItemCount} items</span>
                    </div>
                    <div className="text-sm text-green-600 mb-3">
                      Total: ${cart.cost.totalAmount.amount}
                    </div>
                    <button
                      onClick={() => {
                        window.open(cart.checkoutUrl, '_blank');
                        closeMenu();
                      }}
                      className="w-full bg-green-800 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-green-900 transition-colors"
                    >
                      Checkout
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
}