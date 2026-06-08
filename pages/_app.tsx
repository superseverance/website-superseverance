import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { HeroUIProvider } from "@heroui/react";
import { fontSans, fontSerif } from "@/config/font";
import { apiPlugin, storyblokInit } from "@storyblok/react";
import { components } from "@/config/storyblok";
import { useIntroSeen } from "@/libs/useIntroSeen";
import Intro from "@/components/Intro";

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN || "",
  use: [apiPlugin],
  apiOptions: { region: "eu" },
  components,
});

export default function App({ Component, pageProps }: AppProps) {
  const { introSeen, markIntroSeen } = useIntroSeen();
  if (introSeen === null) return null;

  return (
    <HeroUIProvider>
      {!introSeen && <Intro onComplete={markIntroSeen} />}
      <Component {...pageProps} />
    </HeroUIProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  serif: fontSerif.style.fontFamily,
};
