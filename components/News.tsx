import type { News as NewsType } from "@/sbComponentType";
import { Meta } from "@/components/Meta";
import { ListsProvider, ListsProps } from "@/libs/sbLists"
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
  const { } = classes();

  return (
    <ListsProvider lists={lists}>
      <Meta blok={blok} />

      <div className="">
        {blok.image && <div className="" />}

        <div className="">
          News
        </div>
      </div>
    </ListsProvider>
  );
}