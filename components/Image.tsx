import type { Image } from "@/sbComponentType";
import { SbBlokData, storyblokEditable } from "@storyblok/react";
import { Image as HeroImage } from "@heroui/react";
import { default as NextImage } from "next/image";
import { tv } from "tailwind-variants";
import { widthVariants, wrapperSlot } from "@/config/variants";
import getResized from "@/libs/sbImage";

export interface ImageComponent {
  blok: Image & SbBlokData;
  parent?: string;
}

export function Image({ blok }: ImageComponent) {
  const { wrapper, img, color, circle, text } = classes();
  const { width, size, crop } = blok;
  if (!blok.asset?.filename && !blok.color) return null;

  if (!blok.asset?.filename)
    return (
      <div className={color()} {...storyblokEditable(blok)}>
        <div className={circle()} style={{ backgroundColor: blok.color }} />
        {blok.caption && <p className={text()}>{blok.caption}</p>}
      </div>
    );

  const { filename, alt, focus } = blok.asset;

  return (
    <HeroImage
      {...storyblokEditable(blok)}
      src={getResized({ filename, focus })}
      classNames={{ wrapper: wrapper({ width, size, crop }), img: img() }}
      style={{ width: "100%" }}
      as={NextImage}
      alt={alt || ""}
      fill
    />
  );
}

const classes = tv({
  slots: {
    wrapper: `${wrapperSlot.column}
      self-stretch min-h-24 md:min-h-32 lg:min-h-40 xl:min-h-48
      overflow-hidden aspect-square md:aspect-auto max-w-full!
    `,
    img: "h-full w-auto object-cover",
    color: "flex flex-col items-center gap-4 flex-none basis-24 text-center",
    circle:
      "w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full aspect-square",
    text: "text-sm",
  },
  variants: {
    width: {
      ...widthVariants,
      "1/1": {
        ...widthVariants["1/1"],
        wrapper: widthVariants["1/1"].wrapper + " sm:aspect-5/3",
      },
      "2/3": {
        ...widthVariants["2/3"],
        wrapper: widthVariants["2/3"].wrapper + " aspect-5/3 md:aspect-3/2",
      },
      "1/2": {
        ...widthVariants["1/2"],
        wrapper: widthVariants["1/2"].wrapper + " aspect-5/3 md:aspect-square",
      },
      "1/3": {
        ...widthVariants["1/3"],
        wrapper:
          widthVariants["1/3"].wrapper +
          " aspect-5/3 md:aspect-square lg:aspect-2/3",
      },
      "1/4": {
        ...widthVariants["1/4"],
        wrapper:
          widthVariants["1/4"].wrapper +
          " aspect-5/3 md:aspect-square lg:aspect-1/4",
      },
    },
    size: {
      small: {
        wrapper: "flex-1 max-h-12 md:max-h-20 lg:max-h-28",
      },
      medium: {
        wrapper: "flex-1 max-h-36 md:max-h-42 lg:max-h-50",
      },
      large: {
        wrapper: "flex-1 max-h-48 md:max-h-56 lg:max-h-64",
      },
    },
    crop: {
      false: {
        wrapper: "h-auto! self-auto",
      },
    },
  },
});
