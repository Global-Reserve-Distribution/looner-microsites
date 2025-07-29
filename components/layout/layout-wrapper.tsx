import BrezNavbar from './navbar/brez-navbar';
import Footer from './footer';

export default async function LayoutWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BrezNavbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}