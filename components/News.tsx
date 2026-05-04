import type { News as NewsType } from "@/sbComponentType";
import { Meta } from "@/components/Meta";
import { StoryblokComponent } from "@storyblok/react";
import { Fragment } from "react";
import { tv } from "tailwind-variants";

export interface NewsComponent {
  blok: NewsType;
}

const classes = tv({
  slots: {},
  variants: {}
})


export function News({ blok }: NewsComponent) {
  const { body } = blok
  // const { } = classes()

  return (
    <Fragment>
      <Meta blok={blok} />
      <main className="">
        {body?.map((child) => (
          <StoryblokComponent
            key={child._uid}
            blok={child}
            parent={blok.component}
          />
        ))}
      </main>
    </Fragment>
  );
}