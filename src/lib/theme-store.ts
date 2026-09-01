import {
  THEME_STORAGE_KEY,
  applyTheme,
  disableThemeTransitions,
  readStoredTheme,
  resolveTheme,
  type ThemeSetting,
} from "@/lib/theme";

const listeners = new Set<() => void>();

const emit = () => {
  for (const listener of listeners) {
    listener();
  }
};

export const themeStore = {
  getServerSnapshot: (): ThemeSetting => "system",
  getSnapshot: (): ThemeSetting => readStoredTheme(),
  setTheme(next: ThemeSetting) {
    const restoreTransitions = disableThemeTransitions();

    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Ignore write failures (e.g. private browsing).
    }

    applyTheme(resolveTheme(next));
    emit();
    restoreTransitions();
  },
  subscribe(listener: () => void) {
    if (typeof window === "undefined") {
      return () => {};
    }

    const onStorage = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY) {
        emit();
      }
    };

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onMediaChange = () => emit();

    listeners.add(listener);
    window.addEventListener("storage", onStorage);
    media.addEventListener("change", onMediaChange);

    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
      media.removeEventListener("change", onMediaChange);
    };
  },
};
