import { DocsSidebar } from "@/components/docs-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { source } from "@/lib/source";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container-wrapper flex min-h-0 flex-1 flex-col px-2">
      <SidebarProvider className="3xl:fixed:container 3xl:fixed:px-3 h-full min-h-0 flex-1 items-stretch px-0 [--sidebar-width:220px] [--top-spacing:0] lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:[--sidebar-width:240px] lg:[--top-spacing:calc(var(--spacing)*4)]">
        <DocsSidebar tree={source.pageTree} />
        <div className="flex h-full min-h-0 w-full flex-col">{children}</div>
      </SidebarProvider>
    </div>
  );
}
