"use client";

import { DocsScrollProvider } from "@/components/docs-scroll-context";
import { DocsTableOfContents } from "@/components/docs-toc";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useState } from "react";

type DocsPageShellProps = {
  toc?: {
    title?: React.ReactNode;
    url: string;
    depth: number;
  }[];
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

export const DocsPageShell = ({
  toc,
  children,
  footer,
  className,
}: DocsPageShellProps) => {
  const [scrollContainer, setScrollContainer] =
    useState<HTMLDivElement | null>(null);

  return (
    <DocsScrollProvider container={scrollContainer}>
      <div
        data-slot="docs"
        className={cn(
          "flex h-full min-h-0 w-full items-stretch text-[1.05rem] sm:text-[15px]",
          className
        )}
      >
        <ScrollArea className="min-w-0 flex-1" viewportRef={setScrollContainer}>
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="h-(--top-spacing) shrink-0" />
            <div className="text-foreground mx-auto flex w-full max-w-2xl min-w-0 flex-1 flex-col gap-8 px-4 py-6 sm:px-6 md:px-0 lg:py-8">
              {children}
            </div>
            {footer}
          </div>
        </ScrollArea>

        {toc?.length ? (
          <aside
            aria-label="Table of contents"
            className="z-30 ml-auto hidden h-full min-h-0 w-72 shrink-0 flex-col xl:flex"
          >
            <div className="h-(--top-spacing) shrink-0" />
            <ScrollArea className="min-h-0 flex-1 pb-8">
              <DocsTableOfContents className="px-8" toc={toc} />
            </ScrollArea>
          </aside>
        ) : null}
      </div>
    </DocsScrollProvider>
  );
};
