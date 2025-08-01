import React from 'react';

export function WaterHeroSection() {
  return (
    <div className="w-full flex justify-center items-center overflow-hidden">
      <div 
        className="bg-cover bg-center bg-no-repeat w-full max-w-[1425px] aspect-[1425/453] md:aspect-[1425/453]"
        style={{
          backgroundImage: 'url(/water-hero-can.png)',
          backgroundColor: '#d3d3d3',
          minHeight: '250px'
        }}
      />
    </div>
  );
}