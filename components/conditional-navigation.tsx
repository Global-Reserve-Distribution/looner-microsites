'use client';

import { usePathname } from 'next/navigation';
import { Navigation } from './navigation';

export function ConditionalNavigation({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Hide navigation on the flavor page microsite
  if (pathname === '/product/flavor') {
    return <>{children}</>;
  }
  
  return (
    <>
      <Navigation />
      <main className="pt-20">
        {children}
      </main>
    </>
  );
}