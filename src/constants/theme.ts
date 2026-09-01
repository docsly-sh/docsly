import type { CSSProperties } from "react";

/**
 * Color scheme configuration for docsly.
 *
 * Change `ACTIVE_COLOR_PRESET` to switch the entire site palette, or use
 * `COLOR_OVERRIDES` to tweak individual values.
 */

export const COLOR_PRESETS = {
  stone: {
    hue: 70,
    accentHue: 255,
    radius: "0.625rem",
    meta: { light: "#faf9f7", dark: "#0f0e0c" },
  },
  zinc: {
    hue: 0,
    accentHue: 240,
    radius: "0.625rem",
    meta: { light: "#fafafa", dark: "#09090b" },
  },
  slate: {
    hue: 220,
    accentHue: 220,
    radius: "0.625rem",
    meta: { light: "#f8fafc", dark: "#020617" },
  },
  blue: {
    hue: 240,
    accentHue: 240,
    radius: "0.625rem",
    meta: { light: "#f5f8ff", dark: "#030712" },
  },
  violet: {
    hue: 280,
    accentHue: 280,
    radius: "0.625rem",
    meta: { light: "#faf8ff", dark: "#0c0618" },
  },
  green: {
    hue: 145,
    accentHue: 145,
    radius: "0.625rem",
    meta: { light: "#f6fdf8", dark: "#041208" },
  },
  rose: {
    hue: 15,
    accentHue: 15,
    radius: "0.625rem",
    meta: { light: "#fff8f7", dark: "#140806" },
  },
} as const;

export type ColorPreset = keyof typeof COLOR_PRESETS;

/** Switch palettes here — stone | zinc | slate | blue | violet | green | rose */
export const ACTIVE_COLOR_PRESET: ColorPreset = "stone";

/**
 * Optional overrides applied on top of the active preset.
 * Set a field to override just that value without defining a new preset.
 */
export const COLOR_OVERRIDES: Partial<{
  hue: number;
  accentHue: number;
  radius: string;
  meta: { light: string; dark: string };
}> = {};

export const getActiveColorScheme = () => {
  const preset = COLOR_PRESETS[ACTIVE_COLOR_PRESET];

  return {
    hue: COLOR_OVERRIDES.hue ?? preset.hue,
    accentHue: COLOR_OVERRIDES.accentHue ?? preset.accentHue,
    radius: COLOR_OVERRIDES.radius ?? preset.radius,
    meta: COLOR_OVERRIDES.meta ?? preset.meta,
  };
};

export const META_THEME_COLORS = getActiveColorScheme().meta;

export const getThemeCssVariables = (): CSSProperties => {
  const { hue, accentHue, radius } = getActiveColorScheme();

  return {
    "--theme-hue": String(hue),
    "--theme-accent-hue": String(accentHue),
    "--radius": radius,
  } as CSSProperties;
};
