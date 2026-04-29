////// Slots //////
export const sectionSlot = {
  base: "px-4 md:px-6 lg:px-8 flex flex-col items-center",
  background: "relative z-0 overflow-hidden ",
};

export const containerSlot = {
  base: "w-full min-h-[inherit] max-w-5xl lg:max-w-7xl",
  spaced: "py-6 md:py-9 lg:py-12 ",
  background: "relative z-0 ",
  columns:
    "flex flex-wrap -mx-1 sm:-mx-2 md:-mx-3 lg:-mx-4 xl:-mx-5 gap-y-2 md:gap-y-3 lg:gap-y-4 xl:gap-y-5",
};

export const wrapperSlot = {
  base: "space-y-3 md:space-y-4 lg:space-y-5 ",
  level:
    "text-[2.2vw] sm:text-[1.6vw] md:text-[1.2vw] lg:text-[1vw] xl:text-[0.6vw] font-sans",
  column: "flex-none w-full sm:flex-1 p-1 sm:p-2 md:p-3 lg:p-4 xl:p-6",
};

export const typographySlots = {
  p: "font-normal text-[1.4em] leading-[1.1] text-neutral-500",
  h1: "font-black text-[6.6em] leading-[0.82] text-neutral-950",
  h2: "font-extrabold text-[5.2em] leading-[0.82] text-neutral-900",
  h3: "font-bold text-[4.8em] leading-[0.82] text-neutral-900",
  h4: "font-semibold text-[3.2em] leading-[0.88] text-neutral-800",
  h5: "font-medium text-[2.8em] leading-[0.88] text-neutral-800",
  h6: "font-medium text-[2em] leading-[0.88] text-neutral-700",
  ul: "list-disc my-4 leading-none space-y-2",
  ol: "my-4 leading-none space-y-2",
  li: "font-normal text-[1.4em] leading-[1.1] text-neutral-500",
  a: `
      font-medium text-neutral-600
      transition-all duration-300 ease-in-out
      underline underline-offset-4 decoration-1 decoration-foreground/25
      hover:text-primary hover:underline-offset-2 hover:decoration-primary/75
    `,
  img: "",
};

////// Variants //////
export const widthVariants = {
  "1/1": { wrapper: "sm:flex-none sm:w-full" },
  "2/3": { wrapper: "sm:flex-none sm:w-2/3" },
  "1/2": { wrapper: "md:flex-none md:w-1/2" },
  "1/3": { wrapper: "md:flex-none md:w-1/3" },
  "1/4": { wrapper: "md:flex-none md:w-1/4" },
} as const;

export const marginVariants = {
  slim: {
    container: "py-2 md:py-4 lg:py-6 gap-y-1 md:gap-y-2 lg:gap-y-3",
    wrapper: "space-y-2 ",
  },
  default: {
    container: "py-6 md:py-12 lg:py-18 gap-y-3 md:gap-y-6 lg:gap-y-9",
    wrapper: "space-y-3 ",
  },
  thick: {
    container: "py-8 md:py-16 lg:py-24 gap-y-4 md:gap-y-8 lg:gap-y-12",
    wrapper: "space-y-4 ",
  },
  screen: {
    container: "py-12 md:py-24 lg:py-36 gap-y-6 md:gap-y-12 lg:gap-y-18",
    wrapper: "space-y-6 ",
  },
} as const;

export const hasHeaderVariant = {
  true: {
    main: "-mt-12 md:-mt-16 lg:-mt-20 ",
    section: "first:pt-12 first:md:pt-16 first:lg:pt-20 ",
  },
} as const;

export const heightVariant = {
  true: {
    section: "item-end ",
  },
};

export const marginCompoundVariants = [
  {
    margin: "default",
    height: true,
    class: {
      section: "min-h-[75vh] xs:min-h-[66vh] md:min-h-[50vh] ",
    },
  },
  {
    margin: "slim",
    height: true,
    class: {
      section: "min-h-[50vh] xs:min-h-[33vh] md:min-h-[25vh] ",
    },
  },
  {
    margin: "thick",
    height: true,
    class: {
      section: "min-h-screen xs:min-h-[75vh] md:min-h-[66vh] ",
    },
  },
  {
    margin: "screen",
    height: true,
    class: {
      section: "min-h-screen ",
      container: "items-end",
    },
  },
] as const;

