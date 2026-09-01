"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { TOP_LEVEL_SECTIONS } from "@/constants/nav";
import { EXCLUDED_SECTIONS, isComponentsFolder, PAGES_NEW } from "@/lib/docs";
import { isRouteActive } from "@/lib/navigation";
import { getFolderGroups, getPagesFromFolder } from "@/lib/page-tree";
import type { source } from "@/lib/source";

const SidebarMenuItemLink = ({
  href,
  isActive,
  children,
}: {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}) => (
  <SidebarMenuItem>
    <SidebarMenuButton
      asChild
      className="relative min-h-11 w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md sm:min-h-[30px] data-[active=true]:border-accent data-[active=true]:bg-accent 3xl:fixed:w-full 3xl:fixed:max-w-48"
      isActive={isActive}
    >
      <Link href={href} aria-current={isActive ? "page" : undefined}>
        <span className="absolute inset-0 flex w-(--sidebar-menu-width) bg-transparent" />
        {children}
        {PAGES_NEW.includes(href) ? (
          <>
            <span
              className="bg-muted-foreground/70 flex size-1.5 shrink-0 rounded-full"
              aria-hidden
            />
            <span className="sr-only">New</span>
          </>
        ) : null}
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem>
);

const SidebarPageGroup = ({
  href,
  label,
  pages,
  pathname,
}: {
  href?: string;
  label: React.ReactNode;
  pages: { url: string; name: React.ReactNode }[];
  pathname: string;
}) => {
  if (pages.length === 0) {
    return null;
  }

  return (
    <SidebarGroup>
      {href ? (
        <SidebarGroupLabel
          asChild
          className="text-muted-foreground font-medium hover:text-foreground"
        >
          <Link href={href}>{label}</Link>
        </SidebarGroupLabel>
      ) : (
        <SidebarGroupLabel className="text-muted-foreground font-medium">
          {label}
        </SidebarGroupLabel>
      )}
      <SidebarGroupContent>
        <SidebarMenu>
          {pages.map((page) => (
            <SidebarMenuItemLink
              key={page.url}
              href={page.url}
              isActive={page.url === pathname}
            >
              {page.name}
            </SidebarMenuItemLink>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export const DocsSidebar = ({
  tree,
  ...props
}: React.ComponentProps<typeof Sidebar> & { tree: typeof source.pageTree }) => {
  const pathname = usePathname();

  return (
    <Sidebar
      className="text-sidebar-foreground z-30 hidden h-full min-h-0 flex-col overscroll-none bg-transparent [--sidebar-menu-width:--spacing(48)] lg:flex"
      collapsible="none"
      {...props}
    >
      <div className="h-9" />
      <div className="absolute top-8 z-10 h-6 w-(--sidebar-menu-width) shrink-0 bg-linear-to-b from-background via-background/70 to-transparent blur-[2px]" />
      <div className="absolute top-10 right-0 bottom-10 hidden w-px bg-linear-to-b from-transparent from-[12%] via-border/45 via-50% to-transparent to-[88%] lg:block" />
      <SidebarContent className="mx-auto no-scrollbar w-(--sidebar-menu-width) overflow-x-hidden px-2">
        <SidebarGroup className="pt-6">
          <SidebarGroupLabel className="text-muted-foreground font-medium">
            Sections
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {TOP_LEVEL_SECTIONS.map(({ name, href, match }) => (
                <SidebarMenuItemLink
                  key={name}
                  href={href}
                  isActive={isRouteActive(pathname, href, match)}
                >
                  {name}
                </SidebarMenuItemLink>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {tree.children.map((item) => {
          if (item.type !== "folder") {
            return null;
          }
          if (EXCLUDED_SECTIONS.has(item.$id ?? "")) {
            return null;
          }

          if (isComponentsFolder(item)) {
            return getFolderGroups(item).map(({ folder, indexPage, pages }) => (
              <SidebarPageGroup
                href={indexPage?.url}
                key={folder.$id}
                label={folder.name}
                pages={pages}
                pathname={pathname}
              />
            ));
          }

          return (
            <SidebarPageGroup
              key={item.$id}
              label={item.name}
              pages={getPagesFromFolder(item)}
              pathname={pathname}
            />
          );
        })}
        <div className="from-background via-background/70 sticky -bottom-1 z-10 h-12 shrink-0 bg-linear-to-t to-transparent blur-[2px]" />
      </SidebarContent>
    </Sidebar>
  );
};
