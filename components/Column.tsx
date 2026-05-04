import type { Column as ColumnType } from "@/sbComponentType"
import { tv } from "tailwind-variants"

import {
  SbBlokData,
  storyblokEditable,
  StoryblokComponent
} from "@storyblok/react"

export interface ColumnComponent {
  blok: ColumnType & SbBlokData
}

const classes = tv({
  slots: {},
  variants: {}
})

export function Column({ blok }: ColumnComponent) {
  const { body } = blok
  // const { } = classes()
  return (
    <div className="" {...storyblokEditable(blok)}>
      {body?.map((item) => <StoryblokComponent blok={item} key={item._uid} />)}
    </div>
  )
}