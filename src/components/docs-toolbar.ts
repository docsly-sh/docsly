import type { VariantProps } from "class-variance-authority";

import type { buttonVariants } from "@/components/ui/button";

export const docsToolbarIconSize = "icon-sm" satisfies NonNullable<
  VariantProps<typeof buttonVariants>["size"]
>;

export const docsToolbarTextSize = "sm" satisfies NonNullable<
  VariantProps<typeof buttonVariants>["size"]
>;

export const docsToolbarButtonClass =
  "extend-touch-target min-h-11 min-w-11 sm:min-h-8 sm:min-w-0 shadow-none";
