"use client";

import { useServerInsertedHTML } from "next/navigation";

import { themeInitScript } from "@/lib/theme";

export const ThemeScript = () => {
  useServerInsertedHTML(() => (
    <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
  ));

  return null;
};
