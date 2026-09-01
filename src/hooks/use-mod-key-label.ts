import { useSyncExternalStore } from "react";

const getModKeyLabel = () => {
  if (typeof navigator === "undefined") {
    return "Ctrl+K";
  }

  const isApple =
    /Mac|iPhone|iPod|iPad/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  return isApple ? "⌘K" : "Ctrl+K";
};

export const useModKeyLabel = () =>
  useSyncExternalStore(
    () => () => {},
    getModKeyLabel,
    () => "Ctrl+K"
  );
