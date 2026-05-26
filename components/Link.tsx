import type { Link as LinkType } from "@/sbComponentType"
import { tv } from "tailwind-variants"
import Markdown from "markdown-to-jsx/react"
import { Icon, IconNames } from "@/components/Icon"
import { Link as HeroLink, Button as HeroButton } from "@heroui/react"

import {
  SbBlokData,
  storyblokEditable,
} from "@storyblok/react"

export interface LinkComponent {
  blok: LinkType & SbBlokData
}

export function Link({ blok }: LinkComponent) {
  const { label, href, size, theme, asButton } = blok
  const { button, link } = classes()

  const overrides = Typography({ size })

  if (!!asButton) {
    return (
      <HeroButton
        className={button({ theme })}
        as={HeroLink}
        href={href?.cached_url || href?.url}
        {...storyblokEditable(blok)}>
        <Markdown options={{ wrapper: null, overrides }}>{label}</Markdown>
      </HeroButton>
    )
  } else {
    return (
      <HeroLink
        className={link({ theme })}
        href={href?.cached_url || href?.url}
        {...storyblokEditable(blok)}>
        <Markdown options={{ wrapper: null, overrides }}>{label}</Markdown>
      </HeroLink>
    )
  }
}

const classes = tv({
  slots: {
    button: "bg-black text-white text-extrabold uppercase",
    link: "text-black gap-2"
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

interface TypographyComponent { size: LinkType["size"] }

function Typography({ size }: TypographyComponent) {
  const { img, icon, paragraph } = styles()
  return ({
    p: {
      component: ({ children }: { children: IconNames }) => (
        <p className={paragraph({ sizes: size })} >{children}</p>
      ),
    },
    img: {
      component: ({ src, alt }: { src: string, alt: string; }) => (
        <img src={src} alt={alt} className={img()} />
      )
    },
    code: {
      component: ({ children }: { children: IconNames }) => (
        <Icon name={children} classes={icon({ sizes: size })} />
      ),
    },
  })
}

const styles = tv({
  slots: {
    img: "",
    icon: "fill-white h-6 w-6",
    paragraph: "inline-flex items-center justify-center text-lg",
  },
  variants: {
    sizes: {
      small: { icon: "h-4 w-4", paragraph: "text-md" },
      medium: { icon: "h-8 w-8", paragraph: "text-xl" },
      large: { icon: "h-12 w-12", paragraph: "text-2xl" },
    }
  }
})