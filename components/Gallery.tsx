import type { Gallery as GalleryType } from "@/sbComponentType"
import {
  SbBlokData,
  storyblokEditable,
} from "@storyblok/react"
import getResized from "@/libs/sbImage";
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
    gallery: "min-h-inherit",
    slide: "min-h-inherit",
    wrapper: "w-full min-h-inherit max-w-full!",
    image: "h-full min-h-auto w-auto object-cover",
  },
  variants: {}
})

const options: SwiperProps = {
  modules: [Pagination],
  pagination: { clickable: true },
  loop: true,
};

export function Gallery({ blok, parent }: GalleryComponent) {
  const { sources } = blok
  const { gallery, slide, wrapper, image } = classes()
  return (
    <Swiper className={gallery()} wrapperClass="min-h-inherit" {...options} {...storyblokEditable(blok)}>
      {sources?.map(({ id, filename, alt, focus }) =>
        <SwiperSlide className={slide()} key={id}>
          <HeroImage
            {...storyblokEditable(blok)}
            src={getResized({ filename, focus })}
            classNames={{ wrapper: wrapper(), img: image() }}
            style={{ width: "100%" }}
            as={NextImage}
            alt={alt || ""}
            fill
          />
        </SwiperSlide>
      )}
    </Swiper >
  )
}