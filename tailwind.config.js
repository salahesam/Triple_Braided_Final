export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "tertiary": "#ffb598",
        "surface-container-high": "#252b2a",
        "on-tertiary-container": "#6d2500",
        "on-primary-fixed": "#00201e",
        "on-secondary-container": "#8ebfb0",
        "on-surface-variant": "#bbc9c7",
        "surface-container-highest": "#000000",
        "bg-elevated": "#000000",
        "on-secondary-fixed": "#002019",
        "on-error": "#690005",
        "glow-primary": "rgba(15, 180, 120, 0.4)",
        "surface-container": "#000000",
        "accent-dark": "#000000",
        "tertiary-fixed-dim": "#ffb598",
        "on-primary-container": "#004541",
        "text-accent": "#0FB478",
        "surface-container-lowest": "#000000",
        "on-tertiary-fixed-variant": "#7b2e07",
        "inverse-on-surface": "#2b3231",
        "surface-variant": "#000000",
        "background": "#000000",
        "surface": "#000000",
        "on-secondary": "#00382d",
        "on-primary": "#003734",
        "bg-primary": "#000000",
        "on-tertiary": "#591d00",
        "surface-container-low": "#000000",
        "border-subtle": "rgba(15, 180, 120, 0.15)",
        "primary-fixed": "#6df8ed",
        "inverse-primary": "#006a65",
        "gradient-border": "linear-gradient(135deg, #0FB478, #c7fae9, #000000)",
        "on-tertiary-fixed": "#370e00",
        "on-background": "#dde4e2",
        "surface-bright": "#343a3a",
        "secondary": "#9fd1c1",
        "tertiary-fixed": "#ffdbce",
        "secondary-fixed-dim": "#9fd1c1",
        "bg-surface": "#000000",
        "primary-fixed-dim": "#0FB478",
        "gradient-cta": "linear-gradient(135deg, #000000 0%, #0FB478 50%, #c7fae9 100%)",
        "surface-dim": "#000000",
        "error-container": "#93000a",
        "surface-tint": "#0FB478",
        "secondary-container": "#1e4f43",
        "text-muted": "#94a3b8",
        "primary": "#0FB478",
        "on-secondary-fixed-variant": "#1e4f43",
        "error": "#ffb4ab",
        "tertiary-container": "#f58b5e",
        "text-primary": "#ffffff",
        "inverse-surface": "#dde4e2",
        "outline": "#859491",
        "on-error-container": "#ffdad6",
        "outline-variant": "#3c4948",
        "on-primary-fixed-variant": "#00504c",
        "on-surface": "#dde4e2",
        "secondary-fixed": "#baeddc",
        "primary-container": "#0FB478"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "gutter": "2rem",
        "container-max": "1200px",
        "section-py-desktop": "6rem",
        "section-py-mobile": "4rem",
        "grid-gap": "1.5rem",
        "container-px": "clamp(1rem, 5vw, 4rem)"
      },
      fontFamily: {
        "body-base": ["Cairo", "sans-serif"],
        "caption-badge": ["Cairo", "sans-serif"],
        "card-title": ["Cairo", "sans-serif"],
        "technical-stat": ["DM Mono", "monospace"],
        "hero-headline": ["Cairo", "sans-serif"],
        "section-title": ["Cairo", "sans-serif"]
      },
      fontSize: {
        "body-base": ["1rem", { "lineHeight": "1.6", "fontWeight": "400" }],
        "caption-badge": ["0.8rem", { "letterSpacing": "0.02em", "fontWeight": "500" }],
        "card-title": ["1.25rem", { "lineHeight": "1.4", "fontWeight": "600" }],
        "technical-stat": ["1.125rem", { "lineHeight": "1", "fontWeight": "500" }],
        "hero-headline": ["clamp(2.5rem, 6vw, 4.5rem)", { "lineHeight": "1.1", "fontWeight": "800" }],
        "section-title": ["clamp(1.75rem, 4vw, 3rem)", { "lineHeight": "1.2", "fontWeight": "700" }]
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(circle at center, rgba(15, 180, 120, 0.1) 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid-pattern': '24px 24px',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'scroll-x': 'scrollX 30s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scrollX: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    }
  },
  plugins: [],
}
