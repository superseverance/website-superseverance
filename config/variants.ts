const container = "mx-4 md:mx-8 lg:mx-auto max-w-4xl min-h-[inherit]"
const columns = "flex items-center flex-wrap gap-y-4 -mx-2 min-h-[inherit]"
const column = "flex-none max-md:w-full md:flex-1 px-2 space-y-2"
const grid = "grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
const themes = {
    primary: { section: "bg-primary-500", column: "text-primay-750", header: "text-primary-850" },
    "primary-dark": { section: "bg-primary-850", column: "text-primary-50", header: "text-primary-250" },
    secondary: { section: "bg-secondary-500", column: "text-secondary-150", header: "text-secondary-50" },
    "secondary-dark": { section: "bg-secondary-850", column: "text-secondary-50", header: "text-secondary-150" },
    dark: { section: "bg-neutral-900", column: "text-neutral-50", header: "text-white" },
}

export const variants = { container, columns, column, grid, themes } as const