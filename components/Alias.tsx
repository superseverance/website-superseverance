import { ListsProps } from "@/pages";
import type { Alias } from "@/sbComponentType";
import { ISbStoryData, SbBlokData, storyblokEditable } from "@storyblok/react";
import Link from "next/link";
import { default as NextImage } from "next/image";
import {
  Card as HeroCard,
  CardHeader as HeroCardHeader,
  Image as HeroImage,
} from "@heroui/react";
import { tv } from "tailwind-variants";
import { widthVariants, wrapperSlot } from "@/config/variants";
import getResized from "@/libs/sbImage";
import { StoryblokAsset } from "@/.storyblok/types/storyblok";

interface AliasComponent {
  blok: Alias & SbBlokData;
  lists: ListsProps;
  parent?: string;
}

function resolveAlias(blok: Alias, lists: ListsProps) {
  if (blok.story && typeof blok.story !== "string") {
    return {
      ...blok.story.content,
      link: blok.story.full_slug,
    };
  }

  if (blok.list && lists[blok.list]?.length) {
    const story = (lists[blok.list] as ISbStoryData[])?.[0];
    return {
      ...story.content,
      link: story.full_slug,
    };
  }
  if (blok.href) {
    return {
      title: blok.title,
      description: blok.description,
      image: blok.image as StoryblokAsset,
      link: blok.href?.url as string,
    };
  }
  return null;
}

export function Alias({ blok, lists, parent }: AliasComponent) {
  const { wrapper } = classes();
  const alias = resolveAlias(blok, lists);
  const { width } = blok;

  if (!alias) return null;

  return (
    <div
      className={wrapper({ width, isColumn: parent === "columns" })}
      {...storyblokEditable(blok)}
    >
      <Banner
        title={alias.title}
        description={alias.description}
        image={alias.image}
        link={alias.link}
      />
    </div>
  );
}

export interface BannerComponent {
  title?: string;
  description?: string;
  image?: StoryblokAsset;
  link: string;
}

export const Banner = ({
  title,
  description,
  image,
  link,
}: BannerComponent) => {
  const { card, anchor, header, heading, content } = classes();
  return (
    <HeroCard className={card()}>
      <Link href={link} className="group block h-full">
        <div className={anchor()}>
          {(title || description) && (
            <HeroCardHeader className={header()}>
              {title && <h4 className={heading()}>{title}</h4>}
              {description && <p className={content()}>{description}</p>}
            </HeroCardHeader>
          )}

          {image?.filename && (
            <HeroImage
              removeWrapper
              className="z-0 w-full h-full object-cover max-w-full!"
              src={getResized({
                filename: image.filename,
                focus: image.focus,
              })}
              alt={image.alt || ""}
              loading="lazy"
              as={NextImage}
              fill
            />
          )}
        </div>
      </Link>
    </HeroCard>
  );
};

// TODO review classes
const classes = tv({
  slots: {
    wrapper: `${wrapperSlot.base}`,
    card: "bg-neutral-300 h-full col-span-8 md:col-span-6 xl:col-span-4",
    anchor: `
      relative h-full min-h-64 overflow-hidden z-0
      hover:[&_h4]:underline-offset-3
      hover:[&_h4]:decoration-background/75

      before:absolute before:inset-0 before:w-full before:h-full
      before:min-h-64 before:min-w-80 before:z-10
      before:bg-linear-to-tr before:from-neutral-900/70 before:to-neutral-900/0

      before:opacity-100 lg:before:opacity-0
      group-hover:before:opacity-100
      before:transition-opacity before:duration-300 before:ease-in-out
    `,
    header: `
      text-background absolute z-20
      inset-1 md:inset-2 lg:inset-3
      flex flex-col justify-end items-start w-auto
      space-y-2
    `,
    heading: `
      font-black text-xl/5 lg:text-3xl/7
      decoration-2 decoration-background/0
      transition-all duration-300 ease-in-out
      underline underline-offset-6
    `,
    content: "text-xs/4 lg:text-sm/5 line-clamp-2 text-background-200",
  },
  variants: {
    width: widthVariants,
    isColumn: {
      true: {
        wrapper: wrapperSlot.column,
      },
    },
  },
});
