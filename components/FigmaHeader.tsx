"use client";

import React from "react";
import Link from "next/link";

// User profile icon component
const UserIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_38_1335)">
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M13.244 0.609863C6.36504 0.609863 0.769043 6.20636 0.769043 13.0849C0.769043 19.9634 6.36504 25.5604 13.244 25.5604C20.123 25.5604 25.7195 19.9634 25.7195 13.0849C25.7195 6.20636 20.123 0.609863 13.244 0.609863ZM20.2645 21.0804C19.6555 17.4774 17.085 14.7044 13.9135 14.3594C16.1015 14.0349 17.7825 12.1539 17.7825 9.87536C17.7825 7.36936 15.7505 5.33736 13.244 5.33736C10.7375 5.33736 8.70604 7.36936 8.70604 9.87536C8.70604 12.1539 10.3865 14.0349 12.5745 14.3594C9.40304 14.7044 6.83254 17.4774 6.22354 21.0804C7.85054 22.6544 10.0195 23.5604 13.244 23.5604C16.4685 23.5604 18.6375 22.6544 20.2645 21.0804Z" 
        fill="#14433d"
      />
    </g>
    <defs>
      <clipPath id="clip0_38_1335">
        <rect width="28" height="28" fill="white" transform="translate(0 0.59375)"/>
      </clipPath>
    </defs>
  </svg>
);

// Shopping bag icon
const ShoppingBagIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M7 9V7C7 4.24 9.24 2 12 2H16C18.76 2 21 4.24 21 7V9M7 9H5C3.9 9 3 9.9 3 11V21C3 22.1 3.9 23 5 23H23C24.1 23 25 22.1 25 21V11C25 9.9 24.1 9 23 9H21M7 9H21M12 13V17M16 13V17" 
      stroke="#14433d" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export function FigmaHeader() {
  return (
    <header className="w-full h-[70px] bg-white border-b border-gray-100">
      <div className="max-w-[1320px] mx-auto h-full flex items-center justify-between px-6">
        {/* Left Section: Navigation Links */}
        <nav className="flex items-center gap-10">
          <Link 
            href="/shop" 
            className="text-[#14433d] font-semibold text-[15.1px] leading-[30px] hover:opacity-70 transition-opacity"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Shop
          </Link>
          <Link 
            href="/learn" 
            className="text-[#14433d] font-semibold text-[15.1px] leading-[30px] hover:opacity-70 transition-opacity"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Learn
          </Link>
          <Link 
            href="/subscribe" 
            className="text-[#14433d] font-semibold text-[15.1px] leading-[30px] hover:opacity-70 transition-opacity"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Subscribe
          </Link>
        </nav>

        {/* Center: Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="block">
            <img 
              src="/logo.webp" 
              alt="LOONER" 
              className="h-[44px] w-[128px] object-contain"
            />
          </Link>
        </div>

        {/* Right Section: Find In Store + User Icons */}
        <div className="flex items-center gap-7">
          <Link 
            href="/find-in-store" 
            className="text-[#14433d] font-semibold text-[15.1px] leading-[30px] hover:opacity-70 transition-opacity"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Find In Store
          </Link>
          
          {/* User Icons */}
          <div className="flex items-center gap-7">
            <button className="p-1 hover:opacity-70 transition-opacity">
              <ShoppingBagIcon />
            </button>
            
            <div className="flex flex-col items-center gap-0.5">
              <button className="p-1 hover:opacity-70 transition-opacity">
                <UserIcon />
              </button>
              <span 
                className="text-[#14433d] font-bold text-[16.6px] leading-[30px] text-center"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Log in
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}