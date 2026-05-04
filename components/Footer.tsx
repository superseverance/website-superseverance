import type { Footer as FooterType } from "@/sbComponentType"
import Markdown from "markdown-to-jsx/react"
import { tv } from "tailwind-variants"
import { Link as HeroLink } from "@heroui/react"

import {
  SbBlokData,
  storyblokEditable,
  StoryblokComponent
} from "@storyblok/react"

export interface FooterComponent {
  blok: FooterType & SbBlokData
}

const classes = tv({
  slots: {
    footer: "",
    columns: "",
    column: "",
    container: ""
  },
  variants: {}
})

export function Footer({ blok }: FooterComponent) {
  const { logo, body, copyright } = blok
  const { footer, columns, column, container } = classes()
  const overrides = Typography()
  return (
    <div className={footer()} {...storyblokEditable(blok)}>
      <div className={columns()}>
        {logo && <div className={column()}>{logo.filename}</div>}
        {body?.map((item) => <StoryblokComponent blok={item} key={item._uid} />)}
      </div>
      <div className={container()}>
        <Markdown options={{ wrapper: null, overrides }}>{copyright}</Markdown>
      </div>
    </div>
  )
}

const styles = tv({
  slots: {
    a: ""
  }
})

function Typography() {
  const { a } = styles()
  return ({
    a: {
      component: ({ href, children }: { href: string; children: string }) => (
        <HeroLink
          className={a()}
          href={href || ""}
        >
          {children}
        </HeroLink>
      ),
    },
  })
}