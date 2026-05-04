import type { Cover as CoverType } from "@/sbComponentType"
import { tv } from "tailwind-variants"
import getResized from "@/libs/sbImage";
import { Image as HeroImage } from "@heroui/react"
import { default as NextImage } from "next/image"

import {
  SbBlokData,
  storyblokEditable,
  StoryblokComponent
} from "@storyblok/react"

export interface CoverComponent {
  blok: CoverType & SbBlokData
}

const classes = tv({
  slots: {
    cover: "",
    container: "",
    background: "",
    image: ""
  },
  variants: {}
})

export function Cover({ blok }: CoverComponent) {
  const { body, source, theme, align, height } = blok
  const { cover, container, background, image } = classes()
  return (
    <div className={cover()} {...storyblokEditable(blok)}>
      <div className={container()}>
        {body?.map((item) => <StoryblokComponent blok={item} key={item._uid} />)}
        {source?.filename && (
          <HeroImage
            src={getResized({ filename: source.filename, focus: source.focus })}
            classNames={{ wrapper: background(), img: image() }}
            alt={source.alt || ""}
            radius="none"
            as={NextImage}
            loading="eager"
            fill />
        )}
      </div>
    </div>
  )
}