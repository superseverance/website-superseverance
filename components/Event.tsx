import type { Event as EventType } from "@/sbComponentType";
import { Meta } from "@/components/Meta";
import { ListsProvider, ListsProps } from "@/components/Lists"
import { tv } from "tailwind-variants";

export interface EventComponent {
  blok: EventType;
  lists: ListsProps;
}

const classes = tv({
  slots: {},
  variants: {}
})


export function Event({ blok, lists }: EventComponent) {
  // const { } = classes();

  console.log(blok)

  return (
    <ListsProvider lists={lists}>
      <Meta blok={blok} />
      <div className="">
        Event
      </div>
    </ListsProvider>
  );
}