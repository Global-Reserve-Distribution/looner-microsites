import Image from 'next/image';

interface LocalSourcingSectionProps {
  images: string[];
}

export default function LocalSourcingSection({ images }: LocalSourcingSectionProps) {
  return (
    <div className="w-full py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-2 gap-4 mb-8">
          {images.slice(0, 4).map((image, index) => (
            <div key={index} className="relative aspect-square">
              <Image
                src={image}
                alt={`Minnesota sourcing ${index + 1}`}
                fill
                className="object-cover rounded-2xl"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-900">
            Proudly Made in Minnesota
          </p>
        </div>
      </div>
    </div>
  );
}