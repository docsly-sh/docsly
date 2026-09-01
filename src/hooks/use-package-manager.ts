"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";

export type PackageManager = "npm" | "yarn" | "pnpm" | "bun";

const STORAGE_KEY = "package-manager";

export const usePackageManager = () =>
  useLocalStorage<PackageManager>(STORAGE_KEY, "pnpm");
