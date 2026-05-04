import type { Section as SectionType } from "@/sbComponentType"
import { createElement } from "react"
import Markdown from "markdown-to-jsx/react"
import { tv } from "tailwind-variants"

import {
  SbBlokData,
  storyblokEditable,
  StoryblokComponent
} from "@storyblok/react"

export interface SectionComponent {
  blok: SectionType & SbBlokData
}

const classes = tv({
  slots: {
    section: "",
    container: "",
    header: "",
    columns: ""
  },
  variants: {}
})

export function Section({ blok }: SectionComponent) {
  const { heading, body, theme, justify } = blok
  const { section, container, header, columns } = classes()
  return (
    <div className={section()} {...storyblokEditable(blok)}>
      <div className={container()}>
        <div className={header()}>
          <Markdown>
            {heading}
          </Markdown>
        </div>
        <div className={columns()}>
          {body?.map((item) => <StoryblokComponent blok={item} key={item._uid} />)}
        </div>
      </div>
    </div>
  )
}

const styles = tv({
  slots: {
    h1: "",
    h2: "",
    h3: "",
    p: "",
  }
})

const Tags = [
  "h1",
  "h2",
  "h3",
  "p",
] as const;

function Typography() {
  const _styles = styles();
  return Object.fromEntries(
    Tags.map((tag) => {
      const className = _styles[tag]();
      return [
        tag,
        ({ children }: { children: string }) =>
          createElement(tag, { className }, children),
      ];
    })
  );
}