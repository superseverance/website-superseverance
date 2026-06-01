import type { Section as SectionType } from "@/sbComponentType"
import Markdown from "markdown-to-jsx/react"
import { Typography } from "./Typography"
import { tv } from "tailwind-variants"
import { variants } from "@/config/variants"

import {
  SbBlokData,
  storyblokEditable,
  StoryblokComponent
} from "@storyblok/react"

export interface SectionComponent {
  blok: SectionType & SbBlokData
}

export function Section({ blok }: SectionComponent) {
  const { heading, body, theme, justify, component } = blok
  const { section, container, header, columns, column } = classes()

  const overrides = Typography()

  return (
    <section className={section({ theme })} {...storyblokEditable(blok)}>
      <div className={container()}>
        {heading && (
          <div className={header({ theme, justify })}>
            <Markdown options={{ wrapper: null, overrides }}>
              {heading}
            </Markdown>
          </div>
        )}
        <div className={columns({ justify })}>
          {body?.map((child) => child.component === "column" ? (
            <StoryblokComponent parent={component} blok={child} theme={theme} key={child._uid} />
          ) : (
            <div className={column({ theme, justify, component: child.component })} key={child._uid}>
              <StoryblokComponent parent={component} blok={child} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const classes = tv({
  slots: {
    section: "py-8 relative",
    container: variants.container,
    header: "mb-2 w-full",
    columns: [variants.columns, "mt-2"].join(" "),
    column: variants.column,
  },
  variants: {
    theme: { ...variants.themes },
    component: {
      image: { column: "self-stretch min-h-[50svh] lg:min-h-[33svh] xl:min-h-[25svh]" },
      gallery: { column: "self-stretch min-h-[50svh] lg:min-h-[33svh] xl:min-h-[25svh]" },
      text: { column: "" },
      link: { column: "" },
      video: { column: "self-stretch min-h-[50svh] lg:min-h-[33svh] xl:min-h-[25svh]" },
    },
    justify: {
      right: { header: "text-right", columns: "justify-end", column: "text-right" },
      center: { header: "text-center", columns: "justify-center", column: "text-center" },
      spaced: { header: "text-center", columns: "justify-between", column: "text-center" },
    }
  }
})