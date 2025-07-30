import LayoutWrapper from '../../components/layout/layout-wrapper';

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutWrapper>
      {children}
    </LayoutWrapper>
  );
}