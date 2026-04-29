import type {
  Checkbox,
  Input,
  Picker,
  Select,
  Slider,
} from "@/sbComponentType";
import type { DateValue } from "@heroui/react";
import { parseDate } from "@internationalized/date";

export type FieldData = {
  id: string;
  value:
    | string
    | string[]
    | number
    | number[]
    | boolean
    | DateValue
    | undefined
    | null;
  txt: string | null;
  req: boolean;
  type: string;
  err: string | null;
};

export type FormData = { [key: string]: FieldData };

interface FormFields {
  fields: Array<Checkbox | Input | Picker | Select | Slider> | undefined;
}

export function getData({ fields }: FormFields) {
  const data: FormData = {};
  fields?.forEach((field) => {
    const _data: FieldData = {
      id: field.id,
      value: undefined,
      req: !!field.required,
      type: field.component === "input" ? field.type : field.component,
      err: null,
      txt: null,
    };

    switch (field.component) {
      case "input":
        _data.value = field.hidden ? field.placeholder : "";
        break;

      case "picker":
        _data.value =
          field.hidden && field.default ? parseDate(field.default) : null;
        break;

      case "select":
        _data.value =
          field.hidden && field.placeholder
            ? field.multiple
              ? field.placeholder.split(",").map((v) => v.trim())
              : field.placeholder
            : field.multiple
            ? []
            : "";
        break;

      case "slider":
        _data.value = Number(field.default ?? 0);
        break;

      case "checkbox":
        _data.value = field.default ?? false;
        break;
    }

    data[field.id] = _data;
  });

  return data;
}
