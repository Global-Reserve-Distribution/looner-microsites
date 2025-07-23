'use client';

export function ProductFeatures() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Lab Tested',
      description: 'Third-party tested for purity and potency'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Non GMO',
      description: 'Made with natural, non-genetically modified ingredients'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Less Sugar',
      description: 'Only 5g of sugar per can compared to traditional sodas'
    }
  ];

  return (
    <div className="space-y-4">
      {features.map((feature, index) => (
        <div 
          key={index}
          className="bg-cream-200 rounded-2xl p-4 flex items-center gap-4 hover:bg-cream-300 transition-colors"
        >
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-cannabis-600 flex-shrink-0">
            {feature.icon}
          </div>
          
          <div>
            <h3 className="font-bold text-cannabis-800 text-lg mb-1">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}