import type { Image as ImageType } from "@/sbComponentType"
import { tv } from "tailwind-variants"

import {
  SbBlokData,
  storyblokEditable,
} from "@storyblok/react"

export interface ImageComponent {
  blok: ImageType & SbBlokData
}

const classes = tv({
  slots: {},
  variants: {},
})

export function Image({ blok }: ImageComponent) {
  const { source } = blok
  // const { } = classes()

  return (
    <div {...storyblokEditable(blok)}>
      {source && (
        <img
          src={source.filename || ""}
          alt={source.alt || ""}
        />
      )}
    </div>
  )
}