import React from 'react';
import Image from 'next/image';

export function IconicFlavorsBadges() {
  const badges = [
    { src: '/iconic-flavors-1.png', alt: 'Iconic Flavors' },
    { src: '/made-in-minnesota.png', alt: 'Made in Minnesota' },
    { src: '/cannabis-infused.png', alt: 'Cannabis Infused' },
    { src: '/made-with-cane-sugar.png', alt: 'Made with Cane Sugar' },
    { src: '/plant-derived.png', alt: 'Plant Derived' },
    { src: '/iconic-flavors-2.png', alt: 'Iconic Flavors' }
  ];

  return (
    <div className="w-full py-4 md:py-8 bg-white">
      <div className="flex justify-between items-center px-4 w-full max-w-none">
        {badges.map((badge, index) => (
          <div key={index} className="flex-1 flex justify-center">
            <Image
              src={badge.src}
              alt={badge.alt}
              width={120}
              height={60}
              className="h-auto w-auto max-w-[80px] md:max-w-[120px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}