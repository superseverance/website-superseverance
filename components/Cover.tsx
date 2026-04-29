import type { Cover } from "@/sbComponentType";
import { Image as HeroImage } from "@heroui/react";
import { default as NextImage } from "next/image";
import getResized from "@/libs/sbImage";
import {
  SbBlokData,
  storyblokEditable,
  StoryblokComponent,
} from "@storyblok/react";

import { tv } from "tailwind-variants";
import {
  alignVariants,
  containerSlot,
  hasHeaderVariant,
  heightVariant,
  justifyVariants,
  marginCompoundVariants,
  marginVariants,
  sectionSlot,
  themeCompoundVariants,
  themeVariants,
  wrapperSlot,
} from "@/config/variants";

export interface CoverComponent {
  blok: Cover & SbBlokData;
  parent: string;
  fullHeight?: boolean;
  hasHeader: boolean;
}

export function Cover({ blok, parent, fullHeight, hasHeader }: CoverComponent) {
  const { theme, align, justify, blurred } = blok;
  let { height, margin } = blok;
  const { section, container, wrapper, background, img } = classes();

  const image = blok.image;

  if (parent === "carousel" && fullHeight) {
    height = true;
    margin = "screen";
  }

  return (
    <section
      id={blok.id}
      {...storyblokEditable(blok)}
      className={section({ margin, height, hasHeader, theme })}
    >
      <div className={container({ margin, justify, align, height })}>
        <div className={wrapper({ blurred })}>
          {blok.body?.map((child) => (
            <StoryblokComponent
              blok={child}
              key={child._uid}
              parent={blok.component}
              theme={theme}
            />
          ))}
        </div>
      </div>
      {image?.filename && (
        <HeroImage
          src={getResized({ filename: image.filename, focus: image.focus })}
          classNames={{ wrapper: background(), img: img() }}
          alt={image.alt || ""}
          radius="none"
          as={NextImage}
          loading="eager"
          fill
        />
      )}
    </section>
  );
}

const classes = tv({
  slots: {
    section: `${sectionSlot.base} ${sectionSlot.background}`,
    container: `${containerSlot.base} ${containerSlot.spaced} ${containerSlot.columns} items-end sm:items-center`,
    wrapper: `${wrapperSlot.column} w-full md:flex-none md:w-2/3 lg:w-1/2 space-y-3 z-10`,
    background: "absolute inset-0 -z-1 max-w-full!",
    img: "w-full min-h-full object-cover",
  },
  variants: {
    theme: themeVariants,
    hasHeader: hasHeaderVariant,
    margin: marginVariants,
    height: heightVariant,
    justify: justifyVariants,
    align: alignVariants,
    blurred: {
      true: {
        wrapper:
          "relative z-0 before:absolute before:-inset-24 before:-z-20 before:mask-[url(/mask.png)] before:mask-size-[100%100%] before:backdrop-blur-2xl",
      },
    },
  },
  compoundVariants: [...themeCompoundVariants, ...marginCompoundVariants],
});
