import { ROUTES } from "@/constants/routes";
import type { PageTreeFolder } from "@/lib/page-tree";

export const DOCS_DIR = ROUTES.DOCS.slice(1);

export const EXCLUDED_SECTIONS = new Set([
  "(root)",
  "deployment",
  "installation",
]);

export const COMPONENTS_FOLDER_ID = "components";

export const isComponentsFolder = (folder: PageTreeFolder) =>
  folder.$id === COMPONENTS_FOLDER_ID;

export const docsContentRoute = `${ROUTES.LLMS_MD}${ROUTES.DOCS}`;

export const PAGES_NEW: string[] = [
  ROUTES.DOCS_FEATURES,
  ROUTES.DOCS_ARCHITECTURE,
  ROUTES.DOCS_CONTRIBUTING,
  ROUTES.DOCS_COMPONENTS,
];
