import type { Post } from "@/sbComponentType";
import { Meta } from "@/components/Meta";
import { StoryblokComponent, ISbStoryData } from "@storyblok/react";
import { Fragment } from "react";
import { ListsProps } from "@/pages";
import { Image as HeroImage } from "@heroui/react";
import { tv } from "tailwind-variants";
import { containerSlot, sectionSlot } from "@/config/variants";

export interface PostComponent {
  blok: Post;
  lists: ListsProps;
  story?: ISbStoryData;
}

export function Post({ blok, lists, story }: PostComponent) {
  const header = typeof blok.header === "string" ? null : blok.header?.content;
  const footer = typeof blok.footer === "string" ? null : blok.footer?.content;

  const { main, section, container, title, text, image } = classes();

  const date =
    story?.published_at &&
    new Date(story.published_at).toLocaleDateString("it");

  return (
    <Fragment>
      <Meta blok={blok} />
      {header && <StoryblokComponent blok={header} withBack={true} />}
      <main className={main()}>
        <section className={section()}>
          <div className={container()}>
            {blok.image?.filename && (
              <HeroImage
                src={blok.image.filename}
                alt={blok.image.alt || ""}
                classNames={{
                  wrapper: image(),
                  img: "w-full h-full object-cover",
                }}
              />
            )}
            <h1 className={title()}>{blok.title}</h1>
            {date && (
              <p className={text({ class: "mb-1.5" })}>
                <span className="font-medium">Pubblicato: </span>
                <span className="italic">{date}</span>
              </p>
            )}
            {blok.author && (
              <p className={text()}>
                <span className="font-medium">Autore: </span>
                <span className="italic">{blok.author}</span>
              </p>
            )}
          </div>
        </section>
        {blok.body?.map((child) => (
          <StoryblokComponent
            blok={child}
            key={child._uid}
            parent={blok.component}
            hasHeader={true}
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
    section: sectionSlot.base + "space-y-2",
    container: containerSlot.base,
    image: "min-h-[50vh] mb-12",
    title: "font-black text-5xl lg:text-6xl xl:text-7xl leading-none mb-3",
    text: "pl-2 text-base lg:text-lg xl:text-xl leading-snug",
  },
});
