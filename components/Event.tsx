import type { Event as EventType } from "@/sbComponentType";
import { Meta } from "@/components/Meta";
import { StoryblokComponent } from "@storyblok/react";
import { Fragment } from "react";
import { tv } from "tailwind-variants";
import { desc } from "framer-motion/client";

export interface EventComponent {
  blok: EventType;
}

const classes = tv({
  slots: {},
  variants: {}
})


export function Event({ blok }: EventComponent) {
  const { body, title, description } = blok
  // const { } = classes();

  return (
    <Fragment>
      <Meta blok={blok} />
      <main className="">
        {title && <h1 className="">{title}</h1>}
        {description && <p className="">{description}</p>}
      </main>
    </Fragment>
  )
}