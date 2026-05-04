import type { Section as SectionType } from "@/sbComponentType"
import Markdown from "markdown-to-jsx/react"
import { tv } from "tailwind-variants"

import {
  SbBlokData,
  storyblokEditable,
  StoryblokComponent
} from "@storyblok/react"

export interface SectionComponent {
  blok: SectionType & SbBlokData
}

const classes = tv({
  slots: {},
  variants: {}
})

export function Section({ blok }: SectionComponent) {
  const { heading, body, theme, justify } = blok
  const { } = classes()
  return (
    <div className="" {...storyblokEditable(blok)}>
      <div className="">
        <Markdown>
          {heading}
        </Markdown>
      </div>
      <div className="">
        {body?.map((item) => <StoryblokComponent blok={item} key={item._uid} />)}
      </div>
    </div>
  )
}