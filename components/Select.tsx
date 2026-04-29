import type { Select as SbSelect } from "@/sbComponentType";
import { SbBlokData } from "@storyblok/react";
import { FieldData } from "@/libs/sbForm";
import {
  Select as HeroSelect,
  SelectItem as HeroSelectItem,
  Selection,
} from "@heroui/react";

interface SelectComponent {
  blok: SbSelect & SbBlokData;
  data: FieldData;
  callback: (v: FieldData) => void;
}

export function Select({ blok, data, callback }: SelectComponent) {
  const handleChange = (values: Selection) => {
    const _data = { ...data };
    _data.value = blok.multiple
      ? (Array.from(values) as string[])
      : (Array.from(values)[0] as string);
    _data.txt = Array.isArray(_data.value)
      ? _data.value.join(", ")
      : _data.value;

    callback(_data);
  };
  return (
    <HeroSelect
      label={blok.label}
      aria-label={blok.id}
      placeholder={blok.placeholder}
      selectionMode={blok.multiple ? "multiple" : "single"}
      selectedKeys={
        blok.multiple
          ? (data.value as string[])
          : data.value
          ? [data.value as string]
          : []
      }
      isRequired={blok.required}
      isInvalid={!!data.err}
      errorMessage={data.err}
      onSelectionChange={(values) => handleChange(values)}
    >
      {blok.options.map((opt) => (
        <HeroSelectItem key={opt.value}>{opt.name}</HeroSelectItem>
      ))}
    </HeroSelect>
  );
}
