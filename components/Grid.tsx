import type { Grid as GridType } from "@/sbComponentType"
import Markdown from "markdown-to-jsx/react"
import { tv } from "tailwind-variants"

import {
  SbBlokData,
  storyblokEditable,
} from "@storyblok/react"

export interface GridComponent {
  blok: GridType & SbBlokData
}

const classes = tv({
  slots: {},
  variants: {}
})

export function Grid({ blok }: GridComponent) {
  const { heading, story } = blok
  const { } = classes()
  return (
    <div className="" {...storyblokEditable(blok)}>
      <div className="">
        <Markdown>
          {heading}
        </Markdown>
      </div>
      <div className="">
        {story}
      </div>
    </div>
  )
}



