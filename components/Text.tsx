import type { Text } from "@/sbComponentType";
import Markdown from "markdown-to-jsx";
import { SbBlokData, storyblokEditable } from "@storyblok/react";
import { tv } from "tailwind-variants";
import {
  justifyVariants,
  levelVariants,
  typographySlots,
  widthVariants,
  wrapperSlot,
} from "@/config/variants";
import { Typography } from "@/components/Typography";

export interface TextComponent {
  blok: Text & SbBlokData;
  theme?: "primary" | "secondary";
  parent?: string;
}

export function Text({ blok, theme, parent }: TextComponent) {
  const { width, justify, level } = blok;
  const { wrapper } = classes();

  return (
    <div
      className={wrapper({
        level,
        width,
        justify,
        isColumn: parent === "columns",
      })}
      dir={blok.justify === "right" ? "rtl" : ""}
      {...storyblokEditable(blok)}
    >
      {blok.headline && (
        <Markdown
          options={{
            wrapper: null,
            forceBlock: true,
            overrides: Typography({ level, theme }),
          }}
        >
          {blok.headline}
        </Markdown>
      )}
      {blok.content && (
        <Markdown
          options={{
            wrapper: null,
            forceBlock: true,
            overrides: Typography({ level, theme }),
          }}
        >
          {blok.content}
        </Markdown>
      )}
    </div>
  );
}

const classes = tv({
  slots: {
    ...typographySlots,
    wrapper: `${wrapperSlot.base} ${wrapperSlot.level}`,
  },
  variants: {
    isColumn: {
      true: {
        wrapper: wrapperSlot.column,
      },
    },
    width: widthVariants,
    justify: justifyVariants,
    level: levelVariants,
  },
});
