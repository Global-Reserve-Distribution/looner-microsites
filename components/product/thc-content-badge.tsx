'use client';

import clsx from 'clsx';
import { useState } from 'react';

interface THCContentBadgeProps {
  thcAmount: number; // THC content in mg
  cbdAmount?: number; // CBD content in mg (optional)
  className?: string;
  showTooltip?: boolean;
}

export default function THCContentBadge({ 
  thcAmount, 
  cbdAmount, 
  className,
  showTooltip = true 
}: THCContentBadgeProps) {
  const [showInfo, setShowInfo] = useState(false);

  // Determine potency level and colors
  const getPotencyLevel = (mg: number) => {
    if (mg <= 5) return { level: 'Low', color: 'thc-low', textColor: 'text-green-800' };
    if (mg <= 15) return { level: 'Medium', color: 'thc-medium', textColor: 'text-green-900' };
    return { level: 'High', color: 'thc-high', textColor: 'text-white' };
  };

  const potency = getPotencyLevel(thcAmount);

  return (
    <div className={clsx('relative inline-flex items-center', className)}>
      <div 
        className={clsx(
          'inline-flex items-center gap-2 px-3 py-2 rounded-full border-2 transition-all duration-200',
          'border-cannabis-primary bg-white hover:bg-cannabis-accent hover:border-cannabis-light',
          'cursor-pointer select-none',
          showInfo && 'ring-2 ring-cannabis-primary'
        )}
        onMouseEnter={() => showTooltip && setShowInfo(true)}
        onMouseLeave={() => showTooltip && setShowInfo(false)}
        onClick={() => setShowInfo(!showInfo)}
      >
        {/* Cannabis Leaf Icon */}
        <svg 
          className="w-5 h-5 text-cannabis-primary" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M12 2C12 2 8.5 4 6 8C6 8 8 8.5 12 8C16 8.5 18 8 18 8C15.5 4 12 2 12 2Z"/>
          <path d="M12 8C12 8 14.5 10 16 14C16 14 14 14.5 12 14C10 14.5 8 14 8 14C9.5 10 12 8 12 8Z"/>
          <path d="M12 14C12 14 11.5 16 12 20C12.5 16 12 14 12 14Z"/>
        </svg>
        
        {/* THC Content */}
        <div className="text-center">
          <div className="text-lg font-bold text-cannabis-primary">
            {thcAmount}mg
          </div>
          <div className="text-xs text-text-secondary -mt-1">
            THC
          </div>
        </div>
        
        {/* CBD Content (if present) */}
        {cbdAmount && cbdAmount > 0 && (
          <>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-lg font-bold text-cannabis-light">
                {cbdAmount}mg
              </div>
              <div className="text-xs text-text-secondary -mt-1">
                CBD
              </div>
            </div>
          </>
        )}
        
        {/* Potency Indicator */}
        <div className={clsx(
          'px-2 py-1 rounded-full text-xs font-bold',
          potency.level === 'Low' && 'bg-green-100 text-green-800',
          potency.level === 'Medium' && 'bg-yellow-100 text-yellow-800', 
          potency.level === 'High' && 'bg-red-100 text-red-800'
        )}>
          {potency.level}
        </div>
      </div>

      {/* Tooltip/Info Panel */}
      {showTooltip && showInfo && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64">
            {/* Arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-200"></div>
            
            <div className="space-y-3">
              <div className="border-b pb-2">
                <h4 className="font-bold text-cannabis-primary">Dosage Information</h4>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">THC Content:</span>
                  <span className="font-semibold">{thcAmount}mg</span>
                </div>
                
                {cbdAmount && (
                  <div className="flex justify-between">
                    <span className="text-text-secondary">CBD Content:</span>
                    <span className="font-semibold">{cbdAmount}mg</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-text-secondary">Potency Level:</span>
                  <span className={clsx(
                    'font-semibold',
                    potency.level === 'Low' && 'text-green-600',
                    potency.level === 'Medium' && 'text-yellow-600',
                    potency.level === 'High' && 'text-red-600'
                  )}>
                    {potency.level}
                  </span>
                </div>
              </div>
              
              <div className="border-t pt-2">
                <p className="text-xs text-text-secondary">
                  <strong>Start Low, Go Slow:</strong> Begin with a small amount and wait 2+ hours before consuming more.
                </p>
              </div>
              
              <div className="text-xs text-text-secondary">
                <p><strong>Onset:</strong> 30-120 minutes</p>
                <p><strong>Duration:</strong> 4-8 hours</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}