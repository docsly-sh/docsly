import type { Metadata } from "next";

import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";

import {
  ogImageAlt,
  ogImageContentType,
  ogImageSize,
} from "./og-image";

const twitterMetadata = {
  card: "summary_large_image" as const,
};

const sharedSocialImages = {
  openGraph: [
    {
      alt: ogImageAlt,
      height: ogImageSize.height,
      type: ogImageContentType,
      url: "/opengraph-image",
      width: ogImageSize.width,
    },
  ],
  twitter: [
    {
      alt: ogImageAlt,
      height: ogImageSize.height,
      type: ogImageContentType,
      url: "/twitter-image",
      width: ogImageSize.width,
    },
  ],
};

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
      images: sharedSocialImages.openGraph,
      siteName: SITE.NAME,
      title,
      type: "article",
      url: `${SITE.URL}${canonical}`,
    },
    title,
    twitter: {
      ...twitterMetadata,
      description,
      images: sharedSocialImages.twitter,
      title,
    },
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
    images: sharedSocialImages.openGraph,
    siteName: SITE.NAME,
    title: SITE.NAME,
    type: "website",
    url: SITE.URL,
  },
  title: {
    default: SITE.NAME,
    template: `%s | ${SITE.NAME}`,
  },
  twitter: {
    ...twitterMetadata,
    description: SITE.DESCRIPTION.LONG,
    images: sharedSocialImages.twitter,
    title: SITE.NAME,
  },
};
