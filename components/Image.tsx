import type { Image as ImageType } from "@/sbComponentType"
import { Image as HeroImage } from "@heroui/react"
import { default as NextImage } from "next/image";
import { tv } from "tailwind-variants"
import getResized from "@/libs/sbImage";

import {
  SbBlokData,
  storyblokEditable,
} from "@storyblok/react"

export interface ImageComponent {
  blok: ImageType & SbBlokData
  parent: string
}

const classes = tv({
  slots: {
    wrapper: "w-full h-full max-w-full!",
    image: "h-full min-h-auto w-auto object-cover"
  },
  variants: {},
})

export function Image({ blok, parent }: ImageComponent) {
  if (!blok?.source) return null
  const { filename, focus, alt } = blok.source
  const { wrapper, image } = classes()

  return (
    <HeroImage
      {...storyblokEditable(blok)}
      src={getResized({ filename, focus })}
      classNames={{ wrapper: wrapper(), img: image() }}
      style={{ width: "100%" }}
      as={NextImage}
      alt={alt || ""}
      fill
    />
  )
}