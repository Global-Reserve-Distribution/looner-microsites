'use client';

import { useState } from 'react';

interface QuantitySelectorProps {
  quantity?: number;
  onQuantityChange?: (quantity: number) => void;
}

export default function QuantitySelector({ quantity = 1, onQuantityChange }: QuantitySelectorProps) {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  const handleQuantityChange = (newQuantity: number) => {
    const validQuantity = Math.max(1, newQuantity);
    setCurrentQuantity(validQuantity);
    onQuantityChange?.(validQuantity);
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <span>Quantity:</span>
      <div className="flex items-center border rounded">
        <button
          onClick={() => handleQuantityChange(currentQuantity - 1)}
          className="px-3 py-1 hover:bg-gray-50"
        >
          -
        </button>
        <span className="px-4 py-1">{currentQuantity}</span>
        <button
          onClick={() => handleQuantityChange(currentQuantity + 1)}
          className="px-3 py-1 hover:bg-gray-50"
        >
          +
        </button>
      </div>
    </div>
  );
}