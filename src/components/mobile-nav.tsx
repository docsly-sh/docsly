"use client";

import type { Root as PageTreeRoot } from "fumadocs-core/page-tree";
import { List } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { DocsNavFolders } from "@/components/docs-nav-folders";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TOP_LEVEL_SECTIONS } from "@/constants/nav";
import { isRouteActive } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export const MobileNav = ({
  items,
  tree,
  className,
}: {
  items: readonly { href: string; label: string }[];
  tree: PageTreeRoot;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon-lg"
          className={cn("extend-touch-target lg:hidden", className)}
        >
          <List aria-hidden />
          <span className="sr-only">Open navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[min(100vw-2rem,18rem)] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <nav
          aria-label="Mobile documentation navigation"
          className="mt-6 flex flex-col gap-6"
        >
          <div className="flex flex-col gap-1">
            {items.map((item) => {
              const isActive = isRouteActive(pathname, item.href, "prefix");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  aria-current={isActive ? "page" : undefined}
                  className="rounded-md px-2 py-3 text-lg font-medium"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="flex flex-col gap-1 border-t pt-4">
            <div className="text-muted-foreground px-2 py-1 text-sm font-medium">
              Sections
            </div>
            {TOP_LEVEL_SECTIONS.map((section) => {
              const isActive = isRouteActive(
                pathname,
                section.href,
                section.match
              );

              return (
                <Link
                  key={section.href}
                  href={section.href}
                  onClick={close}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "rounded-md px-2 py-3 text-sm",
                    isActive ? "font-medium" : "text-muted-foreground"
                  )}
                >
                  {section.name}
                </Link>
              );
            })}
          </div>
          <DocsNavFolders tree={tree} onNavigate={close} />
        </nav>
      </SheetContent>
    </Sheet>
  );
};
