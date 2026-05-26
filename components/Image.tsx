import type { Image as ImageType } from "@/sbComponentType"
import { Image as HeroImage } from "@heroui/react"
import { default as NextImage } from "next/image";
import { tv } from "tailwind-variants"
import { getResizedImage, getSizesImage } from "@/libs/sbImage";

import {
  SbBlokData,
  storyblokEditable,
} from "@storyblok/react"

export interface ImageComponent {
  blok: ImageType & SbBlokData
  parent: string
}

export function Image({ blok, parent }: ImageComponent) {
  if (!blok?.source) return null
  const { filename, focus, alt } = blok.source
  if (!filename) return <div className="text-danger font-bold text-xl">No image</div>

  const { outer, wrapper, image } = classes()
  const originalSizes = getSizesImage({ filename })

  const sizeMap: Record<NonNullable<ImageType["size"]>, { w: number; h: number } | null> = {
    small: { w: 400, h: originalSizes ? Math.round(400 * originalSizes.h / originalSizes.w) : 400 },
    medium: { w: 800, h: originalSizes ? Math.round(800 * originalSizes.h / originalSizes.w) : 600 },
    large: { w: 1200, h: originalSizes ? Math.round(1200 * originalSizes.h / originalSizes.w) : 900 },
    fill: null,
  }

  const computedSize = sizeMap[blok.size ?? "fill"]

  return (
    <div className={outer({ effects: blok.effect })}>
      <HeroImage
        {...storyblokEditable(blok)}
        src={getResizedImage({ filename, focus })}
        classNames={{ wrapper: wrapper(), img: image({ sized: !!computedSize }) }}
        style={{ width: "100%" }}
        as={NextImage}
        alt={alt || ""}
        width={computedSize ? computedSize.w : undefined}
        height={computedSize ? computedSize.h : undefined}
        fill={!computedSize}
        radius="none"
      />
    </div>
  )
}

const classes = tv({
  slots: {
    outer: "relative w-full h-full",
    wrapper: "w-full h-full max-w-full!",
    image: "h-full min-h-auto w-auto object-cover",
  },
  variants: {
    effects: {
      grunge: {
        outer: "[mask-image:url('/images/effetto.png')] [mask-size:cover] [mask-position:center]",
      }
    },
    sized: {
      true: {
        image: "object-contain"
      }
    }
  },
})