"use client";

import React, { useState } from "react";
import { AddToCartButtons } from "./AddToCartButtons";

interface PurchaseOption {
  id: string;
  type: 'subscription' | 'one-time';
  title: string;
  price: number;
  compareAtPrice?: number;
  cans: number;
  savings?: string;
  isMostPopular?: boolean;
  benefits?: string[];
}

interface PurchaseOptionsNewProps {
  flavor?: any;
  variant?: any;
  onVariantChange?: (variant: any) => void;
  onAddToCart?: (quantity: number) => void;
}

// Radio button component matching Figma design
const RadioButton = ({ selected }: { selected: boolean }) => (
  <div className="w-6 h-6 border-2 border-[#14433d] rounded-full flex items-center justify-center">
    {selected && (
      <div className="w-3 h-3 bg-[#14433d] rounded-full" />
    )}
  </div>
);

// Icon components for benefits
const DollarIcon = () => (
  <div className="w-5 h-5 flex items-center justify-center">
    <span className="text-[#14433d] font-bold text-lg">$</span>
  </div>
);

const TruckIcon = () => (
  <div className="w-5 h-5 flex items-center justify-center">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 8V14H4.5C4.5 15.38 5.62 16.5 7 16.5C8.38 16.5 9.5 15.38 9.5 14H12.5C12.5 15.38 13.62 16.5 15 16.5C16.38 16.5 17.5 15.38 17.5 14H18V10L15 7H12V8H2Z" fill="#14433d"/>
    </svg>
  </div>
);

const CancelIcon = () => (
  <div className="w-5 h-5 flex items-center justify-center">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="8" stroke="#14433d" strokeWidth="2" fill="none"/>
      <path d="M6 10L14 10" stroke="#14433d" strokeWidth="2"/>
    </svg>
  </div>
);

export function PurchaseOptionsNew({ flavor, variant, onVariantChange, onAddToCart }: PurchaseOptionsNewProps) {
  const [selectedOption, setSelectedOption] = useState<'subscription' | 'one-time'>('one-time');

  const purchaseOptions: PurchaseOption[] = [
    {
      id: 'subscription',
      type: 'subscription',
      title: 'Subscribe & Save',
      price: 30.59,
      compareAtPrice: 35.99,
      cans: 12,
      savings: 'Save 15%',
      isMostPopular: true,
      benefits: [
        'Save 15% on every subscription',
        'Free shipping in the contiguous US',
        'No commitment, cancel anytime'
      ]
    },
    {
      id: 'one-time',
      type: 'one-time',
      title: 'One-Time Purchase',
      price: 19.99,
      cans: 4
    }
  ];

  const subscriptionOption = purchaseOptions.find(opt => opt.type === 'subscription')!;
  const oneTimeOption = purchaseOptions.find(opt => opt.type === 'one-time')!;

  return (
    <div className="w-full space-y-4">
      {/* Subscribe & Save Option */}
      <div
        className={`relative bg-white border-2 rounded-[10px] cursor-pointer transition-all ${
          selectedOption === 'subscription' 
            ? 'border-[#14433d]' 
            : 'border-[#14433d40]'
        }`}
        onClick={() => setSelectedOption('subscription')}
      >
        {/* Save 15% Badge */}
        <div className="absolute top-0 right-0 bg-[#fdda79] rounded-bl-[8px] rounded-tr-[10px] px-4 py-1">
          <span 
            className="text-[#14433d] font-bold text-[13px] leading-5"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Save 15%
          </span>
        </div>

        <div className="p-3">
          {/* Selection Row */}
          <div className="flex items-center gap-3 mb-3">
            <RadioButton selected={selectedOption === 'subscription'} />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="bg-[#d3e8e3e6] rounded px-2 py-1">
                  <span 
                    className="text-[#14433d] text-[9.5px] font-bold leading-[10px] tracking-[0.29px]"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Most Popular
                  </span>
                </div>
                <span 
                  className="text-[#14433d] text-[15.1px] font-bold leading-6 tracking-[0.29px]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Subscribe & Save
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span 
                  className="text-[#14433d] text-[11.4px] leading-4"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {subscriptionOption.cans} Cans
                </span>
                <div className="flex items-center gap-1">
                  <span 
                    className="text-[#14433d] text-[11.4px] leading-4 line-through"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    ${subscriptionOption.compareAtPrice}
                  </span>
                  <span 
                    className="text-[#14433d] text-[13px] font-bold leading-5"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    ${subscriptionOption.price}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Row */}
          <div className="flex items-start gap-4 mt-3">
            <div className="flex items-center gap-1">
              <DollarIcon />
              <p 
                className="text-[#14433d] text-[11.4px] leading-4 w-[110px]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <span>Save 15% on every </span>
                <span>subscription</span>
              </p>
            </div>
            <div className="flex items-center gap-1">
              <TruckIcon />
              <p 
                className="text-[#14433d] text-[11.4px] leading-4 w-[110px]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <span>Free shipping in </span>
                <span>the contiguous US</span>
              </p>
            </div>
            <div className="flex items-center gap-1">
              <CancelIcon />
              <p 
                className="text-[#14433d] text-[11.4px] leading-4 w-[110px]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <span>No commitment, </span>
                <span>cancel anytime</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* One-Time Purchase Option */}
      <div
        className={`bg-white border-2 rounded-[10px] cursor-pointer transition-all p-[14px] ${
          selectedOption === 'one-time' 
            ? 'border-[#22423d]' 
            : 'border-[#14433d40]'
        }`}
        onClick={() => setSelectedOption('one-time')}
      >
        <div className="flex items-center gap-3">
          <RadioButton selected={selectedOption === 'one-time'} />
          <div className="flex-1">
            <span 
              className="text-[#14433d] text-[15.1px] font-bold leading-6 tracking-[0.29px] block mb-1"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              One-Time Purchase
            </span>
            <div className="flex items-center gap-2">
              <span 
                className="text-[#14433d] text-[11.4px] leading-4"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {oneTimeOption.cans} Cans
              </span>
              <span 
                className="text-[#14433d] text-[13px] font-bold leading-5"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                ${oneTimeOption.price}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Add to Cart Buttons */}
      <div className="mt-6">
        <AddToCartButtons 
          onAddToCart={onAddToCart}
          primaryColor={flavor?.primaryColor || "#f3841d"}
        />
      </div>
    </div>
  );
}