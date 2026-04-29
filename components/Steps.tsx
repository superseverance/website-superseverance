import {
  containerSlot,
  hasHeaderVariant,
  sectionSlot,
  themeVariants,
  wrapperSlot,
} from "@/config/variants";
import type { Steps } from "@/sbComponentType";
import {
  SbBlokData,
  storyblokEditable,
  StoryblokComponent,
} from "@storyblok/react";
import Markdown from "markdown-to-jsx";
import { tv } from "tailwind-variants";
import { Typography } from "./Typography";
import { Icon } from "@/components/Icon";

export interface StepsComponent {
  blok: Steps & SbBlokData;
  hasHeader: boolean;
}

export function Steps({ blok, hasHeader }: StepsComponent) {
  const { theme, timeline } = blok;
  const { section, container, wrapper, steps, step, line, dot, icon } =
    classes();
  return (
    <section
      id={blok.id}
      className={section({ theme, hasHeader })}
      {...storyblokEditable(blok)}
    >
      <div
        className={container({ class: "space-y-3 md:space-y-6 lg:space-y-9" })}
      >
        {blok.heading && (
          <div className={wrapper()}>
            <Markdown
              options={{ wrapper: null, overrides: Typography({ theme }) }}
            >
              {blok.heading}
            </Markdown>
          </div>
        )}
        <div className={steps({ timeline })}>
          {blok.body?.map((item) => (
            <div
              className={step({ timeline })}
              key={item._uid}
              {...storyblokEditable(item as SbBlokData)}
            >
              {timeline && <div className={line({ theme, timeline })} />}
              {timeline && <div className={dot({ theme, timeline })} />}
              {!timeline && <Icon name="chevron" classes={icon({ theme })} />}
              {item.body?.map((contents) => (
                <StoryblokComponent
                  blok={contents}
                  key={contents._uid}
                  parent={blok.component}
                  theme={theme}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const classes = tv({
  slots: {
    section: `${sectionSlot.base}`,
    container: `${containerSlot.base} ${containerSlot.spaced}`,
    wrapper: `${wrapperSlot.base} ${wrapperSlot.column} ${wrapperSlot.level}`,
    steps: "flex flex-wrap",
    step: `relative z-0 py-4`,
    line: "line absolute top-0 max-md:left-0 w-0.5 z-1 h-full bg-neutral-300",
    dot: "dot absolute h-2 w-2 z-2 rounded-full top-1/2 max-md:left-0 -translate-1/2 md:-translate-1/2 bg-neutral-400",
    icon: "icon absolute max-md:-bottom-4 max-md:left-8 -rotate-90 md:top-0 md:right-0 md:rotate-180 ",
  },
  variants: {
    theme: themeVariants,
    hasHeader: hasHeaderVariant,
    timeline: {
      true: {
        steps: "flex-col",
        icon: "hidden",
        step: `
          flex-none w-full pl-8 sm:w-3/4 md:w-1/2
          sm:self-start odd:md:self-end even:md:text-right odd:md:pl-8 even:md:pr-8
          even:[&>.line]:md:-right-px odd:[&>.line]:md:-left-px
          even:[&>.dot]:md:right-0 odd:[&>.dot]:md:left-0 even:[&>.dot]:md:translate-x-1/2
        `,
      },
      false: {
        steps: "justify-between -mx-4",
        step: "flex-1 min-w-full md:max-w-1/3 md:min-w-1/4 px-4 last:[&>.icon]:hidden max-md:pb-4",
        line: "hidden",
        dot: "hidden",
      },
    },
  },
});
