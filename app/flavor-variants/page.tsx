"use client";

import React, { useState } from "react";
import { FlavorPickerVariants } from "../../components/FlavorPickerVariants";

// Mock data for demo purposes
const mockFlavors = [
  {
    title: "Wild Grape - 10mg",
    description: "Bold grape flavor with cannabis",
    tags: ["Cannabis", "Grape", "10mg THC"],
    primaryColor: "#8B5CF6",
    secondaryColor: "#06B6D4",
    images: [""],
    variants: [{ id: "1", title: "12 Cans", price: 35.99 }]
  },
  {
    title: "Sweet Orange - 10mg", 
    description: "Citrus orange soda",
    tags: ["Cannabis", "Orange", "10mg THC"],
    primaryColor: "#F59E0B",
    secondaryColor: "#FB923C",
    images: [""],
    variants: [{ id: "2", title: "12 Cans", price: 35.99 }]
  },
  {
    title: "Professor Pepper - 10mg",
    description: "Classic cola flavor",
    tags: ["Cannabis", "Cola", "10mg THC"],
    primaryColor: "#7C2D12",
    secondaryColor: "#DC2626",
    images: [""],
    variants: [{ id: "3", title: "12 Cans", price: 35.99 }]
  },
  {
    title: "Mocktail Mule - 10mg",
    description: "Ginger beer inspired",
    tags: ["Cannabis", "Ginger", "10mg THC"],
    primaryColor: "#059669",
    secondaryColor: "#10B981",
    images: [""],
    variants: [{ id: "4", title: "12 Cans", price: 35.99 }]
  },
  {
    title: "Lemon Lime - 10mg",
    description: "Citrus blend",
    tags: ["Cannabis", "Citrus", "10mg THC"],
    primaryColor: "#65A30D",
    secondaryColor: "#84CC16",
    images: [""],
    variants: [{ id: "5", title: "12 Cans", price: 35.99 }]
  },
  {
    title: "Dew - 10mg",
    description: "Mountain dew inspired",
    tags: ["Cannabis", "Citrus", "10mg THC"],
    primaryColor: "#84CC16",
    secondaryColor: "#65A30D",
    images: [""],
    variants: [{ id: "6", title: "12 Cans", price: 35.99 }]
  },
  {
    title: "Creme - 10mg",
    description: "Vanilla cream soda",
    tags: ["Cannabis", "Vanilla", "10mg THC"],
    primaryColor: "#D4A574",
    secondaryColor: "#F3E8FF",
    images: [""],
    variants: [{ id: "7", title: "12 Cans", price: 35.99 }]
  },
  {
    title: "Cola - 10mg",
    description: "Classic cola flavor",
    tags: ["Cannabis", "Cola", "10mg THC"],
    primaryColor: "#DC2626",
    secondaryColor: "#7C2D12",
    images: [""],
    variants: [{ id: "8", title: "12 Cans", price: 35.99 }]
  }
];

export default function FlavorVariantsDemo() {
  const [selectedFlavor, setSelectedFlavor] = useState(mockFlavors[0]);
  const [currentVariant, setCurrentVariant] = useState<"olipop" | "premium" | "minimal" | "gradient">("olipop");

  const variants = [
    { key: "olipop" as const, name: "Olipop Style", description: "Exact replica of Olipop's design" },
    { key: "premium" as const, name: "Premium Cards", description: "Elevated product showcase with glassmorphism" },
    { key: "minimal" as const, name: "Minimal Grid", description: "Clean, simple selection interface" },
    { key: "gradient" as const, name: "Gradient Galaxy", description: "Futuristic design with floating elements" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Flavor Picker Design Variations
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Four different approaches to showcase your THC soda flavors, from Olipop-inspired to futuristic designs.
          </p>
        </div>

        {/* Variant Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-2 shadow-lg">
            <div className="flex space-x-2">
              {variants.map((variant) => (
                <button
                  key={variant.key}
                  onClick={() => setCurrentVariant(variant.key)}
                  className={`
                    px-6 py-3 rounded-xl font-medium transition-all duration-200
                    ${currentVariant === variant.key
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }
                  `}
                >
                  {variant.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Current Variant Description */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {variants.find(v => v.key === currentVariant)?.name}
          </h2>
          <p className="text-gray-600">
            {variants.find(v => v.key === currentVariant)?.description}
          </p>
        </div>

        {/* Selected Flavor Display */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Currently Selected: {selectedFlavor?.title || "None"}
            </h3>
            <p className="text-gray-600">{selectedFlavor?.description || "No description available"}</p>
          </div>
        </div>

        {/* Flavor Picker Variant */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <FlavorPickerVariants
            flavors={mockFlavors}
            selectedFlavor={selectedFlavor}
            onFlavorSelect={setSelectedFlavor}
            variant={currentVariant}
          />
        </div>

        {/* Design Notes */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {variants.map((variant) => (
            <div key={variant.key} className="bg-white rounded-xl p-6 shadow-lg">
              <h4 className="font-bold text-gray-900 mb-3">{variant.name}</h4>
              <div className="space-y-2 text-sm text-gray-600">
                {variant.key === 'olipop' && (
                  <>
                    <p>• Exact Olipop color scheme</p>
                    <p>• Tab-based navigation</p>
                    <p>• 4-column grid layout</p>
                    <p>• Minimal product imagery</p>
                  </>
                )}
                {variant.key === 'premium' && (
                  <>
                    <p>• Premium card design</p>
                    <p>• THC dosage badges</p>
                    <p>• Hover animations</p>
                    <p>• Feature indicators</p>
                  </>
                )}
                {variant.key === 'minimal' && (
                  <>
                    <p>• Clean selection UI</p>
                    <p>• Check mark indicators</p>
                    <p>• 5-column grid</p>
                    <p>• Subtle hover effects</p>
                  </>
                )}
                {variant.key === 'gradient' && (
                  <>
                    <p>• Glassmorphism effects</p>
                    <p>• Animated elements</p>
                    <p>• Gradient backgrounds</p>
                    <p>• Futuristic styling</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}