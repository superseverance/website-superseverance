import type { Grid as GridType } from "@/sbComponentType"
import { useLists, ListsProps, ListKey } from "./Lists"
import { default as NextLink } from "next/link"
import Markdown from "markdown-to-jsx/react"
import { tv } from "tailwind-variants"
import { variants } from "@/config/variants"
import { Typography } from "./Typography"

import {
  SbBlokData,
  StoryblokComponent,
  storyblokEditable,
} from "@storyblok/react"

export interface GridComponent {
  blok: GridType & SbBlokData
}


const classes = tv({
  slots: {
    section: "py-8",
    container: variants.container,
    header: "mb-4 w-full",
    grid: variants.grid,
    item: "",
  },
  variants: {}
})

export function Grid({ blok }: GridComponent) {
  const { heading, story, component } = blok
  const key = story as ListKey | undefined

  const lists: ListsProps = useLists()
  const list = key ? lists[key] : undefined

  const { section, container, header, grid, item } = classes()
  const overrides = Typography()

  return (
    <section className={section()} {...storyblokEditable(blok)}>
      <div className={container()}>
        <div className={header()}>
          <Markdown options={{ wrapper: null, overrides }}>
            {heading}
          </Markdown>
        </div>
        <div className={grid()}>
          {list?.map(({ content, full_slug }) => (
            <NextLink className={item()} href={full_slug} key={content._uid}>
              <StoryblokComponent blok={content} parent={component} />
            </NextLink>
          ))}
        </div>
      </div>
    </section>
  )
}
