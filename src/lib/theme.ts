export const THEME_STORAGE_KEY = "theme";

export const THEME_RESOLVED_COOKIE = "theme-resolved";

export const THEME_SETTINGS = ["light", "dark", "system"] as const;

export type ThemeSetting = (typeof THEME_SETTINGS)[number];

export type ResolvedTheme = "light" | "dark";

export const themeInitScript = `(function(){try{var k='${THEME_STORAGE_KEY}';var c='${THEME_RESOLVED_COOKIE}';var t=localStorage.getItem(k)||'system';var r=t;if(t==='system'){r=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}var d=document.documentElement;d.classList.remove('light','dark');d.classList.add(r);d.style.colorScheme=r;document.cookie=c+'='+r+';path=/;max-age=31536000;SameSite=Lax';}catch(e){}})();`;

export const getSystemTheme = (): ResolvedTheme => {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const resolveTheme = (theme: ThemeSetting): ResolvedTheme =>
  theme === "system" ? getSystemTheme() : theme;

export const setResolvedThemeCookie = (resolved: ResolvedTheme) => {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${THEME_RESOLVED_COOKIE}=${resolved};path=/;max-age=31536000;SameSite=Lax`;
};

export const applyTheme = (resolved: ResolvedTheme) => {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(resolved);
  root.style.colorScheme = resolved;
  setResolvedThemeCookie(resolved);
};

export const readStoredTheme = (): ThemeSetting => {
  if (typeof window === "undefined") {
    return "system";
  }

  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);

    if (
      stored === "light" ||
      stored === "dark" ||
      stored === "system"
    ) {
      return stored;
    }
  } catch {
    return "system";
  }

  return "system";
};

export const disableThemeTransitions = () => {
  const style = document.createElement("style");
  style.appendChild(
    document.createTextNode(
      "*,*::before,*::after{transition:none!important}"
    )
  );
  document.head.appendChild(style);

  return () => {
    window.getComputedStyle(document.body);
    setTimeout(() => {
      document.head.removeChild(style);
    }, 1);
  };
};

export const isResolvedTheme = (
  value: string | undefined
): value is ResolvedTheme => value === "light" || value === "dark";
