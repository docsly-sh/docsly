import type { InferPageType } from "fumadocs-core/source";
import { llms, loader } from "fumadocs-core/source";

import { docs } from "@/.source/server";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { docsContentRoute } from "@/lib/docs";
import { absoluteUrl } from "@/lib/utils";

export const source = loader({
  baseUrl: ROUTES.DOCS,
  source: docs.toFumadocsSource(),
});

export type DocPage = InferPageType<typeof source>;

export const llmsSource = llms(source);

export const getPageMarkdownUrl = (page: DocPage) => {
  const segments = [...page.slugs, "content.md"];

  return {
    segments,
    url: `${docsContentRoute}/${segments.join("/")}`,
  };
};

export const getLLMText = async (page: DocPage) => {
  const processed = await page.data.getText("processed");
  const markdownUrl = absoluteUrl(getPageMarkdownUrl(page).url);
  const pageUrl = absoluteUrl(page.url);

  const sections = [page.data.description, processed].filter(Boolean);

  return `# ${page.data.title}

URL: ${pageUrl}
Source: ${markdownUrl}

${sections.join("\n\n")}`;
};

export const getLLMFullText = async () => {
  const pages = source.getPages();
  const sections = await Promise.all(pages.map((page) => getLLMText(page)));

  return [
    `# ${SITE.NAME}`,
    "",
    `> ${SITE.DESCRIPTION.LONG}`,
    "",
    `Full documentation export for LLM consumption.`,
    "",
    sections.join("\n\n---\n\n"),
  ].join("\n");
};
