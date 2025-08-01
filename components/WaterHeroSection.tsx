import React from 'react';

export function WaterHeroSection() {
  return (
    <div className="w-full h-[403px] flex justify-center items-center overflow-hidden">
      <div 
        className="w-full h-[453px] bg-cover bg-center bg-no-repeat flex-shrink-0"
        style={{
          backgroundImage: 'url(/water-hero-background.png)',
          backgroundColor: '#d3d3d3'
        }}
      />
    </div>
  );
}