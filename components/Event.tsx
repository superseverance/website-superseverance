import type { Event as EventType } from "@/sbComponentType";
import { Meta } from "@/components/Meta";
import { SbBlokData, storyblokEditable } from "@storyblok/react";
import { Fragment } from "react";
import { tv } from "tailwind-variants";
import { Image as HeroImage } from "@heroui/react"

export interface EventComponent {
  blok: EventType & SbBlokData;
  parent?: string
}

const classes = tv({
  slots: {
    card: "p-2",
    wrapper: "",
    content: "",
  },
  variants: {}
})


export function Event({ blok, parent }: EventComponent) {
  const { body, title, description, image, component } = blok
  const { card, wrapper, content } = classes()

  if (!!parent) {
    return (
      <div className={card()} {...storyblokEditable(blok)}>
        {image?.filename && (
          <HeroImage
            classNames={{ wrapper: wrapper() }}
            src={image.filename}
            alt={image.alt || ""}
          />
        )}
        <div className={content()}>
          <h4 className="">{title}</h4>
          <p className="">{description}</p>
        </div>
      </div>
    )
  }

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