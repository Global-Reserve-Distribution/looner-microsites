import clsx from 'clsx';
import Image from 'next/image';

export default function LogoSquare({ size }: { size?: 'sm' | undefined }) {
  return (
    <div className="flex flex-none items-center justify-center">
      <Image
        src="/logo.webp"
        alt="LOONER Cannabis Co Logo"
        width={120}
        height={120}
        className="object-contain w-[120px] h-[120px]"
      />
    </div>
  );
}