export const alignVariants = {
  top: {
    container: "items-start",
  },
  center: {
    container: "items-center",
  },
  bottom: {
    container: "items-end",
  },
  fill: {
    container: "items-stretch",
  },
} as const;

export const justifyVariants = {
  left: {
    container: "justify-start text-left ",
    wrapper: "text-left",
  },
  center: {
    container: "justify-center text-center ",
    wrapper: "text-center",
  },
  right: {
    container: "justify-end text-right ",
    wrapper: "text-right [&_ul]:text-right [&_li]:mr-6",
  },
  spaced: {
    container: "justify-between text-right ",
    wrapper: "text-justify",
  },
} as const;

export const themeVariants = {
  primary: {
    section: "bg-primary-50 text-primary-400",
    wrapper: "bg-primary-50 text-primary-400 rounded-md",
    h1: "text-primary-900",
    h2: "text-primary-900",
    h3: "text-primary-800",
    h4: "text-primary-800",
    h5: "text-primary-700",
    h6: "text-primary-700",
    p: "text-primary-600",
    li: "text-primary-600",
    a: "text-primary-700 decoration-primary-700/50 hover:text-primary-750 hover:decoration-primary-750",
    dot: "bg-primary-300",
    line: "bg-primary-200",
    icon: "fill-primary-400",
  },
  "primary-dark": {
    section: "bg-primary-900 text-primary-400",
    wrapper: "bg-primary-900 text-primary-400 rounded-md",
    h1: "text-primary-50",
    h2: "text-primary-50",
    h3: "text-primary-100",
    h4: "text-primary-100",
    h5: "text-primary-200",
    h6: "text-primary-200",
    p: "text-primary-300",
    li: "text-primary-300",
    a: "text-primary-200 decoration-primary-200/50 hover:text-primary-250 hover:decoration-primary-250",
    dot: "bg-primary-700",
    line: "bg-primary-800",
    icon: "fill-primary-500",
  },
  secondary: {
    section: "bg-secondary-50 text-secondary-400",
    wrapper: "bg-secondary-50 text-secondary-400 rounded-md",
    h1: "text-secondary-900",
    h2: "text-secondary-900",
    h3: "text-secondary-800",
    h4: "text-secondary-800",
    h5: "text-secondary-700",
    h6: "text-secondary-700",
    p: "text-secondary-600",
    li: "text-secondary-600",
    a: "text-secondary-700 decoration-secondary-700/50 hover:text-secondary-750 hover:decoration-secondary-750",
    dot: "bg-primary-300",
    line: "bg-primary-200",
    icon: "fill-primary-400",
  },
  "secondary-dark": {
    section: "bg-secondary-900 text-secondary-400",
    wrapper: "bg-secondary-900 text-secondary-400 rounded-md",
    h1: "text-secondary-50",
    h2: "text-secondary-50",
    h3: "text-secondary-100",
    h4: "text-secondary-100",
    h5: "text-secondary-200",
    h6: "text-secondary-200",
    p: "text-secondary-300",
    li: "text-secondary-300",
    a: "text-secondary-200 decoration-secondary-200/50 hover:text-secondary-250 hover:decoration-seconday-250",
    dot: "bg-primary-300",
    line: "bg-primary-200",
    icon: "fill-primary-400",
  },
  dark: {
    section: "bg-neutral-900 text-neutral-300",
    wrapper: "bg-neutral-900 text-neutral-300 rounded-md",
    h1: "text-white",
    h2: "text-white",
    h3: "text-neutral-100",
    h4: "text-neutral-100",
    h5: "text-neutral-200",
    h6: "text-neutral-200",
    p: "text-neutral-300",
    li: "text-neutral-300",
    a: "text-neutral-200 decoration-neutral-200/50 hover:text-neutral-100 hover:decoration-primary-100",
    dot: "bg-primary-300",
    line: "bg-primary-200",
    icon: "fill-primary-400",
  },
} as const;

