import { useCallback, useEffect, useMemo, useState } from "react";
import { THEME_MODES, THEME_STORAGE_KEY, getInitialTheme } from "../constants/theme";
import { ThemeContext } from "./ThemeContext";

function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState(getInitialTheme);

  const isDarkMode = themeMode === THEME_MODES.dark;

  const setLightMode = useCallback(() => {
    setThemeMode(THEME_MODES.light);
  }, []);

  const setDarkMode = useCallback(() => {
    setThemeMode(THEME_MODES.dark);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeMode((currentTheme) =>
      currentTheme === THEME_MODES.dark ? THEME_MODES.light : THEME_MODES.dark
    );
  }, []);

  useEffect(() => {
    const rootElement = document.documentElement;

    rootElement.classList.remove(THEME_MODES.light, THEME_MODES.dark);
    rootElement.classList.add(themeMode);
  }, [themeMode]);

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);
  }, [themeMode]);

  const contextValue = useMemo(
    () => ({
      themeMode,
      isDarkMode,
      setLightMode,
      setDarkMode,
      toggleTheme,
    }),
    [themeMode, isDarkMode, setLightMode, setDarkMode, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
