import type { Page as PageType } from "@/sbComponentType";
import { Meta } from "@/components/Meta";
import { SbBlokData, StoryblokComponent } from "@storyblok/react";
import { ListsProvider, ListsProps } from "@/components/Lists"
import { tv } from "tailwind-variants";


export interface PageComponent {
  blok: PageType & SbBlokData;
  lists: ListsProps;
}

const classes = tv({
  slots: {},
  variants: {},
});

export function Page({ blok, lists }: PageComponent) {
  const { header, footer, body, component } = blok

  // const { } = classes()

  return (
    <ListsProvider lists={lists}>
      <Meta blok={blok} />
      {typeof header === "string" ? null : <StoryblokComponent parent={component} blok={header?.content} />}
      <main className="">
        {body?.map((child) => (
          <StoryblokComponent
            key={child._uid}
            blok={child}
            parent={component}
          />
        ))}
      </main>
      {typeof footer === "string" ? null : <StoryblokComponent parent={component} blok={footer?.content} />}
    </ListsProvider>
  )
}