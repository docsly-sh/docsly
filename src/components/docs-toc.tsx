"use client";

import { List } from "@phosphor-icons/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  docsToolbarButtonClass,
  docsToolbarTextSize,
} from "@/components/docs-toolbar";
import { useDocsScrollContainer } from "@/components/docs-scroll-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const headingById = (id: string): Element | null =>
  document.querySelector(`#${CSS.escape(id)}`);

const useActiveItem = (itemIds: string[]) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const scrollContainer = useDocsScrollContainer();
  const visibleHeadings = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const updateActiveHeading = () => {
      const sorted = [...visibleHeadings.current.entries()].sort(
        (a, b) => a[1] - b[1]
      );

      if (sorted.length > 0) {
        setActiveId(sorted[0][0]);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleHeadings.current.set(
              entry.target.id,
              entry.boundingClientRect.top
            );
          } else {
            visibleHeadings.current.delete(entry.target.id);
          }
        }

        updateActiveHeading();
      },
      {
        root: scrollContainer,
        rootMargin: "0% 0% -70% 0%",
      }
    );

    for (const id of itemIds ?? []) {
      if (!id) {
        continue;
      }
      const element = headingById(id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => {
      visibleHeadings.current.clear();
      observer.disconnect();
    };
  }, [itemIds, scrollContainer]);

  return activeId;
};

const TocLinks = ({
  toc,
  activeHeading,
  onNavigate,
  className,
}: {
  toc: {
    title?: React.ReactNode;
    url: string;
    depth: number;
  }[];
  activeHeading: string | null;
  onNavigate?: () => void;
  className?: string;
}) => (
  <div className={cn("flex flex-col gap-1", className)}>
    {toc.map((item) => {
      const isActive = item.url === `#${activeHeading}`;

      return (
        <a
          key={item.url}
          href={item.url}
          onClick={onNavigate}
          aria-current={isActive ? "location" : undefined}
          data-active={isActive}
          data-depth={item.depth}
          className="text-muted-foreground hover:text-foreground data-[active=true]:text-foreground rounded-sm px-2 py-2 text-[0.8125rem] leading-snug no-underline transition-colors data-[active=true]:font-medium data-[depth=3]:pl-4 data-[depth=4]:pl-6"
        >
          {item.title}
        </a>
      );
    })}
  </div>
);

export const DocsTableOfContents = ({
  toc,
  variant = "list",
  className,
}: {
  toc: {
    title?: React.ReactNode;
    url: string;
    depth: number;
  }[];
  variant?: "dropdown" | "list";
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = useCallback(() => setOpen(false), []);
  const itemIds = useMemo(
    () => toc.map((item) => item.url.replace("#", "")),
    [toc]
  );
  const activeHeading = useActiveItem(itemIds);

  if (!toc?.length) {
    return null;
  }

  if (variant === "dropdown") {
    return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size={docsToolbarTextSize}
            className={cn(docsToolbarButtonClass, className)}
            aria-label="On this page"
          >
            <List aria-hidden />
            On this page
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="max-h-[70svh] min-w-56"
        >
          <p
            id="toc-dropdown-label"
            className="text-muted-foreground px-2 py-1.5 text-[0.65rem] font-semibold tracking-[0.14em] uppercase"
          >
            On this page
          </p>
          {toc.map((item) => {
            const isActive = item.url === `#${activeHeading}`;

            return (
              <DropdownMenuItem
                key={item.url}
                asChild
                onClick={handleClose}
                data-depth={item.depth}
                className="data-[depth=3]:pl-6 data-[depth=4]:pl-8"
              >
                <a
                  href={item.url}
                  aria-current={isActive ? "location" : undefined}
                  data-active={isActive}
                  className="data-[active=true]:font-medium"
                >
                  {item.title}
                </a>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <nav
      aria-label="On this page"
      className={cn("flex flex-col gap-2 pr-4 text-sm", className)}
    >
      <p className="text-muted-foreground bg-background sticky top-0 z-10 pb-2 text-xs font-medium">
        On this page
      </p>
      <TocLinks toc={toc} activeHeading={activeHeading} />
    </nav>
  );
};
