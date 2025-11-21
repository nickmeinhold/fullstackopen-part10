const theme = {
  colors: {
    appBarBackground: "#24292e",
    primary: "#0366d6",
    white: "#ffffff",
    textPrimary: "#24292e",
    textSecondary: "#586069",
    background: "#e1e4e8",
    languageBackground: "#0366d6",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    heading: 20,
  },
  spacing: {
    tiny: 4,
    small: 8,
    medium: 12,
    large: 16,
  },
} as const;

export type Theme = typeof theme;
export default theme;
