import { redirect } from "next/navigation";

import { ROUTES } from "@/constants/routes";

export const dynamic = "force-static";
export const revalidate = false;

export default function IndexPage() {
  redirect(ROUTES.DOCS);
}
