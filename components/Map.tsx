import type { Map, Location } from "@/sbComponentType";
import { tv } from "tailwind-variants";
import { SbBlokData, storyblokEditable } from "@storyblok/react";
import { Map as PigeonMap, Marker as PigeonMarker } from "pigeon-maps";
import type { Point } from "pigeon-maps";
import { widthVariants, wrapperSlot } from "@/config/variants";
import { colors } from "@/config/styles";

interface MapComponent {
  blok: Map & SbBlokData;
}

export function Map({ blok }: MapComponent) {
  const { width } = blok;
  const { wrapper, inner } = classes();
  const locations: Array<Location & { pos: Point }> = [];
  blok.locations.forEach((location) => {
    if (typeof location === "string") return null;
    const { content } = location;
    const pos = content.gps?.split(",").map((s) => Number(s));
    return pos ? locations.push({ ...content, pos: [pos[0], pos[1]] }) : null;
  });

  const centerLat =
    locations.reduce((sum, locations) => sum + locations.pos[0], 0) /
    locations.length;

  const centerLon =
    locations.reduce((sum, locations) => sum + locations.pos[1], 0) /
    locations.length;

  const zoom = locations.length === 1 ? 14 : 7;
  const center: Point | undefined =
    centerLat && centerLon ? [centerLat, centerLon] : undefined;

  let height;
  switch (width) {
    case "1/2":
      height = 400;
      break;
    case "2/3":
      height = 500;
      break;
    case "screen":
      height = 600;
      break;
    default:
      height = 300;
  }

  return (
    <div className={wrapper({ width })} {...storyblokEditable({ blok })}>
      <div className={inner({ fullWidth: width === "screen" })}>
        <PigeonMap height={height} defaultCenter={center} defaultZoom={zoom}>
          {locations?.map(({ pos }, index) => (
            <PigeonMarker
              width={50}
              anchor={pos}
              color={colors.foreground}
              key={index}
            />
          ))}
        </PigeonMap>
      </div>
    </div>
  );
}
const classes = tv({
  slots: {
    wrapper: `${wrapperSlot.column}`,
    inner: "",
  },
  variants: {
    width: {
      ...widthVariants,
      screen: { wrapper: "relative sm:flex-none h-150 self-center" },
    },
    fullWidth: {
      true: {
        inner: "absolute top-0 bottom-0 left-1/2 w-screen -translate-x-1/2",
      },
    },
  },
});
