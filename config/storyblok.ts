import { Page } from "@/components/Page";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Cover } from "@/components/Cover";
import { Grid } from "@/components/Grid";
import { Alias } from "@/components/Alias";
import { Text } from "@/components/Text";
import { Image } from "@/components/Image";
import { Link } from "@/components/Link";
import { Column } from "@/components/Column";
import { Gallery } from "@/components/Gallery";

export const components = {
  page: Page,
  header: Header,
  footer: Footer,
  cover: Cover,
  grid: Grid,
  alias: Alias,
  text: Text,
  image: Image,
  link: Link,
  column: Column,
  gallery: Gallery,
};

export const relations = [
  "page.header",
  "page.footer",
];
