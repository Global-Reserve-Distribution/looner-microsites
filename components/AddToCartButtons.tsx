"use client";

import React, { useState } from "react";

interface AddToCartButtonsProps {
  onAddToCart?: (quantity: number) => void;
  onFindInStore?: () => void;
  primaryColor?: string;
}

// Plus icon component
const PlusIcon = () => (
  <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 1V9M1.5 5H9.5" stroke="#14433D" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Minus icon component
const MinusIcon = () => (
  <svg width="11" height="5" viewBox="0 0 11 5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_38_956)">
      <path d="M0.5 2.8125H10.5" stroke="#14433D" strokeWidth="3"/>
    </g>
    <defs>
      <clipPath id="clip0_38_956">
        <rect width="11" height="4" fill="white" transform="translate(0 0.8125)"/>
      </clipPath>
    </defs>
  </svg>
);

// Location pin icon for Find Me In Store
const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 1C5.24 1 3 3.24 3 6C3 10.25 8 15 8 15C8 15 13 10.25 13 6C13 3.24 10.76 1 8 1ZM8 8C6.9 8 6 7.1 6 6C6 4.9 6.9 4 8 4C9.1 4 10 4.9 10 6C10 7.1 9.1 8 8 8Z" fill="#14433D"/>
  </svg>
);

export function AddToCartButtons({ 
  onAddToCart, 
  onFindInStore,
  primaryColor = "#f3841d" 
}: AddToCartButtonsProps) {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  const handleAddToCart = () => {
    onAddToCart?.(quantity);
  };

  return (
    <div className="w-full max-w-[472px] space-y-4">
      {/* Find Me In Store Button */}
      <button
        onClick={onFindInStore}
        className="w-full bg-white rounded-[50px] border-0 flex items-center justify-center gap-2 h-12 px-4"
        style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
      >
        <LocationIcon />
        <span 
          className="text-[#14433d] font-bold text-[16.6px] leading-7"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Find Me In Store
        </span>
      </button>

      {/* Quantity and Add to Cart Row */}
      <div className="flex items-center gap-2">
        {/* Quantity Selector */}
        <div className="bg-white border-2 border-[#14433d] rounded-[100px] flex items-center justify-center gap-3 px-[18px] py-4 h-12">
          <button 
            onClick={decrementQuantity}
            className="flex items-center justify-center w-[11px] h-[10px]"
          >
            <MinusIcon />
          </button>
          <div className="flex items-center justify-center w-6 h-[18px]">
            <span 
              className="text-[#14433d] font-bold text-[16.7px] leading-[18px] w-6 text-center"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap'
              }}
            >
              {quantity}
            </span>
          </div>
          <button 
            onClick={incrementQuantity}
            className="flex items-center justify-center w-[11px] h-[10px]"
          >
            <PlusIcon />
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="flex-1 rounded-[50px] border-0 flex items-center justify-center h-12"
          style={{ 
            backgroundColor: primaryColor,
            padding: '10.2px 0 7.8px 0'
          }}
        >
          <span 
            className="text-white font-bold text-[18.6px] leading-[29.6px]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Add to Cart
          </span>
        </button>
      </div>

      {/* Additional Info Section */}
      <div className="text-center space-y-2 pt-4">
        <p 
          className="text-[#14433d] font-bold text-[15.1px] leading-6"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          45 Day Money-Back Guarantee
        </p>
        <div className="text-[#14433d] text-sm leading-5">
          <p>Pay in 2 interest-free installments of</p>
          <p>
            <span className="font-semibold">$18.00</span> with{' '}
            <span className="font-bold">Shop</span>
            <span className="text-xs ml-1">Pay</span>{' '}
            <button className="text-[#14433d] underline text-sm">Learn more</button>
          </p>
          <p className="text-sm mt-1">Your purchasing power is .</p>
        </div>
      </div>
    </div>
  );
}