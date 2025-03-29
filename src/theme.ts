import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: {
            value: { _light: "{colors.white}", _dark: "{colors.gray.800}" },
          },
          secondary: {
            value: { _light: "{colors.gray.100}", _dark: "{colors.gray.600}" },
          },
        },
        fg: {
          DEFAULT: {
            value: { _light: "{colors.gray.700}", _dark: "{colors.gray.100}" },
          },
        },
        border: {
          DEFAULT: {
            value: { _light: "{colors.gray.200}", _dark: "{colors.gray.500}" },
          },
        },
      },
    },
  },
});

export const theme = createSystem(defaultConfig, config);

