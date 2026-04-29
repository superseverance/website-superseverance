import { Levels, Typography, Themes } from "@/components/Typography";
import {
  containerSlot,
  darkVariant,
  heightVariant,
  marginCompoundVariants,
  marginVariants,
  sectionSlot,
  themeCompoundVariants,
  themeVariants,
  widthVariants,
  wrapperSlot,
} from "@/config/variants";
import Markdown from "markdown-to-jsx";
import { Fragment, useState } from "react";
import { tv } from "tailwind-variants";
import { colors } from "@/config/styles";
import { generatePalette } from "@/libs/palette";
import { ChromePicker } from "react-color"
import { Icon } from "@/components/Icon";
import JSONPretty from 'react-json-pretty';

interface Color {
  id: string,
  hex: string
}

type Palettes = "primary" | "secondary" | "neutral"

export default function Styles() {

  const [active, setActive] = useState<string | null>(null)
  const [codes, setCodes] = useState<any | null>(null)

  const [color, setColor] = useState<{ [key: string]: { start: string, end: string } }>({
    primary: { start: colors.primary.start, end: colors.primary.end },
    secondary: { start: colors.secondary.start, end: colors.secondary.end },
    neutral: { start: colors.neutral.start, end: colors.neutral.end }
  })

  const [palette, setPalette] = useState<{ [key: string]: { [key: string]: string } }>({
    primary: generatePalette(color.primary.start, color.primary.end),
    secondary: generatePalette(color.secondary.start, color.secondary.end),
    neutral: generatePalette(color.neutral.start, color.neutral.end),
  })

  console.log(palette.primary)

  const baseTheme = (name: Palettes) => ({
    light: {
      background: palette[name][400],
      foreground: palette[name][700],
      title: palette[name][900],
      subtitle: palette[name][800],
      link: palette[name][250],
    },
    dark: {
      foreground: palette[name][300],
      background: palette[name][600],
      title: palette[name][100],
      subtitle: palette[name][200],
      link: palette[name][850],
    }

  })

  const [theme, setTheme] = useState<{ [key: string]: { [key: string]: { [key: string]: string } } }>({
    primary: { ...baseTheme("primary") },
    secondary: { ...baseTheme("secondary") },
    neutral: {
      ...baseTheme("neutral"), light: {
        success: colors.success,
        warning: colors.warning,
        danger: colors.danger
      }
    },
  })

  const handleColor = ({ id, hex }: Color) => {
    const [p, c] = id.split("-")
    setColor({ ...color, [p]: { ...color[p], [c]: hex } })
    setActive(null)
  }

  const handlePalette = ({ id, hex }: Color) => {
    const [p, c] = id.split("-")
    setPalette({ ...palette, [p]: { ...palette[p], [c]: hex } })
    setActive(null)
  }

  const handleTheme = ({ id, hex }: Color) => {
    const [t, n, v] = id.split("-")
    setTheme({ ...theme, [t]: { ...theme[t], [n]: { ...theme[t][n], [v]: hex } } })
    setActive(null)
  }

  const updatePalette = ({ id }: { id: string }) => {
    const newPalette = generatePalette(color[id].start, color[id].end)
    setPalette({ ...palette, [id]: newPalette })
  }

  const handleCodes = () => {
    setActive("copy-colors")
    setCodes({ color, palette, theme })
  }


  const { section, container, wrapper } = classes();

  interface PaletteProps {
    id: Palettes,
    title: string,
    palette: { [key: string]: string }
  }

  const Palette = ({ id, title, palette }: PaletteProps) => (
    <div id={id} className="pt-16">
      <h3 className="mb-4 flex items-center">
        <span className="text-xl font-semibold flex-1">Colori palette {title}</span>
        <span className="inline-flex items-center gap-2">
          <button className="mx-2 text-sm font-bold bg-neutral-200 hover:bg-neutral-100 rounded-full px-2 py-1" onClick={() => updatePalette({ id })}>Aggiorna palette</button>
          <Swatch name={`${id}-start`} code={color[id].start} active={`${id}-start` === active} onOpen={setActive} onClose={handleColor} role="inline" />
          <Icon name="chevron" classes="rotate-180 w-8" />
          <Swatch name={`${id}-end`} code={color[id].end} active={`${id}-end` === active} onOpen={setActive} onClose={handleColor} role="inline" />
        </span>
      </h3>
      <hr className="mb-8 border-neutral-300" />
      <div className="flex flex-wrap gap-4 mb-12">
        {Object.entries(palette).map(([index, hex]) => {
          const swatch = `${id}-${index}`
          return (<Swatch name={swatch} code={hex} active={swatch === active} onOpen={setActive} onClose={handlePalette} key={swatch} />)
        })}
      </div>
      <hr className="mb-8 border-neutral-300" />
      <h4 className="text-xl font-semibold mb-8">Colori tema {title}</h4>
      <div className="flex flex-wrap gap-4 mb-4">
        <Swatch name={`${id}-light-foreground`} code={theme[id]["light"]["foreground"]} active={`${id}-light-foreground` === active} onOpen={setActive} onClose={handleTheme} role="main" />
        <Swatch name={`${id}-light-background`} code={theme[id]["light"]["background"]} active={`${id}-light-background` === active} onOpen={setActive} onClose={handleTheme} role="main" />
        <Swatch name={`${id}-light-title`} code={theme[id]["light"]["title"]} active={`${id}-light-title` === active} onOpen={setActive} onClose={handleTheme} role="main" />
        <Swatch name={`${id}-light-subtitle`} code={theme[id]["light"]["subtitle"]} active={`${id}-light-subtitle` === active} onOpen={setActive} onClose={handleTheme} role="main" />
        <Swatch name={`${id}-light-link`} code={theme[id]["light"]["link"]} active={`${id}-light-link` === active} onOpen={setActive} onClose={handleTheme} role="main" />
      </div>
      <h4 className="text-xl font-semibold mb-8">Colori tema {title} scuro</h4>
      <div className="flex flex-wrap gap-4 mb-4">
        <Swatch name={`${id}-dark-foreground`} code={theme[id]["dark"]["foreground"]} active={`${id}-dark-foreground` === active} onOpen={setActive} onClose={handleTheme} role="main" />
        <Swatch name={`${id}-dark-background`} code={theme[id]["dark"]["background"]} active={`${id}-dark-background` === active} onOpen={setActive} onClose={handleTheme} role="main" />
        <Swatch name={`${id}-dark-title`} code={theme[id]["dark"]["title"]} active={`${id}-dark-title` === active} onOpen={setActive} onClose={handleTheme} role="main" />
        <Swatch name={`${id}-dark-subtitle`} code={theme[id]["dark"]["subtitle"]} active={`${id}-dark-subtitle` === active} onOpen={setActive} onClose={handleTheme} role="main" />
        <Swatch name={`${id}-dark-link`} code={theme[id]["dark"]["link"]} active={`${id}-dark-link` === active} onOpen={setActive} onClose={handleTheme} role="main" />
        {id === "neutral" &&
          <Fragment>
            <Swatch name={`${id}-light-success`} code={theme[id]["light"]["success"]} active={`${id}-light-success` === active} onOpen={setActive} onClose={handleTheme} role="main" />
            <Swatch name={`${id}-light-warning`} code={theme[id]["light"]["warning"]} active={`${id}-light-warning` === active} onOpen={setActive} onClose={handleTheme} role="main" />
            <Swatch name={`${id}-light-danger`} code={theme[id]["light"]["danger"]} active={`${id}-light-danger` === active} onOpen={setActive} onClose={handleTheme} role="main" />
          </Fragment>
        }
      </div>
    </div >
  )

  interface PlaceholderProps {
    children: string
    tag: string
    theme?: Themes
    level?: Levels
  }

  const Placeholder = ({ children, tag, theme = undefined, level = undefined }: PlaceholderProps) => (
    <div className="py-2 w-3/4">
      <Markdown options={{ wrapper: null, overrides: Typography({ theme, level }) }}>{children}</Markdown>
      <p className="mt-2 font-bold">{tag}</p>
    </div>
  )

  interface PlaceholdersProps {
    id: string,
    title: string
    font: string[]
    level?: Levels
  }

  const Placeholders = ({ id, title, font, level }: PlaceholdersProps) => {
    return (
      <div id={id} className="pt-16 space-y-4">
        <h4 className="text-xl font-semibold mb-4">{title}</h4>
        <p className="space-x-2"><span>Font: {font.map(f => <b className="ml-1">{f}</b>)}</span></p>
        <hr className="mb-8 border-neutral-300" />
        {Object.entries(seeds).map(([tag, text], index) => <Placeholder tag={tag} level={level} key={`${id}-${index}`}>{text}</Placeholder>)}
      </div >
    )
  }


  interface ThemeProps {
    id: string
    palette: Palettes
    version: "light" | "dark"
  }

  const Theme = ({ id, palette, version }: ThemeProps) => {
    let themeName: Themes = undefined
    if (palette === "neutral") {
      themeName = version === "dark" ? "dark" : undefined
    } else {
      themeName = `${palette}${version === "dark" ? "-dark" : ""}`
    }
    return (
      <section id={id} className={section({ theme: themeName, margin: "thick" })} style={{ backgroundColor: theme[palette][version].background }}>
        <div className={container({ column: true })}>
          <div className={wrapper({ column: true, width: "2/3" })}>
            <Markdown options={{ wrapper: null, overrides: Typography({ theme: themeName }) }}>
              {Object.values(seeds).join("\n")}
            </Markdown>
            <hr className="my-12" />
            <Markdown options={{ wrapper: null, overrides: Typography({ theme: themeName, level: "high" }) }}>
              {Object.values(seeds).join("\n")}
            </Markdown>
            <hr className="my-12" />
            <Markdown options={{ wrapper: null, overrides: Typography({ theme: themeName, level: "low" }) }}>
              {Object.values(seeds).join("\n")}
            </Markdown>
          </div>
        </div>
      </section>
    )
  }


  return (
    <Fragment>
      <nav className="sticky top-0 py-4 z-50 bg-background/50 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl flex gap-8">
          <ul className="inline-flex gap-4">
            <li className="font-bold text-xl"><a className="text-lg underline" href="#colori">Colori</a>:</li>
            <li><a className="text-lg underline" href="#colori-primari">Primari</a></li>
            <li><a className="text-lg underline" href="#colori-secondari">Secondari</a></li>
            <li><a className="text-lg underline" href="#colori-neutri">Neutri</a></li>
          </ul>
          <ul className="inline-flex gap-4">
            <li className="font-bold text-xl"><a className="text-lg underline" href="#testi">Testi</a>:</li>
            <li><a className="text-lg underline" href="#testi-normali">Normali</a></li>
            <li><a className="text-lg underline" href="#testi-evidenti">Evidenti</a></li>
            <li><a className="text-lg underline" href="#testi-marginali">Marginali</a></li>
          </ul>
          <ul className="inline-flex gap-4">
            <li className="font-bold text-xl"><a className="text-lg underline" href="#temi">Temi</a>:</li>
            <li><a className="text-lg underline" href="#tema-scuro">Scuro</a></li>
            <li><a className="text-lg underline" href="#tema-primario">Primario</a></li>
            <li><a className="text-lg underline" href="#tema-secondario">Secondario</a></li>
          </ul>
        </div>
      </nav>

      <section id="colori" className="py-16 pt-24 px-4 font-sans">
        <div className="mx-auto max-w-5xl relative">
          <h2 className="text-3xl font-black mb-0! inline-flex item-center gap-2 w-full sticky top-14 pb-4 z-50 bg-background/50">
            Colori
            <button className="mx-2 text-sm font-bold text-white bg-neutral-800 hover:bg-neutral-700 rounded-full px-3 py-1.5" onClick={() => handleCodes()}>Copia codici colore</button>
          </h2>
          <Palette
            id="primary"
            title="primari"
            palette={palette.primary}
          />
          <Palette
            id="secondary"
            title="secondaro"
            palette={palette.secondary}
          />
          <Palette
            id="neutral"
            title="neutri"
            palette={palette.neutral}
          />


        </div>
        {active === "copy-colors" &&
          <div className="fixed bg-black/90 backdrop-blur-2xl inset-0 z-60">
            <div className="mx-auto max-w-5xl p-4 bg-white rounded-2xl">
              <h3>Copia il codide e invialo allo sviluppatore</h3>
              <JSONPretty id="json-pretty" className="overflow-y-scroll hides-crollbar max-h-[80vh]" data={codes}></JSONPretty>
              <button className="px-3 py-1.5" onClick={() => setActive(null)}>Chiudi</button>
            </div>
          </div>
        }
      </section>

      <section id="testi" className="py-16 px-4 font-sans">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-black mb-4!">Testi</h2>
          <Placeholders
            id="testi-normali"
            title="Stili carattere di base"
            font={["lato"]}
          />
          <Placeholders
            id="testi-evidenti"
            title="Stili carattere evidenti"
            font={["lato"]}
            level="high"
          />
          <Placeholders
            id="testi-marginali"
            title="Stili carattere marginali"
            font={["lato"]}
            level="low"
          />

        </div>
      </section>

      <section id="temi" className="py-16 px-4 font-sans">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-black">Temi</h2>
        </div>
      </section>
      <Theme id="tema-primario" palette="primary" version="light" />
      <Theme id="tema-primario-scuro" palette="primary" version="dark" />
      <Theme id="tema-secondario" palette="secondary" version="light" />
      <Theme id="tema-secondario-scuro" palette="secondary" version="dark" />
      <Theme id="tema-scuro" palette="neutral" version="dark" />

    </Fragment >
  );


  interface SwatchComponent {
    name: string
    code: string
    active: boolean
    onOpen: (id: string) => void
    onClose: ({ id, hex }: Color) => void
    role?: "inline" | "main"
  }

  function Swatch({ role, name, code, active, onOpen, onClose }: SwatchComponent) {
    const [hex, setHex] = useState(code)
    const { wrapper, placeholder, picker, modal } = swatch()

    return (
      <Fragment key={name}>
        <div className={wrapper({ role })} >
          <div
            className={placeholder({ role })}
            style={{ backgroundColor: hex }}
            onClick={() => onOpen(name)}
          >
            {active &&
              <ChromePicker
                color={hex}
                onChange={({ hex }) => setHex(hex)}
                className={picker()}
                disableAlpha
              />
            }
          </div>
          {role !== "inline" &&
            <Fragment>
              <h3 className="text-md font-bold">{name}</h3>
              <p className="text-sm">{hex}</p>
            </Fragment>
          }
        </div>
        {active &&
          <div className={modal()} onClick={() => onClose({ id: name, hex })} />
        }
      </Fragment >
    )
  }
}


