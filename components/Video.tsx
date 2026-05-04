import type { Video as VideoType } from "@/sbComponentType"
import { tv } from "tailwind-variants"

import {
  SbBlokData,
  storyblokEditable,
} from "@storyblok/react"

export interface VideoComponent {
  blok: VideoType & SbBlokData
}

const classes = tv({
  slots: {},
  variants: {}
})

export function Video({ blok }: VideoComponent) {
  const { youtube } = blok
  const { } = classes()
  return (
    <div className="" {...storyblokEditable(blok)}>{youtube}</div>
  )
}



