import React, { ReactNode, createContext, useEffect, useState } from "react";
import { ThemeName, getTheme } from "../styles/theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/global";

const DEFAULT_THEME_NAME: ThemeName = "light";
const THEME_LOCALSTORAGE_KEY = "book_store_theme";

interface ThemeContextState {
  themeName: ThemeName;
  toggleTheme: () => void;
}

const defaultState: ThemeContextState = {
  themeName: DEFAULT_THEME_NAME,
  toggleTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextState>(defaultState);

export const BookStoreThemeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [themeName, setThemeName] = useState<ThemeName>(DEFAULT_THEME_NAME);

  useEffect(() => {
    const savedThemeName =
      (localStorage.getItem(THEME_LOCALSTORAGE_KEY) as ThemeName) ||
      DEFAULT_THEME_NAME;
    setThemeName(savedThemeName);
  }, []);

  const toggleTheme = () => {
    setThemeName((prev) => {
      const nextTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem(THEME_LOCALSTORAGE_KEY, nextTheme);
      return nextTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={getTheme(themeName)}>
        <GlobalStyle themeName={themeName} />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
