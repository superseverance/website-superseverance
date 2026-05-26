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
  base: "flex-none w-full md:flex-1 min-h-full self-stretch",
  variants: {
    width: {
      full: "flex-none!",
      half: "flex-none! md:w-1/2",
      quarter: "flex-none! md:w-1/2 lg:w-1/4",
    }
  }
})

export function Column({ blok, parent }: ColumnComponent) {
  const { body, width, component } = blok
  return (
    <div className={classes({ width })} {...storyblokEditable(blok)}>
      {body?.map((item) => <StoryblokComponent parent={component} blok={item} key={item._uid} />)}
    </div>
  )
}