import React from 'react';
import Image from 'next/image';

export function VideoComingSoon() {
  return (
    <div className="w-full overflow-hidden">
      <div className="relative w-full aspect-[622/353] bg-gradient-to-br from-blue-400 to-green-400">
        {/* Background image */}
        <Image
          src="/video-coming-soon-bg.png"
          alt="LOONER cans with ice on lake background"
          fill
          className="object-cover rounded-2xl"
          priority
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center">
          <div className="text-center">
            {/* Play button icon */}
            <div className="mx-auto mb-4 w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1"
              >
                <path 
                  d="M8 5v14l11-7z" 
                  fill="#333"
                />
              </svg>
            </div>
            
            {/* Text */}
            <h3 className="text-white text-2xl font-bold mb-2 drop-shadow-lg">
              Video Coming Soon
            </h3>
            <p className="text-white/90 text-sm drop-shadow-md">
              Experience LOONER in action
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}