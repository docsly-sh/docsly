"use client";

import { Tabs } from "@/components/ui/tabs";
import { useConfig } from "@/hooks/use-config";
import type { InstallationType } from "@/hooks/use-config";

export const CodeTabs = ({ children }: React.ComponentProps<typeof Tabs>) => {
  const { installationType, setInstallationType } = useConfig();

  return (
    <Tabs
      value={installationType}
      onValueChange={(value: string) =>
        setInstallationType(value as InstallationType)
      }
      className="relative mt-6 w-full"
    >
      {children}
    </Tabs>
  );
};
