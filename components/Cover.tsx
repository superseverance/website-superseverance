import type { Cover as CoverType } from "@/sbComponentType"
import { tv } from "tailwind-variants"
import getResized from "@/libs/sbImage";
import { Image as HeroImage } from "@heroui/react"
import { default as NextImage } from "next/image"
import { variants } from "@/config/variants";

import {
  SbBlokData,
  storyblokEditable,
  StoryblokComponent
} from "@storyblok/react"

export interface CoverComponent {
  blok: CoverType & SbBlokData
}

export function Cover({ blok }: CoverComponent) {
  const { body, source, theme, align, height, component } = blok
  console.log(height)
  const { section, container, column, background, image } = classes()
  return (
    <section className={section({ height, theme })} {...storyblokEditable(blok)}>
      <div className={container({ align })}>
        <div className={column({ theme })}>
          {body?.map((item) => <StoryblokComponent parent={component} blok={item} key={item._uid} />)}
        </div>
      </div>
      {source?.filename && (
        <HeroImage
          src={getResized({ filename: source.filename, focus: source.focus })}
          classNames={{ wrapper: background(), img: image({ align }) }}
          alt={source.alt || ""}
          radius="none"
          as={NextImage}
          loading="eager"
          fill />
      )}
    </section>
  )
}

const classes = tv({
  slots: {
    section: "min-h-[25vh] relative z-0 py-8",
    container: [variants.container, variants.columns, "z-2"].join(" "),
    column: "w-full md:max-w-2/3 lg:max-w-1/2",
    background: "absolute -z-1 inset-0 max-w-full!",
    image: "w-full min-h-full object-section object-center"
  },
  variants: {
    height: {
      full: { section: "min-h-screen py-24" },
      huge: { section: "min-h-[75vh] py-16" },
      large: { section: "min-h-[50vh] py-12" }
    },
    align: {
      top: { image: "object-top", container: "items-end" },
      bottom: { image: "object-bottom", container: "items-start" }
    },
    theme: {
      primary: { section: "bg-primary-100", column: "text-white" },
      "primary-dark": { section: "bg-primary-900", column: "text-white" },
      secondary: { section: "bg-secondary-100", column: "text-white" },
      "secondary-dark": { section: "bg-secondary-900", column: "text-white" },
      dark: { section: "bg-black", column: "text-white" },
    }
  }
})
