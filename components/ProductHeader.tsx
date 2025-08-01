"use client";

import React from "react";

interface ProductHeaderProps {
  productName: string;
  reviewCount?: number;
  rating?: number;
  showSingleFlavorBadge?: boolean;
  primaryColor?: string;
}

export function ProductHeader({ 
  productName, 
  reviewCount = 249, 
  rating = 4.3,
  showSingleFlavorBadge = true,
  primaryColor = "#fba91d"
}: ProductHeaderProps) {
  // Generate star display based on rating
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.4471 3.60036C10.3833 3.41826 10.213 3.29276 10.0173 3.28359H6.94038L5.96359 0.31747C5.89403 0.118612 5.69862 -0.0107194 5.48496 0.000699649C5.2758 -0.000776857 5.08989 0.131386 5.02587 0.327069L4.04907 3.29319H0.981947C0.775924 3.2918 0.592112 3.42012 0.525632 3.61176C0.459152 3.8034 0.524923 4.01534 0.68891 4.13791L3.17973 5.99053L2.20294 8.97585C2.13394 9.17183 2.20369 9.3891 2.37465 9.51069C2.54561 9.63227 2.77743 9.62947 2.9453 9.5038L5.55333 7.58398L8.17113 9.503C8.33901 9.62857 8.57083 9.63137 8.74179 9.50979C8.91275 9.3882 8.9825 9.17093 8.9135 8.97495L7.9367 5.98963L10.4275 4.13701C10.5915 4.01444 10.6573 3.8025 10.5908 3.61086L10.4471 3.60036Z" fill="#14433D"/>
        </svg>
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <svg key="half" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.94706 3.60036C9.88331 3.41826 9.71301 3.29276 9.51726 3.28359H6.44034L5.46355 0.31747C5.39399 0.118612 5.19858 -0.0107194 4.98492 0.000699649C4.77576 -0.000776857 4.58985 0.131386 4.52583 0.327069L3.54903 3.29319H0.481907C0.275884 3.2918 0.0920721 3.42012 0.0255925 3.61176C-0.0408871 3.8034 0.0248835 4.01534 0.188869 4.13791L2.67969 5.99053L1.7029 8.97585C1.6339 9.17183 1.70365 9.3891 1.87461 9.51069C2.04557 9.63227 2.27739 9.62947 2.44526 9.5038L5.05329 7.58398L7.67109 9.503C7.83897 9.62857 8.07079 9.63137 8.24175 9.50979C8.41271 9.3882 8.48246 9.17093 8.41346 8.97495L7.43666 5.98963L9.92748 4.13701C10.0915 4.01444 10.1572 3.8025 10.0907 3.61086L9.94706 3.60036Z" fill="url(#paint0_linear_38_1191)"/>
          <defs>
            <linearGradient id="paint0_linear_38_1191" x1="289.7" y1="0" x2="1000.5" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#14433D"/>
              <stop offset="0.01" stopColor="#D3DAD9"/>
            </linearGradient>
          </defs>
        </svg>
      );
    }

    // Empty stars
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.4471 3.60036C10.3833 3.41826 10.213 3.29276 10.0173 3.28359H6.94038L5.96359 0.31747C5.89403 0.118612 5.69862 -0.0107194 5.48496 0.000699649C5.2758 -0.000776857 5.08989 0.131386 5.02587 0.327069L4.04907 3.29319H0.981947C0.775924 3.2918 0.592112 3.42012 0.525632 3.61176C0.459152 3.8034 0.524923 4.01534 0.68891 4.13791L3.17973 5.99053L2.20294 8.97585C2.13394 9.17183 2.20369 9.3891 2.37465 9.51069C2.54561 9.63227 2.77743 9.62947 2.9453 9.5038L5.55333 7.58398L8.17113 9.503C8.33901 9.62857 8.57083 9.63137 8.74179 9.50979C8.91275 9.3882 8.9825 9.17093 8.9135 8.97495L7.9367 5.98963L10.4275 4.13701C10.5915 4.01444 10.6573 3.8025 10.5908 3.61086L10.4471 3.60036Z" fill="#D3DAD9"/>
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className="flex flex-col items-start gap-3 mb-6">
      {/* Reviews and Badge Row */}
      <div className="flex items-center gap-2">
        {/* Reviews Section */}
        <div className="flex items-center bg-white border border-[#003a5d] rounded-full px-3 py-1">
          {/* Stars */}
          <div className="flex items-center gap-1 mr-2">
            {renderStars()}
          </div>
          {/* Review Count */}
          <span 
            className="text-[#14433d] text-sm font-bold"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            ({reviewCount})
          </span>
        </div>

        {/* Single Flavor Badge */}
        {showSingleFlavorBadge && (
          <div className="bg-white border border-[#003a5d] rounded-full px-3 py-1">
            <span 
              className="text-[#14433d] text-sm font-bold"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Single Flavor
            </span>
          </div>
        )}
      </div>

      {/* Product Name */}
      <h1 
        className="text-5xl font-extrabold leading-tight"
        style={{ 
          fontFamily: 'Poppins, sans-serif',
          color: primaryColor
        }}
      >
        {productName}
      </h1>
      
      {/* Subtitle */}
      <p 
        className="text-[#14433d] text-lg font-medium"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        10mg Soda
      </p>
    </div>
  );
}