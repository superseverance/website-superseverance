import type { Text as TextType } from "@/sbComponentType"
import { tv } from "tailwind-variants"
import Markdown from "markdown-to-jsx/react"
import { Typography } from "./Typography"

import {
  SbBlokData,
  storyblokEditable,
} from "@storyblok/react"

export interface TextComponent {
  blok: TextType & SbBlokData
}

const classes = tv({
  slots: {
    text: "",
  },
  variants: {},
})

export function Text({ blok }: TextComponent) {
  const { content } = blok
  const { text } = classes()
  const overrides = Typography()

  return (
    <div className={text()} {...storyblokEditable(blok)}>
      <Markdown options={{ wrapper: null, overrides }}>{content}</Markdown>
    </div>
  )
}