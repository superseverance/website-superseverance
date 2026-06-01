import type { Footer as FooterType, Text as TextType } from "@/sbComponentType"
import { tv } from "tailwind-variants"
import Markdown from "markdown-to-jsx/react"
import { Icon, IconNames } from "@/components/Icon"
import { Link as HeroLink } from "@heroui/react"
import { default as NextLink } from "next/link"
import { default as NextImage } from "next/image"

import {
  SbBlokData,
  storyblokEditable,
  StoryblokComponent
} from "@storyblok/react"
import { variants } from "@/config/variants"

export interface FooterComponent {
  blok: FooterType & SbBlokData
}

export function Footer({ blok }: FooterComponent) {
  const { logo, body, copyright, component } = blok
  const { footer, container, columns, column } = classes()
  const overrides = Typography()
  return (
    <div className={footer()} {...storyblokEditable(blok)}>
      <div className={container()}>
        <div className={columns()}>
          {logo?.filename && (
            <NextLink href="/" className={column()}>
              <NextImage
                className="h-12 w-auto max-h-8 md:max-h-10 lg:max-h-12 "
                src={logo.filename}
                alt={logo.alt || ""}
                width={256}
                height={64}
              />
            </NextLink>
          )}
          {body?.map((item: TextType) => (
            <div className={column()} key={item._uid}>
              <Markdown options={{ wrapper: null, overrides }}>
                {item.content}
              </Markdown>
            </div>
          ))}
        </div>
        <div className="">
          <Markdown options={{ wrapper: null, overrides }}>{copyright}</Markdown>
        </div>
      </div>
    </div>
  )
}

const classes = tv({
  slots: {
    footer: "py-8 bg-foreground text-white",
    container: [variants.container, "space-y-4"].join(" "),
    columns: variants.columns,
    column: [variants.column, "space-y-2"].join(" "),
  },
  variants: {}
})


function Typography() {
  const { a } = styles()
  return ({
    img: {
      component: ({ src, alt }: { src: string, alt: string; }) => (
        <img src={src} alt={alt} />
      )
    },
    code: {
      component: ({ children }: { children: IconNames }) => (
        <Icon name={children} classes="fill-white h-8 w-8 md:h-6 md:w-6 lg:h-4 lg:w-4" />
      ),
    },
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

const styles = tv({
  slots: {
    a: "text-white blok"
  }
})