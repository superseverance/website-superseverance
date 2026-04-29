import type { Carousel } from "@/sbComponentType";

import {
  SbBlokData,
  storyblokEditable,
  StoryblokComponent,
} from "@storyblok/react";

import { tv } from "tailwind-variants";
import { Swiper, SwiperSlide, SwiperProps } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

export interface CarouselComponent {
  blok: Carousel & SbBlokData;
}

export function Carousel({ blok }: CarouselComponent) {
  const { fullHeight } = blok;
  const { section, slider, wrapper, slide } = classes();

  const options: SwiperProps = {
    modules: [Pagination, Navigation],
    pagination: { clickable: true },
    navigation: {
      enabled: true,
    },
    loop: true,
  };

  return (
    <section
      id={blok.id}
      className={section({ fullHeight })}
      {...storyblokEditable(blok)}
    >
      <Swiper className={slider()} wrapperClass={wrapper()} {...options}>
        {blok.body?.map((child) => (
          <SwiperSlide className={slide()} key={child._uid}>
            <StoryblokComponent
              blok={child}
              parent={blok.component}
              fullHeight
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

const classes = tv({
  slots: {
    section: "",
    slider: "min-h-[inherit]",
    wrapper: "min-h-[inherit]",
    slide: "min-h-[inherit]",
  },
  variants: {
    fullHeight: {
      true: {
        section: "min-h-screen",
      },
    },
  },
});
