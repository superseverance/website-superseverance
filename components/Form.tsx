import type { Form } from "@/sbComponentType";
import {
  SbBlokData,
  storyblokEditable,
  StoryblokComponent,
} from "@storyblok/react";
import { Fragment, ReactNode, useState } from "react";
import { tv } from "tailwind-variants";
import {
  Button as HeroButton,
  Form as HeroForm,
  Modal as HeroModal,
  ModalContent as HeroModalContent,
  Drawer as HeroDrawer,
  DrawerContent as HeroDrawerContent,
  useDisclosure,
} from "@heroui/react";
import { containerSlot, sectionSlot, wrapperSlot } from "@/config/variants";
import { getData, FieldData, FormData } from "@/libs/sbForm";
import getValidation from "@/libs/validations";
import Markdown from "markdown-to-jsx";
import { Typography } from "./Typography";
import { CalendarDate } from "@internationalized/date";

export interface FormComponent {
  blok: Form & SbBlokData;
  parent: string;
}

type FormStates = "ready" | "started" | "error" | "done";
type FormMessage = string | null;

export function Form({ blok, parent }: FormComponent) {
  const { wrapper } = classes();

  const { fields } = blok;
  const [data, setData] = useState(getData({ fields }));
  const [state, setState] = useState<FormStates>("ready");
  const [message, setMessage] = useState<FormMessage>(null);

  const handleChange = (field: FieldData) => {
    const _field = getValidation({ field });
    const _data = { ...data, [field.id]: _field };
    if (Object.values(_data).some((field) => !!field.err)) {
      setState("error");
    } else {
      setState("started");
    }
    setData(_data);
  };

  const handleSubmit = async () => {
    if (Object.values(data).some((field) => !!field.err)) {
      return setState("error");
    }
    // TODO compose contact and event data
    const skiped = ["email", ""];
    const attributes = Object.fromEntries(
      Object.values(data)
        .filter(({ id }) => !skiped.includes(id))
        .map(({ id, txt, value }) => [id.toUpperCase(), txt || value])
    );

    const contact = {
      email: data.email.value,
      listIds: blok.lists,
      attributes,
    };

    console.log(contact);

    const response = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contact }),
    });

    if (response.ok) {
      if (!!blok.success) {
        setMessage(getMessage(blok.success, data));
      }
      setState("done");
    } else {
      if (!!blok.error) {
        setMessage(getMessage(blok.error, data));
      }
      setState("error");
    }
  };

  const handleReset = () => {
    setData(getData({ fields }));
    setMessage(null);
    setState("ready");
  };

  const mode = blok.display || (parent === "page" && "section") || undefined;

  return (
    <Display blok={blok} mode={mode} callback={handleReset}>
      <div className="space-y-3">
        {blok.headline && (
          <Markdown
            options={{
              wrapper: ({ children }) => (
                <div className={wrapper()}>{children}</div>
              ),
              forceWrapper: true,
              overrides: Typography(),
            }}
          >
            {blok.headline}
          </Markdown>
        )}
        {message && (
          <Markdown
            options={{
              wrapper: ({ children }) => (
                <div className={wrapper()}>{children}</div>
              ),
              forceWrapper: true,
              overrides: Typography(),
            }}
          >
            {message}
          </Markdown>
        )}
      </div>
      {state !== "done" && (
        <HeroForm {...storyblokEditable(blok)} className="space-y-2">
          {fields?.map((field) => (
            <StoryblokComponent
              key={field._uid}
              blok={field}
              data={data[field.id]}
              callback={handleChange}
            />
          ))}
        </HeroForm>
      )}
      <div className="space-x-2">
        {state !== "done" ? (
          <Fragment>
            <HeroButton color="default" onPress={handleReset}>
              Annulla
            </HeroButton>
            <HeroButton
              color="primary"
              disabled={state === "error" || state === "ready"}
              onPress={handleSubmit}
            >
              Conferma
            </HeroButton>
          </Fragment>
        ) : (
          <HeroButton color="primary" onPress={handleReset}>
            Chiudi
          </HeroButton>
        )}
      </div>
    </Display>
  );
}

function getMessage(message: string, data: FormData) {
  const keys = message.match(/{{(.*?)}}/g);
  if (keys && !!keys.length) {
    keys.forEach((string) => {
      const key = string.replace("{{", "").replace("}}", "");
      const { value } = data[key];
      if (!value) return message;
      let replace = null;
      if (value instanceof CalendarDate) {
        replace = new Date(
          value.year,
          value.month,
          value.day
        ).toLocaleDateString("it-IT");
      } else if (Array.isArray(value)) {
        replace = value.join(", ");
      } else {
        replace = value;
      }
      message = message.replace(string, replace.toString());
    });
  }
  return message;
}

interface DisplayComponent {
  children: ReactNode;
  blok: Form & SbBlokData;
  mode: "modal" | "drawer" | "section" | undefined;
  callback: () => void;
}

function Display({ children, blok, mode, callback }: DisplayComponent) {
  const { section, container, wrapper } = classes();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleClose = () => {
    onOpenChange();
    callback();
  };

  switch (mode) {
    case "modal":
      return (
        <Fragment>
          <HeroButton color="primary" onPress={onOpen}>
            {blok.label}
          </HeroButton>
          <HeroModal isOpen={isOpen} onOpenChange={handleClose}>
            <HeroModalContent className="p-4 space-y-4">
              {children}
            </HeroModalContent>
          </HeroModal>
        </Fragment>
      );
    case "drawer":
      return (
        <Fragment>
          <HeroButton color="primary" onPress={onOpen}>
            {blok.label}
          </HeroButton>
          <HeroDrawer isOpen={isOpen} onOpenChange={handleClose}>
            <HeroDrawerContent className="p-4 space-y-4">
              {children}
            </HeroDrawerContent>
          </HeroDrawer>
        </Fragment>
      );
    case "section":
      return (
        <section className={section()}>
          <div className={container()}>{children}</div>
        </section>
      );

    default:
      return <div className={wrapper()}>{children}</div>;
  }
}

const classes = tv({
  slots: {
    section: sectionSlot.base,
    container: containerSlot.base + containerSlot.spaced,
    wrapper: wrapperSlot.base + wrapperSlot.level,
  },
});
