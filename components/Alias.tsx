import type { Alias as AliasType, News as NewsType, Event as EventType } from "@/sbComponentType"
import { useLists, ListsProps, ListKey } from "./Lists"
import { ISbStoryData, SbBlokData, storyblokEditable, StoryblokComponent } from "@storyblok/react"
import { tv } from "tailwind-variants"
import Markdown from "markdown-to-jsx"
import { default as NextLink } from "next/link"
import { Typography } from "./Typography"
import { variants } from "@/config/variants"

export interface AliasProps {
  blok: AliasType & SbBlokData
}

export function Alias({ blok }: AliasProps) {
  const { heading, theme, story, component } = blok

  const key = story as ListKey | undefined

  const lists: ListsProps = useLists()
  const list = key ? lists[key] : undefined
  const alias = getNext(list)

  if (!alias) return null

  const { section, container, header, columns, column } = classes()
  const overrides = Typography()

  return (
    <section {...storyblokEditable(blok)} className={section({ theme })}>
      <div className={container()}>
        {heading && (
          <div className={header({ theme })}>
            <Markdown options={{ wrapper: null, overrides }}>
              {heading}
            </Markdown>
          </div>
        )}
        <div className={columns()}>
          <NextLink className={column()} href={alias.full_slug} key={alias.content._uid}>
            <StoryblokComponent blok={alias.content} theme={theme} parent={component} />
          </NextLink>
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
    column: "w-full md:w-2/3 lg:w-1/2",
  },
  variants: {
    theme: { ...variants.themes }
  }
})

const getNext = (events: ISbStoryData<NewsType | EventType>[] | null | undefined): ISbStoryData<NewsType | EventType> | null => {
  const today = new Date();

  const upcoming = events?.filter(e => {
    const date = (e.content?.date as string | undefined) ?? e.published_at ?? e.updated_at;
    return date ? new Date(date) >= today : false;
  });

  const sorted = upcoming?.sort((a, b) => {
    const dateA = new Date((a.content?.date as string | undefined) ?? a.published_at ?? a.updated_at ?? "").getTime();
    const dateB = new Date((b.content?.date as string | undefined) ?? b.published_at ?? b.updated_at ?? "").getTime();
    return dateA - dateB;
  });

  return sorted?.[0] ?? null;
};