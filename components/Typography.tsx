import { createElement } from "react"
import { default as NextLink } from "next/link";
import { Image as HeroImage } from "@heroui/react"
import { tv } from "tailwind-variants"

const Tags = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "ul",
  "ol",
  "li",
  "a",
  "code",
  "img",
] as const;


export function Typography() {
  const _classes = classes();
  return Object.fromEntries(
    Tags.map((tag) => {
      const className = _classes[tag]();
      if (tag === "a") {
        const link = ({
          children,
          href,
        }: {
          children: string;
          href: string;
        }) => (
          <NextLink href={href} className={className}>
            {children}
          </NextLink>
        );
        return [tag, link];
      }
      if (tag === "img") {
        const img = ({ src, alt }: { src: string; alt: string }) => (
          <HeroImage src={src} classNames={{ img: className }} alt={alt} />
        );
        return [tag, img];
      }
      if (tag === "code") {
        const code = ({ children }: { href: string; children: string }) => (
          <i className={`icon-${children}`} />
        );
        return [tag, code]
      }

      return [
        tag,
        ({ children }: { children: string }) =>
          createElement(tag, { className }, children),
      ];
    })
  );
}

const classes = tv({
  slots: {
    h1: "font-serif text-6xl",
    h2: "font-serif text-5xl",
    h3: "font-serif text-4xl",
    h4: "font-serif text-3xl",
    h5: "font-serif text-2xl",
    h6: "font-serif text-xl",
    p: "",
    ul: "",
    ol: "",
    li: "",
    a: "text-bold ",
    code: "",
    img: "",
  },
  variants: {}
})