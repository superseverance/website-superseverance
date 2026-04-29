import type { Picker as SbPicker } from "@/sbComponentType";
import { SbBlokData } from "@storyblok/react";
import { DateValue, DatePicker as HeroDatePicker } from "@heroui/react";
import { FieldData } from "@/libs/sbForm";
import { I18nProvider } from "@react-aria/i18n";

interface PickerComponent {
  blok: SbPicker & SbBlokData;
  data: FieldData & {
    value: DateValue | null;
  };
  callback: (v: FieldData) => void;
}

export function Picker({ blok, data, callback }: PickerComponent) {
  const handleChange = (value: DateValue | null) => {
    const _data = { ...data };
    _data.txt = !!value
      ? new Date(value.year, value.month - 1, value.day).toLocaleDateString(
          "it-IT"
        )
      : null;
    _data.value = value;
    callback(_data);
  };
  return (
    <I18nProvider locale="it-IT">
      <HeroDatePicker
        label={blok.label}
        isRequired={blok.required}
        aria-label={blok.id}
        isInvalid={!!data.err}
        errorMessage={data.err}
        onChange={(value) => handleChange(value)}
      />
    </I18nProvider>
  );
}
