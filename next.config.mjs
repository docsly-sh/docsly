import path from "node:path";
import { fileURLToPath } from "node:url";

import { createMDX } from "fumadocs-mdx/next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  devIndicators: false,
  turbopack: {
    resolveAlias: {
      tailwindcss: path.join(projectRoot, "node_modules/tailwindcss"),
      "tw-animate-css": path.join(projectRoot, "node_modules/tw-animate-css"),
    },
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
