/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        brown: {
          main: "#A47764",
          dark: "#746563",
          dark2: "#543C35",
          1: "#f7f4f2",
          2: "#ede6e0",
          3: "#dcc9bd",
          4: "#c5a394",
          5: "#a47764",
          6: "#8f6854",
          7: "#7a5647",
          8: "#65463c",
          9: "#543c35",
          10: "#483530",
        },
        main: {
          bg: "#f6f4f3ff",
        },
        green: {
          accent: "#22C55E",
        },
        gray: {
          0: "#FFFFFF",
          1: "#f7f7f7ff",
          2: "#EDEDED",
          3: "#D5D5D5",
          4: "#A4A4A4",
          5: "#7B8694",
          6: "#49505A",
        },
        navy: "#111827",
        red: {
          DEFAULT: "#e1645b",
          dark: "#c74940ff",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
