"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import type { SortedResult } from "fumadocs-core/search";
import { useDocsSearch } from "fumadocs-core/search/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Kbd } from "@/components/ui/kbd";
import { useModKeyLabel } from "@/hooks/use-mod-key-label";
import { cn } from "@/lib/utils";

const SearchResultContent = ({
  content,
  className,
}: {
  content: string;
  className?: string;
}) => (
  <span
    className={cn(
      "line-clamp-2 [&_mark]:bg-primary/15 [&_mark]:text-foreground [&_mark]:rounded-sm [&_mark]:px-0.5",
      className
    )}
    dangerouslySetInnerHTML={{ __html: content }}
  />
);

const SearchResultItem = ({
  item,
  onSelect,
}: {
  item: SortedResult;
  onSelect: (url: string) => void;
}) => (
  <CommandItem
    key={item.id}
    value={item.id}
    onSelect={() => onSelect(item.url)}
    className="flex flex-col items-start gap-1 py-2.5"
  >
    {item.type === "page" ? (
      <span className="font-medium leading-snug">
        <SearchResultContent content={item.content} />
      </span>
    ) : (
      <>
        {item.breadcrumbs?.length ? (
          <span className="text-muted-foreground line-clamp-1 text-xs">
            {item.breadcrumbs.map((crumb, index) => (
              <span key={index}>
                {index > 0 ? " / " : null}
                <SearchResultContent content={crumb} />
              </span>
            ))}
          </span>
        ) : null}
        <SearchResultContent
          content={item.content}
          className="text-muted-foreground text-sm"
        />
      </>
    )}
  </CommandItem>
);

export const DocsSearch = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const modKeyLabel = useModKeyLabel();
  const { search, setSearch, query } = useDocsSearch({
    type: "fetch",
    api: "/api/search",
  });

  const results = query.data === "empty" ? [] : (query.data ?? []);
  const pages = results.filter((item) => item.type === "page");
  const sections = results.filter((item) => item.type !== "page");

  const navigate = useCallback(
    (url: string) => {
      setOpen(false);
      router.push(url);
    },
    [router]
  );

  useHotkeys(
    "mod+k",
    (event) => {
      event.preventDefault();
      setOpen((current) => !current);
    },
    { enableOnFormTags: true }
  );

  useEffect(() => {
    if (!open) {
      setSearch("");
    }
  }, [open, setSearch]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search documentation"
        className={cn(
          "extend-touch-target border-input bg-background text-muted-foreground hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 inline-flex size-11 shrink-0 items-center justify-center rounded-full border shadow-xs transition-colors focus-visible:ring-[3px] focus-visible:outline-none sm:h-8 sm:min-w-[9.75rem] sm:w-auto sm:justify-start sm:gap-2 sm:px-3 [&_svg]:size-4"
        )}
      >
        <MagnifyingGlass aria-hidden className="shrink-0" />
        <span className="hidden text-sm sm:inline">Search...</span>
        <Kbd
          suppressHydrationWarning
          className="pointer-events-none hidden min-w-11 justify-center bg-transparent shadow-none sm:inline-flex dark:bg-transparent dark:shadow-none"
        >
          {modKeyLabel}
        </Kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search documentation..."
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          <CommandEmpty>
            {query.isLoading ? "Searching..." : "No results found."}
          </CommandEmpty>
          {pages.length > 0 ? (
            <CommandGroup heading="Pages">
              {pages.map((item) => (
                <SearchResultItem
                  key={item.id}
                  item={item}
                  onSelect={navigate}
                />
              ))}
            </CommandGroup>
          ) : null}
          {sections.length > 0 ? (
            <CommandGroup heading="Sections">
              {sections.map((item) => (
                <SearchResultItem
                  key={item.id}
                  item={item}
                  onSelect={navigate}
                />
              ))}
            </CommandGroup>
          ) : null}
        </CommandList>
      </CommandDialog>
    </>
  );
};
