"use client";

import Link from "next/link";

import {
  docsToolbarButtonClass,
  docsToolbarIconSize,
} from "@/components/docs-toolbar";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export const DocsNavLink = ({
  href,
  children,
  className,
  tooltip,
  size = docsToolbarIconSize,
  ...props
}: React.ComponentProps<typeof Button> & {
  href: string;
  children: React.ReactNode;
  className?: string;
  tooltip?: { title: string; icon: React.ReactNode };
}) => {
  const link = (
    <Button
      variant="secondary"
      size={size}
      className={cn(docsToolbarButtonClass, className)}
      asChild
      {...props}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{link}</TooltipTrigger>
        <TooltipContent className="pr-2 pl-3">
          <div className="flex items-center gap-3">
            {tooltip.title}
            {tooltip.icon && <Kbd>{tooltip.icon}</Kbd>}
          </div>
        </TooltipContent>
      </Tooltip>
    );
  }

  return link;
};
