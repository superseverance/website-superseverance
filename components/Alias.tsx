import type { Alias as AliasType } from "@/sbComponentType"
import type { SbBlokData } from "@storyblok/react"
import { storyblokEditable } from "@storyblok/react"
import { tv } from "tailwind-variants"
import Markdown from "markdown-to-jsx"

export interface AliasProps {
  blok: AliasType & SbBlokData
}

const classes = tv({
  slots: {},
  variants: {}
})

export function Alias({ blok }: AliasProps) {
  const { heading, link, theme, story } = blok

  // const { } = classes()

  return (
    <div {...storyblokEditable(blok)} className="">
      {heading && <Markdown>{heading}</Markdown>}
      {story && <span>{story}</span>}
      {link && <a href={link.url}>{link.cached_url}</a>}
    </div>
  )
}