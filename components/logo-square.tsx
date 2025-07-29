import clsx from 'clsx';
import Image from 'next/image';

export default function LogoSquare({ size }: { size?: 'sm' | undefined }) {
  return (
    <div className="flex flex-none items-center justify-center">
      <Image
        src="/logo.webp"
        alt="LOONER Cannabis Co Logo"
        width={100}
        height={100}
        className="object-contain w-[90px] h-[90px] lg:w-[100px] lg:h-[100px]"
      />
    </div>
  );
}
