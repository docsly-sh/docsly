import { llmsSource } from "@/lib/source";

export const revalidate = false;

export const GET = () =>
  new Response(llmsSource.index(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
