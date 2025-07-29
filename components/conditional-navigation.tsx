import { headers } from 'next/headers';
import LayoutWrapper from './layout/layout-wrapper';

export async function ConditionalNavigation({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  
  // Product page uses its own custom header/footer
  if (pathname === '/product' || pathname === '/flavor-variants') {
    return <>{children}</>;
  }
  
  // All other pages use the standard navbar/footer layout
  return (
    <LayoutWrapper>
      {children}
    </LayoutWrapper>
  );
}