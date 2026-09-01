"use client";

import { createContext, useContext } from "react";

const DocsScrollContext = createContext<HTMLElement | null>(null);

export const DocsScrollProvider = ({
  container,
  children,
}: {
  container: HTMLElement | null;
  children: React.ReactNode;
}) => (
  <DocsScrollContext.Provider value={container}>
    {children}
  </DocsScrollContext.Provider>
);

export const useDocsScrollContainer = () => useContext(DocsScrollContext);
