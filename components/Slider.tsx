import type { Slider } from "@/sbComponentType";
import { SbBlokData, storyblokEditable } from "@storyblok/react";
import { FieldData } from "@/libs/sbForm";
import { Slider as HeroSlider } from "@heroui/react";

interface SliderComponent {
  blok: Slider & SbBlokData;
  data: FieldData;
  parent: string;
  callback: (v: FieldData) => void;
}

export function Slider({ blok, data, callback }: SliderComponent) {
  const unit = blok?.unit ? units[blok.unit] : null;
  return (
    <div className="space-y-1 w-full" {...storyblokEditable(blok)}>
      <HeroSlider
        id={blok.id}
        aria-label={blok.id}
        label={blok.label}
        value={data.value as number}
        step={Number(blok.step)}
        minValue={Number(blok.min)}
        maxValue={Number(blok.max)}
        onChange={(value) => callback({ ...data, value })}
        renderValue={({ children, ...props }) => (
          <output {...props}>
            <strong>
              {children} {unit}
            </strong>
          </output>
        )}
      />
      {data.err && <p className="text-xs text-danger">{data.err}</p>}
    </div>
  );
}

const units = {
  distance: "mt",
  surface: "mq",
  currency: "€",
};
