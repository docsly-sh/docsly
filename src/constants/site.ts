const getBaseUrl = () => {
  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:3000";
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  return process.env.SITE_URL ?? "https://docsly.dev";
};

const baseUrl = getBaseUrl();

export const SITE = {
  DESCRIPTION: {
    LONG: "An open-source documentation starter for Next.js — beautiful, fast, and ready to ship.",
    SHORT: "Open-source docs that ship fast",
  },
  KEYWORDS: [
    "docsly",
    "documentation",
    "open source",
    "fumadocs",
    "next.js",
    "mdx",
  ] as const,
  NAME: "docsly.dev",
  SHORT_NAME: "Docsly",
  OG_IMAGE: `${baseUrl}/og.png`,
  URL: baseUrl,
};
