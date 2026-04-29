import type { Page } from "@/sbComponentType";
import { Meta } from "@/components/Meta";
import { StoryblokComponent } from "@storyblok/react";
import { Fragment } from "react";
import { ListsProps } from "@/pages";
import { tv } from "tailwind-variants";
import { hasHeaderVariant } from "@/config/variants";

export interface PageComponent {
  blok: Page;
  lists: ListsProps;
}

export function Page({ blok, lists }: PageComponent) {
  const header = typeof blok.header === "string" ? null : blok.header?.content;
  const footer = typeof blok.footer === "string" ? null : blok.footer?.content;

  const { main } = classes();

  return (
    <Fragment>
      <Meta blok={blok} />
      {header && <StoryblokComponent blok={header} />}
      <main className={main({ hasHeader: !!header })}>
        {blok.body?.map((child) => (
          <StoryblokComponent
            blok={child}
            key={child._uid}
            parent={blok.component}
            hasHeader={!!header}
            lists={lists}
          />
        ))}
      </main>
      {footer && <StoryblokComponent blok={footer} />}
    </Fragment>
  );
}

const classes = tv({
  slots: {
    main: "",
  },
  variants: {
    hasHeader: hasHeaderVariant,
  },
});
