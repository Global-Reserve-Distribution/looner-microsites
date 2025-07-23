import React from 'react';

interface FlavorHeroProps {
  flavor: {
    title: string;
    tags: string[];
    bgColor: string;
    images: string[];
  };
}

export function FlavorHero({ flavor }: FlavorHeroProps) {
  return (
    <div className="relative">
      {/* Main Product Image */}
      <div className={`${flavor.bgColor} rounded-3xl p-12 aspect-square flex items-center justify-center relative overflow-hidden`}>
        {flavor.images[0] ? (
          <img 
            src={flavor.images[0]} 
            alt={flavor.title}
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        ) : (
          <div className="w-64 h-80 relative">
            {/* LOONER Can Design */}
            <div className="w-full h-full bg-gradient-to-b from-purple-400 to-purple-600 rounded-[40px] shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
              {/* Can Top */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-gray-300 rounded-t-[40px]"></div>
              
              {/* Label */}
              <div className="text-white text-center z-10 px-8">
                <div className="text-5xl font-bold mb-4">LOONER</div>
                <div className="text-2xl font-semibold mb-2">{flavor.title}</div>
                <div className="mt-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-lg font-bold">10mg THC</span>
                </div>
              </div>
              
              {/* Shine Effect */}
              <div className="absolute top-20 left-8 w-20 h-40 bg-white/10 rounded-full transform rotate-12 blur-xl"></div>
            </div>
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="flex gap-3 mt-6">
        {flavor.tags.map((tag) => (
          <div key={tag} className="bg-white rounded-xl px-6 py-3 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-xl">{getTagEmoji(tag)}</span>
              <span className="font-medium text-gray-800">{tag}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getTagEmoji(tag: string): string {
  const tagLower = tag.toLowerCase();
  if (tagLower.includes('fiber')) return '🌾';
  if (tagLower.includes('gmo')) return '🌱';
  if (tagLower.includes('sugar')) return '🍭';
  if (tagLower.includes('thc')) return '🌿';
  return '✨';
}