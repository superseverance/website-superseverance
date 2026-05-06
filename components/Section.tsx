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
        <div className={header({ theme })}>
          <Markdown options={{ wrapper: null, overrides }}>
            {heading}
          </Markdown>
        </div>
        <div className={columns()}>
          {body?.map((child) => child.component === "column" ? (
            <StoryblokComponent parent={component} blok={child} theme={theme} />
          ) : (
            <div className={column({ theme, component: child.component })} key={child._uid}>
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
    section: "py-8",
    container: variants.container,
    header: "mb-4 w-full",
    columns: variants.columns,
    column: variants.column,
  },
  variants: {
    theme: {
      primary: { section: "bg-primary-100", column: "text-white", header: "text-white" },
      "primary-dark": { section: "bg-primary-900", column: "text-white", header: "text-white" },
      secondary: { section: "bg-secondary-100", column: "text-white", header: "text-white" },
      "secondary-dark": { section: "bg-secondary-900", column: "text-white", header: "text-white" },
      dark: { section: "bg-black", column: "text-white", header: "text-white" },
    },
    component: {
      image: { column: "self-stretch min-h-[50svh] lg:min-h-[33svh] xl:min-h-[25svh]" },
      text: { column: "" },
      gallery: { column: "self-stretch min-h-[50svh] lg:min-h-[33svh] xl:min-h-[25svh]" },
      link: { column: "" },
      video: { column: "self-stretch min-h-[50svh] lg:min-h-[33svh] xl:min-h-[25svh]" },
    }
  }
})