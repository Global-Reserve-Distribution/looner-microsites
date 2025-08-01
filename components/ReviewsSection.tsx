"use client";

import React from 'react';

export default function ReviewsSection() {
  return (
    <div className="w-full bg-[#ffa13c] py-12">
      <div className="max-w-[1425px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-black text-4xl font-bold mb-4">
            4.9 Star Average
          </h2>
          {/* Star rating */}
          <div className="flex justify-center gap-2 mb-8">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-black text-2xl">★</span>
            ))}
          </div>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Review 1 */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#ffa13c] text-lg">★</span>
              ))}
            </div>
            <h3 className="font-bold text-black mb-2">
              The best-tasting THC drink!
            </h3>
            <p className="text-gray-700 text-sm mb-4">
              "The best-tasting THC drink in the world. Very consistent effect. Constant use also helps my complexion effects almost instantly."
            </p>
            <p className="text-xs text-gray-500 italic">
              -Amy, Minnesota
            </p>
          </div>

          {/* Review 2 */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#ffa13c] text-lg">★</span>
              ))}
            </div>
            <h3 className="font-bold text-black mb-2">
              The best-tasting THC drink!
            </h3>
            <p className="text-gray-700 text-sm mb-4">
              "The best-tasting THC drinks in the world. Very consistent effect. Constant use also helps my complexion effects almost instantly."
            </p>
            <p className="text-xs text-gray-500 italic">
              -Amy, Minnesota
            </p>
          </div>

          {/* Review 3 */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#ffa13c] text-lg">★</span>
              ))}
            </div>
            <h3 className="font-bold text-black mb-2">
              The best-tasting THC drink!
            </h3>
            <p className="text-gray-700 text-sm mb-4">
              "The best-tasting THC drink in the world. Very consistent effect. Constant use also helps my complexion effects almost instantly."
            </p>
            <p className="text-xs text-gray-500 italic">
              -Amy, Minnesota
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}