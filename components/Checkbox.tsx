import type { Checkbox } from "@/sbComponentType";
import { SbBlokData, storyblokEditable } from "@storyblok/react";
import { FieldData } from "@/libs/sbForm";
import { Checkbox as HeroCheckbox } from "@heroui/react";
import Markdown from "markdown-to-jsx";
import { Typography } from "./Typography";

interface CheckboxComponent {
  blok: Checkbox & SbBlokData;
  data: FieldData;
  parent: string;
  callback: (v: FieldData) => void;
}

export function Checkbox({ blok, data, callback }: CheckboxComponent) {
  return (
    <div className="space-y-1" {...storyblokEditable(blok)}>
      <HeroCheckbox
        id={blok.id}
        isSelected={data.value as boolean}
        aria-label={blok.id}
        isRequired={blok.required}
        color={data.err ? "danger" : "primary"}
        classNames={{ label: data.err ? "text-danger" : "" }}
        onValueChange={(value) => callback({ ...data, value })}
      >
        <Markdown options={{ wrapper: null, overrides: Typography() }}>
          {blok.label}
        </Markdown>
      </HeroCheckbox>
      {data.err && <p className="ml-7 text-xs text-danger">{data.err}</p>}
    </div>
  );
}
