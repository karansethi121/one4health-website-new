/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // shadcn/radix UI tokens (keep for component library)
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
        // ── NEW O4H Brand Palette ──────────────────────────────────────────
        forest:      '#0F3D2E',   // primary, deep ayurvedic green
        lime:        '#C7F25C',   // accent, CTAs on dark surfaces
        strawberry:  '#FF5A6B',   // promo, urgency, fruit cue
        butter:      '#FFD66B',   // highlights, badges
        cream:       '#F7F1E3',   // default background
        paper:       '#FBF7EC',   // secondary surface
        ink:         '#0A0A0A',   // text, borders
        // ── Legacy aliases (backward compat for components not yet redesigned) ──
        sage: {
          50:  '#FAFCF8',
          100: '#EFFFE9',
          200: '#D4F5C9',
          300: '#AEE59D',
          400: '#81D06C',
          500: '#55B53D',
          600: '#359120',
          700: '#0F3D2E',  // → forest
          800: '#0a2e21',
          900: '#071f17',
        },
        charcoal: {
          50:  '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#0A0A0A',  // → ink
        },
        coral: {
          50:  '#FFF5F3',
          100: '#FFE8E4',
          200: '#FFD5CD',
          300: '#FFB8A8',
          400: '#FF8F75',
          500: '#FF5A6B',  // → strawberry
          600: '#E54D3D',
          700: '#C23A2D',
        },
        sunshine: {
          50:  '#FFFDF5',
          100: '#FFF9E0',
          200: '#FFF0B8',
          300: '#FFE48A',
          400: '#FFD66B',  // → butter
          500: '#FFC52F',
          600: '#F0A800',
          700: '#CC8A00',
        },
        lavender: {
          50:  '#FAF8FF',
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
      },
      fontFamily: {
        display:  ['"Bricolage Grotesque"', 'sans-serif'],
        italic:   ['"Instrument Serif"', 'serif'],
        body:     ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono:     ['"JetBrains Mono"', 'monospace'],
        // Legacy aliases
        heading:  ['"Bricolage Grotesque"', 'sans-serif'],
      },
      borderRadius: {
        'card':  '28px',
        'chip':  '14px',
        'badge': '18px',
        'pill':  '999px',
        '2xl':   '1rem',
        '3xl':   '1.5rem',
        '4xl':   '2rem',
        '5xl':   '2.5rem',
        xl:  "calc(var(--radius) + 4px)",
        lg:  "var(--radius)",
        md:  "calc(var(--radius) - 2px)",
        sm:  "calc(var(--radius) - 4px)",
        xs:  "calc(var(--radius) - 0.375rem)",
      },
      boxShadow: {
        'hard':            '8px 8px 0 #0A0A0A',
        'hard-sm':         '4px 4px 0 #0A0A0A',
        'hard-lime':       '8px 8px 0 #C7F25C',
        'hard-strawberry': '8px 8px 0 #FF5A6B',
        'hard-forest':     '8px 8px 0 #0F3D2E',
        xs:       "0 0.0625rem 0.125rem 0 rgb(0 0 0 / 0.03)",
        'soft':   '0 0.25rem 1.5rem rgba(0, 0, 0, 0.04)',
        'soft-lg':'0 0.5rem 2.5rem rgba(0, 0, 0, 0.06)',
        'soft-sm':'0 0.125rem 0.5rem rgba(0, 0, 0, 0.04)',
        'card':   '0 0.125rem 1rem rgba(0, 0, 0, 0.04)',
        'fun':    '0 0.5rem 2rem rgba(15, 61, 46, 0.12)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%":     { opacity: "0" },
        },
        "marquee": {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%":      { transform: "rotate(-3deg)" },
          "75%":      { transform: "rotate(3deg)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%":      { opacity: "0.8", transform: "scale(1.05)" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-6px)" },
        },
        "pop": {
          "0%":   { transform: "scale(0.95)" },
          "50%":  { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
        "expand-x": {
          "0%":   { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        "accordion-down":  "accordion-down 0.2s ease-out",
        "accordion-up":    "accordion-up 0.2s ease-out",
        "caret-blink":     "caret-blink 1.25s ease-out infinite",
        "marquee":         "marquee 30s linear infinite",
        "fade-up":         "fade-up 0.4s ease-out forwards",
        "float":           "float 4s ease-in-out infinite",
        "wiggle":          "wiggle 0.5s ease-in-out",
        "pulse-soft":      "pulse-soft 3s ease-in-out infinite",
        "bounce-subtle":   "bounce-subtle 2s ease-in-out infinite",
        "pop":             "pop 0.3s ease-out",
        "expand-x":        "expand-x 0.8s cubic-bezier(0.65, 0, 0.35, 1) forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
