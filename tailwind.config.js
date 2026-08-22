/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "base-dark": "#0B0F19",
        "surface": "#11131b",
        "surface-dim": "#11131b",
        "surface-bright": "#373942",
        "surface-container-lowest": "#0c0e16",
        "surface-container-low": "#191b23",
        "surface-container": "#1d1f27",
        "surface-container-high": "#282a32",
        "surface-container-highest": "#32343d",
        "on-surface": "#e1e2ed",
        "on-surface-variant": "#c3c6d7",
        "inverse-surface": "#e1e2ed",
        "inverse-on-surface": "#2e3039",
        "outline": "#8d90a0",
        "outline-variant": "#434655",
        "surface-tint": "#b4c5ff",
        "primary": "#b4c5ff",
        "on-primary": "#002a78",
        "primary-container": "#2563eb",
        "on-primary-container": "#eeefff",
        "inverse-primary": "#0053db",
        "secondary": "#bec6e0",
        "on-secondary": "#283044",
        "secondary-container": "#3f465c",
        "on-secondary-container": "#adb4ce",
        "tertiary": "#ffb596",
        "on-tertiary": "#581e00",
        "tertiary-container": "#bc4800",
        "on-tertiary-container": "#ffede6",
        "primary-fixed": "#dbe1ff",
        "primary-fixed-dim": "#b4c5ff",
        "on-primary-fixed": "#00174b",
        "on-primary-fixed-variant": "#003ea8",
        "secondary-fixed": "#dae2fd",
        "secondary-fixed-dim": "#bec6e0",
        "background": "#11131b",
        "on-background": "#e1e2ed",
        "surface-variant": "#32343d"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "sm": "0.125rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "full": "9999px"
      },
      spacing: {
        "unit": "4px",
        "xs": "4px",
        "sm": "8px",
        "md": "16px",
        "lg": "24px",
        "xl": "40px",
        "section": "120px",
        "gutter": "24px",
        "margin": "32px"
      },
      fontFamily: {
        "display-xl": ["Sora", "sans-serif"],
        "headline-lg": ["Sora", "sans-serif"],
        "headline-md": ["Sora", "sans-serif"],
        "body-lg": ["Geist", "sans-serif"],
        "body-md": ["Geist", "sans-serif"],
        "label-mono": ["Geist", "monospace"],
        "button": ["Geist", "sans-serif"],
        "sans": ["Geist", "sans-serif"],
        "heading": ["Sora", "sans-serif"]
      },
      boxShadow: {
        "machined": "inset 0 1px 0 0 rgba(255, 255, 255, 0.12)",
        "electric": "0 0 20px rgba(37, 99, 235, 0.35)",
        "electric-lg": "0 0 35px rgba(37, 99, 235, 0.5)"
      }
    },
  },
  plugins: [],
}
