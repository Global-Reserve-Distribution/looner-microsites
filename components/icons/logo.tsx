import clsx from 'clsx';

export default function LogoIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`${process.env.SITE_NAME} logo`}
      viewBox="0 0 24 24"
      {...props}
      className={clsx('h-4 w-4 fill-green-600 dark:fill-green-400', props.className)}
    >
      {/* Cannabis leaf icon for LOONER THC Beverages */}
      <path d="M12 2C12 2 10.5 3.5 10.5 6.5C10.5 8.5 11.5 9.5 12 10C12.5 9.5 13.5 8.5 13.5 6.5C13.5 3.5 12 2 12 2Z" />
      <path d="M8.5 6C8.5 6 7 7.5 7.5 10C8 12 9 12.5 10 12.5C10 12 10.5 11 10.5 9C10.5 7 9 6 8.5 6Z" />
      <path d="M15.5 6C15.5 6 17 7.5 16.5 10C16 12 15 12.5 14 12.5C14 12 13.5 11 13.5 9C13.5 7 15 6 15.5 6Z" />
      <path d="M12 10C12 10 11 12 12 14C13 16 14 17 15 17C15 16.5 14.5 15.5 14 14.5C13.5 13.5 13 12.5 12 10Z" />
      <path d="M12 10C12 10 13 12 12 14C11 16 10 17 9 17C9 16.5 9.5 15.5 10 14.5C10.5 13.5 11 12.5 12 10Z" />
      <path d="M12 14L12 22" strokeWidth="2" stroke="currentColor" fill="none" />
    </svg>
  );
}
