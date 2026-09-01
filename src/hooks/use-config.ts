"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";

export type InstallationType = "cli" | "manual";

const STORAGE_KEY = "installation-type";

export const useConfig = () => {
  const [installationType, setInstallationType] =
    useLocalStorage<InstallationType>(STORAGE_KEY, "cli");

  return {
    installationType,
    setInstallationType,
  };
};
