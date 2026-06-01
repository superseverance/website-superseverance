import type { Album as AlbumType } from "@/sbComponentType"
import Markdown from "markdown-to-jsx/react"
import { tv } from "tailwind-variants"

import {
  SbBlokData,
  storyblokEditable,
  StoryblokComponent
} from "@storyblok/react"

export interface AlbumComponent {
  blok: AlbumType & SbBlokData
}

const classes = tv({
  slots: {},
  variants: {}
})

export function Album({ blok }: AlbumComponent) {
  const { title, description, image, tracks, link } = blok
  // const { } = classes()
  return (
    <div className="" {...storyblokEditable(blok)}>
      {title && <h4 className="">{title}</h4>}
      {description && <p className="">{description}</p>}
    </div>
  )
}