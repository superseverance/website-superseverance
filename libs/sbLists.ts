import { createContext, useContext } from "react";
import type { Event, News } from "@/sbComponentType";
import { ISbStoryData } from "@storyblok/react";

export type ListsProps = {
  news?: ISbStoryData<News>[] | null;
  events?: ISbStoryData<Event>[] | null;
};

const ListsContext = createContext<ListsProps | undefined>(undefined);

export function ListsProvider({
  lists,
  children,
}: {
  lists: ListsProps;
  children: React.ReactNode;
}) {
  return (
    <ListsContext.Provider value={lists}>
      {children}
    </ListsContext.Provider>
  );
}

export function useLists() {
  const context = useContext(ListsContext);

  if (context === undefined) {
    throw new Error("useLists must be used within ListsProvider");
  }

  return context;
}