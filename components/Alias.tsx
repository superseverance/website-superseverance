import type { Alias as AliasType } from "@/sbComponentType"
import type { SbBlokData } from "@storyblok/react"
import { storyblokEditable } from "@storyblok/react"
import { tv } from "tailwind-variants"
import Markdown from "markdown-to-jsx"

export interface AliasProps {
  blok: AliasType & SbBlokData
}

export function Alias({ blok }: AliasProps) {
  const { heading, link, theme, story } = blok

  const { base } = classes({
    theme
  })

  return (
    <div {...storyblokEditable(blok)} className={base()}>
      {heading && <Markdown>{heading}</Markdown>}
      {story && <span>{story}</span>}
      {link && <a href={link.url}>{link.cached_url}</a>}
    </div>
  )
}

const classes = tv({
  slots: {
    base: "p-2"
  },
  variants: {
    theme: {
      primary: "text-blue-600",
      secondary: "text-purple-600",
      "primary-dark": "text-blue-300",
      "secondary-dark": "text-purple-300",
      dark: "text-white"
    }
  }
})