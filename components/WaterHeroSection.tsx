import React from 'react';

export function WaterHeroSection() {
  return (
    <div className="w-full flex justify-center items-center overflow-hidden">
      <div 
        className="bg-cover bg-center bg-no-repeat flex-shrink-0"
        style={{
          width: '1425px',
          height: '452.97px',
          backgroundImage: 'url(/water-hero-can.png)',
          backgroundColor: '#d3d3d3'
        }}
      />
    </div>
  );
}