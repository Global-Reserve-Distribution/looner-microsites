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
            <div className="w-16 h-16 mb-3 flex items-center justify-center bg-green-50 rounded-full">
              <span className="text-3xl">{item.icon}</span>
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