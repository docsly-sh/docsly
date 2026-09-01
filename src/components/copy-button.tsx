"use client";

import { Check, Copy } from "@phosphor-icons/react";
import { useCallback } from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";

export interface CopyButtonProps extends Omit<
  React.ComponentProps<typeof Button>,
  "value"
> {
  value: string | (() => Promise<string> | string);
  showTooltip?: boolean;
}

export const CopyButton = ({
  value,
  className,
  variant = "ghost",
  size,
  children,
  showTooltip = true,
  ...props
}: CopyButtonProps) => {
  const getValue = useCallback(() => {
    if (typeof value === "function") {
      return value();
    }

    return value;
  }, [value]);

  const { copyToClipboard, isCopied } = useCopyToClipboard({
    timeout: 1000,
  });

  const handleCopy = useCallback(async () => {
    const text = await getValue();
    await copyToClipboard(text);
  }, [copyToClipboard, getValue]);

  const isIconOnly = !children;
  const label = isCopied ? "Copied" : "Copy to clipboard";

  const button = (
    <Button
      data-slot="copy-button"
      size={size ?? (isIconOnly ? "icon" : "sm")}
      variant={variant}
      aria-label={isIconOnly ? label : undefined}
      className={cn(
        isIconOnly &&
          "bg-code extend-touch-target absolute top-3 right-2 z-10 size-11 opacity-70 hover:opacity-100 focus-visible:opacity-100 sm:size-7",
        className
      )}
      onClick={handleCopy}
      {...props}
    >
      {isIconOnly ? <span className="sr-only">{label}</span> : null}
      {isCopied ? <Check weight="bold" aria-hidden /> : <Copy aria-hidden />}
      {children}
    </Button>
  );

  return (
    <>
      {showTooltip ? (
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent>{label}</TooltipContent>
        </Tooltip>
      ) : (
        button
      )}
      {isIconOnly ? (
        <span aria-live="polite" className="sr-only" role="status">
          {isCopied ? "Copied to clipboard" : ""}
        </span>
      ) : null}
    </>
  );
};
