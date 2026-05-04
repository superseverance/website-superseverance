import type { Page as PageType } from "@/sbComponentType";
import { Meta } from "@/components/Meta";
import { StoryblokComponent } from "@storyblok/react";
import { ListsProvider, ListsProps } from "@/libs/sbLists"
import { tv } from "tailwind-variants";


export interface PageComponent {
  blok: PageType;
  lists: ListsProps;
}

export function Page({ blok, lists }: PageComponent) {
  const header = typeof blok.header === "string" ? null : blok.header?.content;
  const footer = typeof blok.footer === "string" ? null : blok.footer?.content;

  const { main } = classes();

  return (
    <ListsProvider lists={lists}>
      <div className="">Page</div>
      {/* 
      <Meta blok={blok} />
      {header && <StoryblokComponent blok={header} />}
      <main className={main({ hasHeader: !!header })}>
        {blok.body?.map((child) => (
          <StoryblokComponent
            key={child._uid}
            blok={child}
            parent={blok.component}
          />
        ))}
      </main>
      {footer && <StoryblokComponent blok={footer} />} 
*/}
    </ListsProvider>
  );
}

const classes = tv({
  slots: {
    main: "",
  },
  variants: {
    hasHeader: {
      true: "",
      false: "",
    },
  },
});