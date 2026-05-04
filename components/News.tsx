import type { News as NewsType } from "@/sbComponentType";
import { Meta } from "@/components/Meta";
import { ListsProvider, ListsProps } from "@/components/Lists"
import { tv } from "tailwind-variants";

export interface NewsComponent {
  blok: NewsType;
  lists: ListsProps;
}

const classes = tv({
  slots: {},
  variants: {}
})


export function News({ blok, lists }: NewsComponent) {
  // const { } = classes();

  console.log(blok)

  return (
    <ListsProvider lists={lists}>
      <Meta blok={blok} />
      <div className="">
        News
      </div>
    </ListsProvider>
  );
}