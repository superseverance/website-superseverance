import type { Gallery } from "@/sbComponentType";
import { SbBlokData, storyblokEditable } from "@storyblok/react";
import { tv } from "tailwind-variants";
import {
  Modal as HeroModal,
  ModalContent as HeroModalContent,
  Image as HeroImage,
} from "@heroui/react";
import { Icon } from "./Icon";
import { wrapperSlot, widthVariants } from "@/config/variants";
import { Fragment, useState } from "react";
import { Swiper, SwiperSlide, SwiperProps } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

export interface GalleryComponent {
  blok: Gallery & SbBlokData;
}

export function Gallery({ blok }: GalleryComponent) {
  const { width, assets } = blok;

  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<number>(0);

  const { wrapper, thumb } = classes();

  const handleOpen = (index: number) => {
    setOpen(true);
    setCurrent(index);
  };

  const options: SwiperProps = {
    modules: [Pagination, Navigation],
    pagination: { clickable: true },
    navigation: {
      enabled: true,
    },
    loop: true,
    initialSlide: current,
  };

  const Carousel = () => (
    <Swiper {...options}>
      {assets?.map((image, index) => (
        <SwiperSlide key={index}>
          <HeroImage
            src={image.filename || ""}
            alt={image.alt || ""}
            radius="none"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );

  return (
    <Fragment>
      <div className={wrapper({ width })} {...storyblokEditable(blok)}>
        {assets?.map((child, index) => (
          <HeroImage
            key={index}
            radius="none"
            classNames={{ wrapper: thumb() }}
            src={child.filename || ""}
            onClick={() => handleOpen(index)}
          />
        ))}
      </div>
      {open && (
        <HeroModal
          isOpen={open}
          classNames={{ base: "bg-neutral-950/75" }}
          onOpenChange={() => setOpen(!open)}
          hideCloseButton
          size="full"
        >
          <HeroModalContent className="justify-center">
            <div>
              <Carousel />
            </div>
            <button
              className="absolute top-4 right-4 z-10"
              onClick={() => setOpen(false)}
            >
              <Icon name="close" classes="fill-white" />
            </button>
          </HeroModalContent>
        </HeroModal>
      )}
    </Fragment>
  );
}

const classes = tv({
  slots: {
    wrapper: `${wrapperSlot.column} flex flex-wrap`,
    thumb: "w-1/3 md:w-1/4 lg:w-1/5 h-full cursor-pointer ",
  },
  variants: {
    width: widthVariants,
  },
});
