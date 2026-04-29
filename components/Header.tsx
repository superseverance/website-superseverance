import type { Header } from "@/sbComponentType";
import { useState, Fragment } from "react";
import {
  SbBlokData,
  storyblokEditable,
  StoryblokComponent,
} from "@storyblok/react";
import { useRouter } from "next/router";

import {
  Navbar as HeroNavbar,
  NavbarContent as HeroNavbarContent,
  NavbarItem as HeroNavbarItem,
  NavbarMenu as HeroNavbarMenu,
  NavbarMenuItem as HeroNavbarMenuItem,
  NavbarMenuToggle as HeroNavbarMenuToggle,
  Link as HeroLink,
} from "@heroui/react";

import { default as NextImage } from "next/image";
import { default as NextLink } from "next/link";
import { Icon } from "@/components/Icon";

export interface HeaderComponent {
  blok: Header & SbBlokData;
  withBack: boolean;
  parent: string;
}

export function Header({ blok, withBack }: HeaderComponent) {
  const router = useRouter();
  const backUrl = router.asPath.split("/").slice(0, -1).join("/");
  const [isOpen, setOpen] = useState(false);

  const classes = {
    base: "px-2 xs:px-4 sm:px-6 md:px-8 md:h-16 lg:h-20 z-50", //if light bg-foreground/70
    wrapper: "px-0 max-w-5xl lg:max-w-7xl",
    item: "hidden sm:list-item",
    menu: "items-end gap-6 py-8", //if light bg-foreground/70
    menuItem: "text-foreground", //if light text-background
  };

  return (
    <Fragment>
      <HeroNavbar
        classNames={classes}
        height={"3rem"}
        isBlurred
        shouldHideOnScroll
        {...storyblokEditable(blok)}
        onMenuOpenChange={setOpen}
      >
        {blok.image?.filename && (
          <NextLink href="/">
            <NextImage
              className="h-12 w-auto max-h-8 md:max-h-10 lg:max-h-12 "
              src={blok.image.filename}
              alt={blok.image.alt || ""}
              width={128}
              height={64}
            />
          </NextLink>
        )}
        <HeroNavbarContent justify="end">
          {withBack && (
            <HeroLink href={backUrl} className="text-inherit mr-4">
              <Icon name="arrow" classes="h-7 w-7" />
              <span className="hidden sm:inline">Indietro</span>
            </HeroLink>
          )}
          {blok.links?.map((child) => (
            <HeroNavbarItem key={child._uid}>
              <StoryblokComponent blok={child} parent={blok.component} />
            </HeroNavbarItem>
          ))}
          <HeroNavbarMenuToggle
            className="sm:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          />
        </HeroNavbarContent>
        <HeroNavbarMenu>
          {blok.links?.map((child) => (
            <HeroNavbarMenuItem key={child._uid}>
              <StoryblokComponent blok={child} parent={blok.component} />
            </HeroNavbarMenuItem>
          ))}
        </HeroNavbarMenu>
      </HeroNavbar>
    </Fragment>
  );
}
