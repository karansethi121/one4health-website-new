/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // OneforHealth brand colors - more playful
        sage: {
          50: '#F8F9F6',
          100: '#EDF1EA',
          200: '#D9E3D3',
          300: '#BDD1B3',
          400: '#9BB88E',
          500: '#7A9B6A',
          600: '#5D7F4F',
          700: '#4A6B3E',
          800: '#3D5535',
          900: '#33462D',
        },
        // Fun accent colors
        coral: {
          50: '#FFF5F3',
          100: '#FFE8E4',
          200: '#FFD5CD',
          300: '#FFB8A8',
          400: '#FF8F75',
          500: '#F97066',
          600: '#E54D3D',
          700: '#C23A2D',
        },
        sunshine: {
          50: '#FFFDF5',
          100: '#FFF9E0',
          200: '#FFF0B8',
          300: '#FFE48A',
          400: '#FFD555',
          500: '#FFC52F',
          600: '#F0A800',
          700: '#CC8A00',
        },
        lavender: {
          50: '#FAF8FF',
          100: '#F3EFFF',
          200: '#E9E0FF',
          300: '#D6C8FF',
          400: '#BCA0FF',
          500: '#9F7AEA',
          600: '#805AD5',
          700: '#6B46C1',
          800: '#553C9A',
          900: '#44337A',
        },
        charcoal: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        heading: ['Montserrat', 'Space Grotesk', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 0.375rem)",
      },
      boxShadow: {
        xs: "0 0.0625rem 0.125rem 0 rgb(0 0 0 / 0.03)",
        'soft': '0 0.25rem 1.5rem rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 0.5rem 2.5rem rgba(0, 0, 0, 0.06)',
        'card': '0 0.125rem 1rem rgba(0, 0, 0, 0.04)',
        'fun': '0 0.5rem 2rem rgba(47, 93, 80, 0.12)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-3deg)" },
          "75%": { transform: "rotate(3deg)" },
        },
        "pop": {
          "0%": { transform: "scale(0.95)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
        "scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
        "wiggle": "wiggle 0.5s ease-in-out",
        "pop": "pop 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