const seeds = {
  "Intestazione 1": `# Beatae quae dolorum`,
  "Intestazione 2": `## Provident quaerat quia et debitis`,
  "Intestazione 3": `### Et et labore qui reprehenderit aut`,
  "Intestazione 4": `#### Explicabo omnis eos quis tempore`,
  "Intestazione 5": `##### Repudiandae ipsum et et in numquam omnis distinctio asperiores alias`,
  "Intestazione 6": `###### Voluptas sint distinctio laborum quasi qui rerum ut error dolorem`,
  "Paragrafo": `Velit repudiandae consequuntur *deserunt* reprehenderit unde at ipsa officia. **Vel dolores occaecati sit.** Magnam velit magni [provident]("#","link-example") et neque nobis dolor.\n Ipsum enim quod sit fugit. Ratione facere ad et doloribus ut dolorem sunt ab id.`,
  "Lista": `- Delectus veniam commodi est ut soluta consequatur\n- Autem adipisci autem quae sit et\n- Qui amet ab quaerat neque sunt voluptas`,
}

const swatch = tv({
  slots: {
    wrapper: "w-24 text-center relative z-10",
    placeholder: "border-foreground/10 border-1 aspect-square rounded-full mb-2 z-20",
    picker: "absolute z-30 mb-2 bottom-full left-1/2 -translate-x-1/2",
    modal: "fixed inset-0 z-0"
  },
  variants: {
    role: {
      inline: {
        wrapper: "w-auto inline-flex items-center",
        placeholder: "w-12"
      },
      main: {
        wrapper: "w-48",
        placeholder: "",
      }
    },
  }
})

const classes = tv({
  slots: {
    section: `${sectionSlot.base}`,
    container: `${containerSlot.base} ${containerSlot.spaced}`,
    wrapper: `${wrapperSlot.base} ${wrapperSlot.level}`,
  },
  variants: {
    column: {
      true: {
        container: containerSlot.columns,
        wrapper: wrapperSlot.column,
      },
    },
    width: widthVariants,
    theme: themeVariants,
    margin: marginVariants,
    height: heightVariant,
    dark: darkVariant,
  },
  compoundVariants: [...themeCompoundVariants, ...marginCompoundVariants],
});
