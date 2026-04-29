// tailwind.config.js
import { heroui } from "@heroui/react";
import { generatePalette } from "./libs/palette";
import { colors } from "./config/styles";

module.exports = {
  content: ["./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    heroui({
      // addCommonColors: true,
      themes: {
        custom: {
          colors: {
            background: colors.background,
            foreground: colors.foreground,
            divider: colors.divider,
            focus: colors.focus,
            default: { ...generatePalette(colors.neutral.start, colors.neutral.end) },
            primary: { ...generatePalette(colors.primary.start, colors.primary.end) },
            secondary: { ...generatePalette(colors.secondary.start, colors.secondary.end) },
            success: colors.success,
            warning: colors.warning,
            danger: colors.danger,
          },
        },
      },
    }),
  ],
};

// TODO
// layout: {
//   dividerWeight: "1px", // h-divider the default height applied to the divider component
//   disabledOpacity: 0.5, // this value is applied as opacity-[value] when the component is disabled
//   fontSize: {
//     tiny: "0.75rem", // text-tiny
//     small: "0.875rem", // text-small
//     medium: "1rem", // text-medium
//     large: "1.125rem", // text-large
//   },
//   lineHeight: {
//     tiny: "1rem", // text-tiny
//     small: "1.25rem", // text-small
//     medium: "1.5rem", // text-medium
//     large: "1.75rem", // text-large
//   },
//   radius: {
//     small: "8px", // rounded-small
//     medium: "12px", // rounded-medium
//     large: "14px", // rounded-large
//   },
//   borderWidth: {
//     small: "1px", // border-small
//     medium: "2px", // border-medium (default)
//     large: "3px", // border-large
//   },
// },
