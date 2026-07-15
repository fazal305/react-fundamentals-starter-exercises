export const THEME_MODES = {
  light: "light",
  dark: "dark",
};

export const THEME_STORAGE_KEY = "react-context-theme-mode";

export function getInitialTheme() {
  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme === THEME_MODES.light || savedTheme === THEME_MODES.dark) {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? THEME_MODES.dark
    : THEME_MODES.light;
}
