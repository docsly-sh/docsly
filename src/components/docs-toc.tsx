"use client";

import { List } from "@phosphor-icons/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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

const DocsTocActiveContext = createContext<string | null>(null);

export const DocsTocProvider = ({
  itemIds,
  children,
}: {
  itemIds: string[];
  children: React.ReactNode;
}) => {
  const activeHeading = useActiveItem(itemIds);

  return (
    <DocsTocActiveContext.Provider value={activeHeading}>
      {children}
    </DocsTocActiveContext.Provider>
  );
};

const useDocsTocActive = () => useContext(DocsTocActiveContext);

const useActiveItem = (itemIds: string[]) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const scrollContainer = useDocsScrollContainer();
  const visibleHeadings = useRef<Set<string>>(new Set());
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (!scrollContainer) {
      return;
    }

    const updateActiveHeading = () => {
      rafId.current = null;

      const nextId =
        itemIds.find((id) => id && visibleHeadings.current.has(id)) ?? null;

      setActiveId((current) => (current === nextId ? current : nextId));
    };

    const scheduleUpdate = () => {
      if (rafId.current !== null) {
        return;
      }

      rafId.current = requestAnimationFrame(updateActiveHeading);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleHeadings.current.add(entry.target.id);
          } else {
            visibleHeadings.current.delete(entry.target.id);
          }
        }

        scheduleUpdate();
      },
      {
        root: scrollContainer,
        rootMargin: "0% 0% -70% 0%",
      }
    );

    for (const id of itemIds) {
      if (!id) {
        continue;
      }

      const element = headingById(id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }

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
  const activeHeading = useDocsTocActive();

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
