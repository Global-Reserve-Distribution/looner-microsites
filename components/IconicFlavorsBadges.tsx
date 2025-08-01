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
    <div className="w-full py-8 bg-white">
      <div className="flex justify-center items-center gap-8 px-4 max-w-6xl mx-auto">
        {badges.map((badge, index) => (
          <div key={index} className="flex-shrink-0">
            <Image
              src={badge.src}
              alt={badge.alt}
              width={120}
              height={60}
              className="h-auto w-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
}