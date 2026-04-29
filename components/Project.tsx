import type { Project } from "@/sbComponentType";
import { Meta } from "@/components/Meta";
import { StoryblokComponent } from "@storyblok/react";
import { Fragment } from "react";
import { ListsProps } from "@/pages";
import { hasHeaderVariant } from "@/config/variants";
import { tv } from "tailwind-variants";

export interface ProjectComponent {
  blok: Project;
  lists: ListsProps;
}

export function Project({ blok, lists }: ProjectComponent) {
  const header = typeof blok.header === "string" ? null : blok.header?.content;
  const footer = typeof blok.footer === "string" ? null : blok.footer?.content;

  const { main } = classes();

  return (
    <Fragment>
      <Meta blok={blok} />
      {header && <StoryblokComponent blok={header} withBack={true} />}
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
