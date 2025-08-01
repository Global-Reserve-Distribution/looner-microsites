// Tailwind CSS configuration for LOONER THC Beverages
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cannabis-green': {
          50: 'hsl(142, 69%, 95%)',
          100: 'hsl(142, 69%, 88%)',
          200: 'hsl(142, 69%, 78%)',
          300: 'hsl(142, 69%, 68%)',
          400: 'hsl(142, 69%, 58%)',
          500: 'hsl(142, 69%, 48%)',
          600: 'hsl(142, 69%, 38%)',
          700: 'hsl(142, 69%, 28%)',
          800: 'hsl(142, 69%, 18%)',
          900: 'hsl(142, 69%, 8%)',
        },
        'beverage-blue': {
          50: 'hsl(220, 89%, 95%)',
          100: 'hsl(220, 89%, 85%)',
          200: 'hsl(220, 89%, 75%)',
          300: 'hsl(220, 89%, 65%)',
          400: 'hsl(220, 89%, 55%)',
          500: 'hsl(220, 89%, 45%)',
          600: 'hsl(220, 89%, 35%)',
          700: 'hsl(220, 89%, 25%)',
          800: 'hsl(220, 89%, 15%)',
          900: 'hsl(220, 89%, 5%)',
        },
        'accent-orange': {
          50: 'hsl(35, 84%, 95%)',
          100: 'hsl(35, 84%, 85%)',
          200: 'hsl(35, 84%, 75%)',
          300: 'hsl(35, 84%, 65%)',
          400: 'hsl(35, 84%, 55%)',
          500: 'hsl(35, 84%, 45%)',
          600: 'hsl(35, 84%, 35%)',
          700: 'hsl(35, 84%, 25%)',
          800: 'hsl(35, 84%, 15%)',
          900: 'hsl(35, 84%, 5%)',
        },
        // Olipop-inspired Cannabis palette
        'cannabis-primary': 'var(--cannabis-primary)',
        'cannabis-light': 'var(--cannabis-light)',
        'cannabis-accent': 'var(--cannabis-accent)',
        'cannabis-dark': 'var(--cannabis-dark)',
        'thc-low': 'var(--thc-low)',
        'thc-medium': 'var(--thc-medium)',
        'thc-high': 'var(--thc-high)',
        'earth-brown': 'var(--earth-brown)',
        'natural-cream': 'var(--natural-cream)',
        'warning-orange': 'var(--warning-orange)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'background': 'var(--background)',
        'surface': 'var(--surface)',
        // Additional nostalgic colors for shop page
        cream: {
          50: '#fefdf9',
          100: '#fef9e7',
          200: '#fef3c7',
          300: '#fde68a',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12'
        },
        peach: {
          100: '#fed7aa',
          200: '#fdba74',
          300: '#fb923c',
          400: '#f97316',
          500: '#ea580c',
          600: '#dc2626'
        },
        lime: {
          100: '#E6FF99',
        },
        cyan: {
          100: '#87CEEB',
        },
        brown: {
          100: '#D2B48C',
        },
        cannabis: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d'
        },
      },
      animation: {
        carousel: 'carousel 60s infinite linear',
      },
      keyframes: {
        carousel: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;