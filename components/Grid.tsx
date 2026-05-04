import type { Grid as GridType } from "@/sbComponentType"
import { useLists, ListsProps, ListKey } from "./Lists"
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
  const key = story as ListKey | undefined

  // const { } = classes()
  const lists: ListsProps = useLists()
  const items = key ? lists[key] : undefined

  console.log(items)

  return (
    <div className="" {...storyblokEditable(blok)}>
      <div className="">
        <Markdown>
          {heading}
        </Markdown>
      </div>
      <div className="">
        {items?.map(({ content }) => <div className="" key={content._uid}>{content.title}</div>)}
      </div>
    </div>
  )
}



