'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-cannabis-800">
          LOONER
        </Link>
        
        <div className="flex space-x-8">
          <Link 
            href="/" 
            className={`font-medium transition-colors ${
              pathname === '/' ? 'text-cannabis-600' : 'text-gray-600 hover:text-cannabis-600'
            }`}
          >
            Home
          </Link>
          <Link 
            href="/shop" 
            className={`font-medium transition-colors ${
              pathname === '/shop' ? 'text-cannabis-600' : 'text-gray-600 hover:text-cannabis-600'
            }`}
          >
            Shop
          </Link>
          <Link 
            href="/about" 
            className={`font-medium transition-colors ${
              pathname === '/about' ? 'text-cannabis-600' : 'text-gray-600 hover:text-cannabis-600'
            }`}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}