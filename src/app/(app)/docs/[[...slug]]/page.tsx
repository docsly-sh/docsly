import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { findNeighbour } from "fumadocs-core/page-tree";
import { notFound } from "next/navigation";

import { DocsCopyPage } from "@/components/docs-copy-page";
import { DocsKeyboardShortcuts } from "@/components/docs-keyboard-shortcuts";
import { DocsNavLink } from "@/components/docs-nav-link";
import { DocsPageShell } from "@/components/docs-page-shell";
import { docsToolbarTextSize } from "@/components/docs-toolbar";
import { DocsShareMenu } from "@/components/docs-share-menu";
import { DocsTableOfContents } from "@/components/docs-toc";
import { getPageMarkdownUrl, source } from "@/lib/source";
import { absoluteUrl } from "@/lib/utils";
import { mdxComponents } from "@/mdx-components";
import { createPageMetadata } from "@/seo/metadata";

export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

export const generateStaticParams = () => source.generateParams();

export const generateMetadata = async (props: {
  params: Promise<{ slug?: string[] }>;
}) => {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) {
    notFound();
  }

  return createPageMetadata({
    description: page.data.description,
    path: page.url,
    title: page.data.title,
  });
};

const Page = async (props: { params: Promise<{ slug?: string[] }> }) => {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) {
    notFound();
  }

  const doc = page.data;
  const MdxContent = doc.body;
  const neighbours = findNeighbour(source.pageTree, page.url);
  const markdownUrl = getPageMarkdownUrl(page).url;
  const pageUrl = absoluteUrl(page.url);

  return (
    <>
      <DocsKeyboardShortcuts
        previous={neighbours.previous ? neighbours.previous.url : null}
        next={neighbours.next ? neighbours.next.url : null}
      />

      <DocsPageShell
        toc={doc.toc}
        footer={
          <div className="mx-auto hidden h-16 w-full max-w-2xl items-center gap-2 px-4 sm:flex md:px-0">
            {neighbours.previous && (
              <DocsNavLink
                href={neighbours.previous.url}
                size={docsToolbarTextSize}
              >
                <ArrowLeft />
                {neighbours.previous.name}
              </DocsNavLink>
            )}
            {neighbours.next && (
              <DocsNavLink
                href={neighbours.next.url}
                size={docsToolbarTextSize}
                className="ml-auto"
              >
                {neighbours.next.name}
                <ArrowRight />
              </DocsNavLink>
            )}
          </div>
        }
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
                {doc.title}
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:pt-1">
              {doc.toc?.length ? (
                <DocsTableOfContents
                  toc={doc.toc}
                  variant="dropdown"
                  className="xl:hidden"
                />
              ) : null}
              <DocsCopyPage markdownUrl={markdownUrl} url={pageUrl} />
              <DocsShareMenu title={doc.title} url={pageUrl} />
              {neighbours.previous && (
                <DocsNavLink
                  href={neighbours.previous.url}
                  tooltip={{
                    icon: <ArrowLeft />,
                    title: "Previous Page",
                  }}
                >
                  <span className="sr-only">Previous</span>
                  <ArrowLeft />
                </DocsNavLink>
              )}
              {neighbours.next && (
                <DocsNavLink
                  href={neighbours.next.url}
                  tooltip={{
                    icon: <ArrowRight />,
                    title: "Next Page",
                  }}
                >
                  <span className="sr-only">Next</span>
                  <ArrowRight />
                </DocsNavLink>
              )}
            </div>
          </div>
          {doc.description && (
            <p className="text-muted-foreground text-balance sm:text-base">
              {doc.description}
            </p>
          )}
        </div>
        <div className="w-full flex-1 *:data-[slot=alert]:first:mt-0">
          <MdxContent components={mdxComponents} />
        </div>
      </DocsPageShell>
    </>
  );
};

export default Page;
