import { Page } from "@/components/Page";
import { News } from "@/components/News";
import { Event } from "@/components/Event";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Cover } from "@/components/Cover";
import { Grid } from "@/components/Grid";
import { Alias } from "@/components/Alias";
import { Section } from "@/components/Section";
import { Column } from "@/components/Column";
import { Text } from "@/components/Text";
import { Image } from "@/components/Image";
import { Link } from "@/components/Link";
import { Gallery } from "@/components/Gallery";

export const components = {
  page: Page,
  news: News,
  event: Event,
  header: Header,
  footer: Footer,
  cover: Cover,
  grid: Grid,
  alias: Alias,
  section: Section,
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
