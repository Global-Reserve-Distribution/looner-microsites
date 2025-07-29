import clsx from 'clsx';
import Image from 'next/image';

export default function LogoSquare({ size }: { size?: 'sm' | undefined }) {
  return (
    <div
      className={clsx(
        'flex flex-none items-center justify-center',
        {
          'h-[60px] w-[60px] rounded-xl': !size,
          'h-[40px] w-[40px] rounded-lg': size === 'sm'
        }
      )}
    >
      <Image
        src="/logo.png"
        alt="LOONER Cannabis Co Logo"
        width={size === 'sm' ? 40 : 60}
        height={size === 'sm' ? 40 : 60}
        className="object-contain"
      />
    </div>
  );
}
