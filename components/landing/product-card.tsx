'use client';

interface ProductCardProps {
  name: string;
  thc: string;
  flavor: string;
  color: string;
  index: number;
}

export function ProductCard({ name, thc, flavor, color, index }: ProductCardProps) {
  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br p-8 h-96 flex flex-col justify-between text-white shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-90`}></div>
        <div className="relative z-10">
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-bold mb-4 inline-block animate-pulse">
            {thc} THC
          </div>
          <h3 className="text-3xl font-bold mb-2">{name}</h3>
          <p className="text-lg opacity-90">{flavor}</p>
        </div>
        <div className="relative z-10">
          <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-colors w-full">
            Try This Flavor
          </button>
        </div>
      </div>
    </div>
  );
}