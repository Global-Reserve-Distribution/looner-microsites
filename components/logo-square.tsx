import clsx from 'clsx';
import Image from 'next/image';

export default function LogoSquare({ size }: { size?: 'sm' | undefined }) {
  return (
    <div className="flex flex-none items-center justify-center">
      <Image
        src="/logo.png"
        alt="LOONER Cannabis Co Logo"
        width={125}
        height={125}
        className="object-contain lg:w-[105px] lg:h-[105px] w-[125px] h-[125px]"
      />
    </div>
  );
}
