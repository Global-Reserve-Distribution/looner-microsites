'use client';

import { useState } from 'react';

interface PurchaseOptionsProps {
  selectedType?: 'one-time' | 'subscription';
  onTypeChange?: (type: 'one-time' | 'subscription') => void;
}

export default function PurchaseOptions({ selectedType = 'one-time', onTypeChange }: PurchaseOptionsProps) {
  const [selected, setSelected] = useState(selectedType);

  const handleTypeChange = (type: 'one-time' | 'subscription') => {
    setSelected(type);
    onTypeChange?.(type);
  };

  return (
    <div className="space-y-3">
      <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer">
        <div className="flex items-center">
          <input
            type="radio"
            name="purchase"
            value="one-time"
            checked={selected === 'one-time'}
            onChange={(e) => handleTypeChange(e.target.value as 'one-time')}
            className="mr-3"
          />
          <div>
            <div className="font-medium">One-time Purchase</div>
            <div className="text-sm">
              12 Cans <span className="font-bold">$19.99</span> <span className="line-through text-gray-500">$99</span>
            </div>
          </div>
        </div>
        <div className="bg-yellow-300 px-2 py-1 rounded text-xs font-bold">
          Save 15%
        </div>
      </label>

      <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer">
        <div className="flex items-center">
          <input
            type="radio"
            name="purchase"
            value="subscription"
            checked={selected === 'subscription'}
            onChange={(e) => handleTypeChange(e.target.value as 'subscription')}
            className="mr-3"
          />
          <div>
            <div className="font-medium">Subscribe & Save</div>
            <div className="text-sm">
              12 Cans <span className="font-bold">$17</span> <span className="line-through text-gray-500">$19.99</span>
            </div>
          </div>
        </div>
        <div className="bg-yellow-300 px-2 py-1 rounded text-xs font-bold">
          Save 15%
        </div>
      </label>
    </div>
  );
}