import type { Group } from "@/sbComponentType";
import {
  storyblokEditable,
  StoryblokComponent,
  SbBlokData,
} from "@storyblok/react";
import { tv } from "tailwind-variants";

interface GroupComponent {
  blok: Group & SbBlokData;
}

export function Group({ blok }: GroupComponent) {
  if (!blok.body?.length) return null;
  const { wrapper } = classes();
  return (
    <div className={wrapper()} {...storyblokEditable(blok)}>
      {blok.body?.map((child) => (
        <StoryblokComponent blok={child} key={child._uid} />
      ))}
    </div>
  );
}

const classes = tv({
  slots: {
    wrapper: "w-full flex flex-wrap gap-8 items-baseline",
  },
});
