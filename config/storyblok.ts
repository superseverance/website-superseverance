import { Page } from "@/components/Page";
import { Post } from "@/components/Post";
import { Project } from "@/components/Project";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Cover } from "@/components/Cover";
import { Columns } from "@/components/Columns";
import { Map } from "@/components/Map";
import { Steps } from "@/components/Steps";
import { Carousel } from "@/components/Carousel";
import { Grid } from "@/components/Grid";
import { Form } from "@/components/Form";
import { Alias } from "@/components/Alias";
import { Text } from "@/components/Text";
import { Image } from "@/components/Image";
import { Link } from "@/components/Link";
import { Column } from "@/components/Column";
import { Gallery } from "@/components/Gallery";
import { Group } from "@/components/Group";
import { Checkbox } from "@/components/Checkbox";
import { Input } from "@/components/Input";
import { Picker } from "@/components/Picker";
import { Select } from "@/components/Select";
import { Slider } from "@/components/Slider";

export const components = {
  page: Page,
  post: Post,
  project: Project,
  header: Header,
  footer: Footer,
  cover: Cover,
  columns: Columns,
  steps: Steps,
  carousel: Carousel,
  grid: Grid,
  alias: Alias,
  text: Text,
  image: Image,
  link: Link,
  column: Column,
  map: Map,
  gallery: Gallery,
  group: Group,
  form: Form,
  checkbox: Checkbox,
  input: Input,
  picker: Picker,
  select: Select,
  slider: Slider,
};

export const relations = [
  "page.header",
  "page.footer",
  "project.header",
  "project.footer",
  "post.header",
  "post.footer",
  "alias.story",
  "map.locations",
];
