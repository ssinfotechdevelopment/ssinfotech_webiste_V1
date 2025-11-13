/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#1e3a8a', // Primary blue for brand elements
        'brand-blue-dark': '#1e1b4b', // Darker blue for gradients and hovers
        'brand-accent': '#f59e0b', // Amber accent color for highlights
        'text-foreground': '#1f2937', // Primary dark text
        'text-muted': '#6b7280', // Muted secondary text
        'text-success': '#10b981', // Success green for checkmarks
        'text-blue-100': '#dbeafe', // Light blue for text in dark sections
      },

      // 🌈 Animated Gradient Extension
      keyframes: {
        'gradient-move': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        'gradient-move': 'gradient-move 8s ease infinite',
      },
    },
  },
  plugins: [],
};
