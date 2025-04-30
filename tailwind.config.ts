// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      extend: {
        keyframes: {
          "fade-in-slide-up": {
            "0%": { opacity: "0", transform: "translateY(10px)" },
            "100%": { opacity: "1", transform: "translateY(0)" },
          },
        },
        animation: {
          "fade-in-slide-up": "fade-in-slide-up 0.3s ease-out forwards",
        },
      },
      
      keyframes: {
        "fade-in-slide-up": {
          "0%": { opacity: "0", transform: "translateY(200px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-slide-up": "fade-in-slide-up 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
