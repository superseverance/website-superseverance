import type { Cover as CoverType } from "@/sbComponentType"
import { tv } from "tailwind-variants"
import { getResizedImage } from "@/libs/sbImage";
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
  const { body, source, theme, align, height, effect, component } = blok
  const { section, container, columns, column, background, overlay, video, image } = classes()

  return (
    <section className={section({ height, theme })} {...storyblokEditable(blok)}>
      <div className={container()}>
        <div className={columns({ align })}>
          <div className={column({ theme })}>
            {body?.map((item) => <StoryblokComponent parent={component} blok={item} key={item._uid} />)}
          </div>
        </div>
      </div>
      {source?.filename && (
        <HeroImage
          src={getResizedImage({ filename: source.filename, focus: source.focus })}
          classNames={{ wrapper: background(), img: image({ align }) }}
          alt={source.alt || ""}
          radius="none"
          as={NextImage}
          loading="eager"
          fill />
      )}
      {!!effect &&
        <>
          <div className={overlay({ effects: blok.effect })} />
          <video
            className={video({ effects: blok.effect })}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src="/videos/grunge_2.mp4" type="video/mp4" />
          </video>
        </>
      }
    </section>
  )
}

const classes = tv({
  slots: {
    section: "min-h-[25vh] relative z-0 py-8",
    container: [variants.container, "z-2"].join(" "),
    columns: variants.columns,
    column: [variants.column, "w-full md:max-w-2/3 lg:max-w-1/2"].join(" "),
    background: "absolute -z-1 inset-0 max-w-full!",
    image: "w-full min-h-full object-cover object-center",
    overlay: "hidden absolute inset-0 -z-1 pointer-events-none",
    video: "hidden absolute inset-0 -z-1 w-full h-full object-cover pointer-events-none",
  },
  variants: {
    height: {
      full: { section: "min-h-screen py-24" },
      huge: { section: "min-h-[75vh] py-16" },
      large: { section: "min-h-[50vh] py-12" }
    },
    align: {
      top: { image: "object-top", columns: "items-end" },
      bottom: { image: "object-bottom", columns: "items-start" }
    },
    theme: {
      primary: { section: "bg-primary-100", column: "text-white" },
      "primary-dark": { section: "bg-primary-900", column: "text-white" },
      secondary: { section: "bg-secondary-100", column: "text-white" },
      "secondary-dark": { section: "bg-secondary-900", column: "text-white" },
      dark: { section: "bg-black", column: "text-white" },
    },
    effects: {
      grunge: {
        overlay: "block bg-gradient-to-t from-black from-0% to-transparent to-50% animate-gradient",
        video: "block mix-blend-screen opacity-60",
      }
    }
  }
})
