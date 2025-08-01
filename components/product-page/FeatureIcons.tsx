const FEATURES = [
  { icon: '🌿', label: 'Plant-Derived THC' },
  { icon: '🌾', label: 'Made with Cane Sugar' },
  { icon: '🌱', label: 'Vegan' },
  { icon: '✨', label: 'Gluten Free' },
  { icon: '💧', label: 'Filtered Water' },
];

export default function FeatureIcons() {
  return (
    <div className="grid grid-cols-5 gap-2 text-center">
      {FEATURES.map((feature, index) => (
        <div key={index}>
          <div className="text-xl mb-1">{feature.icon}</div>
          <div className="text-xs">{feature.label}</div>
        </div>
      ))}
    </div>
  );
}