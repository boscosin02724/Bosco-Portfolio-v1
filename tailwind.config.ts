import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#080808",
        paper: "#f7f5f0",
        muted: "#8d8d86",
        line: "rgba(8, 8, 8, 0.12)",
        accent: "#ff6a21",
      },
      fontFamily: {
        sans: [
          "Neue Haas Unica Pro",
          "Arial",
          "sans-serif",
        ],
        display: [
          "Neue Haas Unica Pro",
          "Arial",
          "sans-serif",
        ],
      },
      maxWidth: {
        studio: "1700px",
      },
      transitionTimingFunction: {
        studio: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
