import type { Config } from "tailwindcss";
import Typography from "@tailwindcss/typography";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    Typography,
  ],
} satisfies Config;
