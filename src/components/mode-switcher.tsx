"use client";

import { Desktop, Moon, Sun } from "@phosphor-icons/react";
import { useEffect } from "react";

import { useTheme } from "@/components/theme-provider";
import { useMetaColor } from "@/hooks/use-meta-color";
import { cn } from "@/lib/utils";

const THEME_OPTIONS = [
  { icon: Desktop, value: "system" },
  { icon: Sun, value: "light" },
  { icon: Moon, value: "dark" },
] as const;

export const ModeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const { metaColor, setMetaColor } = useMetaColor();

  useEffect(() => {
    setMetaColor(metaColor);
  }, [metaColor, setMetaColor]);

  const activeIndex = THEME_OPTIONS.findIndex((option) => option.value === theme);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = activeIndex >= 0 ? activeIndex : 0;
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      nextIndex = (currentIndex + 1) % THEME_OPTIONS.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      nextIndex =
        (currentIndex - 1 + THEME_OPTIONS.length) % THEME_OPTIONS.length;
    } else {
      return;
    }

    setTheme(THEME_OPTIONS[nextIndex].value);
    const nextButton = event.currentTarget.querySelector<HTMLButtonElement>(
      `[data-theme-value="${THEME_OPTIONS[nextIndex].value}"]`
    );
    nextButton?.focus();
  };

  return (
    <div
      className="inline-flex h-11 w-[8.25rem] shrink-0 items-center rounded-full border sm:h-8 sm:w-24"
      role="radiogroup"
      aria-label="Theme"
      onKeyDown={handleKeyDown}
      suppressHydrationWarning
    >
      {THEME_OPTIONS.map((option) => {
        const Icon = option.icon;
        const isActive = theme === option.value;

        return (
          <button
            key={option.value}
            type="button"
            data-theme-value={option.value}
            data-active={isActive}
            tabIndex={isActive ? 0 : -1}
            className={cn(
              "extend-touch-target relative flex size-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none data-[active=true]:text-foreground sm:size-8 [&_svg]:size-4"
            )}
            role="radio"
            aria-checked={isActive}
            aria-label={`${option.value} theme`}
            onClick={() => setTheme(option.value)}
            suppressHydrationWarning
          >
            <Icon aria-hidden />
          </button>
        );
      })}
    </div>
  );
};
