"use client";

import { TopBanner } from '../../components/product-page';

export default function SimpleTest() {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Simple Test Page</h1>
      <p className="text-center">This is a working page!</p>
      <div className="mt-8">
        <TopBanner />
      </div>
    </div>
  );
}