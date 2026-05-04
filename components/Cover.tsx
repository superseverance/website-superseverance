import type { Cover as CoverType } from "@/sbComponentType"
import { tv } from "tailwind-variants"

import {
  SbBlokData,
  storyblokEditable,
  StoryblokComponent
} from "@storyblok/react"

export interface CoverComponent {
  blok: CoverType & SbBlokData
}

const classes = tv({
  slots: {},
  variants: {}
})

export function Cover({ blok }: CoverComponent) {
  const { body, background, theme, align, height } = blok
  const { } = classes()
  return (
    <div className="" {...storyblokEditable(blok)}>
      {body?.map((item) => <StoryblokComponent blok={item} key={item._uid} />)}
      {background && <div className="background" />}
    </div>
  )
}