export const themeCompoundVariants = [
  {
    theme: "primary",
    level: "high",
    class: {
      section: "",
      h1: "text-primary-650",
      h2: "text-primary-650",
      h3: "text-primary-750",
      h4: "text-primary-750",
      h5: "text-primary-850",
      h6: "text-primary-850",
      p: "text-primary-900",
      li: "text-primary-900",
      a: "text-primary-850 hover:text-primary-700 hover:decoration-primary-700",
    },
  },
  {
    theme: "primary",
    level: "low",
    class: {
      section: "",
      h1: "text-primary-600",
      h2: "text-primary-600",
      h3: "text-primary-500",
      h4: "text-primary-500",
      h5: "text-primary-400",
      h6: "text-primary-400",
      p: "text-primary-300",
      li: "text-primary-300",
      a: "text-primary-500 hover:text-primary-550 hover:decoration-primary-550",
    },
  },
  {
    theme: "primary-dark",
    level: "high",
    class: {
      section: "",
      h1: "text-primary-150",
      h2: "text-primary-150",
      h3: "text-primary-250",
      h4: "text-primary-250",
      h5: "text-primary-350",
      h6: "text-primary-350",
      p: "text-primary-500",
      li: "text-primary-500",
      a: "text-primary-550 hover:text-primary-300 hover:decoration-primary-300",
    },
  },
  {
    theme: "primary-dark",
    level: "low",
    class: {
      section: "",
      h1: "text-primary-200",
      h2: "text-primary-200",
      h3: "text-primary-300",
      h4: "text-primary-300",
      h5: "text-primary-400",
      h6: "text-primary-400",
      p: "text-primary-500",
      li: "text-primary-500",
      a: "text-primary-400 hover:text-primary-450 hover:decoration-primary-450",
    },
  },
  {
    theme: "secondary",
    level: "high",
    class: {
      section: "",
      h1: "text-secondary-650",
      h2: "text-secondary-650",
      h3: "text-secondary-550",
      h4: "text-secondary-550",
      h5: "text-secondary-450",
      h6: "text-secondary-450",
      p: "text-secondary-350",
      li: "text-secondary-350",
      a: "text-secondary-450 hover:text-secondary-400 hover:decoration-secondary-400",
    },
  },
  {
    theme: "secondary",
    level: "low",
    class: {
      section: "",
      h1: "text-secondary-600",
      h2: "text-secondary-600",
      h3: "text-secondary-500",
      h4: "text-secondary-500",
      h5: "text-secondary-400",
      h6: "text-secondary-400",
      p: "text-secondary-300",
      li: "text-secondary-300",
      a: "text-secondary-500 hover:text-secondary-550 hover:decoration-secondary-550",
    },
  },
  {
    theme: "secondary-dark",
    level: "high",
    class: {
      section: "",
      h1: "text-secondary-150",
      h2: "text-secondary-250",
      h3: "text-secondary-250",
      h4: "text-secondary-350",
      h5: "text-secondary-350",
      h6: "text-secondary-450",
      p: "text-secondary-400",
      li: "text-secondary-400",
      a: "text-secondary-350  hover:text-secondary-300 hover:decoration-secondary-300",
    },
  },
  {
    theme: "secondary-dark",
    level: "low",
    class: {
      section: "",
      h1: "text-secondary-200",
      h2: "text-secondary-200",
      h3: "text-secondary-300",
      h4: "text-secondary-300",
      h5: "text-secondary-400",
      h6: "text-secondary-400",
      p: "text-secondary-500",
      li: "text-secondary-500",
      a: "text-secondary-400 hover:text-secondary-450 hover:decoration-secondary-450",
    },
  },
] as const;

export const darkVariant = {
  true: {
    section: "text-background bg-foreground ",
  },
} as const;

export const levelVariants = {
  high: {
    wrapper: "space-y-6 md:space-y-7 lg:space-y-8",
    p: "font-medium",
    h1: "font-serif tracking-tighter",
    h2: "font-serif tracking-tighter",
    h3: "font-serif tracking-tighter",
    h4: "font-serif tracking-tighter",
    h5: "font-serif tracking-tighter",
    h6: "font-serif tracking-tighter",
    ul: "",
    ol: "",
    li: "",
    a: "",
    img: "",
  },
  low: {
    wrapper: "space-y-2 md:space-y-3 lg:space-y-4",
    p: "font-normal",
    h1: "font-extralight text-[4.6em] leading-[0.82]",
    h2: "font-extralight text-[4em] leading-[0.82]",
    h3: "font-light text-[3.6em] leading-[0.82]",
    h4: "font-light text-[3em] leading-[0.82]",
    h5: "font-normal text-[2.4em] leading-[0.82]",
    h6: "font-normal text-[1.6em] leading-[0.82]",
    ul: "",
    ol: "",
    li: "",
    a: "",
    img: "",
  },
} as const;
