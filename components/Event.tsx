import type { Alias as AliasType, Event as EventType } from "@/sbComponentType";
import { Meta } from "@/components/Meta";
import { SbBlokData, storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { Fragment } from "react";
import { tv } from "tailwind-variants";
import { Image as HeroImage } from "@heroui/react"
import { variants } from "@/config/variants";

export interface EventComponent {
  blok: EventType & SbBlokData;
  parent?: string
  theme?: AliasType["theme"]
}

const classes = tv({
  slots: {
    main: "min-h-screen",
    column: "p-2 flex gap-2 ",
    header: "text-2xl font-serif",
  },
  variants: {
    theme: { ...variants.themes }
  }
})


export function Event({ blok, parent, theme }: EventComponent) {
  const { body, title, description, image, component } = blok
  const { main, column, header } = classes()

  if (!!parent) {
    return (
      <div className={column({ theme })} {...storyblokEditable(blok)}>
        {image?.filename && (
          <HeroImage
            classNames={{ wrapper: "w-1/3" }}
            src={image.filename}
            alt={image.alt || ""}
            radius="none"
          />
        )}
        <div className="">
          <h4 className={header({ theme })}>{title}</h4>
          <p className="">{description}</p>
        </div>
      </div>
    )
  }

  return (
    <Fragment>
      <Meta blok={blok} />
      {typeof blok.header === "string" ? null : <StoryblokComponent parent={component} blok={blok.header?.content} />}
      <main className={main()}>
        {body?.map((child) => (
          <StoryblokComponent
            key={child._uid}
            blok={child}
            parent={component}
          />
        ))}
      </main>
      {typeof blok.footer === "string" ? null : <StoryblokComponent parent={component} blok={blok.footer?.content} />}    </Fragment>
  )
}