import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Toaster } from "sonner";

import { SkipLink } from "@/components/skip-link";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { META_THEME_COLORS, getThemeCssVariables } from "@/constants/theme";
import { fontVariables } from "@/lib/fonts";
import { isResolvedTheme, THEME_RESOLVED_COOKIE } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { baseMetadata } from "@/seo/metadata";

import "@/styles/globals.css";

export const metadata: Metadata = baseMetadata;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeCookie = (await cookies()).get(THEME_RESOLVED_COOKIE)?.value;
  const themeClass = isResolvedTheme(themeCookie) ? themeCookie : undefined;
  const themeColor =
    themeClass === "dark" ? META_THEME_COLORS.dark : META_THEME_COLORS.light;
  const themeVariables = getThemeCssVariables();

  return (
    <html
      lang="en"
      className={themeClass}
      style={themeVariables}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content={themeColor} />
      </head>
      <body
        className={cn(
          "text-foreground flex h-svh flex-col overflow-hidden overscroll-none font-sans antialiased [--header-height:--spacing(14)]",
          fontVariables
        )}
      >
        <ThemeProvider>
          <SkipLink />
          <SiteHeader />
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
