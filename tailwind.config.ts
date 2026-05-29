import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Brand emerald (logo color) — kept on the `ink` token so existing class names just work.
        ink: {
          DEFAULT: "#0C3D32",
          50: "#F0F7F4",
          100: "#DCEDE5",
          200: "#A8D2BF",
          300: "#6FB294",
          400: "#3F8E6F",
          500: "#226F55",
          600: "#155843",
          700: "#114E40",
          800: "#0C3D32",
          900: "#082A23"
        },
        ivory: {
          DEFAULT: "#FAF8F4",
          50: "#FFFDF8",
          100: "#FAF8F4",
          200: "#F2EBDB",
          300: "#E5DBC0"
        },
        gold: {
          DEFAULT: "#C99A2A",
          50: "#F8EFD0",
          100: "#EFDDA0",
          200: "#E2C16D",
          300: "#D2A648",
          400: "#C99A2A",
          500: "#A98223",
          600: "#8A6A1B",
          700: "#5E4912"
        },
        accent: {
          rose: "#B45369",
          sage: "#647E68"
        }
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      letterSpacing: {
        tightish: "-0.015em",
        wider2: "0.18em"
      },
      boxShadow: {
        luxe: "0 30px 80px -20px rgba(8, 42, 35, 0.35)",
        ring: "inset 0 0 0 1px rgba(201, 154, 42, 0.35)"
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3CfeColorMatrix values='0 0 0 0 0.04 0 0 0 0 0.24 0 0 0 0 0.20 0 0 0 0.18 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        "radial-gold": "radial-gradient(ellipse at top, rgba(201,154,42,0.18), transparent 60%)",
        "hero": "linear-gradient(180deg, #082A23 0%, #0C3D32 60%, #114E40 100%)"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        "shimmer": "shimmer 3s linear infinite",
        "float": "float 6s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
