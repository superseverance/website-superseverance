import { Roboto, Roboto_Slab } from "next/font/google";

export const fontSans = Roboto({
  variable: "--font-sans",
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const fontSerif = Roboto_Slab({
  variable: "--font-serif",
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});
