import type { Link } from "@/sbComponentType";
import { useRouter } from "next/router";
import { SbBlokData, storyblokEditable } from "@storyblok/react";

import { Button as HeroButton, Link as HeroLink } from "@heroui/react";
import { tv } from "tailwind-variants";

export interface LinkComponent {
  blok: Link & SbBlokData;
  parent?: string;
  theme?: "primary" | "primary-dark" | "secondary" | "secondary-dark" | "dark";
}

export function Link({ blok, parent, theme }: LinkComponent) {
  const { button, link } = classes();

  let url = blok.href?.url || `/${blok.href?.cached_url}`;

  const router = useRouter();
  if (blok.href?.anchor) {
    const anchor = blok.href?.anchor?.replaceAll(" ", "-");
    url = url === router.asPath + "/" ? `#${anchor}` : `${url}#${anchor}`;
  }

  const label = blok.label || "Collegamento";

  return blok.button ? (
    <HeroButton
      href={url}
      as={HeroLink}
      variant={parent === "header" ? "bordered" : "solid"}
      className={button({
        slim: parent === "header",
        theme: theme || "default",
      })}
      {...storyblokEditable(blok)}
    >
      {label}
    </HeroButton>
  ) : (
    <HeroLink href={url} className={link()} {...storyblokEditable(blok)}>
      {label}
    </HeroLink>
  );
}

const classes = tv({
  slots: {
    button: "text-medium",
    link: "text-inherit",
  },
  variants: {
    theme: {
      default: {
        button: "bg-primary-550 text-primary-50",
        link: "text-primary-550",
      },
      primary: {
        button: "bg-primary-650 text-primary-50",
        link: "text-primary-650",
      },
      "primary-dark": {
        button: "bg-primary-250 text-primary-850",
        link: "text-primary-250",
      },
      secondary: {
        button: "bg-secondary-650 text-secondary-50",
        link: "text-secondary-650",
      },
      "secondary-dark": {
        button: "bg-secondary-250 text-secondary-850",
        link: "text-secondary-250",
      },
      dark: {
        button: "bg-primary-200 text-primary-800",
        link: "text-primary-200",
      },
    },
    slim: {
      true: {
        button:
          "px-3.5 h-9 border-1.5 bg-transparent border-primary-500 text-primary-500",
      },
    },
  },
});
