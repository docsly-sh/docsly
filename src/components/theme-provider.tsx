"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { ThemeScript } from "@/components/theme-script";
import { themeStore } from "@/lib/theme-store";
import {
  THEME_SETTINGS,
  applyTheme,
  getSystemTheme,
  type ResolvedTheme,
  type ThemeSetting,
} from "@/lib/theme";

type ThemeContextValue = {
  resolvedTheme: ResolvedTheme | undefined;
  setTheme: (theme: ThemeSetting) => void;
  systemTheme: ResolvedTheme | undefined;
  theme: ThemeSetting;
  themes: ThemeSetting[];
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getServerSnapshot
  );

  const systemTheme = useSyncExternalStore(
    themeStore.subscribe,
    getSystemTheme,
    () => "light" as ResolvedTheme
  );

  const resolvedTheme = theme === "system" ? systemTheme : theme;
  const hasAppliedTheme = useRef(false);

  useEffect(() => {
    const root = document.documentElement;

    if (!hasAppliedTheme.current) {
      hasAppliedTheme.current = true;

      if (root.classList.contains(resolvedTheme)) {
        return;
      }
    }

    applyTheme(resolvedTheme);
  }, [resolvedTheme]);

  const value = useMemo(
    () => ({
      resolvedTheme,
      setTheme: themeStore.setTheme,
      systemTheme,
      theme,
      themes: [...THEME_SETTINGS],
    }),
    [resolvedTheme, systemTheme, theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      <ThemeScript />
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);

  if (!context) {
    return {
      resolvedTheme: undefined,
      setTheme: () => {},
      systemTheme: undefined,
      theme: "system",
      themes: [],
    };
  }

  return context;
};
