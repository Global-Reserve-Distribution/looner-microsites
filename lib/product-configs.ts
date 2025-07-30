export const productConfigs = {
  'soda-10mg': {
    productType: 'soda-10mg' as const,
    title: '10mg Soda Products',
    description: 'Perfect 10mg THC soda.',
    sectionTitle: 'Perfect 10mg Soda Dosage',
    sectionDescription: 'Our 10mg THC sodas combine refreshing carbonation with precise cannabis dosing. Perfect for social occasions, creative activities, or relaxation with a familiar soda experience.',
    defaultColor: '#FFE5B4',
    defaultSecondaryColor: '#CCFBF1',
    dosageInfo: {
      title: '10mg THC Soda',
      subtitle: 'Perfect Social Dose',
      borderColor: 'border-green-600',
      textColor: 'text-green-700',
      onsetTime: '15-45 min',
      duration: '2-4 hours',
      experience: 'Mild to Moderate',
      bestFor: 'Social Events',
      backgroundClass: 'bg-green-50',
      description: 'Refreshing & Social: Perfect alternative to alcoholic beverages with a familiar soda experience.'
    },
    features: [
      { icon: '🥤', label: 'Refreshing Soda' },
      { icon: '🎯', label: 'Perfect Dose' },
      { icon: '🧪', label: 'Lab Tested' },
      { icon: '🌿', label: 'Natural' },
      { icon: '🍾', label: 'Social Drink' },
      { icon: '✨', label: 'Premium Quality' }
    ]
  },

  'soda-50mg': {
    productType: 'soda-50mg' as const,
    title: '50mg Soda Products',
    description: 'Premium 50mg THC soda.',
    sectionTitle: 'Premium 50mg High-Dose Experience',
    sectionDescription: 'Our 50mg THC sodas deliver a premium high-dose cannabis experience for experienced users. Perfect for deep relaxation, creative exploration, or therapeutic relief with familiar soda refreshment.',
    defaultColor: '#FFE5B4',
    defaultSecondaryColor: '#CCFBF1', 
    dosageInfo: {
      title: '50mg THC Soda',
      subtitle: 'High-Dose Experience',
      borderColor: 'border-red-600',
      textColor: 'text-red-700',
      onsetTime: '30-60 min',
      duration: '4-8 hours',
      experience: 'Strong to Intense',
      bestFor: 'Experienced Users',
      backgroundClass: 'bg-red-50',
      description: 'High Potency: For experienced cannabis users seeking a premium therapeutic or recreational experience.'
    },
    features: [
      { icon: '💪', label: 'High Potency' },
      { icon: '🎯', label: 'Precise Dose' },
      { icon: '🧪', label: 'Lab Tested' },
      { icon: '🌿', label: 'Premium Extract' },
      { icon: '🥤', label: 'Refreshing' },
      { icon: '⭐', label: 'Expert Level' }
    ]
  },

  'edibles': {
    productType: 'edibles' as const,
    title: 'Edible Products',
    description: 'Premium cannabis-infused edible.',
    sectionTitle: 'Premium Cannabis-Infused Edibles',
    sectionDescription: 'Our cannabis-infused edibles deliver precise dosing with delicious flavors. Perfect for discreet consumption, therapeutic use, or recreational enjoyment with consistent, long-lasting effects.',
    defaultColor: '#FEF3C7',
    defaultSecondaryColor: '#FCD34D',
    dosageInfo: {
      title: 'Cannabis Edibles',
      subtitle: 'Precise Edible Dosing',
      borderColor: 'border-purple-600',
      textColor: 'text-purple-700',
      onsetTime: '30-120 min',
      duration: '4-8 hours',
      experience: 'Long-lasting',
      bestFor: 'Therapeutic Use',
      backgroundClass: 'bg-purple-50',
      description: 'Discreet & Long-lasting: Perfect for extended relief and therapeutic benefits with precise dosing control.'
    },
    features: [
      { icon: '🍯', label: 'Delicious Flavors' },
      { icon: '🎯', label: 'Precise Dosing' },
      { icon: '🧪', label: 'Lab Tested' },
      { icon: '🌿', label: 'Premium Extract' },
      { icon: '🤫', label: 'Discreet' },
      { icon: '⏰', label: 'Long Lasting' }
    ]
  }
};