import Image from 'next/image';

interface IngredientIcon {
  label: string;
  icon: string;
}

interface IngredientIconsProps {
  icons: IngredientIcon[];
}

export default function IngredientIcons({ icons }: IngredientIconsProps) {
  return (
    <div className="w-full py-8">
      <div className="flex flex-wrap justify-center gap-8 md:gap-12">
        {icons.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="relative w-16 h-16 mb-3">
              <Image
                src={item.icon}
                alt={item.label}
                fill
                className="object-contain"
                sizes="64px"
              />
            </div>
            <span className="text-sm font-medium text-gray-700 max-w-20">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}