"use client";

import type { Root as PageTreeRoot } from "fumadocs-core/page-tree";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { EXCLUDED_SECTIONS, isComponentsFolder } from "@/lib/docs";
import { getFolderGroups, getPagesFromFolder } from "@/lib/page-tree";
import type { PageTreeFolder } from "@/lib/page-tree";
import { cn } from "@/lib/utils";

const NavPageGroup = ({
  label,
  pages,
  pathname,
  onNavigate,
}: {
  label: React.ReactNode;
  pages: { url: string; name: React.ReactNode }[];
  pathname: string;
  onNavigate?: () => void;
}) => {
  if (pages.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm font-medium text-muted-foreground">{label}</div>
      {pages.map((page) => (
        <Link
          key={page.url}
          href={page.url}
          onClick={onNavigate}
          aria-current={page.url === pathname ? "page" : undefined}
          className={cn(
            "rounded-md px-2 py-3 text-sm",
            page.url === pathname
              ? "font-medium"
              : "text-muted-foreground"
          )}
        >
          {page.name}
        </Link>
      ))}
    </div>
  );
};

export const DocsNavFolders = ({
  tree,
  onNavigate,
}: {
  tree: PageTreeRoot;
  onNavigate?: () => void;
}) => {
  const pathname = usePathname();

  return (
    <>
      {tree.children.map((item) => {
        if (item.type !== "folder" || EXCLUDED_SECTIONS.has(item.$id ?? "")) {
          return null;
        }

        if (isComponentsFolder(item)) {
          return getFolderGroups(item).map(({ folder, pages }) => (
            <NavPageGroup
              key={folder.$id}
              label={folder.name}
              pages={pages}
              pathname={pathname}
              onNavigate={onNavigate}
            />
          ));
        }

        return (
          <NavPageGroup
            key={item.$id}
            label={item.name}
            pages={getPagesFromFolder(item as PageTreeFolder)}
            pathname={pathname}
            onNavigate={onNavigate}
          />
        );
      })}
    </>
  );
};
