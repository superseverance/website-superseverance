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
            primary: {
              50: "#EEEBE3",
              100:"#F8CA60",
              150:"#DBD2BD",
              200:"#ECBD50",
              250:"#CABDA0",
              300:"#E0AF3F",
              350:"#BEAB7E",
              400:"#D4A22E",
              450:"#AF9A6A",
              500:"#C7941C",
              550:"#70603B",
              600:"#B08117",
              650:"#54482B",
              700:"#986E11",
              750:"#3F3723",
              800:"#815B0B",
              850:"#161514",
              900:"#694805",
            },
            secondary: {
              50: "#D1CED8",
              100:"#B8B3C4",
              150:"#9E98B0",
              200:"#5E5772",
              250:"#4E4763",
              300:"#3E3653",
              350:"#2E2643",
              400:"#261E3B",
              450:"#221A37",
              500:"#1E1533",
              550:"#1C1330",
              600:"#19112D",
              650:"#170F2A",
              700:"#140C26",
              750:"#120A23",
              800:"#0F071F",
              850:"#0C051C",
              900:"#090218",
            },
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
