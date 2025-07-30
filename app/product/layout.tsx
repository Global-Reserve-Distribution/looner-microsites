import LayoutWrapper from '../../components/layout/layout-wrapper';

export default function ProductLayout({
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