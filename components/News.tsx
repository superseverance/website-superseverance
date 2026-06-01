import type { News as NewsType } from "@/sbComponentType";
import { Meta } from "@/components/Meta";
import { StoryblokComponent, SbBlokData, storyblokEditable } from "@storyblok/react";
import { Image as HeroImage } from "@heroui/react"
import { Fragment } from "react";
import { tv } from "tailwind-variants";

export interface NewsComponent {
  blok: NewsType & SbBlokData;
  parent?: string
}

const classes = tv({
  slots: {
    main: "min-h-screen",
    card: "p-2",
    wrapper: "",
    content: "",
  },
  variants: {}
})


export function News({ blok, parent }: NewsComponent) {
  const { header, footer, body, title, description, image, link, component } = blok
  const { main, card, wrapper, content } = classes()

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
      {typeof header === "string" ? null : <StoryblokComponent parent={component} blok={header?.content} />}
      <main className={main()}>
        {body?.map((child) => (
          <StoryblokComponent
            key={child._uid}
            blok={child}
            parent={component}
          />
        ))}
      </main>
      {typeof footer === "string" ? null : <StoryblokComponent parent={component} blok={footer?.content} />}
    </Fragment>
  )
}