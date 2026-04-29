// TODO Customize Image in a inline text

import { default as NextLink } from "next/link";
import { Image as HeroImage } from "@heroui/react";
import { tv } from "tailwind-variants";
import {
  levelVariants,
  themeCompoundVariants,
  themeVariants,
  typographySlots,
} from "@/config/variants";
import { createElement } from "react";
import type { Columns } from "@/sbComponentType";

type Tags =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "ul"
  | "ol"
  | "li"
  | "a"
  | "img";
export type Levels = "high" | "low" | undefined;
export type Themes = Columns["theme"];

interface TypographyComponents {
  theme?: Themes;
  level?: Levels;
}

const defaultTypography = { level: undefined };

export const Typography = ({
  level,
  theme,
}: TypographyComponents = defaultTypography) => {
  const tags: Tags[] = [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "ul",
    "ol",
    "li",
    "a",
    "img",
  ];
  const _classes = classes();
  return Object.fromEntries(
    tags.map((tag) => {
      const className = _classes[tag]({ level, theme });
      if (tag === "a") {
        const link = ({
          children,
          href,
        }: {
          children: string;
          href: string;
        }) => (
          <NextLink href={href} className={className}>
            {children}
          </NextLink>
        );
        return [tag, link];
      }
      if (tag === "img") {
        const img = ({ src, alt }: { src: string; alt: string }) => (
          <HeroImage src={src} classNames={{ img: className }} alt={alt} />
        );
        return [tag, img];
      }

      return [
        tag,
        ({ children }: { children: string }) =>
          createElement(tag, { className }, children),
      ];
    })
  );
};

const classes = tv({
  slots: typographySlots,
  variants: {
    level: levelVariants,
    theme: themeVariants,
  },
  compoundVariants: [...themeCompoundVariants],
});
