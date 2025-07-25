import React from 'react';

interface LifestyleImageGridProps {
  images: string[];
}

export function LifestyleImageGrid({ images }: LifestyleImageGridProps) {
  // Use default lifestyle images if none provided
  const displayImages = images.length > 0 ? images : getDefaultImages();

  return (
    <div className="grid grid-cols-2 gap-4">
      {displayImages.slice(0, 2).map((image, index) => (
        <div 
          key={index} 
          className="rounded-2xl overflow-hidden aspect-square bg-gray-100 relative"
        >
          {image ? (
            <img 
              src={image} 
              alt={`Lifestyle ${index + 1}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center ${getLifestyleBg(index)}`}>
              <div className="text-center text-white">
                <div className="text-4xl mb-2">{getLifestyleEmoji(index)}</div>
                <p className="text-sm font-medium px-4">{getLifestyleText(index)}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function getDefaultImages(): string[] {
  return ['', '']; // Empty strings will trigger the fallback designs
}

function getLifestyleBg(index: number): string {
  const backgrounds = [
    'bg-gradient-to-br from-cannabis-400 to-cannabis-600',
    'bg-gradient-to-br from-purple-400 to-pink-500'
  ];
  return backgrounds[index % backgrounds.length] || 'bg-gradient-to-br from-purple-400 to-pink-500';
}

function getLifestyleEmoji(index: number): string {
  const emojis = ['🌴', '🎉'];
  return emojis[index % emojis.length] || '🌴';
}

function getLifestyleText(index: number): string {
  const texts = [
    'Perfect for any occasion',
    'Share the experience'
  ];
  return texts[index % texts.length] || 'Perfect for any occasion';
}