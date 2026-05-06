import type { Column as ColumnType } from "@/sbComponentType"
import { tv } from "tailwind-variants"

import {
  SbBlokData,
  storyblokEditable,
  StoryblokComponent
} from "@storyblok/react"

export interface ColumnComponent {
  blok: ColumnType & SbBlokData
  parent: string
}

const classes = tv({
  base: "",
  variants: {}
})

export function Column({ blok, parent }: ColumnComponent) {
  const { body, component } = blok
  return (
    <div className={classes()} {...storyblokEditable(blok)}>
      {body?.map((item) => <StoryblokComponent parent={component} blok={item} key={item._uid} />)}
    </div>
  )
}