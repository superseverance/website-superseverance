import type { Input } from "@/sbComponentType";
import { SbBlokData } from "@storyblok/react";
import { FieldData } from "@/libs/sbForm";
import { Input as HeroInput } from "@heroui/react";

interface InputComponent {
  blok: Input & SbBlokData;
  data: FieldData;
  parent: string;
  callback: (v: FieldData) => void;
}

export function Input({ blok, data, callback }: InputComponent) {
  return (
    <HeroInput
      id={blok.id}
      type={blok.type}
      label={blok.label}
      aria-label={blok.id}
      value={data.value as string}
      placeholder={blok.placeholder}
      isRequired={blok.required}
      errorMessage={data.err}
      onValueChange={(value) => callback({ ...data, value })}
    />
  );
}
