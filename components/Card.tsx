import type { Column } from "@/sbComponentType";
import { storyblokEditable, SbBlokData } from "@storyblok/js";
import { tv } from "tailwind-variants";
import Markdown from "markdown-to-jsx";

import {
  Card as HeroCard,
  CardHeader as HeroCardHeader,
  CardBody as HeroCardBody,
  CardFooter as HeroCardFooter,
  Image as HeroImage,
  Link as HeroLink,
} from "@heroui/react";

export function Card({ blok }: { blok: Column }) {
  const image = blok.body?.find((b) => b.component === "image");
  const text = blok.body?.find((b) => b.component === "text");
  const links = blok.body?.filter((b) => b.component === "link");

  if (!image && !text && !links?.length) return null;

  return (
    <div
      className={classes({ width: blok.width || undefined })}
      {...storyblokEditable(blok as SbBlokData)}
    >
      <HeroCard>
        {image && image.asset?.filename && (
          <HeroCardHeader>
            <HeroImage src={image.asset.filename} alt={image.asset.alt || ""} />
          </HeroCardHeader>
        )}
        {text && (text.headline || text.content) && (
          <HeroCardBody>
            {text.headline && <Markdown>{text.headline}</Markdown>}
            {text.content && <Markdown>{text.content}</Markdown>}
          </HeroCardBody>
        )}
        {!!links?.length && (
          <HeroCardFooter className="gap-2">
            {links.map((link) => (
              <HeroLink key={link._uid} href={link.href.url || "#"}>
                {link.label}
              </HeroLink>
            ))}
          </HeroCardFooter>
        )}
      </HeroCard>
    </div>
  );
}

const classes = tv({
  base: "p-2 sm:flex-1 min-h-48 blok",
  variants: {
    width: {
      "1/3": "sm:flex-none sm:w-1/2 md:w-1/3",
      "1/2": "sm:flex-none sm:w-1/2",
      "2/3": "sm:flex-none sm:w-2/3",
      "1/1": "sm:flex-none w-full",
    },
  },
});
