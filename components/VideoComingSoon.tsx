import React from 'react';
import Image from 'next/image';

export function VideoComingSoon() {
  return (
    <div className="w-full overflow-hidden">
      <div className="relative w-full aspect-[622/353] bg-gradient-to-br from-[#ffa13c] to-[#ffbd4e] rounded-2xl flex items-center justify-center">
        {/* Simple text only */}
        <h3 className="text-white text-2xl font-bold drop-shadow-lg">
          Video Coming Soon
        </h3>
      </div>
    </div>
  );
}