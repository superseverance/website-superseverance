import type { Header as HeaderType } from "@/sbComponentType"
import Markdown from "markdown-to-jsx/react"
import { tv } from "tailwind-variants"

import {
  SbBlokData,
  storyblokEditable,
  StoryblokComponent
} from "@storyblok/react"

export interface HeaderComponent {
  blok: HeaderType & SbBlokData
}

const classes = tv({
  slots: {},
  variants: {}
})

export function Header({ blok }: HeaderComponent) {
  const { logo, menu } = blok
  const { } = classes()
  return (
    <div className="" {...storyblokEditable(blok)}>
      <div className="">
        {logo && <div className="">{logo.filename}</div>}
        {menu?.map((item) => <StoryblokComponent blok={item} key={item._uid} />)}
      </div>
    </div>
  )
}