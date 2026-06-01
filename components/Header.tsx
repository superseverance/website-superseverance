import type { Header as HeaderType } from "@/sbComponentType"
import { useState, Fragment } from "react";
import { default as NextLink } from "next/link"
import { default as NextImage } from "next/image"
import { tv } from "tailwind-variants";
import {
  Navbar as HeroNavbar,
  NavbarContent as HeroNavbarContent,
  NavbarItem as HeroNavbarItem,
  NavbarMenu as HeroNavbarMenu,
  NavbarMenuItem as HeroNavbarMenuItem,
  NavbarMenuToggle as HeroNavbarMenuToggle,
} from "@heroui/react";

import Markdown from "markdown-to-jsx/react"
import { Icon, IconNames } from "@/components/Icon"

import {
  SbBlokData,
  storyblokEditable,
  StoryblokComponent
} from "@storyblok/react"

export interface HeaderComponent {
  blok: HeaderType & SbBlokData
}

const classes = {
  base: "px-2 xs:px-4 sm:px-6 md:px-8 md:h-16 lg:h-20 z-50 bg-foreground", //if light bg-foreground/70
  wrapper: "px-0 max-w-5xl lg:max-w-7xl",
  item: "hidden sm:list-item",
  toggle: "text-white",
  menu: "items-end justify-center gap-12 py-8 bg-foreground/80", //if light bg-foreground/70
  menuItem: "text-white", //if light text-background
}

export function Header({ blok }: HeaderComponent) {
  const { logo, menu } = blok
  const [isOpen, setOpen] = useState(false);


  const options = {
    wrapper: null,
    overrides: Typography()
  }

  return (
    <Fragment>
      <HeroNavbar
        classNames={classes}
        isBlurred
        shouldHideOnScroll
        {...storyblokEditable(blok)}
        onMenuOpenChange={setOpen}
      >
        {logo?.filename && (
          <NextLink href="/">
            <NextImage
              className="h-12 w-auto max-h-8 md:max-h-10 lg:max-h-12 "
              src={logo.filename}
              alt={logo.alt || ""}
              width={256}
              height={64}
            />
          </NextLink>
        )}

        <HeroNavbarContent justify="end">
          {menu?.map((child) => (
            <HeroNavbarItem key={child._uid}>
              {child.component === "text" ? <Markdown options={options}>{child.content}</Markdown> : <StoryblokComponent blok={child} />}
            </HeroNavbarItem>
          ))}
          <HeroNavbarMenuToggle
            className="sm:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          />
        </HeroNavbarContent>
        <HeroNavbarMenu>
          {menu?.map((child) => (
            <HeroNavbarMenuItem key={child._uid}>
              {child.component === "text" ? <Markdown options={options}>{child.content}</Markdown> : <StoryblokComponent blok={child} />}
            </HeroNavbarMenuItem>
          ))}
        </HeroNavbarMenu>

      </HeroNavbar>
    </Fragment>
  )
}

function Typography() {
  const { img, icon } = styles()
  return ({
    p: {
      component: ({ children }: { children: string }) => (
        <div className="inline-flex gap-4">{children}</div>
      )
    },
    img: {
      component: ({ src, alt }: { src: string, alt: string; }) => (
        <img src={src} alt={alt} className={img()} />
      )
    },
    code: {
      component: ({ children }: { children: IconNames }) => (
        <Icon name={children} classes={icon()} />
      ),
    },
  })
}

const styles = tv({
  slots: {
    img: "",
    icon: "fill-white h-4 w-4"
  }
})