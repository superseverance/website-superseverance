import type { Footer as FooterType } from "@/sbComponentType"
import Markdown from "markdown-to-jsx/react"
import { tv } from "tailwind-variants"

import {
  SbBlokData,
  storyblokEditable,
  StoryblokComponent
} from "@storyblok/react"

export interface FooterComponent {
  blok: FooterType & SbBlokData
}

const classes = tv({
  slots: {},
  variants: {}
})

export function Footer({ blok }: FooterComponent) {
  const { logo, body, copyright } = blok
  // const { } = classes()
  return (
    <div className="" {...storyblokEditable(blok)}>
      <div className="">
        {logo && <div className="">{logo.filename}</div>}
        {body?.map((item) => <StoryblokComponent blok={item} key={item._uid} />)}
      </div>
      <div className="">
        <Markdown>{copyright}</Markdown>
      </div>
    </div>
  )
}