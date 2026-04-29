import { ListsProps } from "@/pages";
import type { Columns } from "@/sbComponentType";
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
  marginVariants,
  sectionSlot,
  themeCompoundVariants,
  themeVariants,
} from "@/config/variants";

export interface ColumnsComponent {
  blok: Columns & SbBlokData;
  lists: ListsProps;
  hasHeader: boolean;
  parent: string;
}

export function Columns({ blok, lists, hasHeader }: ColumnsComponent) {
  const { theme, margin, height, align } = blok;
  const { section, container } = classes();

  return (
    <section
      id={blok?.id}
      className={section({ theme, hasHeader, height })}
      {...storyblokEditable(blok)}
    >
      <div className={container({ margin, align })}>
        {blok.body?.map((child) => (
          <StoryblokComponent
            blok={child}
            key={child._uid}
            lists={lists}
            parent={blok.component}
            theme={theme}
          />
        ))}
      </div>
    </section>
  );
}

const classes = tv({
  slots: {
    section: `${sectionSlot.base}`,
    container: `${containerSlot.base} ${containerSlot.columns}`,
  },
  variants: {
    align: alignVariants,
    height: heightVariant,
    margin: marginVariants,
    theme: themeVariants,
    hasHeader: hasHeaderVariant,
  },
  compoundVariants: [...themeCompoundVariants],
});
