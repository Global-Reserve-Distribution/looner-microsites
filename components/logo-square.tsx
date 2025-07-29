import clsx from 'clsx';
import Image from 'next/image';

export default function LogoSquare({ size }: { size?: 'sm' | undefined }) {
  return (
    <div className="flex flex-none items-center justify-center">
      <Image
        src="/logo.png"
        alt="LOONER Cannabis Co Logo"
        width={80}
        height={80}
        className="object-contain lg:w-[60px] lg:h-[60px] w-[80px] h-[80px]"
      />
    </div>
  );
}
