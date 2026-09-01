import { ROUTES } from "./routes";

export type DocsSection = {
  href: string;
  match: "exact" | "prefix";
  name: string;
};

export const DOCS_SECTIONS = [
  { href: ROUTES.DOCS, match: "exact", name: "Introduction" },
  { href: ROUTES.DOCS_INSTALLATION, match: "prefix", name: "Installation" },
  { href: ROUTES.DOCS_DEPLOYMENT, match: "prefix", name: "Deployment" },
  { href: ROUTES.DOCS_GUIDES, match: "prefix", name: "Guides" },
  { href: ROUTES.DOCS_CONFIGURATION, match: "prefix", name: "Configuration" },
  { href: ROUTES.DOCS_COMPONENTS, match: "prefix", name: "Components" },
] as const satisfies readonly DocsSection[];

export const HEADER_NAV_ITEMS = [
  { href: ROUTES.DOCS, label: "Docs" },
  { href: ROUTES.DOCS_GUIDES, label: "Guides" },
  { href: ROUTES.DOCS_CONFIGURATION, label: "Configuration" },
  { href: ROUTES.DOCS_COMPONENTS, label: "Components" },
] as const;
