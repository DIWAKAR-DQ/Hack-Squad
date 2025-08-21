module.exports = {
  content: ["./pages/*.{html,js}", "./index.html", "./js/*.js"],
  theme: {
    extend: {
      colors: {
        // Primary Colors - Medical trust foundation
        primary: {
          DEFAULT: "#2E86AB", // blue-600
          50: "#EBF5FB", // blue-50
          100: "#D6EBF7", // blue-100
          200: "#AED6EF", // blue-200
          300: "#85C1E7", // blue-300
          400: "#5CACDF", // blue-400
          500: "#3497D7", // blue-500
          600: "#2E86AB", // blue-600
          700: "#256B86", // blue-700
          800: "#1C5062", // blue-800
          900: "#13353D", // blue-900
        },
        // Secondary Colors - Beauty warmth accent
        secondary: {
          DEFAULT: "#F18F01", // orange-500
          50: "#FEF7E6", // orange-50
          100: "#FDEFD0", // orange-100
          200: "#FBDFA0", // orange-200
          300: "#F9CF71", // orange-300
          400: "#F7AF41", // orange-400
          500: "#F18F01", // orange-500
          600: "#C17301", // orange-600
          700: "#915701", // orange-700
          800: "#603A00", // orange-800
          900: "#301D00", // orange-900
        },
        // Accent Colors - Health positive reinforcement
        accent: {
          DEFAULT: "#4CAF50", // green-500
          50: "#E8F5E8", // green-50
          100: "#C8E6C9", // green-100
          200: "#A5D6A7", // green-200
          300: "#81C784", // green-300
          400: "#66BB6A", // green-400
          500: "#4CAF50", // green-500
          600: "#43A047", // green-600
          700: "#388E3C", // green-700
          800: "#2E7D32", // green-800
          900: "#1B5E20", // green-900
        },
        // Background Colors
        background: "#FAFBFC", // gray-50
        surface: "#F5F7FA", // gray-100
        // Text Colors
        text: {
          primary: "#1A202C", // gray-900
          secondary: "#4A5568", // gray-600
        },
        // Status Colors
        success: "#38A169", // green-600
        warning: "#ED8936", // orange-400
        error: "#E53E3E", // red-500
        // Border Colors
        border: {
          DEFAULT: "#E2E8F0", // gray-200
          light: "#F7FAFC", // gray-100
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        'source-sans': ['Source Sans Pro', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
        sans: ['Source Sans Pro', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      boxShadow: {
        'subtle': '0 4px 6px rgba(0, 0, 0, 0.07)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'modal': '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
      },
      scale: {
        '102': '1.02',
      },
      transitionDuration: {
        '300': '300ms',
      },
      transitionTimingFunction: {
        'out': 'cubic-bezier(0, 0, 0.2, 1)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}