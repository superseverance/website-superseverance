import type { Header as HeaderType } from "@/sbComponentType"
import { useState, Fragment } from "react";
import { default as NextLink } from "next/link"
import { default as NextImage } from "next/image"
import {
  Navbar as HeroNavbar,
  NavbarContent as HeroNavbarContent,
  NavbarItem as HeroNavbarItem,
  NavbarMenu as HeroNavbarMenu,
  NavbarMenuItem as HeroNavbarMenuItem,
  NavbarMenuToggle as HeroNavbarMenuToggle,
  Link as HeroLink,
} from "@heroui/react";

import {
  SbBlokData,
  storyblokEditable,
  StoryblokComponent
} from "@storyblok/react"

export interface HeaderComponent {
  blok: HeaderType & SbBlokData
}

const classes = {
  base: "px-2 xs:px-4 sm:px-6 md:px-8 md:h-16 lg:h-20 z-50", //if light bg-foreground/70
  wrapper: "px-0 max-w-5xl lg:max-w-7xl",
  item: "hidden sm:list-item",
  menu: "items-end gap-6 py-8", //if light bg-foreground/70
  menuItem: "text-foreground", //if light text-background
}

export function Header({ blok }: HeaderComponent) {
  const { logo, menu, component } = blok
  const [isOpen, setOpen] = useState(false);

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
              width={128}
              height={64}
            />
          </NextLink>
        )}

        <HeroNavbarContent justify="end">
          {menu?.map((child) => (
            <HeroNavbarItem key={child._uid}>
              <StoryblokComponent parent={component} blok={child} />
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
              <StoryblokComponent parent={component} blok={child} />
            </HeroNavbarMenuItem>
          ))}
        </HeroNavbarMenu>

      </HeroNavbar>
    </Fragment>
  )
}