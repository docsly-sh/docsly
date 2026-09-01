import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { cn } from "@/lib/utils";

interface SiteLogoProps {
  className?: string;
  showName?: boolean;
}

export const SiteLogo = ({ className, showName = true }: SiteLogoProps) => (
  <Link
    href={ROUTES.DOCS}
    className={cn(
      "flex items-center gap-2 text-sm font-semibold tracking-tight",
      className
    )}
  >
    <Image
      src="/logo.svg"
      alt={SITE.NAME}
      width={24}
      height={24}
      className="size-6 shrink-0 dark:invert"
      priority
    />
    {showName ? <span>{SITE.NAME}</span> : null}
  </Link>
);
