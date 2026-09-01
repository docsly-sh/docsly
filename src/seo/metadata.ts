import type { Metadata } from "next";

import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";

interface CreatePageMetadataOptions {
  description?: string;
  path: string;
  title: string;
}

export const createPageMetadata = ({
  description,
  path,
  title,
}: CreatePageMetadataOptions): Metadata => {
  const canonical = path.startsWith(ROUTES.HOME)
    ? path
    : `${ROUTES.HOME}${path}`;

  return {
    alternates: { canonical },
    description,
    openGraph: {
      description,
      images: [{ alt: SITE.NAME, url: SITE.OG_IMAGE }],
      siteName: SITE.NAME,
      title,
      type: "article",
      url: `${SITE.URL}${canonical}`,
    },
    title,
  };
};

export const baseMetadata: Metadata = {
  description: SITE.DESCRIPTION.LONG,
  keywords: [...SITE.KEYWORDS],
  icons: {
    apple: "/apple-touch-icon.png",
    icon: [
      { type: "image/svg+xml", url: "/favicon.svg" },
      { sizes: "96x96", type: "image/png", url: "/favicon-96x96.png" },
      { sizes: "32x32", type: "image/png", url: "/favicon-32x32.png" },
      { sizes: "16x16", type: "image/png", url: "/favicon-16x16.png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL(SITE.URL),
  openGraph: {
    description: SITE.DESCRIPTION.LONG,
    images: [{ alt: SITE.NAME, url: SITE.OG_IMAGE }],
    siteName: SITE.NAME,
    title: SITE.NAME,
    type: "website",
    url: SITE.URL,
  },
  title: {
    default: SITE.NAME,
    template: `%s | ${SITE.NAME}`,
  },
};
