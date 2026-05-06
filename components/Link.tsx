import type { Link as LinkType } from "@/sbComponentType"
import { tv } from "tailwind-variants"
import { Link as HeroLink, Button as HeroButton } from "@heroui/react"

import {
  SbBlokData,
  storyblokEditable,
} from "@storyblok/react"

export interface LinkComponent {
  blok: LinkType & SbBlokData

}

const classes = tv({
  slots: {
    button: "bg-black text-white text-extrabold uppercase",
    link: "text-black"
  },
  variants: {
    theme: {
      primary: { button: "bg-primary-900 text-white", link: "bg-primary-600" },
      "primary-dark": { button: "bg-primary-100 text-white", link: "bg-primary-400" },
      secondary: { button: "bg-secondary-900 text-white", link: "bg-secondary-600" },
      "secondary-dark": { button: "bg-secondary-100 text-white", link: "bg-secondary-400" },
      dark: { button: "bg-white", link: "text-white" },
    }
  }
})

export function Link({ blok }: LinkComponent) {
  const { label, href, theme, asButton } = blok
  const { button, link } = classes()
  if (!!asButton) {
    return (
      <HeroButton
        className={button({ theme })}
        as={HeroLink}
        href={href?.cached_url || href?.url}
        {...storyblokEditable(blok)}>
        {label}
      </HeroButton>
    )
  } else {
    return (
      <HeroLink
        className={link({ theme })}
        href={href?.cached_url || href?.url}
        {...storyblokEditable(blok)}>
        {label}
      </HeroLink>
    )
  }
}