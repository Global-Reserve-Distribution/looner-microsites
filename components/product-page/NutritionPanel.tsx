import Image from 'next/image';

interface NutritionPanelProps {
  src: string;
  alt?: string;
}

export default function NutritionPanel({ src, alt = "Nutrition Facts" }: NutritionPanelProps) {
  return (
    <div className="w-full py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Nutrition Facts</h2>
        <div className="flex justify-center">
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full">
            <div className="relative w-full aspect-[3/4]">
              <Image
                src={src}
                alt={alt}
                fill
                className="object-contain"
                sizes="(max-width: 500px) 100vw, 500px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}