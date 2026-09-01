"use client";

import { useRouter } from "next/navigation";
import { addTransitionType, startTransition } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { useFeedback } from "@/hooks/use-feedback";
import { trackEvent } from "@/lib/events";

export const DocsKeyboardShortcuts = ({
  previous,
  next,
}: {
  previous: string | null;
  next: string | null;
}) => {
  const router = useRouter();
  const playClick = useFeedback({ sound: "click" });

  const navigate = (
    href: string | null,
    direction: "previous" | "next",
    keys: string
  ) => {
    if (href) {
      playClick();
      trackEvent({
        name: "keyboard_shortcut_navigate",
        properties: { direction, keys, path: href },
      });
      startTransition(() => {
        addTransitionType(direction === "next" ? "nav-forward" : "nav-back");
        router.push(href);
      });
    }
  };

  useHotkeys(
    "ArrowRight",
    (event) => {
      if (!next) {
        return;
      }

      event.preventDefault();
      navigate(next, "next", "ArrowRight");
    },
    { enableOnContentEditable: false, enableOnFormTags: false }
  );

  useHotkeys(
    "ArrowLeft",
    (event) => {
      if (!previous) {
        return;
      }

      event.preventDefault();
      navigate(previous, "previous", "ArrowLeft");
    },
    { enableOnContentEditable: false, enableOnFormTags: false }
  );

  return null;
};
