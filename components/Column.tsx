import type { Column } from "@/sbComponentType";
import {
  SbBlokData,
  storyblokEditable,
  StoryblokComponent,
} from "@storyblok/react";
import { Card } from "@/components/Card";
import { Accordion } from "@/components/Accordion";
import { Menu } from "@/components/Menu";
import { tv } from "tailwind-variants";
import { widthVariants, wrapperSlot } from "@/config/variants";
import { Themes } from "./Typography";

const wrappers = {
  card: Card,
  accordion: Accordion,
  menu: Menu,
};

export interface ColumnComponent {
  blok: Column & SbBlokData;
  theme?: Themes;
  parent?: string;
}

export function Column({ blok, theme, parent }: ColumnComponent) {
  if (blok.mode && wrappers[blok.mode]) {
    const ColumnMode = wrappers[blok.mode];
    return <ColumnMode blok={blok} />;
  }

  const { width } = blok;
  const { wrapper } = classes();

  return (
    <div
      className={wrapper({ width, isColumn: parent === "columns" })}
      {...storyblokEditable(blok)}
    >
      {blok.body?.map((child) => (
        <StoryblokComponent blok={child} theme={theme} key={child._uid} />
      ))}
    </div>
  );
}

const classes = tv({
  slots: {
    wrapper: "blok space-y-4 flex-none basis-xs",
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
