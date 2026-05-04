import type { Gallery as GalleryType } from "@/sbComponentType"
import { tv } from "tailwind-variants"

import {
  SbBlokData,
  storyblokEditable,
} from "@storyblok/react"

export interface GalleryComponent {
  blok: GalleryType & SbBlokData
}

const classes = tv({
  slots: {},
  variants: {}
})

export function Gallery({ blok }: GalleryComponent) {
  const { sources } = blok
  // const { } = classes()
  return (
    <div className="" {...storyblokEditable(blok)}>
      {sources?.map((item) => <div className="" key={item.id}>{item.filename}</div>)}
    </div>
  )
}