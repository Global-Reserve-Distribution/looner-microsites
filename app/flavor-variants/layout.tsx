import { Header } from '../../components/Header';

export default function FlavorVariantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}