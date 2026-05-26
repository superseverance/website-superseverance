import type { Gallery as GalleryType } from "@/sbComponentType"
import {
  SbBlokData,
  storyblokEditable,
} from "@storyblok/react"
import { getResizedImage, getAspectRatio, getSizesImage } from "@/libs/sbImage";
import { tv } from "tailwind-variants"
import { Image as HeroImage } from "@heroui/react"
import { default as NextImage } from "next/image";
import { Swiper, SwiperSlide, SwiperProps } from "swiper/react";
import { Pagination } from "swiper/modules";

export interface GalleryComponent {
  blok: GalleryType & SbBlokData
  parent: string
}

const classes = tv({
  slots: {
    gallery: "w-full max-w-full!",        // ← no h-full
    slide: "w-full",                       // ← no h-full
    wrapper: "w-full max-w-full!",         // ← no h-full
    image: "w-full h-full object-cover",
  },
  variants: {
    height: {
      full: { gallery: "min-h-screen!" },
      huge: { gallery: "min-h-[75vh]!" },
      large: { gallery: "min-h-[50vh]!" }
    }
  }
})

const options: SwiperProps = {
  modules: [Pagination],
  pagination: { clickable: true },
  loop: true,
};

export function Gallery({ blok, parent }: GalleryComponent) {
  const { sources, height } = blok
  const { gallery, slide, wrapper, image } = classes()
  const aspectRatio = getAspectRatio({ filename: sources?.[0]?.filename || null })

  return (
    <Swiper
      style={{ aspectRatio: aspectRatio ?? undefined }}
      className={gallery({ height })}
      wrapperClass="w-full"
      {...options}
      {...storyblokEditable(blok)}
    >
      {sources?.map(({ id, filename, alt, focus }) =>
        <SwiperSlide className={slide()} key={id}>
          <HeroImage
            {...storyblokEditable(blok)}
            src={getResizedImage({ filename, focus })}
            classNames={{ wrapper: wrapper(), img: image() }}
            style={{ width: "100%" }}
            as={NextImage}
            alt={alt || ""}
            radius="none"
            fill
          />
        </SwiperSlide>
      )}
    </Swiper >
  )
}