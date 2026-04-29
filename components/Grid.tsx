import type { Grid } from "@/sbComponentType";
import type { ListsProps } from "@/pages";
import { useState } from "react";
import { SbBlokData } from "@storyblok/react";
import Markdown from "markdown-to-jsx";
import { Typography } from "./Typography";
import { Button as HeroButton } from "@heroui/react";
import { tv } from "tailwind-variants";
import { containerSlot, sectionSlot } from "@/config/variants";
import { Banner } from "@/components/Alias";
import { Icon } from "@/components/Icon";

interface GridComponent {
  blok: Grid & SbBlokData;
  lists: ListsProps;
  parent: string;
}

export function Grid({ blok, lists, parent }: GridComponent) {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const list = lists[blok.list] || [];
  if (!list?.length) return null;

  const filters: string[] = list
    .map(({ content }) => content.type as string)
    .filter((value, index, array) => !!value && array.indexOf(value) === index);

  const handleFilter = (value: string) => {
    const _activeFilters = [...activeFilters];
    if (_activeFilters.includes(value)) {
      _activeFilters.splice(_activeFilters.indexOf(value), 1);
    } else {
      _activeFilters.push(value);
    }
    setActiveFilters(_activeFilters);
  };

  const items = activeFilters.length
    ? list.filter(({ content }) =>
        typeof content.type === "string"
          ? activeFilters.includes(content.type)
          : false
      )
    : list;

  const { section, container, grid } = classes();
  const hasHeader = !!parent && ["page", "post", "project"].includes(parent);

  return (
    <section className={section({ hasHeader })}>
      <div className={container()}>
        <header className="flex-1 max-w-full">
          {blok.heading && (
            <Markdown options={{ wrapper: null, overrides: Typography() }}>
              {blok.heading}
            </Markdown>
          )}
          {blok.filters && !!filters.length && (
            <div className="flex items-center justify-between gap-2 pt-4 min-h-20 max-w-full">
              {!!activeFilters?.length && (
                <HeroButton
                  onPress={() => setActiveFilters([])}
                  variant="bordered"
                  radius="full"
                  isIconOnly
                  size="sm"
                  className="border-none"
                  disabled={!activeFilters?.length}
                >
                  <Icon name="close" classes="fill-neutral-800 w-5 h-5" />
                </HeroButton>
              )}
              <div className="text-sm font-medium min-w-16">Filtra per:</div>
              <div className="flex-1 flex items-center gap-2 overflow-x-scroll whitespace-nowrap flex-row-reverse hide-scrollbar">
                {filters?.map((filter, index) => (
                  <HeroButton
                    key={index}
                    onPress={() => handleFilter(filter)}
                    color={
                      activeFilters.includes(filter) ? "primary" : "default"
                    }
                    variant="bordered"
                    radius="full"
                    size="sm"
                    className="text-xs font-medium border-neutral-100 min-w-fit h-6 px-2 md:h-8 md:px-3"
                  >
                    {filter}
                  </HeroButton>
                ))}
              </div>
            </div>
          )}
        </header>
        <div className={grid()}>
          {items.map((child) => (
            <Banner
              title={child.content.title}
              description={child.content.description}
              image={child.content.image}
              link={child.full_slug}
              key={child.full_slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const classes = tv({
  slots: {
    section: sectionSlot.base,
    container: `${containerSlot.base} ${containerSlot.spaced} ${containerSlot.columns}`,
    grid: "grid grid-cols-12 gap-4 md:gap-6 lg:gap-8 w-full",
  },
  variants: {
    hasHeader: {
      true: { section: "first:pt-12 first:md:pt-16 first:lg:pt-20" },
    },
  },
  defaultVariants: {
    hasHeader: true,
  },
});
