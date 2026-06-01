import { Outfit, Metal_Mania } from "next/font/google";

export const fontSans = Outfit({
  variable: "--font-sans",
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  subsets: ["latin"],
});

export const fontSerif = Metal_Mania({
  variable: "--font-serif",
  weight: ["400"],
  subsets: ["latin"],
});
