import Link from "next/link";

import { DocsSearch } from "@/components/docs-search";
import { ModeSwitcher } from "@/components/mode-switcher";
import { MobileNav } from "@/components/mobile-nav";
import { SiteLogo } from "@/components/site-logo";
import { HEADER_NAV_ITEMS } from "@/constants/nav";
import { source } from "@/lib/source";

export const SiteHeader = () => (
  <header className="bg-background z-50 w-full shrink-0">
    <div className="container-wrapper px-4 md:px-6">
      <div className="flex h-(--header-height) items-center gap-4">
        <MobileNav
          items={HEADER_NAV_ITEMS}
          tree={source.pageTree}
          className="lg:hidden"
        />
        <SiteLogo />
        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {HEADER_NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground rounded-md px-3 py-1.5 text-sm transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <DocsSearch />
          <ModeSwitcher />
        </div>
      </div>
    </div>
  </header>
);
