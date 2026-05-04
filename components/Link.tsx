import type { Link as LinkType } from "@/sbComponentType"
import { tv } from "tailwind-variants"

import {
  SbBlokData,
  storyblokEditable,
} from "@storyblok/react"

export interface LinkComponent {
  blok: LinkType & SbBlokData
}

const classes = tv({
  slots: {},
  variants: {}
})

export function Link({ blok }: LinkComponent) {
  const { label, href } = blok
  const { } = classes()
  return (
    <div className="" {...storyblokEditable(blok)}>
      {label} - {href?.cached_url || href?.url}
    </div>
  )
}